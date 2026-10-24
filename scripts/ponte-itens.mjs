/**
 * Ponte com o T20 Hayd Itens Superiores e Mágicos (t20-hayd-itens).
 * Entradas que o classes-extras-t20 tem e o catálogo do t20-hayd-itens não tem (melhorias, encantos e materiais)
 * entram no catálogo dele como fonte extra, igual às homebrews. Como a T20 Hayd Loja e o importador de fichas
 * leem o catálogo do t20-hayd-itens, eles passam a enxergar essas entradas sem mudar nada.
 * As entradas ganham a chave "cx-<id>", para nunca colidir com as do catálogo.
 */
import { MELHORIAS, MATERIAIS, ENCANTOS, PRECOS_MATERIAIS } from "./melhorias.mjs";
import { MALDICOES } from "./maldicoes.mjs";

const ITENS = "t20-hayd-itens";
const MOD = "classes-extras-t20";
const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean).map((w) => w.replace(/(os|as|o|a|e)$/, "")).join(" ");

/** categoria do classes-extras -> categorias do catálogo do t20-hayd-itens */
const CATS = { weapon: ["arma"], ammo: ["municao"], leve: ["armadura"], pesada: ["armadura"], escudo: ["escudo"], esoteric: ["esoterico"], tools: ["ferramenta", "vestuario"] };
const TODAS = ["arma", "municao", "armadura", "escudo", "esoterico", "ferramenta", "vestuario"];
/** categoria de material: classes-extras -> variante do t20-hayd-itens (vestuário não tem variante no catálogo dele) */
const VARIANTE = { weapon: "arma", leve: "armaduraLeve", pesada: "armaduraPesada", escudo: "escudo", esoteric: "esoterico" };
const ORDEM_PRECO = ["arma", "armaduraLeve", "armaduraPesada", "escudo", "esoterico"];

const cats = (lista) => [...new Set(lista.flatMap((c) => (c === "all" ? TODAS : c === "armor" ? ["armadura", "escudo"] : (CATS[c] ?? []))))];
const fonteDe = (tip) => tip.match(/\((T20|DB|DH|RG|AA|RT|SA|HA|DA)\)\s*$/)?.[1] ?? "Classes Extras";
const semFonte = (tip) => tip.replace(/\s*\((T20|DB|DH|RG|AA|RT|SA|HA|DA)\)\s*$/, "");
const semPonto = (t) => String(t ?? "").replace(/\.\s*$/, "");

/** Efeito do classes-extras -> efeito do formato do t20-hayd-itens */
function efeito(fx, extra = {}) {
	if (!fx || typeof fx !== "object" || !Array.isArray(fx.changes)) return null;
	const ef = { changes: fx.changes.map((c) => ({ key: c.key, value: String(c.value), mode: c.mode ?? 2 })), ...extra };
	if (fx.transfer && !fx.onuse) ef.passivo = true;
	if (fx.spell) ef.spell = true;
	if (fx.custo) ef.custo = fx.custo;
	return ef;
}

function entradaSimples(tipo, id, label, tip, categorias, fx) {
	const ef = efeito(fx);
	return {
		key: `cx-${id}`, tipo, nome: label, cats: cats(categorias), fonte: fonteDe(tip),
		beneficio: semPonto(semFonte(tip)), efeitos: ef ? [ef] : [], origemExtra: MOD
	};
}

/** @returns entradas ({key,tipo,nome,...}) que faltam no catálogo informado */
export function entradasExtras(catalogo) {
	const tem = new Set();
	for (const tab of [catalogo.obterMelhorias(), catalogo.obterEncantos(), catalogo.obterMateriais()]) {
		for (const def of Object.values(tab ?? {})) tem.add(norm(def?.nome));
	}
	const out = [];
	const novo = (nome) => { const k = norm(nome); if (!k || tem.has(k)) return false; tem.add(k); return true; };

	for (const m of MELHORIAS) {
		if (typeof m.fx === "string" || !novo(m.label)) continue;       // "enhanced:" depende do Aprimorado do catálogo: fica de fora
		out.push(entradaSimples("melhoria", m.id, m.label, m.tip, m.cats, m.fx));
	}
	for (const e of ENCANTOS) {
		if (e.sys || !novo(e.label)) continue;                           // os "sys" já existem no catálogo
		out.push(entradaSimples("encanto", e.id, e.label, e.tip, e.cats, e.fx));
	}
	for (const m of MALDICOES) {                                         // maldições entram como encantos "(Maldição)"
		const nome = `${m.label} (Maldição)`;
		if (!novo(nome)) continue;
		const ent = entradaSimples("encanto", m.id, nome, m.tip, m.cats, m.fx);
		ent.fonte = "Itens Amaldiçoados"; ent.maldicao = true;
		out.push(ent);
	}
	for (const mat of MATERIAIS) {
		if (!(mat.novo || mat.id === "dragon-leather") || !novo(mat.label)) continue;
		const variantes = {}, efeitos = {};
		const precos = {};
		const tabela = PRECOS_MATERIAIS[mat.id];
		const lista = [];
		for (const [cat, d] of Object.entries(mat.por)) {
			const v = VARIANTE[cat]; if (!v) continue;                    // vestuário (Tixonessica) não existe como variante no catálogo
			variantes[v] = { beneficio: semPonto(semFonte(d.tip)) };
			const p = tabela?.[ORDEM_PRECO.indexOf(v)] ?? 0;
			if (p > 0) precos[v] = p;
			const ef = efeito(d.fx, { variantes: [v] });
			if (ef) lista.push(ef);
		}
		if (!Object.keys(variantes).length) continue;
		const primeira = Object.values(mat.por)[0].tip;
		out.push({
			key: `cx-${mat.id}`, tipo: "material", nome: mat.label, fonte: fonteDe(primeira),
			precos, variantes, beneficio: Object.values(variantes).map((v) => v.beneficio).join(" / "),
			efeitos: lista, ...(Object.keys(precos).length ? {} : { raro: true }), origemExtra: MOD
		});
	}
	return out;
}

/**
 * Correções de categoria em relação aos livros: Inscrito e Diligente valem para armaduras, escudos, ferramentas e
 * vestuários (Deuses de Arton p.54, tabela 1-4), mas o catálogo do t20-hayd-itens só os libera para armadura e escudo.
 * Entram como entradas de mesma chave, que substituem as originais.
 */
const AJUSTES_CATS = { inscrito: ["ferramenta", "vestuario"], diligente: ["ferramenta", "vestuario"] };
function ajustesDeCategoria(catalogo) {
	const mel = catalogo.obterMelhorias();
	return Object.entries(AJUSTES_CATS).filter(([k]) => mel[k]).map(([k, mais]) => ({ ...mel[k], key: k, tipo: "melhoria", cats: [...new Set([...(mel[k].cats ?? []), ...mais])], origemExtra: MOD }));
}

/** Registra as entradas extras como fonte do catálogo do t20-hayd-itens (sem perder as homebrews dele). */
export async function ligarAoItens() {
	const mod = game.modules.get(ITENS);
	if (!mod?.active) return false;
	let api = mod.api;
	for (let i = 0; i < 50 && !(api?.catalogo?.registrarFonteHomebrew && api?.homebrews); i++) {
		await new Promise((r) => setTimeout(r, 200));
		api = game.modules.get(ITENS)?.api;
	}
	if (!api?.catalogo?.registrarFonteHomebrew) { console.warn(`${MOD} | API do ${ITENS} indisponível: entradas extras não registradas.`); return false; }
	const extras = [...entradasExtras(api.catalogo), ...ajustesDeCategoria(api.catalogo)];
	const base = api.homebrews;
	api.catalogo.registrarFonteHomebrew(() => [...(base() ?? []), ...extras]);
	console.log(`${MOD} | ${extras.length} entradas extras (melhorias, encantos e materiais) registradas no ${ITENS}.`);
	return true;
}

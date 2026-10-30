import "./condicoes.mjs";
import { registrarMelhorias, criarEfeitosMelhorias, chavePorNome } from "./melhorias.mjs";
import { ligarAoItens } from "./ponte-itens.mjs";
import { ligarCompatV14 } from "./compat-v14.mjs";
import { ligarEnricherStatus } from "./enricher-status.mjs";
/**
 * Rede de segurança: se um compêndio do módulo estiver vazio (por exemplo, se o
 * arquivo do banco não carregou direito), o GM recebe o conteúdo a partir dos
 * JSON em /data. Se o compêndio já tem conteúdo, nada é feito.
 */
const MODULE_ID = "classes-extras-t20";
const PACKS = ["classes"];

/* Melhorias de itens superiores: registra no sistema antes de qualquer ficha de item ser aberta */
Hooks.once("setup", () => { try { registrarMelhorias(); } catch (e) { console.warn("classes-extras-t20 | registrarMelhorias falhou", e); } });
Hooks.once("init", () => { ligarCompatV14(); try { ligarEnricherStatus(); } catch (e) { console.warn("classes-extras-t20 | enricher @STATUS falhou", e); } });
Hooks.once("ready", () => { const m = game.modules.get(MODULE_ID); if (m) m.api = { ...(m.api ?? {}), criarEfeitosMelhorias, chavePorNome }; ligarAoItens().catch((e) => console.warn("classes-extras-t20 | ponte com o t20-hayd-itens falhou", e)); });

Hooks.once("ready", async () => {
	if (!game.user.isGM) return;
	for (const name of PACKS) {
		const pack = game.packs.get(`${MODULE_ID}.${name}`);
		if (!pack || pack.index.size > 0) continue;
		try {
			const data = await (await fetch(`modules/${MODULE_ID}/data/${name}.json`)).json();
			if (pack.locked) await pack.configure({ locked: false });
			const opts = { pack: pack.collection, keepId: true };
			if (data.folders?.length) await Folder.createDocuments(data.folders, opts);
			await Item.createDocuments(data.items, opts);
			console.log(`Classes e Extras (T20) | Compêndio "${name}" preenchido a partir de /data.`);
		} catch (err) {
			console.error(`Classes e Extras (T20) | Falha ao preencher o compêndio "${name}":`, err);
			ui.notifications.error(`Classes e Extras (T20): falha ao preencher o compêndio "${name}". Veja o console.`);
		}
	}
});

/**
 * Porte do enricher `@STATUS[id]` da Tormenta20 1.6 (Foundry v14) para a v13.
 *
 *   @STATUS[abalado]           ->  [ícone Abalado] [+]
 *   @STATUS[abalado]{texto}    ->  mesmo, com o texto escolhido
 *
 * O botão "+" aplica a condição aos tokens selecionados (só nos que você controla).
 * Funciona em descrições de item, diários e chat. Na v14 o sistema já traz o
 * enricher nativo; por isso aqui só registramos na v13 (e se ele ainda não existir).
 */
const MODULE_ID = "classes-extras-t20";
const PADRAO = /@STATUS\[([^\]\s]+)\](?:\{([^}]*)\})?/gi;

const esc = (t) => foundry.utils.escapeHTML ? foundry.utils.escapeHTML(String(t ?? "")) : String(t ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function achar(id) {
	const se = CONFIG.statusEffects;
	const lista = Array.isArray(se) ? se : Object.values(se ?? {});
	const alvo = String(id).trim().toLowerCase();
	return lista.find((e) => String(e.id).toLowerCase() === alvo);
}

function enriquecer(match) {
	try {
		const [, id, texto] = match;
		const st = achar(id);
		if (!st) return null; // deixa o texto como está
		const nome = texto || game.i18n.localize(st.name ?? st.label ?? id);
		const span = document.createElement("span");
		span.className = "t20-status-enricher";
		span.innerHTML =
			`<a class="content-link t20-status-link" data-status="${esc(st.id)}" data-tooltip="${esc(nome)}">` +
			`<img src="${esc(st.img ?? st.icon ?? "")}" alt="" style="width:1.1em;height:1.1em;vertical-align:text-bottom;border:none;margin-right:.25em">${esc(nome)}</a>` +
			`<a class="t20-status-apply" data-status="${esc(st.id)}" data-tooltip="Aplicar aos tokens selecionados" style="margin-left:.35em"><i class="fa-solid fa-plus"></i></a>`;
		return span;
	} catch (err) {
		console.warn(`${MODULE_ID} | @STATUS falhou`, err);
		return null;
	}
}

async function aplicar(id) {
	const tokens = canvas?.tokens?.controlled ?? [];
	if (!tokens.length) return ui.notifications.warn("Selecione ao menos um token para aplicar a condição.");
	for (const t of tokens) {
		const actor = t.actor;
		if (!actor?.isOwner) continue;
		try { await actor.toggleStatusEffect(id, { active: true }); }
		catch (err) { console.warn(`${MODULE_ID} | não foi possível aplicar ${id} em ${actor.name}`, err); }
	}
}

export function ligarEnricherStatus() {
	if (game.release?.generation >= 14) return; // nativo do sistema
	const enr = CONFIG.TextEditor?.enrichers;
	if (!Array.isArray(enr) || enr.some((e) => String(e.pattern).includes("STATUS"))) return;
	enr.push({ pattern: PADRAO, enricher: (match) => enriquecer(match) });
	document.addEventListener("click", (ev) => {
		const a = ev.target?.closest?.(".t20-status-apply, .t20-status-link");
		if (!a) return;
		ev.preventDefault();
		aplicar(a.dataset.status);
	});
}

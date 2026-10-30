/**
 * Compatibilidade com Foundry v14 / Tormenta20 1.6+.
 *
 * Na 1.6 o sistema guarda os dados de "Efeito de Uso" e "Fim de Cena" em campos
 * próprios (system.onuse, system.abilityUse, duration.expiry), e não mais em
 * flags.tormenta20. O sistema converte isso só nos documentos do mundo; os
 * compêndios de módulos não são migrados. Por isso, ao criar um item (vindo
 * dos nossos compêndios ou do importador), convertemos os efeitos com as MESMAS
 * regras da migração do sistema (module/data/migrations/v14.mjs, migrateEffectsV2).
 *
 * Na v13 este arquivo não faz nada.
 */
const MODULE_ID = "classes-extras-t20";
const TIPOS = ["self", "ability", "attack", "consumable", "equipment", "power", "skill", "spell"];

function converterEfeito(e, itemType, itemTipo) {
	const fl = e?.flags?.tormenta20;
	if (!fl || (!fl.onuse && !fl.durationScene)) return e;
	const out = foundry.utils.deepClone(e);
	if (fl.onuse) {
		const ehMagia = itemType === "magia" || (itemType === "consumivel" && itemTipo === "scroll");
		const tipos = ehMagia && !out.duration?.rounds && !out.duration?.seconds ? ["self"] : TIPOS.filter((k) => fl[k]);
		const nomes = String(fl.items ?? "").replaceAll(",", ";").split(";").map((i) => i.trim()).filter(Boolean);
		out.disabled = true;
		out.system = {
			...(out.system ?? {}),
			onuse: true,
			abilityUse: {
				automatic: !e.disabled,
				aumenta: !!fl.aumenta,
				custo: Number.isNumeric(fl.custo) && fl.custo !== "" ? Number(fl.custo) : null,
				names: nomes,
				types: tipos
			}
		};
	}
	if (fl.durationScene) out.duration = { ...(out.duration ?? {}), expiry: "sceneEnd", value: null, units: "rounds" };
	// limpa as flags já convertidas
	out.flags = { ...out.flags, tormenta20: {} };
	return out;
}

export function ligarCompatV14() {
	if (game.release?.generation < 14) return;
	Hooks.on("preCreateItem", (item, data) => {
		try {
			const efeitos = data?.effects ?? item._source?.effects;
			if (!Array.isArray(efeitos) || !efeitos.length) return;
			if (!efeitos.some((e) => e?.flags?.tormenta20?.onuse || e?.flags?.tormenta20?.durationScene)) return;
			const novos = efeitos.map((e) => converterEfeito(e, item.type, item.system?.tipo));
			item.updateSource({ effects: novos });
		} catch (err) {
			console.warn(`${MODULE_ID} | conversão de efeitos para v14 falhou`, err);
		}
	});
	console.log(`${MODULE_ID} | compatibilidade v14 ativa`);
}

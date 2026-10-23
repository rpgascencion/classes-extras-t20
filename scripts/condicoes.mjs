/**
 * Condições Automáticas (T20)
 *
 * Baseado na leitura do código-fonte real do sistema Tormenta20:
 *  - module/conditions/conditions.mjs: definição oficial de cada condição
 *    (nome, ícone, `statuses` do Foundry, `changes` mecânicos). Usamos essa
 *    definição como base ao criar o Active Effect, então a condição fica
 *    idêntica a uma aplicada manualmente pela ficha (mesmo ícone/efeito).
 *  - module/combat.mjs: o sistema já escuta "updateCombat" e, para o ator
 *    cujo turno começou, procura Active Effects com `changes` de key "dano"
 *    (usado por ex. na condição oficial "Em Chamas") — mas ele só ROLA e
 *    posta a mensagem, não aplica de fato o dano nem conta rodadas. Este
 *    módulo faz o processamento completo: aplica o dano ao PV de verdade
 *    (via actor.applyDamageV2, a mesma função do botão "Aplicar Dano" no
 *    chat), decrementa a duração e remove a condição sozinho ao fim do
 *    tempo, avisando no chat a cada rodada.
 *  - module/chat.mjs (ApplyButtons): é de lá que vem o botão "Aplicar Dano"
 *    nos cartões de dano do chat. Adicionamos nosso próprio botão do lado,
 *    sem alterar o botão original.
 *
 * Para evitar conflito com o processamento nativo de "dano" (que rolaria
 * uma segunda mensagem "oca", sem aplicar nada), usamos uma chave própria
 * nos changes ("t20acDano") em vez de "dano", então o hook nativo do
 * sistema simplesmente ignora nossos efeitos.
 */

import { CONDICOES_EXTRAS } from "./condicoes-extras.mjs";

const MOD_ID = "classes-extras-t20";

/** Condições do sistema + condições extras deste módulo (a lista do sistema é congelada, por isso a junção é feita aqui). */
const todasCondicoes = () => {
	const extras = Object.fromEntries(CONDICOES_EXTRAS.map((c) => [c.id, c]));
	return { ...extras, ...(CONFIG.T20?.conditions ?? {}) };
};

/* Registra as condições extras no HUD de status dos tokens. */
Hooks.once("init", () => {
	const ids = new Set((CONFIG.statusEffects ?? []).map((e) => e.id));
	for (const c of CONDICOES_EXTRAS) if (!ids.has(c.id)) CONFIG.statusEffects.push(foundry.utils.deepClone(c));
});

/* -------------------------------------------- */
/*  Tabela de sugestões (magias/poderes -> condição)
 *
 * Construída lendo as descrições reais dos itens dos suplementos
 * "Suplementos de Arton" e "Bestiário de Arton" (exportadas via macro
 * pelo próprio usuário, já que os compêndios são LevelDB e não dá pra
 * ler offline). Só entraram aqui os casos SIMPLES ("fica X por N
 * rodadas"). Casos com escolhas múltiplas, ramificações complexas por
 * ND, ou efeitos apenas narrativos/sociais foram deixados de fora (ou
 * entram só com uma "nota", sem pré-preencher errado).
 *
 * Chave: nome do item em minúsculas (deve bater com o texto do
 * cabeçalho do card no chat). Se precisar adicionar mais, é só seguir
 * o mesmo formato.
 */
const SUGESTOES = {
	"golpe baixo": { condKey: "atordoado", rounds: "1" },
	"expulsar/comandar mortos-vivos": {
		condKey: "apavorado",
		rounds: "1d6",
		nota: "Mortos-vivos comandados (não inteligentes) ficam Fascinados por 1 rodada, em vez disso."
	},
	"banimento": {
		condKey: "enjoado",
		rounds: "1d4",
		nota: "Isso só se aplica se o alvo PASSAR no teste de resistência (o efeito principal é banimento, não uma condição)."
	},
	"anular a luz": { condKey: "enjoado", rounds: "1d4" },
	"palavra primordial": {
		condKey: "atordoado",
		rounds: "2d4",
		nota: "A magia tem 3 escolhas (Atordoar/Cegar/Matar) — isso reflete só a opção 'Atordoar' no fracasso do alvo."
	},
	"amedrontar": {
		condKey: "apavorado",
		rounds: "1",
		nota: "Depois vira Abalado. Se o alvo passar no teste, é direto Abalado por 1d4 rodadas."
	},
	"sono": {
		condKey: "fatigado",
		rounds: "1d4",
		nota: "Fora de combate/perigo, o alvo fica Inconsciente e Caído em vez disso (sem prazo fixo)."
	},
	"raio solar": { condKey: "ofuscado", rounds: "1" },
	"vapor": {
		condKey: "emchamas",
		rounds: "",
		nota: "Em Chamas não tem prazo fixo — remova manualmente quando o fogo for apagado."
	},
	"dardo gélido": { condKey: "lento", rounds: "1" },
	"fúria dos antepassados": { condKey: "pasmo", rounds: "1" },
	"flecha de luz": { condKey: "ofuscado", rounds: "1" },
	"bofetada de nimb": {
		condKey: "desprevenido",
		rounds: "1",
		nota: "Também fica Vulnerável (sem prazo fixo definido no texto — considere até o fim da cena)."
	},
	"bênção do frio": {
		condKey: "enredado",
		rounds: "1",
		nota: "Se o alvo já estava enredado assim, vira Imóvel por 1 rodada em vez disso."
	},
	"golpe congelante": { condKey: "lento", rounds: "1" },
	"golpe ofuscante": { condKey: "cego", rounds: "1" },
	"kiai assustador": { condKey: "abalado", rounds: "1" },
	"secreção cicatrizante": { condKey: "enjoado", rounds: "1" },
	"acorde místico": { condKey: "vulneravel", rounds: "1" },
	"prisão gélida": { condKey: "enredado", rounds: "1" },
	"música: sonata da distração": { condKey: "desprevenido", rounds: "1" },
	"miasma tóxico": { condKey: "enjoado", rounds: "1" },
	"alterar programação": { condKey: "confuso", rounds: "1", nota: "Também fica Vulnerável junto." },
	"pira santa": { condKey: "ofuscado", rounds: "1" },
	"explosão fulgente": {
		condKey: "cego",
		rounds: "1",
		nota: "Se o alvo já ficou Cego nessa cena por este poder, vira Ofuscado em vez disso."
	},
	"pancada estonteante": { condKey: "desprevenido", rounds: "1" },
	"cobrir de pólvora": { condKey: "cego", rounds: "1" },
	"dizimar infiéis": {
		condKey: "ofuscado",
		rounds: "1",
		nota: "Se energia negativa (em vez de positiva), o alvo fica Vulnerável em vez de Ofuscado."
	},
	"passo hilariante": {
		condKey: "vulneravel",
		rounds: "1d4+1",
		nota: "Também fica Pasmo por 1 rodada (só na primeira vez na cena)."
	},
	"danificar as asas": { condKey: "lento", rounds: "1", nota: "O alvo também fica Caído." },
	"bafo de troll": {
		condKey: "enjoado",
		rounds: "1d4+1",
		nota: "Se o alvo passar num teste de Fortitude adicional, reduz para 1 rodada."
	},
	"efeito cenográfico": {
		condKey: "atordoado",
		rounds: "1",
		nota: "Se o alvo for um capanga, fica Inconsciente em vez disso (sem prazo)."
	},
	"manto da justiça": { condKey: "enjoado", rounds: "1d6" },
	"pirueta desajeitada": {
		condKey: "enredado",
		rounds: "1d4+1",
		nota: "O alvo também fica Caído nesse caso. Se passar no teste, é só Enredado por 1 rodada."
	},
	"içar a bandeira preta": { condKey: "abalado", rounds: "1d4" },
	"calma lá": {
		condKey: "pasmo",
		rounds: "1",
		nota: "Gatilho social (teste de Diplomacia), não vem de uma rolagem de dano."
	},
	// Casos complexos demais para pré-preencher com segurança — só nota.
	"raio elemental": {
		condKey: null,
		rounds: "",
		nota: "Depende do tipo de dano escolhido: Ácido=Vulnerável, Eletricidade=Ofuscado, Frio=Lento (1 rodada cada), Fogo=Em Chamas, Trevas=sem cura de PV por 1 rodada (sem condição correspondente)."
	},
	"explosão caleidoscópica": {
		condKey: null,
		rounds: "",
		nota: "Efeito varia por ND do alvo e sucesso/fracasso no teste — confira o texto original antes de aplicar."
	}
};

function buscarSugestao(nomeItem) {
	if (!nomeItem) return null;
	return SUGESTOES[nomeItem.trim().toLowerCase()] ?? null;
}

/* -------------------------------------------- */
/*  Aplicar a condição                           */
/* -------------------------------------------- */

async function rolarRodadas(rounds, actor, nomeCondicao) {
	console.log(`${MOD_ID} | [debug] rolarRodadas chamada com rounds="${rounds}" (tipo: ${typeof rounds})`);

	if (!rounds) {
		console.log(`${MOD_ID} | [debug] rounds vazio/falsy -> retornando 0, sem rolar`);
		return 0;
	}
	if (/^\d+$/.test(String(rounds).trim())) {
		console.log(`${MOD_ID} | [debug] rounds é um número fixo -> não precisa rolar dado`);
		return Number(rounds);
	}
	// fórmula de dado (ex: "1d4", "2d4", "1d4+1") -> rola e posta no chat, valor fica fixo dali pra frente
	const roll = new Roll(String(rounds));
	await roll.evaluate();
	console.log(`${MOD_ID} | [debug] rolagem de duração: "${rounds}" -> ${roll.total}`);
	await roll.toMessage({
		speaker: actor ? ChatMessage.getSpeaker({ actor }) : undefined,
		flavor: `Duração de <b>${nomeCondicao}</b>`
	});
	return roll.total;
}

async function aplicarCondicao(actor, { condKey, duracaoTipo, rounds, dano }) {
	const base = foundry.utils.deepClone(todasCondicoes()[condKey]);
	if (!base) {
		ui.notifications.error(`Condição "${condKey}" não encontrada.`);
		return;
	}

	// Remove campos que não devem ir para o Active Effect criado
	delete base._id;

	const ehRodadas = duracaoTipo === "rodadas";
	const ehCena = duracaoTipo === "cena";

	const roundsFixas = ehRodadas ? await rolarRodadas(rounds, actor, base.name) : 0;

	const changes = Array.isArray(base.changes) ? [...base.changes] : [];
	if (dano) {
		// Chave própria, para não colidir com o processamento nativo de "dano"
		// (module/combat.mjs), que só rola e posta no chat sem aplicar de fato.
		changes.push({ key: "t20acDano", mode: 0, value: dano });
	}

	let nomeExibicao = base.name;
	if (ehRodadas && roundsFixas) nomeExibicao = `${base.name} (${roundsFixas} rodada(s))`;
	else if (ehCena) nomeExibicao = `${base.name} (Cena)`;

	// module/documents/active-effects.mjs sobrescreve _prepareDuration(): se a
	// flag "durationScene" estiver true, a duração exibida do efeito vira
	// sempre "Cena", IGNORANDO duration.rounds por completo. Por isso
	// controlamos essa flag explicitamente conforme o tipo escolhido, em vez
	// de deixar o padrão da condição decidir.
	//
	// "cena": usa o mecanismo NATIVO do sistema (module/apps/time-segment.mjs
	// -> botão "Terminar Cena" no rodapé do combate), que já remove sozinho
	// todo efeito com durationScene=true de todos os personagens. Não
	// rastreamos rodadas nesse modo.
	const duration = ehRodadas
		? {
				rounds: roundsFixas,
				startRound: game.combat?.round ?? null,
				startTurn: game.combat?.turn ?? null
			}
		: {};

	const flagsTormenta = foundry.utils.deepClone(base.flags?.tormenta20 ?? {});
	flagsTormenta.durationScene = ehCena;

	const effectData = foundry.utils.mergeObject(
		base,
		{
			name: nomeExibicao,
			changes,
			duration,
			flags: {
				tormenta20: flagsTormenta,
				[MOD_ID]: {
					// Só rastreamos contagem/remoção automática por rodada no modo
					// "rodadas". No modo "cena", o dano ainda é aplicado a cada
					// turno (se configurado), mas a remoção fica a cargo do
					// "Terminar Cena". No modo manual, nada é automático além do
					// dano por rodada, se configurado.
					tracked: true,
					condKey,
					roundsLeft: ehRodadas ? roundsFixas || null : null,
					indeterminado: !ehRodadas, // dano se repete toda rodada sem contagem regressiva
					dano: dano || null,
					ultimoProcessado: null
				}
			}
		},
		{ inplace: false }
	);

	await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

/* -------------------------------------------- */
/*  Diálogo de configuração                      */
/* -------------------------------------------- */

function opcoesCondicoes(selecionado) {
	const cond = todasCondicoes();
	return Object.values(cond)
		.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
		.map((c) => `<option value="${c.id}" ${c.id === selecionado ? "selected" : ""}>${c.name}</option>`)
		.join("");
}

function abrirDialogoCondicao(nomeItemOrigem) {
	if (!canvas.tokens.controlled.length) {
		ui.notifications.warn("Selecione um ou mais tokens para aplicar a condição.");
		return;
	}

	const sugestao = buscarSugestao(nomeItemOrigem);
	const notaHtml = sugestao?.nota
		? `<p style="border-left:3px solid orange;padding-left:6px;"><b>Atenção:</b> ${sugestao.nota}</p>`
		: "";
	const origemHtml = nomeItemOrigem
		? `<p><i>Sugestão detectada a partir de: <b>${nomeItemOrigem}</b></i></p>`
		: "";

	const duracaoTipoInicial = sugestao?.rounds ? "rodadas" : "manual";

	let jaProcessando = false; // trava contra clique duplo/duplo-clique no botão "Aplicar"

	new Dialog({
		title: "Aplicar Condição",
		content: `
      <form class="t20-cond-dialog">
        ${origemHtml}
        ${notaHtml}
        <label>Condição</label>
        <select name="cond">${opcoesCondicoes(sugestao?.condKey)}</select>

        <label>Duração</label>
        <select name="duracaoTipo">
          <option value="rodadas" ${duracaoTipoInicial === "rodadas" ? "selected" : ""}>Rodadas</option>
          <option value="cena" ${duracaoTipoInicial === "cena" ? "selected" : ""}>Até o fim da cena</option>
          <option value="manual" ${duracaoTipoInicial === "manual" ? "selected" : ""}>Sem duração automática (remover manualmente)</option>
        </select>

        <div class="t20-cond-rodadas-wrap">
          <label>Quantidade de rodadas (número ou fórmula, ex: 1d4, 2d4, 1d4+1)</label>
          <input type="text" name="rounds" value="${sugestao?.rounds ?? ""}" placeholder="ex: 3 ou 1d4" />
          <small>Fórmulas de dado são roladas uma vez ao aplicar e postadas no chat.</small>
        </div>
        <small class="t20-cond-cena-info" style="display:none">
          A condição dura até o mestre clicar em "Terminar Cena" no rodapé do rastreador de combate (recurso nativo do sistema).
        </small>
        <small class="t20-cond-manual-info" style="display:none">
          A condição não expira sozinha — remova manualmente clicando no ícone de status no token (ex: ao levantar de "Caído").
        </small>

        <label>Dano automático por rodada (opcional)</label>
        <input type="text" name="dano" placeholder="ex: 1d6 ou 1d6[fogo]" />
        <small>Rolado e aplicado ao PV automaticamente no início de cada turno do alvo, enquanto a condição durar (em qualquer modo de duração).</small>
      </form>
    `,
		buttons: {
			aplicar: {
				label: "Aplicar",
				callback: async (html) => {
					if (jaProcessando) {
						console.log(`${MOD_ID} | [debug] clique ignorado — já estava processando (clique duplo/duplo-clique)`);
						return;
					}
					jaProcessando = true;

					const condKey = html.find('[name="cond"]').val();
					const duracaoTipo = html.find('[name="duracaoTipo"]').val();
					const rounds = html.find('[name="rounds"]').val()?.trim() || "";
					const dano = html.find('[name="dano"]').val()?.trim() || "";

					console.log(`${MOD_ID} | [debug] aplicar clicado`, {
						condKey, duracaoTipo, rounds, dano,
						tokensSelecionados: canvas.tokens.controlled.map((t) => t.name)
					});

					// A seleção pode ter mudado (ex: clicou em outro lugar do canvas)
					// entre abrir o diálogo e clicar em "Aplicar" — sem essa checagem,
					// o loop abaixo simplesmente não faz nada, silenciosamente, e
					// nenhum dado de duração chega a ser rolado.
					if (!canvas.tokens.controlled.length) {
						ui.notifications.warn(
							"Nenhum token selecionado no momento de aplicar — a condição NÃO foi aplicada. "
							+ "Selecione o(s) token(s) de novo e tente aplicar mais uma vez."
						);
						return;
					}

					for (const token of canvas.tokens.controlled) {
						if (token.actor) await aplicarCondicao(token.actor, { condKey, duracaoTipo, rounds, dano });
					}
				}
			},
			cancelar: { label: "Cancelar" }
		},
		render: (html) => {
			const el = html[0] ?? html;
			const selectTipo = el.querySelector('[name="duracaoTipo"]');
			const wrapRodadas = el.querySelector(".t20-cond-rodadas-wrap");
			const infoCena = el.querySelector(".t20-cond-cena-info");
			const infoManual = el.querySelector(".t20-cond-manual-info");

			const atualizar = () => {
				const tipo = selectTipo.value;
				wrapRodadas.style.display = tipo === "rodadas" ? "" : "none";
				infoCena.style.display = tipo === "cena" ? "" : "none";
				infoManual.style.display = tipo === "manual" ? "" : "none";
			};

			selectTipo.addEventListener("change", atualizar);
			atualizar();
		},
		default: "aplicar"
	}).render(true);
}

/* -------------------------------------------- */
/*  Botão no chat                                */
/* -------------------------------------------- */

Hooks.on("renderChatMessageHTML", (app, html) => {
	// Espera o próximo tick: garante que os botões nativos do sistema
	// (Aplicar Dano / 2x / ½ / Cura, e o botão de custo de mana no
	// cabeçalho) já tenham sido inseridos no DOM antes da gente mexer,
	// independente da ordem de registro dos hooks.
	setTimeout(() => {
		const chatHTML = html.querySelector?.(".message-content");
		if (!chatHTML) return;

		const nomeItemOrigem = chatHTML.querySelector(".item-name")?.textContent?.trim() || null;

		const criarBotao = () => {
			const btn = document.createElement("button");
			btn.classList.add("t20-apply-condition");
			btn.title = "Aplicar Condição";
			btn.innerHTML = '<i class="fas fa-skull-crossbones"></i>';
			btn.addEventListener("click", (ev) => {
				ev.preventDefault();

				// Desabilita qualquer botão irmão (mesmo nome de classe) dentro
				// deste mesmo card de chat — se por uma corrida de renderização
				// tiverem sido criados dois botões, isso evita abrir dois
				// diálogos (e portanto aplicar a condição duas vezes) a partir
				// de um clique só.
				chatHTML.querySelectorAll(".t20-apply-condition").forEach((b) => {
					b.disabled = true;
					b.style.opacity = "0.5";
				});

				abrirDialogoCondicao(nomeItemOrigem);
			});
			return btn;
		};

		// Caso 1: existe rolagem de dano -> bota o botão junto do "2x"
		// (dentro do MESMO container que o sistema já criou, em vez de
		// criar um container novo por cima).
		const blocosDano = chatHTML.querySelectorAll(".roll.roll--dano");
		let temBlocoDano = false;
		for (const bloco of blocosDano) {
			temBlocoDano = true;
			if (bloco.querySelector(".t20-apply-condition")) continue; // já adicionado

			const containerEsquerda = bloco.querySelector(".dice-btn.result.left");
			if (containerEsquerda) {
				containerEsquerda.append(criarBotao());
			} else {
				// Fallback (não deveria acontecer): cria um container próprio
				const container = document.createElement("span");
				container.classList.add("dice-btn", "result", "left");
				container.append(criarBotao());
				bloco.append(container);
			}
		}

		// Caso 2: não tem rolagem de dano, mas é um card de item (magia/poder)
		// -> bota o botão no cabeçalho, perto do custo de mana.
		if (!temBlocoDano) {
			const header = chatHTML.querySelector(".card-header");
			if (header && !header.querySelector(".t20-apply-condition")) {
				const botaoMana = header.querySelector(".chat-spend-mana");
				const btn = criarBotao();
				if (botaoMana) botaoMana.insertAdjacentElement("afterend", btn);
				else header.append(btn);
			}
		}
	}, 0);
});

/* -------------------------------------------- */
/*  Processamento automático a cada turno        */
/* -------------------------------------------- */

Hooks.on("updateCombat", async (combat, changed) => {
	const updateTurn = (combat.round > 0 && "turn" in changed) || "round" in changed;
	if (!updateTurn) return;

	// Processa sempre no cliente do mestre ativo (nunca em quem apenas
	// avançou o turno) — se fosse "quem clicou em avançar", um jogador
	// avançando para o turno de um NPC/monstro que ele não é dono faria
	// isso falhar silenciosamente por falta de permissão pra atualizar
	// aquele ator/efeito (era essa a causa do dano "às vezes" não rolar).
	if (!game.users.activeGM?.isSelf) return;

	const combatant = combat.combatant;
	const actor = combatant?.actor;
	if (!actor) return;

	const turnoChave = `${combat.round}-${combat.turn}`;

	const efeitos = actor.effects.filter((e) => e.getFlag(MOD_ID, "tracked"));
	for (const efeito of efeitos) {
		if (efeito.getFlag(MOD_ID, "ultimoProcessado") === turnoChave) continue;

		let rounds = efeito.getFlag(MOD_ID, "roundsLeft");
		const indeterminado = efeito.getFlag(MOD_ID, "indeterminado");
		const dano = efeito.getFlag(MOD_ID, "dano");
		const condKey = efeito.getFlag(MOD_ID, "condKey");
		const nomeBase = todasCondicoes()[condKey]?.name ?? efeito.name;

		// Modo "cena" ou "manual": sem contagem de rodadas. Se tiver dano
		// configurado, aplica a cada turno indefinidamente (a remoção fica
		// por conta do "Terminar Cena" ou de remoção manual do ícone).
		if (indeterminado) {
			if (dano) {
				const roll = new Roll(dano);
				await roll.evaluate();
				await roll.toMessage({
					speaker: ChatMessage.getSpeaker({ actor }),
					flavor: `<b>${nomeBase}</b> — dano automático`
				});
				await actor.applyDamageV2(roll, 1, "dano");
			}
			await efeito.setFlag(MOD_ID, "ultimoProcessado", turnoChave);
			continue;
		}

		// Condição sem duração automática nenhuma configurada -> não processa
		if (!rounds) {
			await efeito.setFlag(MOD_ID, "ultimoProcessado", turnoChave);
			continue;
		}

		if (dano) {
			const roll = new Roll(dano);
			await roll.evaluate();
			await roll.toMessage({
				speaker: ChatMessage.getSpeaker({ actor }),
				flavor: `<b>${nomeBase}</b> — dano automático`
			});
			await actor.applyDamageV2(roll, 1, "dano");
		}

		rounds -= 1;

		if (rounds > 0) {
			await efeito.update({
				name: `${nomeBase} (${rounds} rodada(s))`,
				[`flags.${MOD_ID}.roundsLeft`]: rounds,
				[`flags.${MOD_ID}.ultimoProcessado`]: turnoChave,
				duration: {
					rounds,
					startRound: combat.round,
					startTurn: combat.turn
				}
			});
			ChatMessage.create({
				content: `<b>${actor.name}</b> continua <b>${nomeBase}</b> — ${rounds} rodada(s) restante(s).`
			});
		} else {
			ChatMessage.create({
				content: `<b>${actor.name}</b> não está mais <b>${nomeBase}</b>.`
			});
			await efeito.delete();
		}
	}
});

/* -------------------------------------------- */
/*  API para macros                              */
/* -------------------------------------------- */

Hooks.once("ready", () => {
	game.condicoesAutomaticasT20 = {
		aplicar: aplicarCondicao,
		abrirDialogo: abrirDialogoCondicao
	};
	console.log(`${MOD_ID} | Registrado com sucesso.`);
});

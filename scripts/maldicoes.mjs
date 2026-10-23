/**
 * Maldições (Itens Amaldiçoados da wiki Tormenta Collab).
 * Na regra, uma maldição funciona como um encanto: o mestre escolhe um item (com ou sem encantos) e adiciona até três.
 * O sistema Tormenta20 não tem lista de maldições, então elas entram só no catálogo do t20-hayd-itens (via ponte-itens.mjs)
 * como encantos com o sufixo "(Maldição)": a loja e o importador de fichas passam a enxergá-las.
 * Só as que são número fixo ganham efeito automático (Temerária, Desleixado); o resto é descrição, porque depende do mestre.
 */
import { mk } from "./melhorias.mjs";

const P = (changes) => ({ changes: mk(changes), onuse: false, self: false, transfer: true });
const CARISMA = ["ades", "atua", "dipl", "enga", "inti", "joga"].map((p) => [`system.pericias.${p}.bonus`, -5]);

const ARMA = ["weapon"], ITEM = ["armor", "tools"];   // armaduras, escudos e acessórios (itens gerais)

export const MALDICOES = [
	// ----- armas -----
	{ id: "mal-acalentadora", label: "Acalentadora", cats: ARMA, tip: "Sempre que você acerta um inimigo que sofre uma condição negativa, você remove essa condição dele." },
	{ id: "mal-avarenta", label: "Avarenta", cats: ARMA, tip: "Reduza todo dano causado pela arma para o múltiplo de 10 mais próximo (15 vira 10; 29 vira 20)." },
	{ id: "mal-bailarina", label: "Bailarina", cats: ARMA, tip: "Para se mover em combate, passe em Atuação (CD 10 + seu nível) ou não se move. Deslocamento reduzido à metade." },
	{ id: "mal-carente", label: "Carente", cats: [...ARMA, ...ITEM], tip: "Se você largar o item após Purificação (+3 PM), ele reaparece em sua mão 1d4 rodadas depois. Lendas e Histórias revela como se livrar dele." },
	{ id: "mal-frustrante", label: "Frustrante", cats: ARMA, tip: "Ao errar um ataque você fica frustrado (se já estava, esmorecido). Só um acerto crítico anula cada condição." },
	{ id: "mal-hesitante", label: "Hesitante", cats: ARMA, tip: "Em um acerto crítico, role o ataque de novo para confirmar. Se errar, vira um acerto normal." },
	{ id: "mal-indecisa", label: "Indecisa", cats: ARMA, tip: "Com mais de um inimigo em combate, você escolhe aleatoriamente quem atacar na rodada, mesmo que precise se deslocar até ele." },
	{ id: "mal-isenta", label: "Isenta", cats: ARMA, tip: "Sempre que você causa uma condição negativa a um inimigo, sofre essa mesma condição." },
	{ id: "mal-mendicante", label: "Mendicante", cats: ARMA, tip: "Gaste 1 tibar a cada ataque com a arma; habilidades com ela custam 1 TO por ataque." },
	{ id: "mal-preguicosa", label: "Preguiçosa", cats: ARMA, tip: "Só pode atacar com a arma em rodadas alternadas e nenhum outro ataque nas rodadas em que não ataca com ela." },
	{ id: "mal-pro-criatura", label: "Pró-Criatura", cats: ARMA, tip: "Ao causar dano a um inimigo de um tipo de criatura determinado, a arma cura a mesma quantidade de PV em vez de causar dano." },
	{ id: "mal-pueril-idosa", label: "Pueril/Idosa", cats: ARMA, tip: "A cada combate você rejuvenesce ou envelhece um ano (definido aleatoriamente ao achar a arma). Veja Tormenta20, p. 108." },
	{ id: "mal-temeraria", label: "Temerária", cats: ARMA, tip: "Você sofre –2 na Defesa.", fx: P([["system.attributes.defesa.bonus", -2]]) },
	{ id: "mal-tragica", label: "Trágica", cats: ARMA, tip: "Em falha crítica, role duas vezes na tabela e o mestre escolhe o pior resultado (sem a regra, role uma vez)." },
	{ id: "mal-vaidosa", label: "Vaidosa", cats: ARMA, tip: "Gaste 1 hora no início de cada dia bajulando a arma, ou não pode atacar com ela nem de nenhuma outra forma." },
	// ----- armaduras, escudos e acessórios -----
	{ id: "mal-amargo", label: "Amargo", cats: ITEM, tip: "Passe em Vontade (CD 20) para usar qualquer item ingerido e, a cada dia, para se alimentar o suficiente." },
	{ id: "mal-antipatico", label: "Antipático", cats: ITEM, tip: "Todos os NPCs que você encontra pela primeira vez têm atitude uma categoria pior em relação a você." },
	{ id: "mal-cetico", label: "Cético", cats: ITEM, tip: "Ao lançar magia, teste Misticismo (arcana) ou Religião (divina) contra a CD dela; se falhar, a magia não funciona mas gasta os PM." },
	{ id: "mal-conspurcador", label: "Conspurcador", cats: ITEM, tip: "Qualquer consumível imbuído de magia divina que você tocar perde suas propriedades, permanentemente." },
	{ id: "mal-desastrado", label: "Desastrado", cats: ITEM, tip: "Sempre que se mover em combate, teste Acrobacia (CD 10 + seu nível); se falhar, fica caído." },
	{ id: "mal-desengoncado", label: "Desengonçado", cats: ITEM, tip: "O item ocupa +2 espaços que o normal." },
	{ id: "mal-desleixado", label: "Desleixado", cats: ITEM, tip: "–5 em todas as perícias baseadas em Carisma; sua entrada pode ser barrada em ambientes refinados.", fx: P(CARISMA) },
	{ id: "mal-do-contra", label: "Do Contra", cats: ITEM, tip: "Quando um aliado lança uma magia em você, faça Vontade (CD da magia) sem poder falhar de propósito; se passar, evita os efeitos." },
	{ id: "mal-esfomeado", label: "Esfomeado", cats: ITEM, tip: "Você precisa do dobro de comida por dia e consumir duas unidades de um item ingerido para ele ter efeito." },
	{ id: "mal-exaustivo", label: "Exaustivo", cats: ITEM, tip: "O custo em PM de suas habilidades aumenta em +1." },
	{ id: "mal-fotofobico", label: "Fotofóbico", cats: ITEM, tip: "Em ambiente com iluminação normal você fica ofuscado e não recebe bônus para enxergar no escuro." },
	{ id: "mal-ignorante", label: "Ignorante", cats: ITEM, tip: "Antes de qualquer teste, passe em Inteligência (CD 10 + seu nível); se falhar, é falha automática." },
	{ id: "mal-maroto", label: "Maroto", cats: ITEM, tip: "Ao sacar um item, ele é decidido aleatoriamente. Só um aliado entregando o item evita o efeito." },
	{ id: "mal-modesto", label: "Modesto", cats: ITEM, tip: "Nos testes da perícia de maior modificador (exceto Luta e Pontaria), role dois dados e fique com o pior." },
	{ id: "mal-perdulario", label: "Perdulário", cats: ITEM, tip: "Você perde 10% do dinheiro que carrega por semana (sem dinheiro, perde um item aleatório por semana)." },
	{ id: "mal-surrupiado", label: "Surrupiado", cats: ITEM, tip: "O item parece pertencer a alguém importante; escondê-lo exige Ladinagem por cena." }
];

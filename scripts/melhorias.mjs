/**
 * Melhorias de itens superiores (Tormenta20)
 *  - acrescenta ao sistema as melhorias e materiais que ele não tem (Dragão Brasil, Heróis de Arton, Ameaças de Arton, Rubi Gigante, etc.);
 *  - dá efeito automático às melhorias que o sistema lista mas deixa como "manual" (Poderoso, Penetrante...);
 *  - corrige o sinalizador `upgrade` de efeitos do sistema que apontam para a melhoria errada.
 * Os efeitos usam as mesmas chaves do sistema (ataque, dano, passos, ignoraRD, cd, criticoM, custo,
 * system.attributes.defesa.*, system.tracos.resistencias.*...), então funcionam na aba "Melhorias" da ficha do item.
 */
const MOD = "classes-extras-t20";
const CAT_LABEL = { weapon: "arma", ammo: "munição", leve: "armadura leve", pesada: "armadura pesada", escudo: "escudo", esoteric: "esotérico", tools: "ferramenta/vestuário" };

/* ---------- construtores de efeito ---------- */
export const mk = (changes) => changes.map(([key, value, mode = 2]) => ({ key, value: String(value), mode, priority: 0 }));
/** Efeito "ao usar" (ataque/dano da arma ou da munição): fica no item e é marcado na hora do uso. */
const Ow = (changes, extra = {}) => ({ changes: mk(changes), onuse: true, self: true, transfer: false, ...extra });
/** Efeito "ao usar" de esotérico: vale para as magias lançadas pelo personagem. */
const Oe = (changes, extra = {}) => ({ changes: mk(changes), onuse: true, self: false, spell: true, transfer: true, ...extra });
/** Efeito passivo: vale enquanto o item estiver equipado. */
const P = (changes, extra = {}) => ({ changes: mk(changes), onuse: false, self: false, transfer: true, ...extra });

const DEF = "system.attributes.defesa.bonus", PDA = "system.attributes.defesa.pda";
const RD = (tipo) => `system.tracos.resistencias.${tipo}.bonus`;

/* ---------- melhorias novas / automatizadas ----------
 * cats: weapon, ammo, leve, pesada, escudo, esoteric, tools   ("armor" = leve+pesada+escudo, "all" = todas)
 * st: DONE = o efeito numérico principal é automático; MANUAL = só descrição (o jogador aplica à mão)          */
export const MELHORIAS = [
	// ----- armas -----
	{ id: "penetrating", label: "Penetrante", cats: ["weapon", "ammo"], st: "DONE", tip: "A arma ignora 5 pontos de redução de dano. Pré-requisito: Cruel.", fx: Ow([["ignoraRD", 5]]) },
	{ id: "guard", label: "Guarda", cats: ["weapon"], st: "DONE", tip: "+1 na Defesa (e em testes contra manobras, este à mão). Só em armas corpo a corpo. (DH)", fx: P([[DEF, 1]]) },
	{ id: "pressurized", label: "Pressurizada", cats: ["weapon"], st: "DONE", tip: "Ao descarregar a pressão: +2 no ataque e no dano (marque ao usar). Só em armas corpo a corpo de impacto e de fogo. (DH)", fx: Ow([["ataque", 2], ["dano", 2]]) },
	{ id: "barbed", label: "Farpada", cats: ["weapon"], st: "MANUAL", tip: "Criatura atingida por acerto crítico fica sangrando e sofre –5 em Constituição para remover a condição. Corte/perfuração. Pré-requisito: Cruel. (DH)" },
	{ id: "conduit", label: "Conduíte", cats: ["weapon"], st: "MANUAL", tip: "Reduz em –1 PM o custo de Abençoar Arma nesta arma. (DH)" },
	{ id: "scissor", label: "Tesoura", cats: ["weapon"], st: "MANUAL", tip: "Criatura atingida por acerto crítico fica sangrando. Pré-requisito: arma perfurante. (RT)" },
	{ id: "runicblade", label: "Lâmina Rúnica", cats: ["weapon"], st: "MANUAL", tip: "Em espadas: a arma conta também como item esotérico (cetro elemental ou varinha arcana). (DB)" },
	{ id: "luminous", label: "Luminosa", cats: ["weapon"], st: "MANUAL", tip: "Gaste 1 PM: a arma emite luz de tocha até o fim da cena; criaturas adjacentes ficam ofuscadas por 1 rodada. (DB)" },
	{ id: "chelicera", label: "Quelícera", cats: ["weapon"], st: "MANUAL", tip: "Só em espadas curtas. Venenos aplicados na arma têm CD +2. (DB)" },
	{ id: "stamped", label: "Estampada", cats: ["weapon", "escudo"], st: "MANUAL", tip: "Só em armas de duas mãos e escudos: +2 em Enganação para fintar. (DB)" },
	{ id: "doublebarrel", label: "Cano Duplo", cats: ["weapon"], st: "MANUAL", tip: "Arma de fogo com dois canos (duas balas carregadas); cada cano exige uma ação de recarga. (DB)" },
	{ id: "greased", label: "Engraxado", cats: ["weapon"], st: "DONE", tip: "+2 em Iniciativa (e –2 em testes para resistir a desarmar, à mão). Arma de fogo. (DB)", fx: P([["system.pericias.inic.bonus", 2]]) },
	{ id: "drum", label: "Tambor", cats: ["weapon"], st: "MANUAL", tip: "Armazena até três tiros. Pré-requisito: Cano Duplo. (DB)" },
	// ----- munições -----
	{ id: "needle", label: "Agulha", cats: ["ammo"], st: "DONE", tip: "Ignora 5 pontos de redução de dano. (DB)", fx: Ow([["ignoraRD", 5]]) },
	{ id: "whistling", label: "Assobiadora", cats: ["ammo"], st: "MANUAL", tip: "Simula o pio de uma ave para trocar mensagens simples a longa distância. (DB)" },
	{ id: "papercartridge", label: "Cartucho de Papel", cats: ["ammo"], st: "MANUAL", tip: "Balas: carregamento mais rápido (–1 passo), chance de falha +1 e –2 em resistência contra fogo. (DB)" },
	{ id: "swallowtail", label: "Cauda-de-Andorinha", cats: ["ammo"], st: "MANUAL", tip: "Se causar dano em criatura em alcance curto (ou médio com Olho do Falcão), ela fica sangrando. (DB)" },
	{ id: "crescent", label: "Crescente de Lena", cats: ["ammo"], st: "MANUAL", tip: "Permite derrubar alvos Pequenos ou voadores; alcance reduzido para curto. (DB)" },
	{ id: "phosphorus", label: "Fósforo", cats: ["ammo"], st: "DONE", tip: "Dano diminui em um passo; ao atingir, o alvo fica ofuscado por 1 rodada. (DH)", fx: Ow([["passos", -1, 0]]) },
	{ id: "incendiary", label: "Incendiária", cats: ["ammo"], st: "MANUAL", tip: "+1 ponto de dano de fogo; se acertar por 5 ou mais, o alvo fica em chamas. (DH)", fx: Ow([["dano", 1]]) },
	{ id: "expansive", label: "Munição Expansiva", cats: ["ammo"], st: "MANUAL", tip: "Até o alvo recuperar todos os PV: –5 em Medicina para ajudá-lo e curas mágicas pela metade. (DB)" },
	{ id: "dagger", label: "Punhal", cats: ["ammo"], st: "DONE", tip: "+2 em testes de ataque contra alvos vestindo armadura (marque ao usar). (DB)", fx: Ow([["ataque", 2]]) },
	{ id: "blunt", label: "Rombuda", cats: ["ammo"], st: "MANUAL", tip: "Causa dano não letal sem penalidade; alcance reduzido para curto. (DB)" },
	// ----- armaduras e escudos -----
	{ id: "runic", label: "Rúnica", cats: ["leve", "pesada", "escudo"], st: "MANUAL", tip: "Resistência à magia +2. Pré-requisito: outra melhoria qualquer. (RG)" },
	{ id: "ballistic", label: "Balístico", cats: ["escudo"], st: "MANUAL", tip: "Ao atacar com o escudo, gaste uma bala: +2d6 de dano (2 balas de espaço). Pré-requisito: Reforçado. (DH)" },
	{ id: "injector", label: "Injetora", cats: ["leve", "pesada"], st: "MANUAL", tip: "Ação de movimento para ingerir uma dose de preparado/poção guardada (1 dose). (DH)" },
	{ id: "prudent", label: "Prudente", cats: ["leve", "pesada"], st: "MANUAL", tip: "Com Falhas Críticas: uma vez por dia, role duas vezes na tabela e escolha. (DH)" },
	// ----- esotéricos -----
	{ id: "powerful", label: "Poderoso", cats: ["esoteric"], st: "DONE", tip: "A CD para resistir às suas magias aumenta em +1.", fx: Oe([["cd", 1]]) },
	{ id: "implacable", label: "Implacável", cats: ["esoteric"], st: "DONE", tip: "Aumenta o bônus na CD de suas magias para +2 (soma +1 a Poderoso). Pré-requisito: Poderoso. (DB)", fx: Oe([["cd", 1]]) },
	{ id: "sentinel", label: "Sentinela", cats: ["esoteric"], st: "DONE", tip: "+5 na Defesa, –2 PM. Cancelar ou ativar exige um ritual de 10 minutos. (RG)", fx: P([[DEF, 5], ["system.attributes.pm.bonus.total", "-2"]]) },
	{ id: "amplifier", label: "Ampliador", cats: ["esoteric"], st: "MANUAL", tip: "Magia com área em metros: +1 PM para aumentar a área em +3m. (RG)" },
	{ id: "storer", label: "Armazenador", cats: ["esoteric"], st: "MANUAL", tip: "Armazena até 5 PM, usados para pagar o custo de magias lançadas com o item. (RG)" },
	{ id: "extender", label: "Extensor", cats: ["esoteric"], st: "MANUAL", tip: "Magia de alcance curto ou médio: +2 PM para aumentar o alcance em uma categoria. (RG)" },
	{ id: "channeler", label: "Canalizador", cats: ["esoteric"], st: "MANUAL", tip: "O máximo de PM que você pode gastar em magias aumenta em +1." },
	{ id: "enhancer", label: "Potencializador", cats: ["esoteric"], st: "MANUAL", tip: "O máximo de PM que você pode gastar em magias aumenta em +2. Pré-requisito: Canalizador. (DH)" },
	// ----- ferramentas e vestuário -----
	{ id: "masterful", label: "Magistral", cats: ["tools"], st: "DONE", tip: "O bônus em perícia fornecido pelo item aumenta em +1. Pré-requisito: Aprimorado. (RG)", fx: "enhanced:1" },
	{ id: "masterpiece", label: "Obra-Prima", cats: ["tools"], st: "DONE", tip: "Aumenta o bônus de perícia fornecido para +3 (soma +1 a Magistral). Pré-requisito: Magistral. (DB)", fx: "enhanced:1" },
	{ id: "used", label: "Usado", cats: ["tools"], st: "MANUAL", tip: "Uma vez por dia, role novamente um 1 natural em teste de perícia com o item. Só adquirido de segunda mão. (DH)" },
	{ id: "heraldic", label: "Brasonado", cats: ["tools"], st: "MANUAL", tip: "No primeiro teste de Diplomacia para mudar atitude na cena, pode usar outra perícia em que o item dê bônus. Incompatível com Discreto. (DH)" },
	{ id: "multifunctional", label: "Multifuncional", cats: ["tools"], st: "MANUAL", tip: "Escolha outra perícia com o mesmo atributo-chave: o item passa a funcionar também para ela. (AA)" },
	// ----- gerais (todas as categorias) -----
	{ id: "dazzling", label: "Deslumbrante", cats: ["leve", "pesada", "escudo", "tools"], st: "MANUAL", tip: "+1 na CD de habilidades baseadas em Carisma. Armaduras e vestuários. Pré-requisito: Banhado a ouro ou Cravejado de gemas. (DH)" },
	{ id: "canonical", label: "Canônico", cats: ["all"], st: "MANUAL", tip: "Inscrições de uma divindade: se for devoto dela, +1 na CD de suas habilidades mágicas divinas. (DH)" },
	{ id: "devoted", label: "Devotado", cats: ["all"], st: "MANUAL", tip: "Escolha um poder concedido com custo em PM: o custo diminui em –1. Pré-requisito: Inscrito. (DH)" },
	{ id: "diligent", label: "Diligente", cats: ["leve", "pesada", "escudo", "tools"], st: "MANUAL", tip: "Reduz em –1 PM o custo de Prece de Combate. (DH)" },
	{ id: "inscribed", label: "Inscrito", cats: ["leve", "pesada", "escudo", "tools"], st: "MANUAL", tip: "Conta como símbolo sagrado da divindade, inclusive com o bônus de +1 em testes de resistência. (DH)" }
];

/* ---------- materiais especiais ----------
 * Para cada categoria: [status, efeito, texto]. Categorias: weapon, leve, pesada, escudo, esoteric, tools.     */
const M = (st, fx, tip) => ({ st, fx, tip });
const armorRD = (tipo, l, p) => ({ leve: M("DONE", P([[RD(tipo), l]]), `Redução de ${tipo} ${l}.`), escudo: M("DONE", P([[RD(tipo), l]]), `Redução de ${tipo} ${l}.`), pesada: M("DONE", P([[RD(tipo), p]]), `Redução de ${tipo} ${p}.`) });
export const MATERIAIS = [
	{ id: "ruby-steel", label: "Aço-Rubi", novo: false, por: {
		weapon: M("DONE", Ow([["ignoraRD", 10]]), "A arma ignora 10 pontos de redução de dano (e a imunidade a crítico de lefeu, à mão)."),
		esoteric: M("DONE", Oe([["ignoraRD", 10]]), "Magias que causam dano ignoram 10 pontos de redução de dano."),
		leve: M("MANUAL", null, "25% de chance de ignorar dano extra de críticos e ataques furtivos (1 em 1d4)."), escudo: M("MANUAL", null, "25% de chance de ignorar dano extra de críticos e ataques furtivos."), pesada: M("MANUAL", null, "50% de chance de ignorar dano extra de críticos e ataques furtivos.") } },
	{ id: "adamant", label: "Adamante", novo: false, por: {
		weapon: M("DONE", Ow([["passos", 1, 0]]), "Aumenta o dano da arma em um passo."),
		...armorRD("dano", 2, 5),
		esoteric: M("MANUAL", null, "Magia de dano: +1 PM para rolar novamente resultados 1 no dano.") } },
	{ id: "everlasting-ice", label: "Gelo Eterno", novo: false, por: {
		weapon: M("DONE", Ow([["dano", 2]]), "A arma causa +2 pontos de dano por frio (aplicado como +2 no dano)."),
		...armorRD("fogo", 5, 10),
		esoteric: M("MANUAL", null, "Magias de frio que causam dano: rolar novamente resultados 1.") } },
	{ id: "dark-wood", label: "Madeira Tollon", novo: false, por: {
		weapon: M("DONE", Ow([], { custo: "-1" }), "Conta como mágica para vencer redução de dano; habilidades ativadas ao atacar custam –1 PM."),
		escudo: M("MANUAL", null, "Resistência a magia +2."), esoteric: M("MANUAL", null, "Resistência a magia +2.") } },
	{ id: "red-matter", label: "Matéria Vermelha", novo: false, por: {
		weapon: M("DONE", Ow([["dano", "1d6"]]), "+1d6 de dano extra. Cada acerto custa 1 PV ao usuário (à mão; lefou e lefeu são imunes)."),
		leve: M("MANUAL", null, "10% de chance de falha em cada ataque."), escudo: M("MANUAL", null, "10% de chance de falha em cada ataque."), pesada: M("MANUAL", null, "25% de chance de falha em cada ataque."),
		esoteric: M("MANUAL", null, "Você e inimigos em alcance curto sofrem –2 em resistência contra efeitos mágicos.") } },
	{ id: "mithril", label: "Mitral", novo: false, por: {
		weapon: M("DONE", Ow([["criticoM", -1]]), "Margem de ameaça +1."),
		leve: M("DONE", P([[PDA, -2]]), "Penalidade de armadura –2."), escudo: M("DONE", P([[PDA, -2]]), "Penalidade de armadura –2."), pesada: M("DONE", P([[PDA, -2]]), "Penalidade de armadura –2 (e até 2 pontos de Destreza na Defesa, à mão)."),
		esoteric: M("MANUAL", null, "Ao lançar uma magia, pague +2 PM para aumentar a CD dela em +2.") } },
	{ id: "silver", label: "Prata", novo: false, por: {
		weapon: M("MANUAL", null, "+2 de dano em espíritos e mortos-vivos; conta como mágica contra incorpóreos."),
		esoteric: M("MANUAL", null, "Magias causam +2 de dano em espíritos e mortos-vivos.") } },
	{ id: "dragon-leather", label: "Couro de Dragão", novo: false, por: {
		leve: M("DONE", P([[DEF, 1]]), "Defesa +1 (RD 10 contra o sopro e resistência a magia +2, à mão)."), escudo: M("DONE", P([[DEF, 1]]), "Defesa +1 (RD 10 contra o sopro e resistência a magia +2, à mão)."), pesada: M("DONE", P([[DEF, 2]]), "Defesa +2 (RD 20 contra o sopro e resistência a magia +5, à mão)."),
		esoteric: M("MANUAL", null, "Magia do tipo do sopro: +1 PM para +1 por dado de dano.") } },
	{ id: "monster-hull", label: "Casco Monstruoso", novo: false, por: {
		leve: M("DONE", P([[PDA, -1]]), "Penalidade de armadura –1."), escudo: M("DONE", P([[PDA, -1]]), "Penalidade de armadura –1."), pesada: M("DONE", P([[PDA, -1]]), "Penalidade de armadura –1 (e 1 ponto de Destreza na Defesa, à mão)."),
		weapon: M("MANUAL", null, "Conta como arma primitiva para Armamento da Natureza."), esoteric: M("MANUAL", null, "Ao lançar magia: RD 5 contra o próximo dano.") } },
	{ id: "kaiju-plating", label: "Couraça de Kaiju", novo: false, por: {
		weapon: M("DONE", Ow([["passos", 1, 0]]), "Aumenta o dano em um passo (ignorar redução de dano por 2 PM, à mão)."),
		leve: M("MANUAL", null, "RD 10/mágico."), escudo: M("MANUAL", null, "RD 10/mágico."), pesada: M("MANUAL", null, "RD 20/mágico."),
		esoteric: M("MANUAL", null, "Magia de dano: 1 PM para ignorar efeitos que reduzem o dano.") } },
	{ id: "bulette-leather", label: "Couro de Bulette", novo: false, por: {
		leve: M("DONE", P([[RD("acido"), 5], ["system.attributes.movement.burrow.base", 3, 4]]), "Escavar 3m e redução de ácido 5."),
		pesada: M("DONE", P([[RD("acido"), 10], ["system.attributes.movement.burrow.base", 3, 4]]), "Escavar 3m e redução de ácido 10."),
		esoteric: M("MANUAL", null, "Magias de ácido causam +1 ponto de dano.") } },
	{ id: "sun-crystal", label: "Cristal de Sol", novo: false, por: {
		weapon: M("DONE", Ow([["dano", 2]]), "+2 pontos de dano por fogo (aplicado como +2 no dano). Só corte/perfuração."),
		leve: M("MANUAL", null, "Resistência contra frio: role dois dados e use o melhor."), pesada: M("MANUAL", null, "Resistência contra frio: role dois dados e use o melhor."), escudo: M("MANUAL", null, "Resistência contra frio: role dois dados e use o melhor."),
		esoteric: M("MANUAL", null, "Magia de fogo: 1 PM para deixar em chamas quem falhar na resistência.") } },
	{ id: "iron-coral", label: "Lanajuste", novo: false, por: {
		...armorRD("corte", 5, 10),
		weapon: M("MANUAL", null, "Ignora penalidades de combate submerso (cimitarra: críticos causam sangramento)."),
		esoteric: M("MANUAL", null, "Magia de corte: rolar novamente resultados 1 no dano.") } },
	{ id: "kraken-feather", label: "Pena de Kraken", novo: false, por: {
		weapon: M("MANUAL", null, "Acerto crítico: o dano aumenta dois passos (antes de multiplicar)."),
		leve: M("MANUAL", null, "Criatura que erra ataque corpo a corpo contra você sofre 5 de dano de corte."), escudo: M("MANUAL", null, "Criatura que erra ataque corpo a corpo contra você sofre 5 de dano de corte."), pesada: M("MANUAL", null, "Criatura que erra ataque corpo a corpo contra você sofre 10 de dano de corte."),
		esoteric: M("MANUAL", null, "Os bônus numéricos do efeito básico do item aumentam em +1.") } },
	{ id: "razza-chitin", label: "Quitina Razza", novo: false, por: {
		leve: M("DONE", P([[DEF, 1], ["system.pericias.perc.bonus", 2]]), "Percepção +2 e Defesa +1."), escudo: M("DONE", P([[DEF, 1], ["system.pericias.perc.bonus", 2]]), "Percepção +2 e Defesa +1."),
		pesada: M("DONE", P([[DEF, 2], ["system.pericias.perc.bonus", 5]]), "Percepção +5 e Defesa +2."),
		weapon: M("MANUAL", null, "Resultado máximo no dado de dano básico: role um dado adicional."), esoteric: M("MANUAL", null, "Resultado máximo no dado de dano básico da magia: role um dado adicional.") } },
	// ----- materiais que o sistema não tem -----
	{ id: "steel-wire", label: "Fio-de-Aço", novo: true, por: { weapon: M("MANUAL", null, "+2 em manobras e em Atletismo para escalar. Só armas leves. (DB)") } },
	{ id: "monster-horn", label: "Chifre de Monstro", novo: true, por: { weapon: M("DONE", Ow([["criticoX", 1]]), "Só espadas: multiplicador de crítico +1. (DB)") } },
	{ id: "goradium", label: "Gorádio", novo: true, por: { weapon: M("MANUAL", null, "A arma pode ser comida (ação de movimento): +2 PM temporários. Metade dos PV, vulnerável a fogo. Só armas leves. (DB)") } },
	{ id: "mortifice", label: "Mortífice", novo: true, por: {
		weapon: M("MANUAL", null, "Ceifadora (depende do tipo de criatura). (RG)"), leve: M("MANUAL", null, "Mortalha (depende do tipo de criatura). (RG)"), pesada: M("MANUAL", null, "Mortalha (depende do tipo de criatura). (RG)"), esoteric: M("MANUAL", null, "Necromágico (depende do tipo de criatura). (RG)") } },
	{ id: "necrotaurite", label: "Necrotaurite", novo: true, por: { weapon: M("MANUAL", null, "Um dado extra de dano de trevas do mesmo tipo da arma. (DB)"), esoteric: M("MANUAL", null, "+2 na CD de magias de necromancia. (DB)") } },
	{ id: "onyx-eyes", label: "Olhos de Ônix", novo: true, por: { weapon: M("MANUAL", null, "Ao acertar um crítico ou levar um inimigo a 0 PV, recupere 1 PM. (DB)"), esoteric: M("MANUAL", null, "Ao acertar um crítico ou levar um inimigo a 0 PV, recupere 1 PM. (DB)") } },
	{ id: "malboro-tentacle", label: "Tentáculo de Malboro", novo: true, por: { weapon: M("MANUAL", null, "Armas flexíveis (chicote, mangual, arco). Com Equilibrada, a CD do Ofício diminui em –5. (DB)") } },
	{ id: "tixonessica", label: "Tixonessica", novo: true, por: { tools: M("DONE", P([[DEF, 2]]), "Vestuário: Defesa +2, mas ocupa 2 espaços (e +2 em perícias de Carisma em Ghallystrix, à mão). (RT)") } },
	{ id: "hajalbar-glass", label: "Vidro Hajalbar", novo: true, por: { weapon: M("DONE", Ow([["dano", 2]]), "Só espadas de corte: conta como mágica e causa +2 de dano de essência (aplicado como +2 no dano). (DB)") } },
	{ id: "selentino-glass", label: "Vidro Selentino", novo: true, por: { weapon: M("MANUAL", null, "+5 em Enganação para fintar com armas corpo a corpo. (RT)"), escudo: M("MANUAL", null, "+1 na margem de ameaça contra quem atacou você corpo a corpo. (RT)"), esoteric: M("MANUAL", null, "+5 em Misticismo para detectar magia. (RT)") } },
	{ id: "vitarium", label: "Vitarium", novo: true, por: { esoteric: M("MANUAL", null, "Magias de cura de luz curam +1 PV por dado. (SA)") } },
	{ id: "arcanium", label: "Arcanium", novo: true, por: {
		weapon: M("DONE", Ow([["ataque", 2], ["dano", 2]]), "+2 em ataque e dano (a magia contida no item é à mão). (RG)"),
		leve: M("DONE", P([[DEF, 2]]), "Defesa +2 (a magia contida no item é à mão). (RG)"), pesada: M("DONE", P([[DEF, 2]]), "Defesa +2 (a magia contida no item é à mão). (RG)"), escudo: M("DONE", P([[DEF, 2]]), "Defesa +2 (a magia contida no item é à mão). (RG)"),
		esoteric: M("DONE", Oe([["cd", 1]]), "+1 na CD de suas magias (a magia contida no item é à mão). (RG)") } }
];


/* ---------- encantos (armas e munições) ----------
 * Os encantos de arma moram em CONFIG.T20.weaponEnchantments (o sistema só tem a lista e o texto, sem efeitos).
 *  - "sys": já existe no sistema: só ganha o efeito automático (e o texto corrigido, se faltar);
 *  - sem "sys": encanto novo (Deuses & Heróis de Arton, Dragão Brasil), que entra na lista do sistema.
 * st DONE = o bônus numérico fixo é automático; MANUAL = só descrição (as habilidades que gastam PM ficam à mão).   */
export const ENCANTOS = [
	// ----- do sistema: efeito automático -----
	{ id: "frost", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d6[frio]"]]) },
	{ id: "corrosive", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d6[acido]"]]) },
	{ id: "shock", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d6[eletricidade]"]]) },
	{ id: "flaming", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d6[fogo]"]]) },
	{ id: "sepulchral", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d8[trevas]"]]) },
	{ id: "merciful", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["dano", "1d8"]]) },
	{ id: "formidable", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["ataque", 2], ["dano", 2]]) },
	{ id: "magnificent", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["ataque", 4], ["dano", 4]]) },
	{ id: "energy", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["ataque", 4], ["ignoraRD", 20]]) },
	{ id: "defending", sys: true, cats: ["weapon"], st: "DONE", fx: P([[DEF, 2]]) },
	{ id: "lacerating", sys: true, cats: ["weapon", "ammo"], st: "DONE", fx: Ow([["danoCritico", 10]]) },
	// ----- novos: Deuses & Heróis de Arton -----
	{ id: "alvorada", label: "Alvorada", cats: ["weapon", "ammo"], st: "MANUAL", tip: "+1d8 de dano de luz contra mortos-vivos e criaturas com sensibilidade a luz. 2 PM: cega uma criatura em alcance curto por 1 rodada (1x por cena por criatura; Fort CD For ou Des evita). (DH)" },
	{ id: "anatema", label: "Anátema", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Criatura atingida sofre –2 na CD para resistir às habilidades mágicas dela por 1 rodada. (DH)" },
	{ id: "brumosa", label: "Brumosa", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Ao acertar um ataque com a arma, você recebe camuflagem leve por 1 rodada. (DH)" },
	{ id: "cantante", label: "Cantante", cats: ["weapon"], st: "DONE", tip: "+2 em Atuação enquanto empunha a arma. 1 PM: você e aliados em alcance curto recebem +1 em testes de ataque por 1 rodada (à mão). (DH)", fx: P([["system.pericias.atua.bonus", 2]]) },
	{ id: "ciclonica", label: "Ciclônica", cats: ["weapon"], st: "MANUAL", tip: "+2 em testes contra manobras. 1 PM: rajada de vento em cone de 9m que empurra criaturas 3m (Fort CD For ou Des evita). (DH)" },
	{ id: "crescente", label: "Crescente", cats: ["weapon"], st: "MANUAL", tip: "2 PM: a arma aumenta de tamanho até o fim do turno; dano +1 passo e alcance +1,5m. Só armas corpo a corpo. (DH)" },
	{ id: "cristalina", label: "Cristalina", cats: ["weapon", "ammo"], st: "DONE", tip: "+1d6 de dano de luz. 1 PM: a criatura atingida fica ofuscada por 1 rodada (à mão). (DH)", fx: Ow([["dano", "1d6[luz]"]]) },
	{ id: "cronal", label: "Cronal", cats: ["weapon", "ammo"], st: "MANUAL", tip: "3 PM ao atacar: role dois dados e use o melhor; o próximo ataque contra você até o seu turno usa o pior. Pré-requisito: Formidável. (DH)" },
	{ id: "cuidadora", label: "Cuidadora", cats: ["weapon"], st: "MANUAL", tip: "Ao errar um ataque, +2 na Defesa por 1 rodada. 2 PM ao sofrer dano: RD 10 contra esse dano. (DH)" },
	{ id: "espreitadora", label: "Espreitadora", cats: ["weapon", "ammo"], st: "MANUAL", tip: "2 PM ao atacar: o oponente fica desprevenido (1x por cena por criatura; Von CD For ou Des evita). (DH)" },
	{ id: "frenetica", label: "Frenética", cats: ["weapon"], st: "MANUAL", tip: "Ao acertar um inimigo, 1 PM: +1 em ataque e dano com a arma até o fim da cena, cumulativo até +5. (DH)" },
	{ id: "gargula", label: "Gárgula", cats: ["weapon"], st: "MANUAL", tip: "2 PM: convoca uma pequena gárgula, parceiro combatente iniciante, até o fim da cena. (DH)" },
	{ id: "horrenda", label: "Horrenda", cats: ["weapon", "ammo"], st: "DONE", tip: "+2 em Intimidação; o custo de suas habilidades de medo diminui em –1 PM (à mão). (DH)", fx: P([["system.pericias.inti.bonus", 2]]) },
	{ id: "infestada", label: "Infestada", cats: ["weapon"], st: "MANUAL", tip: "Ao acertar um inimigo, 2 PM: enxame que causa 2d6 de dano de veneno e deixa enjoado por 1d4 rodadas (Fort CD For ou Des evita a condição). (DH)" },
	{ id: "manafaga", label: "Manáfaga", cats: ["weapon"], st: "MANUAL", tip: "Ao acertar, o alvo faz Vontade (CD For ou Des); se falhar, você recebe 1 PM temporário e ele perde 1d4 PM. Pré-requisito: Formidável. (DH)" },
	{ id: "indignada", label: "Indignada", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Ao errar um ataque, +2 no próximo teste de ataque até o fim da cena (cumulativo com outros bônus de itens). (DH)" },
	{ id: "rebote", label: "Rebote", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Cada ataque errado dá uma carga (máx. 3). Ao acertar, gasta todas: +1d6 de dano por carga. (DH)" },
	{ id: "reflexiva", label: "Reflexiva", cats: ["weapon"], st: "MANUAL", tip: "Ao ser alvo de magia, gaste PM igual ao círculo para refleti-la ao conjurador (1x por rodada). Pré-requisito: Cristalina. (DH)" },
	{ id: "ressonante", label: "Ressonante", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Ao acertar, 2 PM: onda de choque em outra criatura em alcance curto; se o ataque acertá-la, sofre dano psíquico igual à metade do dano causado. (DH)" },
	{ id: "sepulcral", label: "Sepulcral", cats: ["weapon", "ammo"], st: "MANUAL", tip: "Ao gastar PM no efeito de Tumular e acertar, a criatura não recupera PV por 1d4 rodadas. Pré-requisito: Tumular. (DH)" },
	{ id: "sombria", label: "Sombria", cats: ["weapon"], st: "DONE", tip: "+2 em Furtividade enquanto empunha a arma; pode lançar Escuridão (se já pode, custo –1 PM, à mão). (DH)", fx: P([["system.pericias.furt.bonus", 2]]) },
	{ id: "vampirica", label: "Vampírica", cats: ["weapon", "ammo"], st: "MANUAL", tip: "1 PM ao atacar: +2d6 de dano de trevas e você recupera PV igual ao dano de trevas causado. (DH)" },
	// ----- novos: Dragão Brasil -----
	{ id: "lamina-bruxa", label: "Lâmina-Bruxa", cats: ["weapon"], st: "MANUAL", tip: "Só espadas. Ao conjurar magia de alcance toque, gaste +2 PM para somar o dano da espada ao efeito. (DB)" },
	{ id: "vela", label: "Vela", cats: ["weapon"], st: "MANUAL", tip: "Aprimoramento de Arma Mágica (truque): em vez do normal, a espada empunhada funciona como uma tocha até o fim da cena. (DB)" }
];

/** Preços adicionais dos materiais que o t20-hayd-itens não tem (tabela da wiki; "-" = não comprável). Ordem: arma, leve, pesada, escudo, esotérico. */
export const PRECOS_MATERIAIS = {
	"steel-wire": [300, 0, 0, 0, 0], "monster-horn": [1500, 0, 0, 0, 0], "goradium": [250, 0, 0, 0, 0],
	"mortifice": [9000, 9000, 9000, 0, 9000], "onyx-eyes": [1500, 0, 0, 0, 1500], "malboro-tentacle": [1000, 0, 0, 0, 0],
	"hajalbar-glass": [1500, 0, 0, 0, 0], "selentino-glass": [600, 0, 0, 600, 600], "vitarium": [0, 0, 0, 0, 4500]
};

/* ---------- registro ---------- */
const efeito = (id, label, tip, e) => ({
	name: label, description: tip, tint: "#FFFFFF", changes: e.changes,
	flags: { tormenta20: { onuse: !!e.onuse, durationScene: false, upgrade: id, self: !!e.self, ...(e.spell ? { spell: true } : {}), ...(e.custo ? { custo: e.custo } : {}) } },
	disabled: false, transfer: !!e.transfer
});

export function registrarMelhorias() {
	const T = CONFIG.T20;
	if (!T?.upgrades) { console.warn(`${MOD} | CONFIG.T20.upgrades não encontrado: melhorias extras não registradas.`); return; }
	const U = T.upgrades;
	const listas = (nome, id, label, tip) => { (T[nome] ??= {})[id] = label; (T[`${nome}Tooltips`] ??= {})[id] = tip; };
	const regs = {
		weapon: { reg: () => U.weapon, st: () => U.weapon.status, list: ["weaponUpgrades"] },
		ammo: { reg: () => U.ammo, st: () => U.ammo.status, list: ["weaponUpgrades"] },
		leve: { reg: () => U.armor.leve, st: () => U.armor.status, list: ["armorUpgrades"] },
		pesada: { reg: () => U.armor.pesada, st: () => U.armor.status, list: ["armorUpgrades"] },
		escudo: { reg: () => U.armor.escudo, st: () => U.armor.status, list: ["shieldUpgrades"] },
		esoteric: { reg: () => U.esoteric, st: () => U.esoteric.status, list: ["esotericUpgrades"] },
		tools: { reg: () => U.tools, st: () => U.tools.status, list: ["toolUpgrades"] }
	};
	const expandir = (cats) => [...new Set(cats.flatMap((c) => (c === "all" ? Object.keys(regs) : c === "armor" ? ["leve", "pesada", "escudo"] : [c])))];
	const enhanced = U.tools?.enhanced;

	let n = 0;
	for (const m of MELHORIAS) {
		for (const cat of expandir(m.cats)) {
			const r = regs[cat];
			// ficha do sistema já tem o texto/ícone: só acrescenta o que falta
			for (const l of r.list) listas(l, m.id, T[l]?.[m.id] ?? m.label, T[`${l}Tooltips`]?.[m.id] ?? m.tip);
			if (m.fx || m.st) {
				let e = m.fx;
				if (typeof e === "string" && e.startsWith("enhanced:")) {
					if (!enhanced) { r.st()[m.id] = "MANUAL"; continue; }
					const v = e.split(":")[1];
					const obj = foundry.utils.deepClone(enhanced);
					obj.name = m.label; obj.description = m.tip;
					obj.changes = obj.changes.map((c) => ({ ...c, value: v }));
					obj.flags = { ...obj.flags, tormenta20: { ...obj.flags.tormenta20, upgrade: m.id } };
					r.reg()[m.id] = obj;
				} else if (e) r.reg()[m.id] = efeito(m.id, m.label, m.tip, e);
				r.st()[m.id] = m.st;
			} else r.st()[m.id] = "MANUAL";
			n++;
		}
	}
	// encantos de arma (lista do sistema + novos + efeitos automáticos)
	const EL = (T.weaponEnchantments ??= {}), ET = (T.weaponEnchantmentsTooltips ??= {});
	// o sistema guarda o texto de alguns encantos sob outra chave (hunter, freezing, eletric, defender): copia para a chave certa
	for (const [k, velho] of Object.entries({ seeking: "hunter", frost: "freezing", shock: "eletric", defending: "defender" })) if (!ET[k] && ET[velho]) ET[k] = ET[velho];
	let ne = 0;
	for (const e of ENCANTOS) {
		const label = e.label ?? EL[e.id] ?? e.id, tip = e.tip ?? ET[e.id] ?? "";
		if (!(e.id in EL)) EL[e.id] = label;
		if (!ET[e.id]) ET[e.id] = tip;
		for (const cat of e.cats) {
			const r = regs[cat]; if (!r) continue;
			if (e.fx) r.reg()[e.id] = efeito(e.id, game.i18n.localize(label), game.i18n.localize(tip), e.fx);
			r.st()[e.id] = e.st;
			ne++;
		}
	}
	// materiais
	let nm = 0;
	const matLista = (T.specialMaterials ??= {});
	for (const mat of MATERIAIS) {
		if (!(mat.id in matLista)) matLista[mat.id] = mat.label;
		for (const [cat, d] of Object.entries(mat.por)) {
			const r = regs[cat]; if (!r) continue;
			if (d.fx) r.reg()[mat.id] = efeito(mat.id, `${mat.label} (${CAT_LABEL[cat]})`, d.tip, d.fx);
			r.st()[mat.id] = d.st;
			nm++;
		}
	}
	if (T.esotericUpgradesTooltips) T.esotericUpgradesTooltips.channeler = "O máximo de PM que você pode gastar em magias aumenta em +1.";   // o sistema aponta para o texto errado
	// o sistema marca vários efeitos com `upgrade` de outra melhoria (ex.: Cruel -> "atrocious"): isso quebra a troca/remoção
	const corrigir = (reg) => {
		for (const [k, v] of Object.entries(reg ?? {})) {
			if (k === "status" || !v?.flags?.tormenta20) continue;
			if (v.flags.tormenta20.upgrade !== k) v.flags.tormenta20.upgrade = k;
		}
	};
	[U.weapon, U.ammo, U.esoteric, U.tools, U.general, U.armor.general, U.armor.leve, U.armor.pesada, U.armor.escudo].forEach(corrigir);
	console.log(`${MOD} | Melhorias: ${n} entradas, ${nm} efeitos de material, ${ne} encantos registrados.`);
}

/** Cria na ficha os efeitos das melhorias/material de um item (o que a aba "Melhorias" faz ao escolher na lista). */
export async function criarEfeitosMelhorias(item) {
	const U = CONFIG.T20?.upgrades; if (!U || !item?.system?.upgrades) return 0;
	const sys = item.system;
	let reg;
	if (item.type === "arma") reg = { ...U.general, ...U.weapon };
	else if (sys.tipo === "ammo") reg = { ...U.general, ...U.ammo };
	else if (sys.tipo === "esoterico") reg = { ...U.general, ...U.esoteric };
	else if (["traje", "ferramenta"].includes(sys.tipo)) reg = { ...U.general, ...U.tools };
	else if (["leve", "pesada", "escudo"].includes(sys.tipo)) reg = { ...U.general, ...U.armor.general, ...U.armor[sys.tipo] };
	else return 0;
	let n = 0;
	for (const [campo, chave] of Object.entries(sys.upgrades)) {
		if (!chave || !/^(melhoria\d|material|encanto\d)$/.test(campo)) continue;
		const base = reg[chave]; if (!base || !base.flags?.tormenta20) continue;
		if (item.effects?.some((e) => e.flags?.tormenta20?.upgrade === chave)) continue;
		const efeito = {
			...foundry.utils.deepClone(base), name: game.i18n.localize(base.name), description: game.i18n.localize(base.description ?? ""), icon: item.img, origin: item.uuid,
			flags: { ...base.flags, tormenta20: { ...base.flags.tormenta20, items: (base.flags.tormenta20.items || "").split(";").map((i) => i.trim()).filter(Boolean).map((i) => game.i18n.localize(i)).join(";") } }
		};
		if (efeito.transfer && item.actor) await item.actor.createEmbeddedDocuments("ActiveEffect", [efeito], { render: false });
		await item.createEmbeddedDocuments("ActiveEffect", [efeito], { render: false });
		n++;
	}
	return n;
}

/** Descobre a chave de melhoria/material pelo nome (usado pelo importador de fichas). */
export function chavePorNome(item, palavra) {
	const T = CONFIG.T20; if (!T) return null;
	const sys = item.system ?? {};
	const lista = item.type === "arma" || sys.tipo === "ammo" ? T.weaponUpgrades
		: sys.tipo === "esoterico" ? T.esotericUpgrades
		: ["traje", "ferramenta"].includes(sys.tipo) ? T.toolUpgrades
		: sys.tipo === "escudo" ? T.shieldUpgrades : T.armorUpgrades;
	const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
	const alvo = norm(palavra);
	const raiz = (s) => s.replace(/(a|o|as|os)$/, "");
	for (const [k, v] of Object.entries(lista ?? {})) {
		const lab = norm(game.i18n.localize(v));
		if (lab === alvo || raiz(lab) === raiz(alvo)) return { campo: "melhoria", chave: k };
	}
	const encs = item.type === "arma" || sys.tipo === "ammo" ? T.weaponEnchantments
		: sys.tipo === "escudo" ? T.shieldEnchantments : ["leve", "pesada"].includes(sys.tipo) ? T.armorEnchantments : null;
	for (const [k, v] of Object.entries(encs ?? {})) {
		const lab = norm(game.i18n.localize(v));
		if (lab === alvo || raiz(lab) === raiz(alvo)) return { campo: "encanto", chave: k };
	}
	for (const [k, v] of Object.entries(T.specialMaterials ?? {})) if (norm(game.i18n.localize(v)) === alvo) return { campo: "material", chave: k };
	return null;
}

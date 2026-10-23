/** Condições extras ("Novas Condições (DB)" da wiki Tormenta Collab), no mesmo formato das condições do sistema. */
export const CONDICOES_EXTRAS = [
 {
  "name": "Abençoado",
  "id": "abencoado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "abencoado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/abencoado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/abencoado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Imune a efeitos de metabolismo, metamorfose, trevas e veneno. Se ficar decaído, perde as duas condições. (Sem efeito numérico: aplicar na mesa.)"
 },
 {
  "name": "Absorvendo",
  "id": "absorvendo",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "absorvendo"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/absorvendo.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/absorvendo.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Recupera PV igual à metade de todo dano que causa (limitado pelo nível). (Aplicar na mesa.)"
 },
 {
  "name": "Alentado",
  "id": "alentado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "alentado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/alentado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/alentado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental"
   }
  },
  "changes": [
   {
    "key": "system.modificadores.atributos.int",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.modificadores.atributos.sab",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.modificadores.atributos.car",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.pericias.ades.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.atua.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.conh.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.cura.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.dipl.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.enga.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.guer.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.inti.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.intu.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.inve.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.joga.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.mist.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.nobr.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.ofic.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.perc.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.reli.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.sobr.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.vont.condi",
    "mode": 4,
    "value": 5
   }
  ]
 },
 {
  "name": "Amordaçado",
  "id": "amordacado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "amordacado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/amordacado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/amordacado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Incapaz de falar (pode fazer sons); condição ruim para lançar magias. (Aplicar na mesa.)"
 },
 {
  "name": "Aquecido",
  "id": "aquecido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "aquecido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/aquecido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/aquecido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Resistência a frio 5, mas vulnerável a fogo. (Aplicar na mesa.)"
 },
 {
  "name": "Arrefecido",
  "id": "arrefecido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "arrefecido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/arrefecido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/arrefecido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "metabolismo"
   }
  },
  "changes": [
   {
    "key": "system.attributes.movement.walk.base",
    "mode": 2,
    "value": -1.5
   }
  ],
  "description": "Vulnerabilidade a frio e resistência a fogo +2; se ficar molhado ou arrefecido de novo, fica congelado. Não pode usar habilidades que exijam liberdade de movimentos."
 },
 {
  "name": "Audacioso",
  "id": "audacioso",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "audacioso"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/audacioso.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/audacioso.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental",
    "stack": "intrepido"
   }
  },
  "changes": [
   {
    "key": "system.pericias.*.condi",
    "mode": 4,
    "value": 2
   }
  ]
 },
 {
  "name": "Bêbado",
  "id": "bebado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "bebado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/bebado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/bebado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [
   {
    "key": "system.attributes.defesa.condi",
    "mode": 3,
    "value": -2
   },
   {
    "key": "system.pericias.luta.condi",
    "mode": 3,
    "value": -2
   },
   {
    "key": "system.pericias.pont.condi",
    "mode": 3,
    "value": -2
   },
   {
    "key": "system.pericias.refl.condi",
    "mode": 3,
    "value": -2
   }
  ],
  "description": "Deslocamento reduzido pela metade (aplicar na mesa)."
 },
 {
  "name": "Congelado",
  "id": "congelado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "congelado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/congelado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/congelado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "childEffect": [
     "paralisado"
    ]
   }
  },
  "changes": [],
  "description": "Vulnerabilidade a frio, resistência a fogo +2 e imunidade a arrefecido, cansaço, eletrizado, enfeitiçado, medo, sangrando e veneno."
 },
 {
  "name": "Contundido",
  "id": "contundido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "contundido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/contundido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/contundido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "fisico"
   }
  },
  "changes": [],
  "description": "Escolha Força ou Destreza: -2 em testes do atributo e das perícias baseadas nele. Só some com uma semana de tratamento ou cura mágica. (Aplique o -2 no atributo escolhido.)"
 },
 {
  "name": "Decaído",
  "id": "decaido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "decaido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/decaido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/decaido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Sofre dano de magias de cura de luz; dano de trevas recupera seus PV. Em mortos-vivos, o inverso. (Aplicar na mesa.)"
 },
 {
  "name": "Desnorteado",
  "id": "desnorteado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "desnorteado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/desnorteado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/desnorteado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental"
   }
  },
  "changes": [
   {
    "key": "system.pericias.*.condi",
    "mode": 3,
    "value": -2
   }
  ]
 },
 {
  "name": "Disposto",
  "id": "disposto",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "disposto"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/disposto.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/disposto.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental",
    "stack": "alentado"
   }
  },
  "changes": [
   {
    "key": "system.modificadores.atributos.int",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.modificadores.atributos.sab",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.modificadores.atributos.car",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.pericias.ades.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.atua.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.conh.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.cura.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.dipl.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.enga.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.guer.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.inti.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.intu.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.inve.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.joga.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.mist.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.nobr.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.ofic.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.perc.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.reli.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.sobr.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.vont.condi",
    "mode": 4,
    "value": 2
   }
  ]
 },
 {
  "name": "Eletrificado",
  "id": "eletrificado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "eletrificado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/eletrificado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/eletrificado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [
   {
    "key": "dano",
    "mode": 0,
    "value": "1d6[eletricidade]"
   }
  ],
  "description": "Pode gastar uma ação padrão para descarregar (tocar metal ou terra). Se ficar molhado ou eletrificado de novo, fica eletrizado."
 },
 {
  "name": "Eletrizado",
  "id": "eletrizado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "eletrizado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/eletrizado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/eletrizado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "childEffect": [
     "paralisado"
    ]
   }
  },
  "changes": [],
  "description": "Vulnerabilidade a eletricidade, resistência a ácido +2 e imunidade a cansaço, congelado, eletrificado, enfeitiçado, medo, sangrando e veneno. Dura até o fim da cena ou contato com objeto sem metal/óleo."
 },
 {
  "name": "Fedido",
  "id": "fedido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "fedido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/fedido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/fedido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [
   {
    "key": "system.modificadores.atributos.car",
    "mode": 2,
    "value": -5
   },
   {
    "key": "system.pericias.ades.condi",
    "mode": 3,
    "value": -5
   },
   {
    "key": "system.pericias.atua.condi",
    "mode": 3,
    "value": -5
   },
   {
    "key": "system.pericias.dipl.condi",
    "mode": 3,
    "value": -5
   },
   {
    "key": "system.pericias.enga.condi",
    "mode": 3,
    "value": -5
   },
   {
    "key": "system.pericias.inti.condi",
    "mode": 3,
    "value": -5
   },
   {
    "key": "system.pericias.joga.condi",
    "mode": 3,
    "value": -5
   }
  ]
 },
 {
  "name": "Fortalecido",
  "id": "fortalecido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "fortalecido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/fortalecido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/fortalecido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "fisico",
    "stack": "vigoroso"
   }
  },
  "changes": [
   {
    "key": "system.modificadores.atributos.for",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.modificadores.atributos.des",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.modificadores.atributos.con",
    "mode": 2,
    "value": 2
   },
   {
    "key": "system.pericias.acro.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.atle.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.cava.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.fort.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.furt.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.inic.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.luta.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.pilo.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.pont.condi",
    "mode": 4,
    "value": 2
   },
   {
    "key": "system.pericias.refl.condi",
    "mode": 4,
    "value": 2
   }
  ]
 },
 {
  "name": "Intrépido",
  "id": "intrepido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "intrepido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/intrepido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/intrepido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental"
   }
  },
  "changes": [
   {
    "key": "system.pericias.*.condi",
    "mode": 4,
    "value": 5
   }
  ],
  "description": "Imunidade a medo. (Aplicar na mesa.)"
 },
 {
  "name": "Leve",
  "id": "leve",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "leve"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/leve.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/leve.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "movimento"
   }
  },
  "changes": [
   {
    "key": "system.attributes.movement.walk.base",
    "mode": 2,
    "value": 3
   }
  ],
  "description": "Não aplica penalidade de armadura em Acrobacia e Furtividade. (Aplicar na mesa.)"
 },
 {
  "name": "Molhado",
  "id": "molhado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "molhado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/molhado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/molhado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Vulnerável a eletricidade e frio, resistência a fogo. Molhado + arrefecido = congelado; molhado + eletrificado = eletrizado; apaga Em Chamas."
 },
 {
  "name": "Poderoso",
  "id": "poderoso",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "poderoso"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/poderoso.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/poderoso.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "mental"
   }
  },
  "changes": [
   {
    "key": "system.modificadores.custoPM",
    "mode": 2,
    "value": -1
   }
  ]
 },
 {
  "name": "Prevenido",
  "id": "prevenido",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "prevenido"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/prevenido.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/prevenido.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [
   {
    "key": "system.attributes.defesa.condi",
    "mode": 4,
    "value": 2
   }
  ],
  "description": "+2 na Defesa durante a primeira rodada de combate."
 },
 {
  "name": "Relaxado",
  "id": "relaxado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "relaxado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/relaxado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/relaxado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "childEffect": [
     "fortalecido",
     "prevenido",
     "veloz"
    ]
   }
  },
  "changes": [],
  "description": "Dura uma rodada."
 },
 {
  "name": "Restaurando",
  "id": "restaurando",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "restaurando"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/restaurando.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/restaurando.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Cura acelerada igual aos PV por nível da classe com mais níveis. (Aplicar na mesa.)"
 },
 {
  "name": "Sonolento",
  "id": "sonolento",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "sonolento"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/sonolento.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/sonolento.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "-2 em testes contra efeitos mentais. (Aplicar na mesa.)"
 },
 {
  "name": "Sufocado",
  "id": "sufocado",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "sufocado"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/sufocado.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/sufocado.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true
   }
  },
  "changes": [],
  "description": "Não fala nem emite sons. Inconsciente após rodadas igual à Constituição; morre com o dobro. (Contar rodadas na mesa.)"
 },
 {
  "name": "Veloz",
  "id": "veloz",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "veloz"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/veloz.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/veloz.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "movimento"
   }
  },
  "changes": [
   {
    "key": "system.attributes.movement.walk.base",
    "mode": 1,
    "value": 2
   },
   {
    "key": "system.attributes.movement.fly.base",
    "mode": 1,
    "value": 2
   },
   {
    "key": "system.attributes.movement.swim.base",
    "mode": 1,
    "value": 2
   },
   {
    "key": "system.attributes.movement.climb.base",
    "mode": 1,
    "value": 2
   },
   {
    "key": "system.attributes.movement.burrow.base",
    "mode": 1,
    "value": 2
   }
  ],
  "description": "Imunidade a efeitos negativos de movimento. (Aplicar na mesa.)"
 },
 {
  "name": "Vigoroso",
  "id": "vigoroso",
  "duration": {
   "rounds": 999
  },
  "statuses": [
   "vigoroso"
  ],
  "icon": "modules/classes-extras-t20/icons/condicoes/vigoroso.svg",
  "img": "modules/classes-extras-t20/icons/condicoes/vigoroso.svg",
  "flags": {
   "tormenta20": {
    "condition": true,
    "durationScene": true,
    "extra": true,
    "category": "fisico"
   }
  },
  "changes": [
   {
    "key": "system.modificadores.atributos.for",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.modificadores.atributos.des",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.modificadores.atributos.con",
    "mode": 2,
    "value": 5
   },
   {
    "key": "system.pericias.acro.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.atle.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.cava.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.fort.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.furt.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.inic.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.luta.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.pilo.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.pont.condi",
    "mode": 4,
    "value": 5
   },
   {
    "key": "system.pericias.refl.condi",
    "mode": 4,
    "value": 5
   }
  ]
 }
];

# Classes e Extras (T20)

Módulo para Foundry v13 + sistema Tormenta20 com compêndios de classes extras.

## Compêndios
Na barra lateral, tudo fica na pasta **DBs Extras**. Dentro do compêndio **Classes Extras** há uma pasta por classe, com a subpasta **Habilidades de Classe** contendo a classe e seus poderes.
- **Sentinela** (Dragão Brasil #222, p. 60-61): classe, Caminho do Sentinela, Gladiomancia, Mago de Combate, Ataque Extra, Mestre Arcano-combatente e Magias (Sentinela).
- **Comandante** (Dragão Brasil #222, p. 57-60): classe, Autoconfiança, Coordenar, Direcionar, Palavras Afiadas, Replanejar, Gritar Ordens, Presença de Liderança, Líder Nato, e a pasta Direcionamentos com os 10 direcionamentos.

## O que é automático
- PV (4 por nível, ajuste para 12 no 1º nível), PM (5 por nível) e perícias da classe.
- Atributo de conjuração (Inteligência) e Inteligência somada ao total de PM.
- Gladiomancia: Defesa e Luta com Inteligência, dano corpo a corpo + Inteligência (limite = nível) e o bônus de Mago de Combate (círculo máximo), com duração de cena.
- Ataque Extra: gasta 2 PM ao usar.

## Comandante
- PV e PM como o Nobre, perícias da classe, Autoconfiança (Carisma na Defesa), Coordenar (rolagem dos d20 do patamar), cada direcionamento gasta 1 PM e alguns têm rolagem/efeito pronto, Palavras Afiadas e Gritar Ordens como o Nobre do sistema, Presença de Liderança (+2 Intimidação permanente e +2 em perícias de Carisma na cena).

## O que continua manual
- Exigências do Caminho do Sentinela (empunhar arma ou teste de Misticismo), armadura leve inicial.
- Mestre Arcano-combatente (custo de PM pela metade, Gladiomancia como ação livre).
- Escolha dos poderes de arcanista e das magias.
- Comandante: teste de Guerra (CD 15) dos direcionamentos, Líder Nato (Direcionar como ação livre sem PM), poderes de nobre e a magia Comando.

## v0.4.0: Condições automáticas (fundido do módulo condicoes-automaticas-t20)
- Botão **Aplicar Condição** nos cartões do chat (junto ao botão de dano, ou no cabeçalho de magias/poderes sem dano). Aplica a condição oficial do sistema como Active Effect, com duração em rodadas (número ou fórmula de dado), até o fim da cena ou manual, e dano automático por turno.
- Sugestões automáticas por magia/poder (ex.: Amedrontar, Sono, Raio Solar).
- **Desative o módulo `condicoes-automaticas-t20` antigo.** Efeitos criados por ele continuam existindo, mas a contagem automática de rodadas só vale para os criados por este módulo.

## v0.5.0: condições extras (wiki Tormenta Collab)
O sistema já tem as 38 condições oficiais, que batem com a wiki. Foram adicionadas as **28 "Novas Condições (DB)"**: Abençoado, Absorvendo, Alentado, Amordaçado, Aquecido, Arrefecido, Audacioso, Bêbado, Congelado, Contundido, Decaído, Desnorteado, Disposto, Eletrificado, Eletrizado, Fedido, Fortalecido, Intrépido, Leve, Molhado, Poderoso, Prevenido, Relaxado, Restaurando, Sonolento, Sufocado, Veloz, Vigoroso.
- Aparecem no HUD de status do token e na caixa "Aplicar Condição".
- Efeitos numéricos automáticos: bônus/penalidades em perícias, atributos, Defesa, deslocamento, custo de PM e dano por turno (Eletrificado). Condições encadeadas (Congelado/Eletrizado → Paralisado; Relaxado → Fortalecido + Prevenido + Veloz).
- Efeitos que o sistema não permite automatizar (imunidades, resistências, vulnerabilidades, cura acelerada etc.) ficam descritos no texto da condição; aplique na mesa.
- Não incluída: a versão "DB" de **Em Chamas** (que interage com Arrefecido/Molhado/Congelado); permanece a oficial do sistema.

## v0.6.0: melhorias de itens superiores
Na aba **Melhorias** da ficha de armas, armaduras, escudos, esotéricos, ferramentas e vestuário:
- **Melhorias novas** (Dragão Brasil, Heróis de Arton, Ameaças de Arton, Rubi Gigante, Tormenta RPG): Guarda, Pressurizada, Farpada, Conduíte, Tesoura, Lâmina Rúnica, Luminosa, Quelícera, Estampada, Engraxado, Cano Duplo, Tambor, Rúnica, Balístico, Injetora, Prudente, Implacável, Sentinela, Ampliador, Armazenador, Extensor, Potencializador, Magistral, Obra-Prima, Usado, Brasonado, Deslumbrante, Canônico, Devotado, Diligente, Inscrito, e as de munição (Agulha, Assobiadora, Cartucho de Papel, Cauda-de-Andorinha, Crescente de Lena, Fósforo, Incendiária, Munição Expansiva, Punhal, Rombuda).
- **Materiais novos**: Fio-de-Aço, Chifre de Monstro, Gorádio, Mortífice, Necrotaurite, Olhos de Ônix, Tentáculo de Malboro, Tixonessica, Vidro Hajalbar, Vidro Selentino, Vitarium, Arcanium.
- **Automático**: Poderoso, Implacável, Penetrante, Guarda, Pressurizada, Engraxado, Sentinela, Magistral, Obra-Prima, Agulha, Fósforo, Punhal e os efeitos numéricos de vários materiais (Aço-Rubi, Adamante, Gelo Eterno, Mitral, Couro de Dragão, Lanajuste, Quitina Razza, Arcanium etc.): ataque, dano, passos de dano, ignorar RD, margem/multiplicador de crítico, Defesa, penalidade de armadura, redução de dano por tipo, deslocamento de escavar, PM.
- **Marcadas como manuais** (o ícone do item mostra "não implementado"): efeitos condicionais ou de jogo que o sistema não consegue calcular (sangramento, limite de PM por magia, CD de Carisma, resistência a magia, rolar de novo etc.). A descrição aparece no tooltip.
- **Correção**: vários efeitos do sistema (ex.: Cruel) guardavam o nome de outra melhoria, o que quebrava a troca e a remoção; agora são corrigidos ao iniciar.
- Dano "por frio/fogo/essência" de materiais é somado como dano extra do tipo da arma (o motor do sistema só tipa dano com dados).
- Para o importador de fichas: o módulo expõe `game.modules.get("classes-extras-t20").api` (`criarEfeitosMelhorias`, `chavePorNome`).


## v0.8.0: maldições (Itens Amaldiçoados)

Conferi os textos da wiki (encantos de armas, armaduras e escudos, esotéricos, acessórios e maldições) contra o catálogo do T20 Hayd Itens: todos os encantos já existiam lá ou aqui. Faltavam só as **31 maldições**.

- Entram no catálogo do t20-hayd-itens (e, por isso, na loja e no importador) como encantos com o sufixo "(Maldição)", fonte "Itens Amaldiçoados": 15 de arma, 15 de armadura/escudo/acessório e Carente, que vale para os dois grupos.
- Efeito automático só onde é número fixo: Temerária (–2 Defesa) e Desleixado (–5 nas perícias de Carisma). As demais são só descrição, pois dependem do mestre.
- Não entram nas listas de encantos da ficha do sistema (que só aceita encantos de arma/armadura/escudo); aplique pela janela do hayd-itens ou pela loja. Exige o t20-hayd-itens ativo.

## v0.7.0: encantos de arma e ponte com o T20 Hayd Itens
- **Encantos de arma**: entram na lista do sistema 26 encantos novos (Deuses & Heróis de Arton e Dragão Brasil): Alvorada, Anátema, Brumosa, Cantante, Ciclônica, Crescente, Cristalina, Cronal, Cuidadora, Espreitadora, Frenética, Gárgula, Horrenda, Infestada, Manáfaga, Indignada, Rebote, Reflexiva, Ressonante, Sepulcral, Sombria, Vampírica, Lâmina-Bruxa e Vela.
- **Efeitos automáticos** (aba Melhorias da ficha do item): Congelante, Corrosiva, Elétrica, Flamejante (+1d6 do tipo), Tumular (+1d8 de trevas), Piedosa (+1d8), Formidável (+2), Magnífica (+4), Energética (+4 e ignora 20 de RD), Defensora (+2 Defesa), Dilacerante (+10 só em crítico), Cristalina (+1d6 de luz), Cantante (+2 Atuação), Horrenda (+2 Intimidação) e Sombria (+2 Furtividade). As habilidades que gastam PM ficam à mão.
- Corrigido o texto (dica) de Caçadora, Congelante, Elétrica e Defensora, que o sistema guarda sob outra chave.
- **Com o t20-hayd-itens ativo**: o que o classes-extras tem e o catálogo dele não tem (melhorias como Tesoura, Rúnica, Cano Duplo, Punhal; os encantos Lâmina-Bruxa e Vela; materiais como Mortífice, Vitarium, Vidro Selentino) é registrado no catálogo dele, como as homebrews. A T20 Hayd Loja e o importador de fichas leem esse catálogo, então passam a mostrar essas entradas. As chaves começam com `cx-`. Se você desativar este módulo, as entradas com `cx-` já aplicadas em itens ficam sem definição.
- Materiais com vestuário (Tixonessica) e Magistral/Obra-Prima (dependem do Aprimorado) não entram no catálogo do t20-hayd-itens.

## v0.9.0
- Novo compêndio **Classes Extras – Defeitos** (`complicacoes`): 19 complicações de idade de "O Peso da Idade" (Heróis de Arton, p. 291) + *Criado na Cidade* e *Paladar Infantil*, que faltavam nos compêndios. Itens do tipo poder/complicação, só com descrição (sem efeitos automáticos).

## v0.10.0
- **Cruzado** (Wiki Tormenta Collab): classe nova no compêndio "Classes Extras", com pasta de Habilidades de Classe (Devoto Fiel, Magias, Presente dos Deuses, Alma Guerreira, Poder de Clérigo, Fé Inabalável, Oração Marcial, Guerreiro Santificado). Automático: PV/PM por nível, perícias da classe, conjuração e PM com Sabedoria, custos de PM/ação. O resto (arma superior, melhorias/encantos, PV temporários, poderes escolhidos) é manual.
- **Defeitos** com efeito automático: Abatido, Catarata, Dedos Trêmulos, Definhamento, "Devagar, Jovem!", Juntas Duras, Melancólico, "No Meu Tempo...", Rabugento e Criado na Cidade (perícias, PV/PM por nível, deslocamento). Os demais dependem de rolagem ou escolha da mesa e ficam só em texto, com a nota do que é manual.

## v0.10.1
- O compêndio "classes" passou a ficar em `packs/classes-v2` (mesmo nome interno, mesmo ID de compêndio). O Foundry converte a pasta antiga na primeira abertura e deixava o Cruzado de fora ao atualizar por cima; a pasta nova é lida do zero. Se ao atualizar sobrar a pasta `packs/classes` antiga dentro do módulo, pode apagar.

## v0.10.2
- O compêndio de defeitos passou a ficar em `packs/complicacoes-v2` (mesmo motivo da 0.10.1): quem instalou a 0.9.0 tinha a versão sem efeitos em cache. Pode apagar a pasta `packs/complicacoes` antiga se sobrar.

## v0.10.3
- Poderes básicos do Cruzado e do Sentinela agora trazem a classe e o nível em que são recebidos (flag interna), para o importador de fichas adicioná-los sozinho.

## v0.10.4
- Habilidades fixas do Comandante também marcadas com classe e nível (Autoconfiança, Coordenar e Direcionar no 1º; Palavras Afiadas no 2º; Replanejar no 3º; Gritar Ordens no 4º; Presença de Liderança no 5º; Líder Nato no 20º), para o importador adicioná-las. Os direcionamentos continuam sendo escolhidos na ficha.

## v0.11.0
- **Miragem** (Dragão Brasil #211, versão atual, variante do Caçador): classe com 3 PM por nível e as habilidades Dança da Areia, Rastreador, Explorador, Caminho do Explorador, Cortina de Poeira, Passo do Deserto e Mestre do Deserto, mais os novos poderes de caçador (Arsenal do Deserto, Escaramuça Distante, Passo Duplo, Passos Precisos, Tesouros da Natureza).
- Automático: PV/PM por nível, perícias, custos de PM, bônus de dano da Dança da Areia (o dado cresce a cada 4 níveis) e RD 20 do Mestre do Deserto (ligados só ao usar o poder). O resto é descrição.

## v0.11.1
- Defeitos: adicionados Assombrado, Cria de Nimb (Carisma –5 automático) e Maneta.

## v0.11.2
- Defeitos: adicionado Emotivo.

## v0.11.3
- Dança da Areia: corrigida a fórmula do dado (o nível da classe era lido como 0).

## v0.11.4
- Inscrito e Diligente (Deuses de Arton p.54) agora também valem para ferramentas e vestuários, como no livro (o catálogo do Hayd só liberava armadura e escudo).

## v0.11.5
- Inscrito e Diligente também valem para acessórios (contam como vestuário).

## v0.12.0
- Porte da v14: texto `@STATUS[id]` (ex.: `@STATUS[abalado]` ou `@STATUS[abalado]{texto}`) em descrições, diários e chat. Mostra o ícone da condição e um botão "+" que a aplica aos tokens selecionados. Só é registrado na v13 (na v14 o sistema já traz o nativo).
- v14: conversão de efeitos de uso/fim de cena dos compêndios e condições extras sem duplicar as nativas (v0.11.7).

## v0.13.0
- Nova classe variante **Capanga** (variante do Ladino) — Dragão Brasil #223, p. 63-65, com todas as habilidades de classe em pasta própria.
- **Cruzado** conferido com a Dragão Brasil #223 (p. 65-67); fonte atualizada.

## v0.13.1
- Capanga: textos de Evasão, Poder de Ladino, Olho nas Costas e Evasão Aprimorada copiados do ladino do Livro Básico; PV (12 + 3/nível), PM (4/nível) e proficiências (nenhuma) conforme o ladino.
- Capanga: **Ataque Furtivo Brutal** automatizado como o Ataque Furtivo do ladino — efeito "ao usar" (ataque) que soma o dano extra, calculado pelo nível de Capanga (1d8 +1d8 a cada dois níveis).

## v0.13.2
- Capanga: mais automações, seguindo o padrão de poderes parecidos do sistema (efeitos desativados que você liga quando valem): **Rápido e Rasteiro** (pares +2/+4/+6 de Defesa/Iniciativa e de dano), **Cara Feia** (+5 em teste, como Convencido), **Flanquear Aprimorado** (+2 de ataque adicional, como Valentão) e **Debulhar Inimigos** (5 PM + dano do ataque furtivo sem condição).

## v0.13.3
- Complicações: **Tosse** (–5 em teste de Carisma) e **Paladar Infantil** (–2 em teste social de refeição) ganharam efeito desativado de uso, no modelo do poder Convencido do sistema.
- v14: ao aplicar uma condição do sistema pelo botão do chat, o efeito agora vem completo do compêndio de condições (ícone, status e mudanças), pelo mesmo caminho do sistema; antes saía só com nome e ícone.

## v0.13.5

- **Foundry v14 / T20 1.6**: as 28 condições extras (Abençoado, Prevenido, Vigoroso…) agora são registradas depois que o sistema monta a lista de status e usam o formato novo (`system.changes`, fim de cena), aparecendo no HUD dos tokens e aplicando corretamente. Testado em v14.369 / T20 1.6.6.

## v0.13.4
- Se o módulo Condições Automáticas (T20) estiver ativo, o botão de condição e o processamento de turno deste módulo ficam desligados (evita botão e avisos em duplicidade). As condições extras continuam sendo registradas e aparecem na janela do Condições Automáticas.

## v0.14.0: Ancestral Ubani (Dragão Brasil #233)
- **Místico** (DB #233, p. 22–32) no compêndio **Classes Extras**: classe completa (16 + 4 PV/nível, 4 PM/nível, Sabedoria), 10 habilidades de classe (marcadas com classe e nível para o importador de fichas), 33 poderes de místico, 13 Ditames e as 18 ordens dos 6 Guias Elementais.
  - **Automático**: conjuração e PM com Sabedoria (`Magias`), RD escalável por círculo para os 6 elementos (`Afinidade Elemental`), `+1d6[elemento]/PM` e bônus de ataque `+2×círculo` (`Combate Elemental`), Defesa + Sabedoria limitada pelo nível (`Sexto Sentido`), `+2 CD` e `+1d` de dano (`Afinidade Concentrada`), imunidades elementais (`Comunhão Suprema`), deslocamentos (`Andar pelas Paredes`, `Empuxo`, `Escavadeira`, `Propulsão`), sentidos (`Visão Noturna`), `Elemento Penetrante` (ignora RD), `Elemento Poderoso` (+CD/PM), `Flagelo Elemental` (`danoMultiplicavel` e `+1` multiplicador), `Supernova` (+1d12 fogo), `Perícia Mística` (`+1 + @patamar`), `Resistência Tenebrosa`, `Armadura Rochosa`, `Auréola Celeste`, `Oito Nuvens`, `Escudo Elemental`, `Hidratação`, `Tradição Oral` e todas as rolagens/CDs/efeitos das 18 ordens dos Guias Elementais.
- Novo compêndio **Classes Extras – Distinções** (`distincoes`, DB #233, p. 34–43) com `rolltags` automáticas (`@GemeoDoTrovao`, `@RetalhadorPanzajiri`, `@SenhorDasChamas`):
  - **Gêmeo do Trovão**: *Comunhão Elétrica (Marca)* (RD eletricidade `10 + 5×poderes`, vulnerabilidade a ácido, troca de atributo de CD) + *Dínamo Vivo*, *Atração e Repulsão*, *Escudo Cintilante*, *Salto Trovejante* e *Super Choque*.
  - **Retalhador Panzajiri**: *Instinto Assassino (Marca)* (+2 Furtividade e +2 dano corte corpo a corpo, escalando a cada 2 poderes) + *Talho Tenebroso* (`danoMultiplicavel` trevas 1d8/1d10/1d12), *Ardil da Lâmina*, *Cortar Almas*, *Mortalha Afiada* e *Passo Instantâneo* (+3m deslocamento, +2 Acrobacia).
  - **Senhor das Chamas**: *Abraço da Chama (Marca)* (RD fogo `10 + 5×poderes`, vulnerabilidade a frio, troca de atributo de CD) + *Labaredas* (encanto flamejante escalável, Bola de Fogo CD Con + passos, rajada de fogo), *Contos nas Cinzas* (–1 PM), *Em Chamas* (voo + aura), *Moldar Fogo* (–1 PM) e *Obliterar* (+1d/PM e ignorar RD/imunidade).
- Novo compêndio **Classes Extras – Itens e Magias** (`itens`, DB #233, p. 17, 21, 33):
  - **Zipana** (arma marcial leve, T$ 500, 1d4 corte, 19/x2): efeitos de uso e de cena para **Borir Zipana** (1 PM → 1d8 do elemento escolhido entre os 6 elementos).
  - **Controlar Ar** (magia divina 2, Transmutação): aprimoramento +2 PM e efeito *Ascender* (–2 em ataques).
  - **Qareen Ubaneri** (raça variante) + as 6 **Linhagens Kipane** automatizadas.
- Compatível com **Foundry v13 (T20 1.5)** e **Foundry v14 (T20 1.6)** via `compat-v14.mjs`.

## v0.14.1: Cavaleiro Cerúleo (Revista Tormenta20 #6 — Duelo de Dragões)
- Adicionada a distinção **Cavaleiro Cerúleo** (Revista Tormenta20 #6, p. 16–17) no compêndio **Classes Extras – Distinções** com `rolltags` (`@CavaleiroCeruleo` e `@CavaleiroCeruleo2`) e ícone próprio (`icons/cavaleiro-ceruleo.webp`):
  - **Voar é Viver (Marca)**: Admissão + Marca da Distinção com efeitos de cena para asas mágicas (Voo 12m ou +6m se a montaria já voa).
  - **Investida Cerúlea**: efeitos de uso (`1 PM`) para `+1d8` / `+1d10` / `+1d12` de dano conforme a quantidade de poderes da distinção.
  - **Acrobacia Aérea**: efeitos para ignorar penalidade de armadura em Acrobacia (`system.pericias.acro.pda = false`) e bônus escalável na Defesa de armadura pesada (`+@CavaleiroCeruleo`).
  - **Criar o Firmamento**: efeitos de uso `+2` em Acrobacia (montaria voadora) e `+2` ataque (conta como investida).
  - **Nuvem de Aço**: reação (`2 PM`), rolagem pronta de Acrobacia (`1d20 + @pericias.acro.value`) com efeito acumulável `–5` por uso repetido na rodada.
  - **Proteger Sempre**: efeito aplicável em aliados adjacentes (`+2` Defesa e Reflexos) + efeito de reação ao trocar de lugar com RD (`5 + 5 × @CavaleiroCeruleo2`) e resistências (`+2 + @CavaleiroCeruleo2`).



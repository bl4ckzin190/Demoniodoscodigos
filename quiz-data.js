const QUIZ_BANK = {
  azul: [
    { q: "O que é HTML?", a: "linguagem de marcação" },
    { q: "Tag para parágrafo?", a: "<p>" },
    { q: "Atributo para link", a: "href" }
  ],
  vermelho: [
    { q: "O que faz o CSS?", a: "estilizar" },
    { q: "Seletor de id em CSS começa com?", a: "#" },
    { q: "display para ocultar elemento", a: "none" }
  ],
  roxo: [
    { q: "O que é JS?", a: "linguagem de programação" },
    { q: "Metodo para adicionar evento", a: "addEventListener" },
    { q: "typeof 'abc' retorna", a: "string" }
  ]
};

// símbolos possíveis por cor (sorteados no acerto)
const SYMBOLS = {
  azul: ["#", "%", "&"],
  vermelho: ["@", "€", "$"],
  roxo: ["*", "+", "~"]
};

// Situações bônus — probabilidade de ocorrer quando responde certo (ex: 25%)
const BONUS = [
  {id: "upgradeSistema", chance: 0.25, reward: { color: "azul", symbol: "℅", note: "Upgrade: símbolo grátis" }},
  {id: "backup", chance: 0.12, reward: { color: "vermelho", symbol: "§", note: "Backup seguro: símbolo extra" }}
];

// Frases válidas (6 no total: 2 por cor). Todas em lower-case.
const VALID_PHRASES = [
  // 2 azuis
  "xoxo te aguarda",
  "codigo azul completo",
  // 2 vermelhos
  "entrada vermelha",
  "acesso desbloqueado",
  // 2 roxos
  "senha roxa mestre",
  "vitoria codificada"
];

const jsonPath = "data/roxo.json";
const cor = "roxo";

carregarQuestoes();

function carregarQuestoes() {
  if (localStorage.getItem(`respondido_${cor}`)) {
    document.body.innerHTML = "<h2>Você já respondeu esta questão roxa!</h2>";
    return;
  }

  fetch(jsonPath)
    .then(r => r.json())
    .then(questoes => {
      const q = questoes[Math.floor(Math.random() * questoes.length)];

      document.getElementById("pergunta").textContent = q.pergunta;

      const alternativasDiv = document.getElementById("alternativas");

      q.alternativas.forEach((txt, i) => {
        const btn = document.createElement("button");
        btn.textContent = txt;
        btn.classList.add("botao");
        btn.onclick = () => responder(i, q);
        alternativasDiv.appendChild(btn);
      });
    });
}

function responder(i, questao) {
  if (localStorage.getItem(`respondido_${cor}`)) return;

  const result = document.getElementById("resultado");

  if (i === questao.correta) {
    result.textContent = "Correto! Código obtido: " + questao.resposta_codigo;
    salvarCodigo(questao.resposta_codigo);
  } else {
    result.textContent = "Resposta incorreta.";
  }

  localStorage.setItem(`respondido_${cor}`, true);
  document.getElementById("prosseguir").style.display = "block";
}

function salvarCodigo(cod) {
  const lista = JSON.parse(localStorage.getItem("codigos") || "[]");
  lista.push(cod);
  localStorage.setItem("codigos", JSON.stringify(lista));
}

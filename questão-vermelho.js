const bancoVermelho = [
    {
        pergunta: "Qual desses NÃO é um tipo de dado?",
        opcoes: ["int", "string", "boolean", "letter"],
        correta: 3,
        recompensa: "C = &"
    }
];

const questao = bancoVermelho[Math.floor(Math.random() * bancoVermelho.length)];

document.getElementById("pergunta").innerText = questao.pergunta;

const opcoesDiv = document.getElementById("opcoes");

questao.opcoes.forEach((op, index) => {
    const btn = document.createElement("button");
    btn.innerText = op;

    btn.onclick = () => {
        marcarRespondido();

        if (index === questao.correta) {
            opcoesDiv.innerHTML = `
                <p>Resposta correta!</p>
                <p>${questao.recompensa}</p>
            `;
        } else {
            opcoesDiv.innerHTML = "<p>Resposta errada!</p>";
        }
    };

    opcoesDiv.appendChild(btn);
});

const bancoRoxo = [
    {
        pergunta: "Qual símbolo representa igualdade em programação?",
        opcoes: ["=", "==", "===", ":"],
        correta: 2,
        recompensa: "D = @"
    }
];

const questao = bancoRoxo[Math.floor(Math.random() * bancoRoxo.length)];

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


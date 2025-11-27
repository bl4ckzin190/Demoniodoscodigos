// Banco de questões objetivas
const bancoAzul = [
    {
        pergunta: "Qual é o resultado de 5 + 7?",
        opcoes: ["10", "11", "12", "14"],
        correta: 2
    },
    {
        pergunta: "Qual comando exibe texto no console?",
        opcoes: ["print()", "echo()", "console.log()", "display()"],
        correta: 2
    }
];

// Pegando uma questão aleatória
const questao = bancoAzul[Math.floor(Math.random() * bancoAzul.length)];

document.getElementById("pergunta").innerHTML = `<p>${questao.pergunta}</p>`;

// Criando botões das opções
const opcoesDiv = document.getElementById("opcoes");

questao.opcoes.forEach((texto, index) => {
    const botao = document.createElement("button");
    botao.textContent = texto;

    botao.onclick = () => {
        if (index === questao.correta) {
            opcoesDiv.innerHTML = `<p>Resposta correta!</p>`;
        } else {
            opcoesDiv.innerHTML = `<p>Resposta errada!</p>`;
        }
    };

    opcoesDiv.appendChild(botao);
});


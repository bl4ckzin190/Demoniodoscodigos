document.addEventListener("DOMContentLoaded", () => {

    const bancoAzul = [
        {
            pergunta: "Qual é o resultado de 5 + 7?",
            opcoes: ["10", "11", "12", "14"],
            correta: 2,
            recompensa: "A = #"
        },
        {
            pergunta: "Qual comando exibe texto no console?",
            opcoes: ["print()", "echo()", "console.log()", "display()"],
            correta: 2,
            recompensa: "B = %"
        }
    ];

    const questao = bancoAzul[Math.floor(Math.random() * bancoAzul.length)];

    document.getElementById("pergunta").innerText = questao.pergunta;

    const opcoesDiv = document.getElementById("opcoes");

    questao.opcoes.forEach((op, index) => {
        const btn = document.createElement("button");
        btn.textContent = op;

        btn.onclick = () => {
            marcarRespondido();

            if (index === questao.correta) {
                opcoesDiv.innerHTML = `
                    <p>Resposta correta!</p>
                    <p>${questao.recompensa}</p>
                `;
            } else {
                opcoesDiv.innerHTML = `<p>Resposta errada!</p>`;
            }
        };

        opcoesDiv.appendChild(btn);
    });
});


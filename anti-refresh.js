// Impede o usuário de refazer a mesma questão depois de atualizar a página
document.addEventListener("DOMContentLoaded", () => {

    const answered = localStorage.getItem(location.pathname);

    if (answered === "done") {
        document.querySelector(".container").innerHTML = `
            <h2>Você já respondeu esta questão</h2>
            <p>Volte para o jogo.</p>
        `;
    }
});

function marcarRespondido() {
    localStorage.setItem(location.pathname, "done");
}

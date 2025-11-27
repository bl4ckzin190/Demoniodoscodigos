const access = localStorage.getItem("access_final");
if (!access) {

}

let total = 20 * 60; // segundos
const timerEl = document.getElementById("timer");
const msgEl = document.getElementById("finalMsg");
const send = document.getElementById("sendBtn");

const CORRECT = "BACBA"; 

let timerInterval = setInterval(() => {
  total--;
  if (total < 0) {
    clearInterval(timerInterval);
    timerEl.innerText = "00:00";
    msgEl.innerText = "Tempo esgotado.";
    send.disabled = true;
    return;
  }
  const m = Math.floor(total/60).toString().padStart(2,"0");
  const s = (total%60).toString().padStart(2,"0");
  timerEl.innerText = `${m}:${s}`;
}, 1000);

send.addEventListener("click", ()=>{
  if (total <= 0) return;
  const answer = document.getElementById("finalResp").value.trim().toUpperCase();
  if (!answer) { msgEl.innerText = "Digite uma resposta."; return; }

  if (answer === CORRECT) {
    clearInterval(timerInterval);
    const elapsed = 20*60 - total; // segundos
    const nome = prompt("Parabéns. Digite seu nome para o ranking:");
    if (!nome) { msgEl.innerText = "Nome vazio. Resultado não registrado."; return; }

    const ranking = JSON.parse(localStorage.getItem("global_ranking") || "[]");
    ranking.push({ nome: nome, tempo: elapsed, data: new Date().toLocaleString() });
    localStorage.setItem("global_ranking", JSON.stringify(ranking));

    window.location.href = "ranking.html";
  } else {
    msgEl.innerText = "Resposta incorreta. Tente novamente (se o tempo permitir).";
  }
});

document.getElementById("btnOk").addEventListener("click", ()=>{
  const s = document.getElementById("senha").value.trim().toLowerCase();
  const msg = document.getElementById("msg");
  if (!s) { msg.innerText = "Digite uma frase."; return; }

  if (VALID_PHRASES.includes(s)) {
    // registra flag de acesso para o desafio (opcional)
    localStorage.setItem("access_final", "granted");
    window.location.href = "desafio-final.html";
  } else {
    msg.innerText = "Senha incorreta. Verifique a decodificação.";
  }
});

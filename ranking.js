document.addEventListener("DOMContentLoaded", ()=>{
  const data = JSON.parse(localStorage.getItem("global_ranking") || "[]");
  data.sort((a,b) => a.tempo - b.tempo);
  const tbody = document.getElementById("rankBody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="4">Nenhum registro ainda.</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map((r,i)=>`<tr>
    <td>${i+1}</td><td>${escapeHtml(r.nome)}</td><td>${r.tempo}</td><td>${r.data}</td>
  </tr>`).join("");
});

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

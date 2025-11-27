document.addEventListener("DOMContentLoaded", () => {
  const az = document.getElementById("az");
  const vr = document.getElementById("vr");
  const rp = document.getElementById("rp");
  const editor = document.getElementById("editor");
  const res = document.getElementById("resultado");
  const mapaInput = document.getElementById("mapaInput");

  function showMyCodes(){
    az.innerText = getCodes("azul").join(" ") || "(nenhum)";
    vr.innerText = getCodes("vermelho").join(" ") || "(nenhum)";
    rp.innerText = getCodes("roxo").join(" ") || "(nenhum)";
  }
  showMyCodes();

  document.getElementById("decBtn").addEventListener("click", () => {
    const mapaRaw = mapaInput.value.trim();
    const mapa = {};
    if (mapaRaw) {
      mapaRaw.split(",").forEach(pair=>{
        const [sym,letter] = pair.split(":").map(s => s && s.trim());
        if (sym && letter) mapa[sym] = letter;
      });
    } else {
      // default fallback example
      Object.assign(mapa, {"#":"A","%":"B","&":"C","@":"D","$":"E","*":"F","℅":"B","§":"G"});
    }

    const input = editor.value.trim();
    let out = "";
    for (let ch of input) {
      out += (mapa[ch] || ch);
    }
    res.innerText = out;
  });

  document.getElementById("clearBtn").addEventListener("click", ()=>{ editor.value=""; res.innerText=""; });
});

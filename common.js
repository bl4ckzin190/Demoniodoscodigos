document.addEventListener("DOMContentLoaded", () => {
  const file = document.getElementById("bgFile");
  const url = document.getElementById("bgUrl");
  const apply = document.getElementById("applyBg");

  if (file) {
    file.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => document.body.style.backgroundImage = `url('${reader.result}')`;
      reader.readAsDataURL(f);
    });
  }

  if (apply) {
    apply.addEventListener("click", () => {
      const u = url.value.trim();
      if (!u) return alert("Cole uma URL de imagem válida.");
      document.body.style.backgroundImage = `url('${u}')`;
      url.value = "";
    });
  }
});

// pequenas funções utilitárias
function saveCode(color, symbol) {
  const key = `codigo_${color}`;
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  if (!arr.includes(symbol)) {
    arr.push(symbol);
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

function getCodes(color) {
  return JSON.parse(localStorage.getItem(`codigo_${color}`) || "[]");
}

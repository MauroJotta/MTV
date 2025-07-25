// data.js

// Guardamos en window para evitar duplicación de const
window.misDatos = [
  { "categoria": "Noticias", "titulo": "TN", "url": "https://tvlibreonline.org/html/fl/?get=VG9kb05vdGljaWFz" },
  { "categoria": "Noticias", "titulo": "Telefe", "url": "https://tvlibreonline.org/html/fl/?get=VGVsZWZlSEQ=" },
  { "categoria": "Noticias", "titulo": "Canal 13", "url": "https://tvlibreonline.org/html/fl/?get=QXJ0ZWFySEQ" },
  ...
  { "categoria": "Streaming", "titulo": "Campeones TV", "url": "https://www.youtube.com/@CampeonesTV/live" }
];

// Función global para renderizar
function renderizarCanales() {
  const datos = window.misDatos || [];
  const container = document.getElementById("contenedor");
  if (!container) {
    console.error("No se encontró el contenedor");
    return;
  }

  container.innerHTML = "<h1 class='mb-4'>Canales</h1>";

  const categorias = [...new Set(datos.map(item => item.categoria))];

  categorias.forEach((cat, rowIndex) => {
    const titulo = document.createElement("h3");
    titulo.textContent = cat;
    titulo.className = "mt-4 mb-2";
    container.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "d-flex flex-row flex-wrap gap-3 mb-3";
    fila.setAttribute("data-row", rowIndex);
    container.appendChild(fila);

    const items = datos.filter(i => i.categoria === cat);

    items.forEach((item, colIndex) => {
      const card = document.createElement("a");
      card.className = "card focusable text-decoration-none";
      card.setAttribute("tabindex", "0");
      card.setAttribute("data-row", rowIndex);
      card.setAttribute("data-col", colIndex);
      card.setAttribute("href", item.url);
      card.setAttribute("data-url", item.url);
      card.style.cssText = `
        width: 180px; border: none; border-radius: 16px; overflow: hidden;
        background: linear-gradient(135deg, #111, #223355); color: white;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 12px 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.6);
        transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer;
      `;

      card.onmouseenter = () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.9)";
      };
      card.onmouseleave = () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.6)";
      };

      card.innerHTML = `
        <small style="opacity: 0.6; font-weight: 400;">${item.categoria}</small>
        <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; margin-top: 10px; margin-bottom: 10px;">
          ${item.titulo}
        </div>
        <div style="background-color: rgba(255,255,255,0.1); border-radius: 12px; width: fit-content; padding: 4px 12px; font-size: 0.75rem; opacity: 0.8; margin: 0 auto 4px auto;">
          Ver Canal
        </div>
      `;

      fila.appendChild(card);
    });
  });

  document.querySelectorAll('.focusable').forEach(el => {
    el.addEventListener('keydown', e => {
      const current = e.target;
      const row = parseInt(current.dataset.row);
      const col = parseInt(current.dataset.col);
      let next;

      if (e.key === "ArrowRight") {
        next = document.querySelector(`.focusable[data-row="${row}"][data-col="${col + 1}"]`);
      } else if (e.key === "ArrowLeft") {
        next = document.querySelector(`.focusable[data-row="${row}"][data-col="${col - 1}"]`);
      } else if (e.key === "ArrowDown") {
        next = document.querySelector(`.focusable[data-row="${row + 1}"][data-col="${col}"]`);
      } else if (e.key === "ArrowUp") {
        next = document.querySelector(`.focusable[data-row="${row - 1}"][data-col="${col}"]`);
      } else if (e.key === "Enter") {
        const url = current.dataset.url;
        if (url) window.location.href = url;
      }

      if (next) next.focus();
    });
  });

  setTimeout(() => {
    const first = document.querySelector('.focusable');
    if (first) first.focus();
  }, 100);
}

// Ejecutar automáticamente al cargar si no es Cordova
if (!window.cordova) {
  document.addEventListener("DOMContentLoaded", renderizarCanales);
}

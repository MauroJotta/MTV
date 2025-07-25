// data.js

// Lista de canales
const misDatos = [
  { "categoria": "Noticias", "titulo": "TN", "url": "https://tvlibreonline.org/html/fl/?get=VG9kb05vdGljaWFz" },
  { "categoria": "Noticias", "titulo": "Telefe", "url": "https://tvlibreonline.org/html/fl/?get=VGVsZWZlSEQ=" },
  { "categoria": "Noticias", "titulo": "Canal 13", "url": "https://tvlibreonline.org/html/fl/?get=QXJ0ZWFySEQ" },
  { "categoria": "Noticias", "titulo": "TV Publica", "url": "https://tvlibreonline.org/html/fl/?get=Q2FuYWw3" },
  { "categoria": "Noticias", "titulo": "La Nacion", "url": "https://tvlibreonline.org/html/fl/?get=TGFfTmFjaW9u" },
  { "categoria": "Noticias", "titulo": "Canal Rural", "url": "https://tvlibreonline.org/html/fl/?get=Q2FuYWxfUnVyYWw=" },
  { "categoria": "Deportes", "titulo": "TyC", "url": "https://tvlibreonline.org/html/fl/?get=VHlDU3BvcnQ" },
  { "categoria": "Deportes", "titulo": "TNT Sports", "url": "https://tvlibreonline.org/html/fl/?get=VE5UX1Nwb3J0c19IRA" },
  { "categoria": "Deportes", "titulo": "ESPN Premium", "url": "https://tvlibreonline.org/html/fl/?get=Rm94X1Nwb3J0c19QcmVtaXVuX0hE" },
  { "categoria": "Deportes", "titulo": "Fox Sports", "url": "https://tvlibreonline.org/html/fl/?get=Rm94U3BvcnRz" },
  { "categoria": "Streaming", "titulo": "Carajo", "url": "https://www.youtube.com/@CarajoStream/live" },
  { "categoria": "Entretenimiento", "titulo": "Comedy Central", "url": "https://tvlibreonline.org/html/fl/?get=Q29tZWR5Q2VudHJhbA" },
  { "categoria": "Noticias", "titulo": "Diputados TV", "url": "https://tvlibreonline.org/html/fl/?get=RGlwdXRhZG9zX1RW" },
  { "categoria": "Documentales", "titulo": "Encuentro", "url": "https://tvlibreonline.org/html/fl/?get=RW5jdWVudHJv" },
  { "categoria": "Deportes", "titulo": "DSports", "url": "https://streamtpglobal.com/global1.php?stream=dsports" },
  { "categoria": "Deportes", "titulo": "DeporTV", "url": "https://tvlibreonline.org/html/fl/?get=RGVwb3JUVkhE" },
  { "categoria": "Documentales", "titulo": "Discovery Channel", "url": "https://tvlibreonline.org/html/fl/?get=RGlzY292ZXJ5SEQ=" },
  { "categoria": "Documentales", "titulo": "Theater", "url": "https://tvlibreonline.org/html/fl/?get=VGhlYXRlcl9IRA==" },
  { "categoria": "Documentales", "titulo": "TLC", "url": "https://tvlibreonline.org/html/fl/?get=VExD" },
  { "categoria": "Deportes", "titulo": "NBA TV", "url": "https://tvlibreonline.org/html/fl/?get=TkJBX1RW" },
  { "categoria": "Documentales", "titulo": "Turbo", "url": "https://tvlibreonline.org/html/fl/?get=RGlzY292ZXJ5VHVyYm8=" },
  { "categoria": "Documentales", "titulo": "Home & Health", "url": "https://tvlibreonline.org/html/fl/?get=RGlzY292ZXJ5SG9tZUhlYWx0aEhE" },
  { "categoria": "Entretenimiento", "titulo": "Adult Swim", "url": "https://tvlibreonline.org/html/fl/?get=QWR1bHRfU3dpbQ==" },
  { "categoria": "Entretenimiento", "titulo": "Star Channel", "url": "https://tvlibreonline.org/html/fl/?get=Rk9YSEQ=" },
  { "categoria": "Entretenimiento", "titulo": "TCM", "url": "https://tvlibreonline.org/html/fl/?get=VENN" },
  { "categoria": "Streaming", "titulo": "Olga", "url": "https://www.youtube.com/@olgaenvivo_/live" },
  { "categoria": "Streaming", "titulo": "Neura", "url": "https://www.youtube.com/@NeuraMedia/live" },
  { "categoria": "Streaming", "titulo": "Campeones TV", "url": "https://www.youtube.com/@CampeonesTV/live" }
];

// Función principal exportada al scope global
function renderizarCanales() {
  const container = document.getElementById("contenedor");
  if (!container) {
    console.error("No se encontró el contenedor");
    return;
  }

  container.innerHTML = "<h1 class='mb-4'>Canales</h1>"; // Limpia contenido anterior

  const categorias = [...new Set(misDatos.map(item => item.categoria))];

  categorias.forEach((cat, rowIndex) => {
    const titulo = document.createElement("h3");
    titulo.textContent = cat;
    titulo.className = "mt-4 mb-2";
    container.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "d-flex flex-row flex-wrap gap-3 mb-3";
    fila.setAttribute("data-row", rowIndex);
    container.appendChild(fila);

    const items = misDatos.filter(i => i.categoria === cat);

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

  // Navegación por teclado
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

  // Primer foco automático
  setTimeout(() => {
    const first = document.querySelector('.focusable');
    if (first) first.focus();
  }, 100);
}

// Ejecutar al cargar si no es Cordova
if (!window.cordova) {
  document.addEventListener("DOMContentLoaded", renderizarCanales);
}

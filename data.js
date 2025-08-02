<script>
  window.misDatos = [ /* ... tu array tal como está ... */ ];

  window.renderizarCanales = function () {
    const datos = Array.isArray(window.misDatos) ? window.misDatos : [];
    const container = document.getElementById("contenedor");
    if (!container) return;

    // ✅ Limpiar contenedor para evitar duplicados
    container.innerHTML = "";

    const categorias = [...new Set(datos.map(d => d.categoria))];

    const navbarCategorias = document.getElementById("navbarCategorias");
    if (navbarCategorias) navbarCategorias.innerHTML = ""; // Limpiar navbar

    categorias.forEach((cat) => {
      const id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;

      // Botón en navbar
      if (navbarCategorias) {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `<a class="nav-link" href="#${id}">${cat}</a>`;
        navbarCategorias.appendChild(li);
      }
    });

    categorias.forEach((cat, rowIndex) => {
      const titulo = document.createElement("h3");
      titulo.textContent = cat;
      titulo.className = "mt-4 mb-2";
      titulo.setAttribute("id", `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`);
      container.appendChild(titulo);

      const fila = document.createElement("div");
      fila.className = "d-flex flex-row flex-wrap justify-content-evenly gap-3 mb-3";
      fila.setAttribute("data-row", rowIndex);
      container.appendChild(fila);

      const items = datos.filter(i => i.categoria === cat);

      items.forEach((item, colIndex) => {
        const card = document.createElement("a");
        card.className = "card col-5 col-sm-4 col-md-3 col-xxl-2 focusable text-decoration-none";
        card.setAttribute("tabindex", "0");
        card.setAttribute("data-row", rowIndex);
        card.setAttribute("data-col", colIndex);
        card.setAttribute("href", item.url);
        card.setAttribute("data-url", item.url);
        card.style.cssText = `
          border: none; border-radius: 16px; overflow: hidden;
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
          <small style="opacity: 0.6;">${item.categoria}</small>
          <div style="flex-grow:1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;margin:10px 0;">
            ${item.titulo}
          </div>
          <div style="background-color:rgba(255,255,255,0.1);border-radius:12px;width:fit-content;padding:4px 12px;font-size:0.75rem;opacity:0.8;margin:0 auto 4px;">
            Ver Canal
          </div>
        `;

        // ✅ Verificar si el canal responde antes de redirigir
        card.addEventListener("click", function (e) {
          e.preventDefault();
          const url = card.getAttribute("href");

          const testIframe = document.createElement("iframe");
          testIframe.style.display = "none";
          testIframe.src = url;
          document.body.appendChild(testIframe);

          let failed = false;
          const timeout = setTimeout(() => {
            failed = true;
            testIframe.remove();
            alert("El canal no respondió. Redirigiendo al inicio...");
            window.location.href = "index.html"; // Ajustá si tenés otra home
          }, 5000); // 5 segundos de espera

          testIframe.onload = () => {
            if (!failed) {
              clearTimeout(timeout);
              window.location.href = url;
            }
          };

          testIframe.onerror = () => {
            if (!failed) {
              failed = true;
              clearTimeout(timeout);
              testIframe.remove();
              alert("El canal no se pudo cargar. Redirigiendo al inicio...");
              window.location.href = "index.html";
            }
          };
        });

        fila.appendChild(card);
      });
    });

    // Navegación con teclado
    document.querySelectorAll('.focusable').forEach(el => {
      el.addEventListener('keydown', e => {
        const current = e.target;
        const row = +current.dataset.row;
        const col = +current.dataset.col;
        let next;

        if (e.key === "ArrowRight") next = document.querySelector(`[data-row="${row}"][data-col="${col + 1}"]`);
        else if (e.key === "ArrowLeft") next = document.querySelector(`[data-row="${row}"][data-col="${col - 1}"]`);
        else if (e.key === "ArrowDown") next = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
        else if (e.key === "ArrowUp") next = document.querySelector(`[data-row="${row - 1}"][data-col="${col}"]`);
        else if (e.key === "Enter") {
          const url = current.dataset.url;
          if (url) window.location.href = url;
        }

        if (next) next.focus();
      });
    });

    // Focus inicial
    setTimeout(() => {
      const first = document.querySelector('.focusable');
      if (first) first.focus();
    }, 100);
  };

  if (!window.cordova) {
    document.addEventListener("DOMContentLoaded", () => {
      window.renderizarCanales();
    });
  }

  document.addEventListener('deviceready', function () {
    cordova.plugins.backgroundMode.enable();
  }, false);
</script>

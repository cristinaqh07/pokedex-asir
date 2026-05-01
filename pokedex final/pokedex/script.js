// 1. Referencias a elementos del DOM
const btnBuscar = document.getElementById('btnBuscar');
const btnDescargar = document.getElementById('btnDescargar');
const btnModo = document.getElementById('btnToggleModo');
const contenedor = document.getElementById('resultado');
const modal = document.getElementById('miModal');
const cerrarModal = document.getElementById('cerrarModal');

// 2. Eventos principales
btnBuscar.addEventListener('click', buscarPokemon);
btnDescargar.addEventListener('click', descargarCatalogo);
btnModo.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
cerrarModal.onclick = () => modal.style.display = "none";

// 3. Función de búsqueda
function buscarPokemon() {
    const nombre = document.getElementById('buscNombre').value;
    const tipo = document.getElementById('selTipo').value;
    const gen = document.getElementById('selGen').value;
    const leg = document.getElementById('selLeg').value;

    contenedor.innerHTML = '<p class="info">Cargando...</p>';
    btnBuscar.disabled = true;

    const url = `api/pokemon.php?nombre=${nombre}&tipo=${tipo}&generacion=${gen}&legendario=${leg}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Error en el servidor');
            return res.json();
        })
        .then(data => {
            contenedor.innerHTML = '';

            if (data.length === 0) {
                contenedor.innerHTML = '<p class="info">No se ha encontrado ningún Pokémon</p>';
                return;
            }

            data.forEach(p => {
                const card = document.createElement('div');
                
                // Aplicar clases para estilos dinámicos y legendarios
                card.className = `card type-${p.type1.toLowerCase()} ${p.is_legendary == 1 ? 'legendary' : ''}`;
                
                // MEJORA: Abrir modal al hacer clic en la tarjeta
                card.onclick = () => verDetalle(p.id);

                const estrella = p.is_legendary == 1 ? ' ⭐' : '';
                const etiquetaTipo = p.type2 ? 'Tipos:' : 'Tipo:';
                const textoTipos = p.type2 ? `${p.type1} / ${p.type2}` : p.type1;
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;

                card.innerHTML = `
                    <img src="${sprite}" alt="${p.name}">
                    <h3>#${p.id.toString().padStart(3, '0')} ${p.name}${estrella}</h3>
                    <p><strong>${etiquetaTipo}</strong> ${textoTipos}</p>
                    <p>Gen: ${p.generation}</p>
                    ${p.is_legendary == 1 ? '<span class="badge">LEGENDARIO</span>' : ''}
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(err => {
            contenedor.innerHTML = `<p class="error">Error: ${err.message}</p>`;
        })
        .finally(() => {
            btnBuscar.disabled = false;
        });
}

// 4. MEJORA OPCIONAL: Vista Detallada (PokeAPI)
function verDetalle(id) {
    const contenido = document.getElementById('detallePokemon');
    const modalContent = document.querySelector('.modal-content'); // Referencia al cuadro blanco
    modal.style.display = "block";
    contenido.innerHTML = "<p>Cargando datos de PokeAPI...</p>";

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            const tipoPrincipal = data.types[0].type.name; // Obtenemos el tipo (grass, fire, water...)
            
            // Limpiamos clases de tipo anteriores y añadimos la nueva
            modalContent.className = 'modal-content'; 
            modalContent.classList.add(`modal-type-${tipoPrincipal}`);

            contenido.innerHTML = `
                <img src="${data.sprites.other['official-artwork'].front_default}" width="180" class="img-detalle">
                <h2>${data.name.toUpperCase()}</h2>
                <div style="display:flex; justify-content:space-around; margin: 15px 0;">
                    <p><strong>Peso:</strong> ${data.weight/10} kg</p>
                    <p><strong>Altura:</strong> ${data.height/10} m</p>
                </div>
                <p><strong>Habilidad:</strong> <span class="habilidad-txt">${data.abilities[0].ability.name}</span></p>
            `;
        });
}

// 5. Funcionalidad de descarga
function descargarCatalogo() {
    fetch('api/pokemon.php')
        .then(res => res.json())
        .then(data => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pokedex_completa.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
        .catch(err => alert("Error al descargar el catálogo: " + err.message));
}

document.getElementById('formAlta').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevoPoke = {
        name: document.getElementById('addNombre').value,
        type1: document.getElementById('addTipo').value,
        generation: document.getElementById('addGen').value
    };

    fetch('api/insertar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPoke)
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            alert("¡Pokémon añadido con éxito!");
            buscarPokemon(); // Refrescar lista
        }
    });
});
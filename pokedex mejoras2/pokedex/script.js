const btnBuscar = document.getElementById('btnBuscar');
const btnDescargar = document.getElementById('btnDescargar');
const contenedor = document.getElementById('resultado');

btnBuscar.addEventListener('click', buscarPokemon);
btnDescargar.addEventListener('click', descargarCatalogo);

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
                contenedor.innerHTML = '<p class="info">No se ha encontrado ningún Pokémon con esos criterios</p>';
                return;
            }

            data.forEach(p => {
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
                const card = document.createElement('div');
                
                card.className = `card type-${p.type1.toLowerCase()} ${p.is_legendary == 1 ? 'legendary' : ''}`;
                
                const estrella = p.is_legendary == 1 ? ' ⭐' : '';

                const etiquetaTipo = p.type2 ? 'Tipos:' : 'Tipo:';
                const textoTipos = p.type2 ? `${p.type1} / ${p.type2}` : p.type1;

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
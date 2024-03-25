document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById('pokemonContainer');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const searchInput = document.getElementById('searchInput');

    // Cargar los datos de pokemones desde el archivo JSON
    fetch('pokemons.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(pokemon => {
                const card = document.createElement('div');
                card.classList.add('pokemon-card');
                card.innerHTML = `
                    <h3>${pokemon.name}</h3>
                    <p>Tipo: ${pokemon.type.join(', ')}</p>
                `;
                card.addEventListener('click', () => {
                    showModal(pokemon);
                });
                pokemonContainer.appendChild(card);
            });
        });

    // Función para mostrar el modal con detalles del Pokémon
    function showModal(pokemon) {
        modalContent.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>Peso: ${pokemon.weight}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
            <p>Debilidades: ${pokemon.weakness.join(', ')}</p>
            <img src="${pokemon.ThumbnailImage}" alt="${pokemon.ThumbnailAltText}">
        `;
        modal.style.display = 'block';
    }

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Función para buscar Pokémon por nombre
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        pokemonCards.forEach(card => {
            const pokemonName = card.querySelector('h3').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

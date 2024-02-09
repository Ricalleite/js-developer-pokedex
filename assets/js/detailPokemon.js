function loadPokemonDetail() {
  const params = new URLSearchParams(window.location.search);
  const pokemonNumber = params.get('number');

  if (!pokemonNumber) {
      console.error('Número do Pokémon não fornecido na URL.');
      return;
  }

  pokemonApi.getPokemonDetailById(pokemonNumber)
      .then(pokemon => renderPokemonDetails(pokemon))
      .catch(error => {
          console.error('Erro ao buscar detalhes do Pokémon:', error);
      });
}

function renderPokemonDetails(pokemon) {
  const detailElement = document.getElementById('pokemonDetail');
  detailElement.innerHTML = ''; 

  const cardTypeClass = pokemon.types[0] === 'normal' && pokemon.types.length > 1 ? pokemon.types[1] : pokemon.types[0];
  detailElement.classList.add('pokemon-detail', cardTypeClass);

  let typesHtml = pokemon.types.map(type => `<p class="type ${type}">${type}</p>`).join('');

  detailElement.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image">
    <h2>${pokemon.name} (#${pokemon.number})</h2>
    <p>ID: ${pokemon.number}</p>
    <p>Peso: ${pokemon.weight} kg</p>
    <p>Altura: ${pokemon.height} m</p>
    ${typesHtml}
  `;
}

document.addEventListener('DOMContentLoaded', loadPokemonDetail);

document.addEventListener('DOMContentLoaded', function() {
  const backButton = document.getElementById('backButton');
  
  backButton.addEventListener('click', function() {
      window.close();
  });
});
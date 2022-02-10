//pokemonRepository is a IIFE function wrapping the pokemonList information so that the list variables are not accessed globally
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //This function adds the pokemon to the pokemonList. You have to make it an object with assigned keys for it to work. 
  //It'll log a response to whether it worked or not in the console.
  function add(pokemon) { 
    if (
    typeof(pokemon) === 'object' &&
    'name' in pokemon &&
    'detailsUrl' in pokemon
    ) {
    pokemonList.push(pokemon);
    console.log(pokemon.name + ' was added to the Pokédex successfully!')
    } else {
      console.log('Entry was not valid, please try again.')
    }
  };

  //This function returns all of the pokemon objects.
  function getAll() {
    return pokemonList;
  };

//This function will log the name of the pokemon in the console. It's attached to another function down there.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
   });
  }

  //Creates list items that are buttons inside a list for every existing and newly added pokemon.
  function addListItem(pokemon){
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    let pokeSprite = document.createElement('div');
    pokeSprite.classList.add('pokemon-sprite');
    pokeSprite.style.backgroundImage = 'url(' + pokemon.imageUrl + ')';
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.appendChild(pokeSprite);
    //This button event listener will log back the pokemon's name you clicked on the console
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  async function loadDetails(item) {
    let url = item.detailsUrl;
    await fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item['imageUrl'] = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });

    return item
  }

  async function loadList() {
    const list = []        

    const { results } = await fetch(apiUrl)
      .then(res => res.json())
      .catch(console.error)

    for (const item of results) {
      const pokemon = await loadDetails({
        name: item.name,
        detailsUrl: item.url,
        imageUrl: null,
        height: null,
        types: null
      })

      add(pokemon);
    }

    return list
  }

  //This is VERY important, so that you can access functions you created in this IIFE everywhere in the code.
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
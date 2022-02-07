//pokemonRepository is a IIFE function wrapping the pokemonList information so that the list variables are not accessed globally
let pokemonRepository = (function () {

    let pokemonList = [{
    name: 'Bulbasaur',
    height: 0.7,
    weight: 6.9,
    type: ['grass', 'poison']
  },

  {
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    type: ['fire']
  },

  {
    name: 'Squirtle',
    height: 0.5,
    weight: 9.0,
    type: ['water']
  },

  { 
    name: 'Pikachu',
    height: 0.4,
    weight: 6.0,
    type: ['electric']
  },

  { 
    name: 'Ditto',
    height: 0.3,
    weight: 4.0,
    type: ['normal']
  }];

  //This function adds the pokemon to the pokemonList. You have to make it an object with assigned keys for it to work. 
  //It'll log a response to whether it worked or not in the console.
  function add(pokemon) { 
    if (
    typeof(pokemon) === 'object' &&
    'name' in pokemon &&
    'height' in pokemon &&
    'weight' in pokemon &&
    'type' in pokemon
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
    console.log(pokemon.name);
  }

  //Creates list items that are buttons inside a list for every existing and newly added pokemon.
  function addListItem(pokemon){
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    //This button event listener will log back the pokemon's name you clicked on the console
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };


//This is VERY important, so that you can access functions you created in this IIFE everywhere in the code.
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };


})();

pokemonRepository.add({name: 'Charmander', height: 0.6, weight: 8.5, type: ['fire']});  

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
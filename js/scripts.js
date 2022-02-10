//pokemonRepository is a IIFE function wrapping the pokemonList information so that the list variables are not accessed globally
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

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
      showModal(pokemon);
   });
  }

  //Creates list items that are buttons inside a list for every existing and newly added pokemon.
  function addListItem(pokemon){
    let list = document.querySelector('.list-group');
    let button = document.createElement('button');
    let pokeSprite = document.createElement('div');
    button.classList.add('list-group-item', 'list-group-item-action', 'search-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    list.appendChild(button);
    button.appendChild(pokeSprite);

    //This button event listener will log back the pokemon's name you clicked on the console
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  //Load the details of the pokemon that are nested inside another link (detailsUrl)
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          let typesDetails = details.types[i].type.name;
          item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
        }
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Fetches de api, does a forEach for every object (pokemon), 
  //estabilishes name and detailsUrl, and adds the pookemon to the list
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
    
  }

  //Creates the modal and it's interactivity
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h5>' + pokemon.name[0].toUpperCase() + pokemon.name.substring(1) + '</h5>');
    let imageElement = $('<img src=' + pokemon.imageUrl + '>');
    let heightElement = $('<p><b>Height: </b>' + pokemon.height + '</p>');
    let weightElement = $('<p><b>Weight: </b>' + pokemon.weight + '</p>');
    let typesElement = $('<p><b>Types: </b>' + pokemon.types.join(', ') + '</p>');

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
}
  
$(document).ready(function(){
  $('#pokemon-search').on('keyup', function() {
      let value = $(this).val().toLowerCase();
      $(".search-button").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });
});


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


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
    });
  });

let count = (function count() {
  
  let pokemonCounter = $('.list-group-item');
  let counter = $('.nav-link');
  counter.empty();

  let counterElement = $(pokemonCounter.length);

  counter.append(counterElement);

  console.log(pokemonCounter.length);
})();




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
      showModal(pokemon);
   });
  }

  //Creates list items that are buttons inside a list for every existing and newly added pokemon.
  function addListItem(pokemon){
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    let pokeSprite = document.createElement('div');
    pokeSprite.classList.add('pokemon-sprite');
    pokeSprite.style.backgroundImage = 
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        let typesDetails = details.types[i].type.name;
        item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
      }
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

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

  function showModal(pokemon) {
    let modalOverlay = document.querySelector('.modal__overlay');
    modalOverlay.innerHTML = '';

    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container');

    let modalHeader = document.createElement('header');
    modalHeader.classList.add('modal__header');

    let modalClose = document.createElement('button');
    modalClose.classList.add('modal__close');
    modalClose.addEventListener('click', hideModal);

    let pokemonSprite = document.createElement('img');
    pokemonSprite.classList.add('pokemon-sprite');
    pokemonSprite.src = pokemon.imageUrl;

    let modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal__title');
    modalTitle.innerText = pokemon.name;

    let modalContent = document.createElement('p');
    modalContent.classList.add('modal__content');
    modalContent.innerHTML = 
    '<b>Height: </b>' + pokemon.height + 
    '<br><b>Weight: </b>' + pokemon.weight +
    '<br><b>Types: </b>' + pokemon.types;

    modalOverlay.appendChild(modalContainer);
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalContent);
    modalHeader.appendChild(modalClose);
    modalHeader.appendChild(pokemonSprite);
    modalHeader.appendChild(modalTitle);

    modalOverlay.classList.add('is-open');

  function hideModal() {
    modalOverlay.classList.remove('is-open');
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      hideModal();
    }
  });

  modalOverlay.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalOverlay) {
      hideModal();
    }
  });

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
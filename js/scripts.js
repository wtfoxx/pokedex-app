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
}
]



pokemonList.forEach(function(pokemon) {
  if (pokemon.height >= 0.7) {
    document.write('<p>This is ' + pokemon.name + '! It is ' + pokemon.weight + ' meters tall, and weights ' + pokemon.height + 'kg. <b>Wow! That\'s big!</b></p>');
  } else {
    document.write('<p>This is ' + pokemon.name + '! It is ' + pokemon.weight + ' meters tall, and weights ' + pokemon.height + 'kg.');
  }
});
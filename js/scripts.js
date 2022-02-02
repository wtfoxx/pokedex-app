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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 0.7) {
    document.write('This is ' + pokemonList[i].name + '! It is ' + pokemonList[i].height + ' meters tall, and weights ' + pokemonList[i].height + 'kg. <b>Wow! That\'s big!</b> <br>')
  } else {
  document.write('This is ' + pokemonList[i].name + '! It is ' + pokemonList[i].height + ' meters tall, and weights ' + pokemonList[i].height + 'kg.<br>');
  }
}

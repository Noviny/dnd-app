exports.fetchCharacters = (callback) => {
  fetch('/api/characters/partymembers')
    .then(res => res.json())
    .then(response => {
      callback(null, response.characters);
    })
}

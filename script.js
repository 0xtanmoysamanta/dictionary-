function searchWord() {
  const word = document.getElementById("word").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
      displayError('An error occurred. Please try again.');
    });
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '';

  data.forEach(entry => {
    const wordElement = document.createElement('h2');
    wordElement.textContent = entry.word;
    resultsDiv.appendChild(wordElement);

    entry.meanings.forEach(meaning => {
      const partOfSpeechElement = document.createElement('h3');
      partOfSpeechElement.textContent = meaning.partOfSpeech;
      resultsDiv.appendChild(partOfSpeechElement);

      meaning.definitions.forEach(definition => {
        const definitionElement = document.createElement('p');
        definitionElement.innerHTML = `<strong>Definition:</strong> ${definition.definition}<br>`;
        if (definition.example) {
          definitionElement.innerHTML += `<strong>Example:</strong> ${definition.example}<br>`;
        }
        resultsDiv.appendChild(definitionElement);
      });
    });
  });
}

function displayError(message) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p>${message}</p>`;
                                                                      }

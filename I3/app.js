// http://www.omdbapi.com/?s=pulp&apikey=17e21a79

let suggestions = ["fefef", "wefwefwef", "weifjiejf"];

const input = document.querySelector("input");
const autocomplete = document.querySelector("#autocomplete");

input.onkeyup = (e) => {
  if (e.target.value.length > 2) {
    autocomplete.style.display = "block";

    fetch(`http://www.omdbapi.com/?s=${e.target.value}&apikey=17e21a79`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Search);
        if (typeof data.Search !== "undefined") {
          let serachRes = data.Search.slice(0, 10); //API returns 10 so not needed but in the case of unlimited returns this would limit the result to 10. Best would be to limit in API request to speed up serive.
          let matches = serachRes.map(
            (data) =>
              "<li onclick=getfilm('" +
              data.imdbID +
              "')>" +
              data.Title +
              "</li>"
          );

          autocomplete.innerHTML = matches.join("");
        } else {
          autocomplete.innerHTML =
            '<li class="no-res"><p>Inget resultat<p><li>';
        }
      });
  } else {
    autocomplete.style.display = "none";
  }
};

const getfilm = (id) => {
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=17e21a79`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#details").innerHTML = `
        <img src="${data.Poster}" />
        <h2>${data.Title}</h2>
        <p>${data.Year}</p>
        <br>
        <p>${data.Genre}</p>
        <br>
        <p>${data.Director}</p>
        <br>
        <p>${data.Actors}</p>
        <br>
        <p>${data.Plot}</p>
        <br>
        <a href="https://imdb.com/title/${data.imdbID}" target="_blank">IMDB Link</a>
        `;
    });
};

//make possible to use arrows to reach serach result

// ============ NAVBAR ===================

// Select button and links
const navBtn = document.getElementById('nav-toggle')
const links = document.getElementById('nav-links')

// Add event listener
navBtn.addEventListener('click',() => {
    links.classList.toggle('show-links');
})

// =========== END NAVBAR ===================

/* ======= SMOOTH SCROLL =========== */
/* Select links */
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
        // prevent default
        e.preventDefault();
        links.classList.remove('show-links');

        const id = e.target.getAttribute('href').slice(1)
        const element = document.getElementById(id);

        let position = element.offsetTop - 62
        
        window.scrollTo({
            left:0,
            // top: element.offsetTop,
            top: position,
            behavior: "smooth"
        })
    });
})
/* ======= END SMOOTH SCROLL =========== */

// ============ ABOUT ME PAGE ====================
let options = document.querySelectorAll('.tab-links');
for (let i=0; i < options.length; i++) {
  options[i].addEventListener('click', function(){

    let contents = document.querySelectorAll('.tab-contents');
    for (let i= 0; i < contents.length; i++) {
      options[i].classList.remove('active-link')
      if (contents[i].id == 'show'){
        contents[i].setAttribute('id', 'hide')
      }
      
    }

    let word = this.id
    
    console.log(options[i])
    document.querySelector('.' + word).setAttribute('id', 'show')
    this.classList.add('active-link')
    
  })
}
// ============ END OF ABOUT ME PAGE ====================


// ============= PROJECTS =========================
const linkss = [
    'https://simonsays814.netlify.app/', 
    'https://backpacksite.netlify.app/', 
    'https://teawebsitebaconator.netlify.app/',
    'https://github.com/jigolaurito93/Snake-Game-Python',
    'https://github.com/jigolaurito93/Turtle-Race-Game-EventListener-Python',
    'https://github.com/jigolaurito93/Coffee-Machine-OOP-Python'
    ]
    
    let projects = document.querySelectorAll('.project-card');
    for (let i=0; i < projects.length; i++){
      projects[i].addEventListener('click', function direct(){
        for (let link of linkss){
          console.log(linkss[i])
          window.location.href = linkss[i];
        }
      })
    }
// ============= END PROJECTS =========================


// ============ API CALL =======================
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=81a6a4c7
// details: http://www.omdbapi.com/?i=tt3896198&apikey=81a6a4c7


const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=81a6a4c7`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}


function findMovies(){
    // let searchTerm = (movieSearchBox.value).trim();
    let searchTerm = (movieSearchBox.value);
    console.log(searchTerm);
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=81a6a4c7`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});

// ============ END API CALL =======================


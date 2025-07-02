const movieName = document.getElementById("name");
const year = document.getElementById("year");
const director = document.getElementById("director");
const genre = document.getElementById("genre");

const createBtn = document.getElementById("create");
const updateBtn = document.getElementById("update");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");
const deleteBtn = document.getElementById("delete");

const navButtons = document.querySelectorAll(".navigation button");

let movies = [];
let currentIndex = 0;
let isEditing = false;
let isCreating = false;

function loadInitialState() {
  const hasMovies = movies.length > 0;
  toggleInputs(false);
  createBtn.disabled = false;
  updateBtn.disabled = !hasMovies;
  deleteBtn.disabled = !hasMovies;
  saveBtn.disabled = true;
  cancelBtn.disabled = true;
  navButtons.forEach((btn) => (btn.disabled = !hasMovies));
  if (hasMovies) showMovie();
  else clearInputs();
}

function toggleInputs(enabled) {
  movieName.disabled = !enabled;
  year.disabled = !enabled;
  director.disabled = !enabled;
  genre.disabled = !enabled;
}

function clearInputs() {
  movieName.value = "";
  year.value = "";
  director.value = "";
  genre.value = "";
}

function showMovie() {
  if (movies.length === 0) return;
  const movie = movies[currentIndex];
  movieName.value = movie.movieName;
  year.value = movie.year;
  director.value = movie.director;
  genre.value = movie.genre;
}

function addMovie() {
  isCreating = true;
  clearInputs();
  toggleInputs(true);
  saveBtn.disabled = false;
  cancelBtn.disabled = false;
  createBtn.disabled = true;
  updateBtn.disabled = true;
  deleteBtn.disabled = true;
}

function editMovie() {
  isEditing = true;
  toggleInputs(true);
  saveBtn.disabled = false;
  cancelBtn.disabled = false;
  createBtn.disabled = true;
  updateBtn.disabled = true;
  deleteBtn.disabled = true;
}

function saveMovie() {
  if (
    !movieName.checkValidity() ||
    !year.checkValidity() ||
    !director.checkValidity() ||
    !genre.checkValidity()
  ) {
    alert("Preencha todos os campos corretamente antes de salvar.");
    return;
  }

  const movie = {
    movieName: movieName.value,
    year: year.value,
    director: director.value,
    genre: genre.value,
  };

  if (isCreating) {
    movies.push(movie);
    currentIndex = movies.length - 1;
  } else if (isEditing) {
    movies[currentIndex] = movie;
  }

  isCreating = false;
  isEditing = false;
  loadInitialState();
}

function cancelAction() {
  isCreating = false;
  isEditing = false;
  loadInitialState();
}

function deleteMovie() {
  if (movies.length === 0) return;
  movies.splice(currentIndex, 1);
  if (currentIndex > 0) currentIndex--;
  loadInitialState();
}

function navigate(direction) {
  if (movies.length === 0) return;
  if (direction === "first") currentIndex = 0;
  else if (direction === "prev" && currentIndex > 0) currentIndex--;
  else if (direction === "next" && currentIndex < movies.length - 1)
    currentIndex++;
  else if (direction === "last") currentIndex = movies.length - 1;
  showMovie();
}

window.addEventListener("DOMContentLoaded", () => {
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addMovie();
  });
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editMovie();
  });
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveMovie();
  });
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelAction();
  });
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMovie();
  });

  const navBtns = document.querySelectorAll(".navigation button");
  navBtns[0].addEventListener("click", () => navigate("first"));
  navBtns[1].addEventListener("click", () => navigate("prev"));
  navBtns[2].addEventListener("click", () => navigate("next"));
  navBtns[3].addEventListener("click", () => navigate("last"));

  loadInitialState();
});

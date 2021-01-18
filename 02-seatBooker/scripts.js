const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//this one gets reassigned so it has to be let:
let ticketPrice = +movieSelect.value;

//update count of selected seats:
updateSelectedCount = () => {
  //adds them to a nodelist:
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //replace values:
  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;

  //copy the selectedSeats to an array:
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //save to local storage:
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
};

//save movie data:
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovie", movieIndex);
  localStorage.setItem("selectedPrice", moviePrice);
};

//listeners:

//change class of selected seat to selected:
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //to turn on and off the class:
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//change selected price:
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  //localstorage:
  setMovieData(e.target.selectedIndex, e.target.value);
});

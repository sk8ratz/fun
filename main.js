// Blank while loading
window.addEventListener("load", function () {
  const loader = document.getElementById("loading");
  loader.classList.add("hide");
});

setTimeout(function() {
    document.getElementById("continue-msg").innerText = "PRESS SK8 RATZ TO CONTINUE";
  }, 0000); // 3000 milliseconds = 3 seconds

const continueMsg = document.getElementById('continue-msg');

// Wait for the text to appear before starting the animations
setTimeout(() => {
  continueMsg.classList.add('show');
}, 0000);

setInterval(() => {
  continueMsg.classList.toggle('blue');
  continueMsg.classList.toggle('white');
}, 3000);


// Get the close button and navbar elements
const closeButton = document.querySelector('.close-btn');
const navbar = document.querySelector('.navbar');

// Show/hide the navbar when the logo is clicked
function showNavbar() {
  navbar.classList.toggle('show');
  if (navbar.classList.contains('show')) {
    closeButton.style.display = 'block';
  } else {
    closeButton.style.display = 'none';
  }
}

// Hide the navbar and close button when the close button is clicked
closeButton.addEventListener('click', function(event) {
  event.stopPropagation();
  navbar.classList.remove('show');
  closeButton.style.display = 'none';
});

// Hide the navbar and close button when the user clicks outside of the navbar
navbar.addEventListener('click', function(event) {
  if (event.target === navbar) {
    navbar.classList.remove('show');
    closeButton.style.display = 'none';
  }
});
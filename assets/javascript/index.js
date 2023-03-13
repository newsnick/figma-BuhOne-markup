let slideIndex = 1;
showSlide(slideIndex);

function plusSlides(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");

  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide) => (slide.style.display = "none"));

  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

const dots = document.querySelectorAll(".slider-dot");
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlide(i + 1);
  });
});

const arrowLeft = document.querySelector(".slider-arrow-left");
const arrowRight = document.querySelector(".slider-arrow-right");

arrowLeft.addEventListener("click", () => {
  plusSlides(-1);
});

arrowRight.addEventListener("click", () => {
  plusSlides(1);
});

/////////////////////
//////////////////////

const cubes = document.querySelectorAll(".cube");
const postsContainer = document.querySelector(".posts");

function getRandomPostId() {
  return Math.floor(Math.random() * 100) + 1;
}

function fetchPost() {
  const postId = getRandomPostId();
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const post = document.createElement("div");
      post.classList.add("post");
      post.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      `;
      postsContainer.innerHTML = "";
      postsContainer.appendChild(post);
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });
}

cubes.forEach((cube) => {
  cube.addEventListener("click", fetchPost);
});

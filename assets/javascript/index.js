// First slider
let currentSlideIndex = 1;
showSlide(currentSlideIndex);

function plusSlides(n) {
  showSlide((currentSlideIndex += n));
}

function currentSlide(n) {
  showSlide((currentSlideIndex = n));
}

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");

  if (n > slides.length) {
    currentSlideIndex = 1;
  } else if (n < 1) {
    currentSlideIndex = slides.length;
  }

  slides.forEach((slide) => (slide.style.display = "none"));

  dots.forEach((dot) => dot.classList.remove("active"));

  slides[currentSlideIndex - 1].style.display = "block";
  dots[currentSlideIndex - 1].classList.add("active");
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

// Second slider
const mainSlider = document.querySelector(".mainslider");
const slides2 = mainSlider.querySelectorAll(".myslide");
const dots2 = mainSlider.querySelectorAll(".mydot");
const arrows2 = mainSlider.querySelectorAll(".arrow");
let currentSlideIndex2 = 0;

function showSlide2(index) {
  if (index < 0) {
    index = slides2.length - 1;
  } else if (index >= slides2.length) {
    index = 0;
  }

  slides2.forEach((slide) => (slide.style.display = "none"));
  slides2[index].style.display = "block";

  dots2.forEach((dot) => dot.classList.remove("active"));
  dots2[index].classList.add("active");

  currentSlideIndex2 = index;
}

function nextSlide2() {
  showSlide2(currentSlideIndex2 + 1);
}

function previousSlide2() {
  showSlide2(currentSlideIndex2 - 1);
}

function setSlideOnClick2(slide, index) {
  slide.addEventListener("click", () => showSlide2(index));
}

function setDotOnClick2(dot, index) {
  dot.addEventListener("click", () => showSlide2(index));
}

function setArrowOnClick2(arrow, direction) {
  arrow.addEventListener("click", () => {
    if (direction === "left") {
      previousSlide2();
    } else {
      nextSlide2();
    }
  });
}

slides2.forEach(setSlideOnClick2);
dots2.forEach(setDotOnClick2);
arrows2.forEach((arrow, index) =>
  setArrowOnClick2(arrow, index === 0 ? "left" : "right")
);

/////////////////////
//////////////////////Fetch post

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
/////////////////////////////
////XHR///

const testimonialsContainer = document.querySelector(".my-testimonials");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentTestimonialIndex = 0;

const fetchTestimonials = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Network response was not ok"));
      }
    };
    xhr.onerror = () => {
      reject(new Error("There was an error with the request"));
    };
    xhr.send();
  })
    .then((testimonials) => {
      renderTestimonial(testimonials[currentTestimonialIndex]);

      return testimonials;
    })
    .catch((error) => {
      console.error("Error fetching testimonials:", error);
    });
};

const renderTestimonial = (testimonial) => {
  testimonialsContainer.textContent = testimonial.body;

  const profilePicture = document.createElement("img");
  profilePicture.src = `https://picsum.photos/50?random=${Math.floor(
    Math.random() * 100
  )}`;
  testimonialsContainer.appendChild(profilePicture);
};

const showPreviousTestimonial = () => {
  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--;
    renderTestimonial(testimonials[currentTestimonialIndex]);
  }
};

const showNextTestimonial = () => {
  if (currentTestimonialIndex < testimonials.length - 1) {
    currentTestimonialIndex++;
    renderTestimonial(testimonials[currentTestimonialIndex]);
  }
};

fetchTestimonials().then((fetchedTestimonials) => {
  testimonials = fetchedTestimonials;
  leftArrow.addEventListener("click", showPreviousTestimonial);
  rightArrow.addEventListener("click", showNextTestimonial);
});

////////////////////change background on img click
const images = document.querySelectorAll(".images_container2 img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
  });
});

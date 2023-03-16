// First slider
let currentSlideIndex = 1
showSlide(currentSlideIndex)

function plusSlides(n) {
  showSlide((currentSlideIndex += n))
}

function currentSlide(n) {
  showSlide((currentSlideIndex = n))
}

function showSlide(n) {
  const slides = document.querySelectorAll('.slide')
  const dots = document.querySelectorAll('.slider-dot')

  if (n > slides.length) {
    currentSlideIndex = 1
  } else if (n < 1) {
    currentSlideIndex = slides.length
  }

  slides.forEach((slide) => (slide.style.display = 'none'))

  dots.forEach((dot) => dot.classList.remove('active'))

  slides[currentSlideIndex - 1].style.display = 'block'
  dots[currentSlideIndex - 1].classList.add('active')
}

const dots = document.querySelectorAll('.slider-dot')
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide(i + 1)
  })
})

const arrowLeft = document.querySelector('.slider-arrow-left')
const arrowRight = document.querySelector('.slider-arrow-right')

arrowLeft.addEventListener('click', () => {
  plusSlides(-1)
})

arrowRight.addEventListener('click', () => {
  plusSlides(1)
})

// Second slider
const mainSlider = document.querySelector('.mainslider')
const slides2 = mainSlider.querySelectorAll('.myslide')
const dots2 = mainSlider.querySelectorAll('.mydot')
const arrows2 = mainSlider.querySelectorAll('.arrow')
let currentSlideIndex2 = 0

function showSlide2(index) {
  if (index < 0) {
    index = slides2.length - 1
  } else if (index >= slides2.length) {
    index = 0
  }

  slides2.forEach((slide) => (slide.style.display = 'none'))
  slides2[index].style.display = 'block'

  dots2.forEach((dot) => dot.classList.remove('active'))
  dots2[index].classList.add('active')

  currentSlideIndex2 = index
}

function nextSlide2() {
  showSlide2(currentSlideIndex2 + 1)
}

function previousSlide2() {
  showSlide2(currentSlideIndex2 - 1)
}

function setSlideOnClick2(slide, index) {
  slide.addEventListener('click', () => showSlide2(index))
}

function setDotOnClick2(dot, index) {
  dot.addEventListener('click', () => showSlide2(index))
}

function setArrowOnClick2(arrow, direction) {
  arrow.addEventListener('click', () => {
    if (direction === 'left') {
      previousSlide2()
    } else {
      nextSlide2()
    }
  })
}

slides2.forEach(setSlideOnClick2)
dots2.forEach(setDotOnClick2)
arrows2.forEach((arrow, index) =>
  setArrowOnClick2(arrow, index === 0 ? 'left' : 'right')
)

// scroll-to-top

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

window.onscroll = function () {
  const scrollTopButton = document.querySelectorAll(
    'button[onclick="scrollToTop()"]'
  )
  const scrollPosition = window.pageYOffset
  const screenHeight = window.innerHeight

  for (const i = 0; i < scrollTopButton.length; i++) {
    if (scrollPosition > screenHeight) {
      scrollTopButton[i].style.display = 'block'
    } else {
      scrollTopButton[i].style.display = 'none'
    }
  }
}

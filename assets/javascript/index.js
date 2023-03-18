//////////////////////Fetch post

const cubes = document.querySelectorAll('.cube')
const postsContainer = document.querySelector('.posts')

function getRandomPostId() {
  return Math.floor(Math.random() * 100) + 1
}

function fetchPost() {
  const postId = getRandomPostId()
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const post = document.createElement('div')
      post.classList.add('post')
      post.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      `
      postsContainer.innerHTML = ''
      postsContainer.appendChild(post)
    })
    .catch((error) => {
      console.error('Error fetching post:', error)
    })
}

cubes.forEach((cube) => {
  cube.addEventListener('click', fetchPost)
})
/////////////////////////////
////XHR///

const testimonialsContainer = document.querySelector('.my-testimonials')
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')

let currentTestimonialIndex = 0

const fetchTestimonials = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts')
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error('Network response was not ok'))
      }
    }
    xhr.onerror = () => {
      reject(new Error('There was an error with the request'))
    }
    xhr.send()
  })
    .then((testimonials) => {
      renderTestimonial(testimonials[currentTestimonialIndex])

      return testimonials
    })
    .catch((error) => {
      console.error('Error fetching testimonials:', error)
    })
}

const renderTestimonial = (testimonial) => {
  testimonialsContainer.textContent = testimonial.body

  const profilePicture = document.createElement('img')
  profilePicture.src = `https://picsum.photos/50?random=${Math.floor(
    Math.random() * 100
  )}`
  testimonialsContainer.appendChild(profilePicture)
}

const showPreviousTestimonial = () => {
  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--
    renderTestimonial(testimonials[currentTestimonialIndex])
  }
}

const showNextTestimonial = () => {
  if (currentTestimonialIndex < testimonials.length - 1) {
    currentTestimonialIndex++
    renderTestimonial(testimonials[currentTestimonialIndex])
  }
}

fetchTestimonials().then((fetchedTestimonials) => {
  testimonials = fetchedTestimonials
  leftArrow.addEventListener('click', showPreviousTestimonial)
  rightArrow.addEventListener('click', showNextTestimonial)
})

////////////////////change background on img click

const images = document.querySelectorAll('.images_container2 img')

images.forEach((image) => {
  image.addEventListener('click', () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`
    document.body.style.backgroundColor = randomColor
    document.body.style.color = '#fff'
    document.querySelector('p').style.color = '#fff'
    document.getElementById('container2').style.backgroundColor = randomColor
  })
})

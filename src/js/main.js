import { throttle } from 'lodash'
// import for webpack
import "../css/normalize.css"
import "../css/_main.css"
import '../fonts/Exo2-Regular.ttf'
import '../fonts/TrainOne-Regular.ttf'
import '../images/diplomas/001.jpg'
import '../images/diplomas/002.jpg'
import '../images/diplomas/003.jpg'
import '../images/diplomas/004.jpg'
import '../images/diplomas/005.jpg'
import '../images/diplomas/006.jpg'
import '../images/diplomas/007.jpg'
import '../images/diplomas/008.jpg'
import '../images/diplomas/009.jpg'
import '../images/diplomas/010.jpg'
import '../images/icons/A1_logo.webp'
import '../images/icons/account.svg'
import '../images/icons/arrow-left-drop-circle-outline.svg'
import '../images/icons/card-account-phone.svg'
import '../images/icons/connection.svg'
import '../images/icons/MTS_logo.svg'
import '../images/poster.jpg'
import '../images/shrink-meme.jpg'
import '../images/table-meme.jpg'
import '../video/H.264.mp4'
import '../video/v9.webm'

onScroll()
document.addEventListener("click", onClick)
document.addEventListener('scroll', throttle(onScroll, 20))

function onScroll() {
  const notAnimated = '.to-anim:not(.anim)'
  animate(elementsInViewport(notAnimated))
  parallax(elementsInViewport('.parallax'))
}

function animate(elements) {
  elements.forEach(addClass)
}

function addClass(element) {
  element.classList.add('anim')
}

function elementsInViewport(selector) {
  const elements = document.querySelectorAll(selector)
  const elementsInViewport = Array.from(elements)
    .filter(isElementInViewport)
  return elementsInViewport
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect()
  const isInViewport = window.innerHeight - rect.top > 0
  return isInViewport
}

function parallax(elements) {
  elements.forEach(setTranslation)
}

function setTranslation(element) {
  const rect = element.getBoundingClientRect()
  const left = rect.top / window.innerHeight
  const translate = (200 * left - 50) / 0.75
  element.style.transform = `translateY(${ translate > 0 ? translate : 0 }px)`
}

function onClick(event) {
  const isLinkClicked = event.target.parentElement.classList.contains("link")
  if (isLinkClicked) {
    closeMenu()
  }
}

function closeMenu() {
  document.getElementById("menu-switcher").checked = false
}

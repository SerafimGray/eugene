import { throttle } from 'lodash'
import "../css/normalize.css"
import "../css/_main.css"
import '../images/001.jpg'
import '../images/002.jpg'
import '../images/003.jpg'
import '../images/004.jpg'
import '../images/005.jpg'
import '../images/006.jpg'
import '../images/007.jpg'
import '../images/008.jpg'
import '../images/009.jpg'
import '../images/010.jpg'

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

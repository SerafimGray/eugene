export function removeNoJS() {
  const noJsClasses = document.getElementsByClassName('no-js')
  if (noJsClasses.length) {
    noJsClasses[0].classList.remove('no-js')
  }
}

export function onScroll() {
  const notAnimated = '.to-anim:not(.anim)'
  runFunctionForElements(elementsInViewport(notAnimated), addAnimClass)
  runFunctionForElements(elementsInViewport('.parallax'), setTranslation)
}

export function runFunctionForElements(elements, func) {
  elements.forEach(func)
}

export function elementsInViewport(selector) {
  const elements = document.querySelectorAll(selector)
  const elementsInViewport = Array.from(elements)
    .filter(isElementInViewport)
  return elementsInViewport
}

export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect()
  const isInViewport = window.innerHeight - rect.top > 0
  return isInViewport
}

export function addAnimClass(element) {
  element.classList.add('anim')
}

export function setTranslation(element) {
  const rect = element.getBoundingClientRect()
  const left = rect.top / window.innerHeight
  const translate = (200 * left - 50) / 0.75
  element.style.transform = `translateY(${ translate > 0 ? translate : 0 }px)`
}

export function onClick(event) {
  const isLinkClicked = event.target.parentElement.classList.contains("link")
  if (isLinkClicked) {
    closeMenu()
  }
}

export function closeMenu() {
  document.getElementById("menu-switcher").checked = false
}




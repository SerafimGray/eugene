/**
 * @jest-environment jsdom
*/
import {
  addAnimClass,
  closeMenu,
  elementsInViewport,
  isElementInViewport,
  onClick,
  onScroll,
  removeNoJS,
  runFunctionForElements,
  setTranslation
} from '../src/js/app'

const resizeWindow = () => {
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 150,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('removeNoJS', () => {
  test('removes no-js class from the first element', () => {
    document.body.innerHTML = `
      <div class="no-js"></div>
    `
    removeNoJS()
    const noJsCollection = document.getElementsByClassName('no-js')
    expect(noJsCollection.length).toBe(0)
  })
})

describe('onScroll', () => {
  test('runs functions for elements in viewport', () => {
    document.body.innerHTML = `
      <div class="to-anim"></div>
      <div class="parallax"></div>
      <div class="anim to-anim"></div>
      <div class="parallax"></div>
    `
    onScroll()
    const animCollection = document.getElementsByClassName('anim')
    const animList = Array.from(animCollection)
    expect(animList.length).toBe(2)
  })
})

describe('closeMenu', () => {
  test('closes menu on call', () => {
    document.body.innerHTML = `
      <input type="checkbox" id="menu-switcher" checked>
    `
    closeMenu()
    expect(document.getElementById("menu-switcher").checked).toBeFalsy()
  })
})

describe('onClick', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <a class="link" href="#">
        <span id="link-text">Контакты</span>
      </a>
      <a class="not-link" href="#">
        <span id="not-link-text">Контакты</span>
      </a>
      <input type="checkbox" id="menu-switcher" checked>
    `
    document.addEventListener('click', onClick)
  })

  afterEach(() => {
    document.removeEventListener('click', onClick)
  })

  test('closes menu if clicked on .link', () => {
    const linkChild = document.getElementById('link-text')
    linkChild.click()
    expect(document.getElementById("menu-switcher").checked).toBeFalsy()
  })
  
  test("doesn't close menu if clicked not on .link", () => {
    const notLinkChild = document.getElementById('not-link-text')
    notLinkChild.click()
    expect(document.getElementById("menu-switcher").checked).toBeTruthy()
  })
})

describe('setTranslation', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div id="element"></div>
    `
    resizeWindow()
  })

  test('sets translation property to given element', () => {
    const getBoundingClientRectSpy = jest.fn(() => ({ top: 150 }))
    document.getElementById = jest.fn(() => ({
      getBoundingClientRect: getBoundingClientRectSpy,
      style: {}
    }))
    const element = document.getElementById('element')
    setTranslation(element)
    expect(element.style.transform).toBe('translateY(200px)')
  })

  test('sets translation to 0 if element in the top quarter of page', () => {
    const getBoundingClientRectSpy = jest.fn(() => ({ top: 35 })) //35 < 150 / 4
    document.getElementById = jest.fn(() => ({
      getBoundingClientRect: getBoundingClientRectSpy,
      style: {}
    }))
    const element = document.getElementById('element')
    setTranslation(element)
    expect(element.style.transform).toBe('translateY(0px)')
  })
})

describe('runFunctionForElements', () => {
  test('execute function for every element', () => {
    document.body.innerHTML = `
      <div class="parallax"></div>
      <div class="parallax"></div>
      <div class="parallax"></div>
    `
    const elementsCollection = document.getElementsByClassName('parallax')
    const elements = Array.from(elementsCollection)
    runFunctionForElements(elements, setTranslation)
    const stylesList = elements.map(element => element.style.transform)
    expect(stylesList).toEqual(['translateY(0px)', 'translateY(0px)', 'translateY(0px)'])
  })
})

describe('isElementInViewport', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div id="element"></div>
    `
    resizeWindow()
  })

  test('returns true if element is in window or higher', () => {
    const getBoundingClientRectSpy = jest.fn(() => ({ top: 100 }))
    document.getElementById = jest.fn(() => ({
      getBoundingClientRect: getBoundingClientRectSpy
    }))
    const element = document.getElementById('element')
    expect(isElementInViewport(element)).toBeTruthy()
  })

  test("returns false if element isn't in window", () => {
    const getBoundingClientRectSpy = jest.fn(() => ({ top: 200 }))
    document.getElementById = jest.fn(() => ({
      getBoundingClientRect: getBoundingClientRectSpy
    }))
    const element = document.getElementById('element')
    expect(isElementInViewport(element)).toBeFalsy()
  })
})

describe('elementsInViewport', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="viewport"></div>
      <div class="viewport"></div>
      <div class="viewport"></div>
    `
    resizeWindow()
  })

  test('returns list of elements in window or higher', () => {
    document.querySelectorAll = jest.fn(() => ([
      { getBoundingClientRect: jest.fn(() => ({ top: 100 })) },
      { getBoundingClientRect: jest.fn(() => ({ top: 200 })) },
      { getBoundingClientRect: jest.fn(() => ({ top: -50 })) }
    ]))
    const selector = ".viewport"
    const elementsList = elementsInViewport(selector)
    expect(elementsList.length).toBe(2)
  })
})

describe('addAnimClass', () => {
  test('adds class "anim" to element', () => {
    document.body.innerHTML = `
      <div class="to-anim"></div>
    `
    const element = document.getElementsByClassName('to-anim')[0]
    addAnimClass(element)
    expect(element.classList).toContain('anim')
  })
})

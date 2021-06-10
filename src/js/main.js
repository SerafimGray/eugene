import throttle from 'lodash.throttle'
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
import '../images/icons/Telegram_logo.svg'
import '../images/poster.jpg'
import '../images/shrink-meme.jpg'
import '../images/table-meme.jpg'
import '../video/H.264.mp4'
import '../video/v9.webm'
// import js logic
import { onClick, onScroll, removeNoJS } from './app'

removeNoJS()
onScroll()
document.addEventListener("click", onClick)
document.addEventListener('scroll', throttle(onScroll, 20))

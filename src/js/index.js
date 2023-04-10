import "@babel/polyfill";
import "../index.html";
import "../css/reset.css";
import "../css/style.css";


const links = document.querySelectorAll('nav a');
function addClass() {
    links.forEach(item => {
        item.addEventListener('click', (e) => {
            removeClass();
            e.target.classList.add('active');
        })
    })
}
function removeClass() {
    links.forEach(item => {
        item.classList.remove('active');
    })
}

addClass();

;
console.log("=^_^=")

const lgbt = document.querySelector(".lgbt");
const opa = document.querySelector("span");

lgbt.onclick = function() {
    this.classList.toggle("aboba");

    setTimeout(() => {
        opa.classList.toggle("opa");
    }, 2000);
}
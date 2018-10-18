
let modal = document.getElementById('modal-img');
let imgs = document.querySelectorAll('#projetos img');
let modalImg = document.querySelector("#modal-img img");
let captionText = document.querySelector("#modal-img #caption");

//adiciona o evento de click a cada um das imagens
for (let img of imgs) {
    img.addEventListener('click', imgClick);
}

//executa a acao no paragrafo correspondente ao botao clicado
function imgClick(event) {
    modal.style.display = "block";
    modalImg.src = event.currentTarget.src;
    captionText.innerHTML = event.currentTarget.alt;
}

//fecha o modal ao clicar no X
let modalClose = document.querySelector(".close");
modalClose.addEventListener("click", function(){
    modal.style.display = "none";
});

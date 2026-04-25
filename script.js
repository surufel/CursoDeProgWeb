const itens = document.querySelectorAll(".corpo");

itens.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".item").forEach(el => {
      el.classList.remove("active");
    });

    item.parentElement.classList.add("active");
  });
});

const botaoNav = document.querySelector('.matricula');
const botaoHero = document.querySelector('.titulo_botao');
const secaoComercial = document.querySelector('.secao-comercial');

function mostrarMatricula(event) {
  event.preventDefault(); 
  secaoComercial.classList.add('visivel');
  secaoComercial.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (botaoNav) botaoNav.addEventListener('click', mostrarMatricula);
if (botaoHero) botaoHero.addEventListener('click', mostrarMatricula);
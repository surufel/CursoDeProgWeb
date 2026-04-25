const item=document.querySelectorAll(".corpo")


<<<<<<< HEAD
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
=======
item.forEach( itens => {
  itens.addEventListener("click", () =>{
    const elemento= itens.parentElement

    elemento.classList.toggle("active")
  })
})
>>>>>>> ec1f25c01d7626aaccdecc4dc73c55b361942bee

const item=document.querySelectorAll(".corpo")


item.forEach( itens => {
  itens.addEventListener("click", () =>{
    const elemento= itens.parentElement

    elemento.classList.toggle("active")
  })
})

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

//api do github
async function buscarRepositorios() {
  const url = 'https://api.github.com/users/Surufel/repos'
  const resposta = await fetch(url)
  const repositorios = await resposta.json()

  //qtd total de repo
  const quantidade = repositorios.length
  document.getElementById('github_repo-count').textContent = quantidade

  //qtd total de estrelas
  let totalEstrelas = 0
  repositorios.forEach(repo => {
    totalEstrelas += repo.stargazers_count
  })
  document.getElementById('github_stars-count').textContent = totalEstrelas

  //qtd de linguagens
  let linguagensUnicas = []
  repositorios.forEach(function(projeto) {
    let linguagemDoProjeto = projeto.language
    if (linguagemDoProjeto != null && !linguagensUnicas.includes(linguagemDoProjeto)) {
      linguagensUnicas.push(linguagemDoProjeto)
    }
  })
  document.getElementById('github_language-count').textContent = linguagensUnicas.length

  //construindo os cartões
  let htmlCompleto = "";
  repositorios.forEach(function(projeto) {
    // Definimos um texto padrão caso o projeto não tenha descrição
    let descricao = projeto.description !== null ? projeto.description : "Sem descrição no momento.";
    
    let htmlDoCartao = `
      <div class="gh-repos__card">
        <h3>${projeto.name}</h3>
        <p>${descricao}</p>
      </div>
    `;
    htmlCompleto += htmlDoCartao;
  });
  
  document.getElementById('gh-repos-grid').innerHTML = htmlCompleto;
}

buscarRepositorios()
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

//cores dos botoes
const cores_filtros = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Python:     '#3572A5',
  Rust:       '#dea584',
  Shell:      '#89e051',
  C:          '#555555',
  'C#':       '#178600',
  Java:       '#b07219',
}

const icone_repo = `<svg class="gh-repos__card-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg>`

const icone_estrela = `<svg class="gh-repos__stat-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>`

const icone_fork = `<svg class="gh-repos__stat-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>`

const icone_link = `<svg class="gh-repos__card-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3h7m0 0v7m0-7L6 10"/></svg>`

let todosOsRepos = []

function renderizarCards(lista) {
  let htmlCompleto = ''
  lista.forEach(function(projeto) {
    let cor = cores_filtros[projeto.lang] || '#cba6f7'
    let topicsHTML = projeto.topics.map(t => `<span class="gh-repos__topic">${t}</span>`).join('')
    let badgeHTML = projeto.estrelas >= 10
      ? `<span class="gh-repos__featured-badge">★ destaque</span>`
      : `<span class="gh-repos__visibility-badge">public</span>`

    htmlCompleto += `
      <a class="gh-repos__card" href="${projeto.url}" target="_blank" rel="noopener"
         style="--gh-lang-color: ${cor}">
        <div class="gh-repos__card-top">
          ${icone_repo}
          <span class="gh-repos__card-name">${projeto.name}</span>
          ${badgeHTML}
        </div>
        <p class="gh-repos__card-desc">${projeto.desc}</p>
        <div class="gh-repos__topics">${topicsHTML}</div>
        <div class="gh-repos__card-footer">
          <div class="gh-repos__lang-badge">
            <span class="gh-repos__lang-dot" style="background: ${cor}"></span>
            ${projeto.lang}
          </div>
          <div class="gh-repos__meta-stat">${icone_estrela} ${projeto.estrelas}</div>
          <div class="gh-repos__meta-stat">${icone_fork} ${projeto.forks}</div>
          <div class="gh-repos__card-link">${icone_link}</div>
        </div>
      </a>`
  })
  document.getElementById('github_grid').innerHTML = htmlCompleto
}

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

  // salva os repos no formato que o projeto usa
  todosOsRepos = repositorios.map(function(projeto) {
    return {
      name:     projeto.name,
      desc:     projeto.description || 'Sem descrição no momento.',
      lang:     projeto.language    || 'Outro',
      estrelas: projeto.stargazers_count,
      forks:    projeto.forks_count,
      topics:   projeto.topics      || [],
      url:      projeto.html_url,
    }
  })

  renderizarCards(todosOsRepos)
}

// listener dos filtros
document.getElementById('github_filter-bar').addEventListener('click', function(e) {
  const btn = e.target.closest('.gh-repos__filter-btn')
  if (!btn) return

  document.querySelectorAll('.gh-repos__filter-btn').forEach(b =>
    b.classList.remove('gh-repos__filter-btn--active')
  )
  btn.classList.add('gh-repos__filter-btn--active')

  const lang = btn.dataset.lang
  const filtrados = lang === 'all' ? todosOsRepos : todosOsRepos.filter(r => r.lang === lang)
  renderizarCards(filtrados)
})

buscarRepositorios()

//adicionando botoes para scoll
document.querySelectorAll('[data-target]').forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('data-target')
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  })
})

//evita a navbar fixa de sobrepor conteúdo da seção
const alturaNav = document.querySelector('header').offsetHeight;

document.querySelectorAll('section').forEach(section => {
  section.style.scrollMarginTop = (alturaNav + 40) + 'px';
});
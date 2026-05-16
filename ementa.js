const BACKEND_URL = 'https://cursodeprogwebbackend.onrender.com'
const formularioContatoFooter = document.querySelector('.footer-form')
const popupSucessoFooter = document.getElementById('popup-sucesso')

if (formularioContatoFooter && popupSucessoFooter) {
  formularioContatoFooter.addEventListener('submit', async (e) => {
    e.preventDefault()
    const botaoEnviar = formularioContatoFooter.querySelector('.footer-btn')
    const textoOriginal = botaoEnviar.innerText
    botaoEnviar.innerText = "Enviando"
    botaoEnviar.disabled = true
    const formData = new FormData(formularioContatoFooter)

    const dados = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      mensagem: formData.get('mensagem')
    }

    try {
      const responde = await fetch(`${BACKEND_URL}/api/contato`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (responde.ok) {
        popupSucessoFooter.classList.remove('hidden')
        formularioContatoFooter.reset()
      } else {
        alert("Erro ao enviar.")
      }
    } catch (error) {
      alert("Erro de conexão. Verifique a internet.")
    } finally {
      botaoEnviar.innerText = textoOriginal
      botaoEnviar.disabled = false
    }
  })
}

function fecharPopup() {
  const popup = document.getElementById('popup-sucesso')
  if (popup) popup.classList.add('hidden')
}

const item = document.querySelectorAll(".corpo")

item.forEach(itens => {
  itens.addEventListener("click", () => {
    const elemento = itens.parentElement
    elemento.classList.toggle("active")
  })
})
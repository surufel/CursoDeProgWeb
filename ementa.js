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
    try {
      const responde = await fetch(formularioContatoFooter.action, {
        method: 'post',
        body: formData,
        headers: { 'Accept': 'application/json' }
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
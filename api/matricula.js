module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  try {
    const { nome, email, pagamento } = req.body

    // log para ver se as variáveis de ambiente chegam
    console.log('SERVICE_ID:', process.env.EMAILJS_SERVICE_ID)
    console.log('TEMPLATE_ID:', process.env.EMAILJS_TEMPLATE_ID)
    console.log('USER_ID:', process.env.EMAILJS_USER_ID)
    console.log('BODY:', { nome, email, pagamento })

    const payload = {
      service_id:  process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id:     process.env.EMAILJS_USER_ID,
       accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: { nome, email, pagamento }
    }

    const resposta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const textoResposta = await resposta.text()
    console.log('STATUS EMAILJS:', resposta.status)
    console.log('RESPOSTA EMAILJS:', textoResposta)

    if (resposta.ok) {
      return res.status(200).json({ ok: true })
    } else {
      return res.status(500).json({ erro: 'Falha EmailJS', detalhe: textoResposta })
    }

  } catch (erro) {
    console.error('ERRO GERAL:', erro.message)
    return res.status(500).json({ erro: erro.message })
  }
}
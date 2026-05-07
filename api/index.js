const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const paymentClient = new Payment(client);

// Gera o Pix e salva o e-mail/nome no mapa temporário para usar no webhook
const pagamentosMap = new Map(); // { paymentId: { email, nome } }

app.post('/api/payment', async (req, res) => {
    try {
        const { nome, email, valor } = req.body;

        const body = {
            transaction_amount: Number(valor),
            description: 'Curso Syntax - Programação Web',
            payment_method_id: 'pix',
            payer: { email, first_name: nome },
            notification_url: process.env.WEBHOOK_URL,
        };

        const resultado = await paymentClient.create({ body });

        // Salva os dados do aluno associados ao ID do pagamento
        pagamentosMap.set(String(resultado.id), { email, nome });

        res.json({
            qr_code: resultado.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: resultado.point_of_interaction.transaction_data.qr_code_base64,
        });
    } catch (error) {
        console.error("Erro ao gerar Pix:", error);
        res.status(500).json({ error: 'Erro ao processar o pagamento' });
    }
});

// Webhook — Recebe a confirmação do Mercado Pago
app.post('/api/webhook', async (req, res) => {
    // Responde 200 IMEDIATAMENTE — o MP exige resposta rápida, senão reenvia
    res.sendStatus(200);

    try {
        const { type, data } = req.body;

        if (type !== 'payment' || !data?.id) return;

        const info = await paymentClient.get({ id: data.id });

        if (info.status === 'approved') {
            // Tenta pegar os dados do mapa; se não achar (ex: servidor reiniciou),
            // usa o que o MP retorna direto
            const aluno = pagamentosMap.get(String(data.id));
            const emailDestino = aluno?.email ?? info.payer.email;
            const nomeAluno    = aluno?.nome  ?? info.payer.first_name ?? 'Aluno';

            await enviarEmail(emailDestino, nomeAluno);
            pagamentosMap.delete(String(data.id)); // limpa da memória após envio
        }
    } catch (error) {
        console.error("Erro no Webhook:", error);
    }
});

async function enviarEmail(emailDestino, nome) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_REMETENTE,
            pass: process.env.EMAIL_SENHA_APP, // Senha de app do Google, não a senha normal
        }
    });

    await transporter.sendMail({
        from: `"Syntax Cursos" <${process.env.EMAIL_REMETENTE}>`,
        to: emailDestino,
        subject: 'Matrícula confirmada! 🎉',
        html: `
            <h2>Olá, ${nome}!</h2>
            <p>Seu pagamento foi confirmado. Bem-vindo ao curso Syntax!</p>
            <p>Em breve você receberá o link de acesso.</p>
        `
    });
    console.log(`E-mail enviado para: ${emailDestino}`);
}

module.exports = app;
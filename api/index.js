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

app.post('/api/payment', async (req, res) => {
    try {
        const { nome, email, valor, token, parcelas, paymentMethodId, issuerId } = req.body;
        console.log('Dados recebidos:', { token, paymentMethodId, issuerId });
        // Validação básica — todos os campos são obrigatórios
        if (!nome || !email || !valor || !token) {
            return res.status(400).json({ error: 'Dados incompletos.' });
        }

        const body = {
            transaction_amount: Number(valor),
            token:              token,          // card_token gerado pelo SDK no front-end
            description:        'Curso Syntax - Programação Web',
            installments:       Number(parcelas) || 1,
            payment_method_id:  'credit_card',  // SEMPRE cartão — nunca vem do front-end
            payer: {
                email,
                first_name: nome,
            },
            notification_url: process.env.WEBHOOK_URL,
        };

        const resultado = await paymentClient.create({ body });

        // Retorna o status para o front-end decidir o que mostrar
        res.json({
            status:        resultado.status,
            status_detail: resultado.status_detail,
            id:            resultado.id,
        });

        // Se aprovado aqui de imediato (comum em testes), já envia os e-mails
        // Pagamentos reais são confirmados pelo webhook abaixo
        if (resultado.status === 'approved') {
            await enviarEmailAluno(email, nome);
            await enviarEmailEmpresa(email, nome, valor);
        }

    } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        res.status(500).json({ error: 'Erro ao processar o pagamento. Tente novamente.' });
    }
});

// ---------------------------------------------------------------
// Webhook — confirmação assíncrona do Mercado Pago
// Usado para pagamentos que ficam "em análise" e são aprovados depois
// ---------------------------------------------------------------
app.post('/api/webhook', async (req, res) => {
    // Responde 200 IMEDIATAMENTE — o MP exige resposta rápida, senão reenvia
    res.sendStatus(200);

    try {
        const { type, data } = req.body;

        if (type !== 'payment' || !data?.id) return;

        const info = await paymentClient.get({ id: data.id });

        if (info.status === 'approved') {
            const emailDestino = info.payer.email;
            const nomeAluno    = info.payer.first_name ?? 'Aluno';
            const valorPago    = info.transaction_amount;

            await enviarEmailAluno(emailDestino, nomeAluno);
            await enviarEmailEmpresa(emailDestino, nomeAluno, valorPago);
        }
    } catch (error) {
        console.error("Erro no Webhook:", error);
    }
});

// ---------------------------------------------------------------
// Funções de e-mail
// ---------------------------------------------------------------
function criarTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_REMETENTE,
            pass: process.env.EMAIL_SENHA_APP, // Senha de app do Google (não a senha normal)
        }
    });
}

// E-mail de confirmação para o ALUNO
async function enviarEmailAluno(emailDestino, nome) {
    const transporter = criarTransporter();

    await transporter.sendMail({
        from:    `"Syntax Cursos" <${process.env.EMAIL_REMETENTE}>`,
        to:      emailDestino,
        subject: 'Matrícula confirmada! 🎉',
        html: `
            <h2>Olá, ${nome}!</h2>
            <p>Seu pagamento foi confirmado. Bem-vindo ao curso Syntax!</p>
            <p>Em breve você receberá o link de acesso à plataforma.</p>
            <p>Qualquer dúvida, responda este e-mail.</p>
        `
    });
    console.log(`E-mail de confirmação enviado para o aluno: ${emailDestino}`);
}

// E-mail de notificação para a EMPRESA
async function enviarEmailEmpresa(emailAluno, nomeAluno, valor) {
    const transporter = criarTransporter();

    await transporter.sendMail({
        from:    `"Syntax Cursos" <${process.env.EMAIL_REMETENTE}>`,
        to:      process.env.EMAIL_EMPRESA,  // defina EMAIL_EMPRESA no seu .env
        subject: `Nova matrícula confirmada: ${nomeAluno}`,
        html: `
            <h2>Nova matrícula!</h2>
            <p><strong>Aluno:</strong> ${nomeAluno}</p>
            <p><strong>E-mail:</strong> ${emailAluno}</p>
            <p><strong>Valor pago:</strong> R$ ${Number(valor).toFixed(2)}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `
    });
    console.log(`E-mail de notificação enviado para a empresa.`);
}

module.exports = app;
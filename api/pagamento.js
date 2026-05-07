// Servidor para realização de pagamentos com MercadoPago
// <-------------- INICIALIZAÇÃO -------------->
const express = require("express"); // O servidor em si
const cors = require("cors"); // Interação entre HTML e servidor
require("dotenv").config(); // Lê o .env

//<--------------- CONFIGURAÇÃO ---------------->

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const { MercadoPagoConfig, Payment } = require("mercadopago");

// <--------------- CONEXÃO / POST ---------------------->

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN, // Por DEUS, não colocarem a API direto. Coloquem no .env
});

app.post("/payment", async (req, res) => {
  const { nome, email, valor } = req.body;

// <---------------- GERAÇÃO DO PAGAMENTO (PIX) ---------------->
  try {
    const payment = new Payment(client);
    const resultado = await payment.create({
      body: {
        transaction_amount: valor,
        description: "Pagamento da matrícula",
        payment_method_id: "pix",
        payer: {
          email: email,
          first_name: nome,
        },
      },
    });

    const pix = resultado.point_of_interaction.transaction_data;

    res.json({
      qr_code: pix.qr_code,
      qr_code_base64: pix.qr_code_base64,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "[!] Erro ao criar pagamento Pix" });
  }
});

app.listen(3000, () => {
  console.log("[+] Servidor ligado: http://localhost:3000");
});
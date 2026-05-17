# 🚀 Syntax - Curso de Programação Web

Bem-vindo ao repositório do **Syntax**, uma landing page e plataforma de vendas para um curso completo de desenvolvimento Web (do zero ao frontend).

Este projeto foi desenvolvido para apresentar a ementa do curso, exibir o portfólio de projetos do professor (via integração com o GitHub) e processar matrículas utilizando a API do Mercado Pago.

> ⚠️ **Aviso Importante:** Este repositório contém os arquivos do **Frontend** e funções Serverless (para deploy na Vercel). **O Backend principal da aplicação está localizado em um repositório separado.**

---

## ✨ Funcionalidades

- **Landing Page Responsiva:** Interface moderna utilizando a paleta de cores *Catppuccin Mocha*.
- **Integração com GitHub:** Exibição dinâmica dos repositórios, estrelas e linguagens utilizadas pelo professor, consumindo dados do backend.
- **Sistema de Matrículas (Mercado Pago):** Geração de token de cartão de crédito de forma segura via SDK do Mercado Pago no frontend.
- **Formulário de Contato:** Envio de mensagens integradas ao backend e ao Formspree.
- **Ementa Interativa:** Sistema de acordeão (accordion) para visualização detalhada dos módulos do curso.

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- HTML5 (Semântico)
- CSS3 (Flexbox, CSS Grid, Variáveis CSS)
- JavaScript (Vanilla JS, Fetch API, manipulação de DOM)

**Serverless / Micro-API local (`/api`):**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [Mercado Pago SDK](https://github.com/mercadopago/sdk-nodejs) (Processamento de pagamentos)
- [Nodemailer](https://nodemailer.com/) (Envio de e-mails transacionais)
- Cors & Dotenv

**Design & Deploy:**
- Paleta de Cores: [Catppuccin](https://catppuccin.com/)
- Deploy configurado para a [Vercel](https://vercel.com/) (conforme `vercel.json`)

---

## ⚙️ Arquitetura e Comunicação com o Backend

O Frontend se comunica com um backend externo (hospedado no Render: `https://cursodeprogwebbackend.onrender.com`) para realizar as seguintes tarefas:

1. **Listagem do GitHub:** Rota `/api/github` para puxar os repositórios.
2. **Processamento Financeiro:** Rota `/api/matricula/payment` que recebe o token do cartão gerado no front e efetiva a cobrança.
3. **Contato:** Rota `/api/contato` para processar dúvidas dos alunos.

> *Observação: A pasta `/api` neste repositório contém funções prontas para rodar como Serverless Functions na Vercel, caso o sistema de e-mails e webhook do Mercado Pago sejam migrados para a mesma infraestrutura do front.*

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (caso vá testar as rotas da pasta `/api` localmente) e adicione as seguintes chaves:

```env
MP_ACCESS_TOKEN=seu_access_token_do_mercado_pago
WEBHOOK_URL=sua_url_de_webhook
EMAIL_REMETENTE=seu_email@gmail.com
EMAIL_SENHA_APP=sua_senha_de_app_do_gmail
EMAIL_EMPRESA=email_da_sua_empresa@gmail.com
```

### 3. Instalar Dependências da API

```bash
npm install
```

### 4. Rodar o Frontend

Como o frontend é estático (HTML/CSS/JS), você pode utilizar a extensão **Live Server** no VS Code. O projeto já possui uma configuração (`.vscode/settings.json`) que define a porta padrão do Live Server para `5502`.

1. Abra o arquivo `index.html`.
2. Clique em **"Go Live"** na barra inferior do VS Code.
3. Acesse `http://127.0.0.1:5502` no seu navegador.

---

## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido por:

- Henrique França de Souza Medeiros
- Gustavo Nunes da Silva Pereira
- José Francisco Paes Landim Sobrinho
- Ricardo Cronemberger Cruz Ruben Pereira
- João Guilherme Aragão Malta

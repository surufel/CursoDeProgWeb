<div align="center">

<img src="https://img.shields.io/badge/Status-Em%20Produção-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?style=for-the-badge&logo=githubpages" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

# 🖥️ Syntax — Curso de Programação Web

**Landing page e plataforma de vendas para um curso completo de desenvolvimento web frontend.**  
Do zero ao JavaScript — com integração de pagamentos, portfólio dinâmico e ementa interativa.

[🌐 Acessar o Site](https://jfplandim.github.io/CursoDeProgWeb) · [📁 Repositório Backend](https://github.com/jfplandim/CursoDeProgWeb)

</div>

---

## 📌 Sobre o Projeto

O **Syntax** é uma landing page completa desenvolvida para apresentar e comercializar um curso de programação web. O projeto é composto por um frontend estático hospedado no **GitHub Pages**, que se comunica com um backend externo para processamento de pagamentos, integração com o GitHub e envio de e-mails.

> 📦 **Este repositório contém apenas o frontend.** O backend responsável pelo processamento de pagamentos, envio de e-mails e integração com a API do GitHub está em um repositório separado, hospedado no Render (`https://cursodeprogwebbackend.onrender.com`).

> ⚠️ **Atenção:** O backend está hospedado no plano gratuito do Render, que **hiberna automaticamente após um período de inatividade**. A primeira requisição após a hibernação pode levar até 1 minuto para responder enquanto o servidor reinicia. Isso é esperado e não indica erro.

---

## 🌐 Acesse o Site

**[https://jfplandim.github.io/CursoDeProgWeb](https://jfplandim.github.io/CursoDeProgWeb)**

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 🎨 **Landing Page Responsiva** | Interface moderna com a paleta *Catppuccin Mocha* |
| 🐙 **Integração com GitHub** | Exibe repositórios, estrelas e linguagens do professor via API |
| 💳 **Sistema de Matrículas** | Processamento seguro de cartão de crédito via SDK do Mercado Pago |
| 📬 **Formulário de Contato** | Envio de mensagens integrado ao backend e ao Formspree |
| 📚 **Ementa Interativa** | Accordion com os módulos do curso organizados por nível |

---

## 🛠️ Stack Tecnológica

### Frontend
- **HTML5** semântico
- **CSS3** — Flexbox, Grid, variáveis CSS
- **JavaScript Vanilla** — Fetch API, manipulação de DOM

### Backend / Serverless (`/api`)
- **Node.js** + **Express**
- **Mercado Pago SDK** — processamento de pagamentos
- **Nodemailer** — e-mails transacionais
- **Cors** + **Dotenv**

### Design & Infra
- 🎨 Paleta: [Catppuccin Mocha](https://catppuccin.com/)
- 🚀 Deploy frontend: [GitHub Pages](https://pages.github.com/)
- 🔧 Backend externo: [Render](https://render.com/) — repositório separado

---

## 🏗️ Arquitetura

```
Browser (Cliente)
    │
    ├──► GitHub Pages (Frontend estático)
    │
    └──► Render (Backend principal — repositório separado)
              ├── /api/github      ← repositórios do professor
              ├── /api/matricula/payment  ← processa pagamento
              └── /api/contato     ← formulário de contato
```

---

## 📁 Estrutura de Arquivos

```
CursoDeProgWeb/
├── api/                  # Funções auxiliares de API
├── .vscode/              # Configurações do editor (Live Server)
├── index.html            # Página principal (landing page)
├── ementa.html           # Página de ementa do curso
├── style.css             # Estilos da landing page
├── ementacss.css         # Estilos da ementa
├── script.js             # JS da landing page
├── ementa.js             # JS da ementa interativa
├── foto.jpg              # Foto do professor
└── package.json          # Dependências Node.js
```

---

## 👥 Equipe

Desenvolvido por estudantes como projeto de curso:

| Nome |
|------|
| Henrique França de Souza Medeiros |
| Gustavo Nunes da Silva Pereira |
| José Francisco Paes Landim Sobrinho |
| Ricardo Cronemberger Cruz Ruben Pereira |
| João Guilherme Aragão Malta |

---

<div align="center">

Feito com 💜 usando a paleta [Catppuccin Mocha](https://catppuccin.com/)

</div>

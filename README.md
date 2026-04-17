# Blog Infinito Curioso — Prof. Mariana

Blog educacional full stack com painel administrativo para a professora publicar e gerenciar artigos, e uma interface pública para os alunos lerem o conteúdo.

O projeto é desenvolvido em **Flask** (backend) e **React** (frontend), seguindo uma arquitetura organizada em **Models, Services e Routes** no backend e separação por contexto no frontend.

---

## Tecnologias utilizadas

### Backend
- **Python 3**
- **Flask** — framework web
- **Flask-SQLAlchemy** — ORM para o banco de dados
- **Flask-Migrate / Alembic** — migrações do banco de dados
- **Flask-JWT-Extended** — autenticação com tokens JWT
- **Flask-CORS** — liberação de acesso entre frontend e backend
- **Flasgger / Swagger** — documentação automática da API
- **python-dotenv** — carregamento de variáveis de ambiente
- **python-slugify** — geração automática de slugs a partir do título
- **SQLite** — banco de dados local (desenvolvimento)

### Frontend
- **React 19** — biblioteca de interface
- **Vite** — bundler e servidor de desenvolvimento
- **React Router DOM** — navegação entre páginas (SPA)
- **Axios** — cliente HTTP para comunicação com a API
- **Tailwind CSS v4** — estilização utilitária
- **Context API** — gerenciamento do estado de autenticação

### Ferramentas
- **Postman / Insomnia** — testes da API
- **DB Browser for SQLite** — visualização do banco de dados
- **Git e GitHub** — versionamento

---

## Estrutura do projeto

```
prof_mariana_blog/
│
├── backend/
│   ├── app/
│   │   ├── models/              # Modelos de dados (tabelas do banco)
│   │   │   ├── user.py          # Modelo de usuário (professor)
│   │   │   └── article.py       # Modelo de artigo (com author_id)
│   │   │
│   │   ├── service/             # Regras de negócio
│   │   │   └── article_service.py
│   │   │
│   │   ├── routes/              # Endpoints da API
│   │   │   ├── auth_routes.py   # /auth/register, /auth/login, /auth/me
│   │   │   └── article_routes.py # /articles/
│   │   │
│   │   ├── config.py            # Configurações via variáveis de ambiente
│   │   └── __init__.py          # Criação e configuração do app Flask
│   │
│   ├── migrations/              # Histórico de migrações do banco
│   ├── .env                     # Variáveis de ambiente (não vai ao GitHub)
│   ├── run.py                   # Ponto de entrada do servidor
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── client.js        # Instância Axios com interceptors JWT
    │   │   ├── auth.js          # Serviço de autenticação
    │   │   └── articles.js      # Serviço de artigos
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx  # Estado global de autenticação
    │   │
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Proteção de rotas autenticadas
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx         # Listagem pública de artigos
    │   │   ├── ArticlePage.jsx  # Leitura de um artigo pelo slug
    │   │   ├── Login.jsx        # Login da professora
    │   │   ├── Register.jsx     # Cadastro
    │   │   └── Dashboard.jsx    # Painel da professora (CRUD de artigos)
    │   │
    │   ├── App.jsx              # Configuração de rotas
    │   └── main.jsx             # Ponto de entrada React (com AuthProvider)
    │
    ├── .env                     # URL da API
    └── vite.config.js
```

---

## Como executar o projeto

### Backend

#### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio/backend
```

#### 2. Criar e ativar o ambiente virtual

Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

Linux ou Mac:
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Instalar dependências
```bash
pip install -r requirements.txt
```

#### 4. Configurar variáveis de ambiente

Crie o arquivo `backend/.env` com o seguinte conteúdo:
```
JWT_SECRET_KEY=sua-chave-secreta-com-pelo-menos-32-caracteres
DATABASE_URL=sqlite:///blog.db
```

Para gerar uma chave segura:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

#### 5. Criar o banco de dados
```bash
flask db upgrade
```

#### 6. Iniciar o servidor
```bash
python run.py
```

O servidor estará disponível em: `http://127.0.0.1:5000`

---

### Frontend

#### 1. Entrar na pasta do frontend
```bash
cd frontend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Configurar a URL da API

Verifique que o arquivo `frontend/.env` contém:
```
VITE_API_URL=http://127.0.0.1:5000
```

#### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## Endpoints da API

### Autenticação

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | Cadastro de novo usuário | Não |
| POST | `/auth/login` | Login e geração do token JWT | Não |
| GET | `/auth/me` | Dados do usuário logado | Sim |

#### Exemplo — Login
```json
POST /auth/login
{
  "email": "professora@email.com",
  "password": "suasenha"
}
```
Resposta:
```json
{
  "access_token": "eyJ...",
  "user": { "id": 1, "username": "mariana", "email": "professora@email.com" }
}
```

### Artigos

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/articles/` | Lista todos os artigos | Não |
| GET | `/articles/<slug>` | Busca artigo pelo slug | Não |
| POST | `/articles/` | Cria novo artigo | Sim |
| PATCH | `/articles/<id>` | Atualiza artigo | Sim |
| DELETE | `/articles/<id>` | Remove artigo | Sim |

#### Exemplo — Criar artigo
```json
POST /articles/
Authorization: Bearer <token>

{
  "title": "Como estudar programação",
  "slug": "como-estudar-programacao",
  "content": "Conteúdo do artigo...",
  "reading_time": 5
}
```

> O slug é opcional: se não for enviado, é gerado automaticamente a partir do título.

---

## Rotas do frontend

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Home — lista de artigos | Público |
| `/artigos/:slug` | Leitura de um artigo | Público |
| `/login` | Login da professora | Público |
| `/cadastro` | Cadastro | Público |
| `/painel` | Dashboard da professora | Protegido |

---

## Testando a API

### Com Swagger (recomendado)

Após iniciar o servidor, acesse:
```
http://localhost:5000/apidocs
```
É possível visualizar todos os endpoints, ver os parâmetros e testar requisições diretamente pelo navegador.

### Com Postman ou Insomnia

1. Faça uma requisição `POST /auth/login` com email e senha
2. Copie o `access_token` da resposta
3. Nas rotas protegidas, adicione o header: `Authorization: Bearer <token>`

### Com DB Browser for SQLite

Abra o arquivo `backend/instance/blog.db` para visualizar as tabelas e dados diretamente.

---

## Roadmap do projeto

### ✅ Versão 1 — MVP Backend
- [x] Estrutura inicial do Flask (Models, Services, Routes)
- [x] Model de artigos
- [x] Service layer
- [x] Rotas da API (CRUD de artigos)
- [x] Documentação Swagger

### ✅ Versão 2 — Autenticação e Segurança
- [x] Model de usuário
- [x] Autenticação JWT (register, login, /me)
- [x] Rotas protegidas com JWT
- [x] Variáveis de ambiente (JWT_SECRET_KEY via .env)
- [x] Expiração de token configurada (2 horas)
- [x] Relacionamento artigo → autor (author_id)
- [x] Validação de campos obrigatórios
- [x] Geração automática de slug com python-slugify
- [x] Tratamento de slug duplicado

### ✅ Versão 3 — Frontend React
- [x] Setup com Vite + React + Tailwind CSS
- [x] Sistema de rotas com React Router DOM
- [x] Contexto de autenticação (AuthContext + AuthProvider)
- [x] Cliente Axios com interceptors JWT
- [x] Página Home (listagem pública de artigos)
- [x] Página ArticlePage (leitura pelo slug)
- [x] Página Login
- [x] Página Register
- [x] Componente ProtectedRoute
- [x] Dashboard da professora (criar, editar, deletar artigos)

### 🔜 Próximas melhorias
- [ ] Redirecionamento automático após login (`useNavigate`)
- [ ] Feedback visual de erros (componente Toast/Alert)
- [ ] Validação de senha no Register (confirmar senha)
- [ ] Editor de texto rico (TipTap ou React-Quill)
- [ ] Paginação de artigos
- [ ] Categorias e tags
- [ ] Upload de imagem de capa

---

## Objetivo do projeto

Este projeto é o blog educacional **Infinito Curioso** da Prof. Mariana. O objetivo é oferecer uma plataforma onde a professora pode publicar e gerenciar artigos com facilidade, e os alunos podem acessá-los de forma simples e organizada.

O desenvolvimento é usado também como estudo prático de arquitetura de APIs REST com Python e Flask, desenvolvimento de SPA com React, autenticação JWT e boas práticas de organização de código.
# Blog Educacional - API

API backend para gerenciamento de artigos de um blog educacional.  
O projeto está sendo desenvolvido com **Flask** seguindo uma arquitetura organizada em **Models, Services e Routes**, permitindo escalabilidade e manutenção mais fácil.

---

## Tecnologias utilizadas

- **Python 3**
- **Flask**
- **Flask SQLAlchemy**
- **SQLite** (banco inicial)
- **Postman** para testes da API
- **Git e GitHub** para versionamento

---

## Estrutura do projeto
``` 
backend/
│
├── app/
│ ├── models/ # Modelos de dados (tabelas do banco)
│ │ └── article.py
│ │
│ ├── services/ # Regras de negócio da aplicação
│ │ └── article_service.py
│ │
│ ├── routes/ # Endpoints da API
│ │ └── article_routes.py
│ │
│ └── init.py # Criação e configuração da aplicação Flask
│
├── run.py # Arquivo para iniciar o servidor
├── requirements.txt # Dependências do projeto

```
---

## Como executar o projeto
### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio/backend
```

### 2. Criar ambiente virtual
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

### 3. Instalar dependências
```bash
pip install -r requirements.txt
```

### 4. Execute o servidor
```bash
python run.py
```

## Endpoints
```
GET /articles/
GET /articles/<slug>
```

## Criar artigo
```
POST /articles/
```

```json
{
  "title": "Como estudar programação",
  "slug": "como-estudar-programacao",
  "content": "Conteúdo do artigo...",
  "reading_time": 5
}
```

## Testando a API
A API pode ser testada utilizando ferramentas como:

- Postman
- Insomnia
- curl

## Roadmap do projeto
### Versão 1 – MVP Backend
- Estrutura inicial do Flask
- Model de artigos
- Service layer
- Rotas da API
- Testes da API
  
### Versão 2 – Recursos do blog
- Categorias
- Tags
- Paginação
- Upload de imagens

### Versão 3 – CMS
- Autenticação de administrador
- Editor de artigos
- Markdown
- Painel administrativo

## Objetivo do projeto
Este projeto faz parte de um estudo prático de desenvolvimento de APIs REST com Python e Flask, com foco em boas práticas de arquitetura, organização de código e versionamento com Git.



### 1. Clonar o repositório


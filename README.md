
# 🛒 MultiLojas - Vitrine Digital Marketplace

Plataforma de vitrine digital que permite a múltiplos empreendedores gerenciarem suas próprias lojas virtuais, com busca unificada, carrinho por loja e cálculo de frete.

## 🚀 Tecnologias Utilizadas

- **Backend:** Python 3.x, Django, Django REST Framework (DRF)
- **Frontend:** React (Vite), Axios, TailwindCSS
- **Banco de Dados:** PostgreSQL (Produção) / SQLite (Desenvolvimento)

## 🛠️ Configuração do Ambiente (Setup)

### 1. Pré-requisitos
- Python instalado
- Node.js e npm instalados
- Git configurado

### 2. Backend (Django)
1. Acesse a pasta do backend:
   ```bash
   cd backend

2. Crie e ative o ambiente virtual:
   ```bash
   python -m venv venv
   
# Windows:
.\venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

3. Instale as dependências:

pip install django djangorestframework django-cors-headers djangorestframework-simplejwt bcrypt

4. Execute as migrações e inicie o servidor:
    ```bash
    python manage.py migrate
    python manage.py runserver

### 3. Frontend (React)
1. Em um novo terminal, acesse a pasta do frontend:
    ```bash
    cd frontend
2. Instale as dependências:
    ```bash
    npm install
3. Inicie o ambiente de desenvolvimento:
    ```bash
    npm run dev
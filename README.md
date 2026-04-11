# multilojas-marketplace

# 🛒 MultiLojas - Vitrine Digital Marketplace

Plataforma de vitrine digital que permite a múltiplos empreendedores gerenciarem suas próprias lojas virtuais, com busca unificada, carrinho por loja e cálculo de frete.

## 🚀 Tecnologias Utilizadas

- [cite_start]**Backend:** Python 3.x, Django, Django REST Framework (DRF) [cite: 5, 24]
- [cite_start]**Frontend:** React (Vite), Axios, TailwindCSS [cite: 5, 17, 22]
- [cite_start]**Banco de Dados:** PostgreSQL (Produção) / SQLite (Desenvolvimento) [cite: 5, 28]

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

python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

3. Instale as dependências:

pip install django djangorestframework django-cors-headers

4. Execute as migrações e inicie o servidor:

python manage.py migrate
python manage.py runserver

### 3. Frontend (React)
Em um novo terminal, acesse a pasta do frontend:

cd frontend
Instale as dependências:

npm install
Inicie o ambiente de desenvolvimento:

npm run dev
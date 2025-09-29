# Project Structure

## Backend (`./backend/`)

backend/
├── models/
│   ├── __init__.py
│   └── requests.py
├── services/
│   ├── __init__.py
│   └── gemini_service.py
├── utils/
│   ├── __init__.py
│   └── timezone_helper.py
├── .env
├── main.py
└── requirements.txt

## Frontend (`./frontend/`)

frontend/
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── 404.html
│   └── 500.html
├── .env
├── .gitignore
├── app.py
└── requirements.txt

## Root Directory

.
├── backend/
├── frontend/
├── .env
├── .gitignore
├── PROJECT_STRUCTURE.md
└── README.md

## Key Files Explained

### Backend (FastAPI)

- `main.py`: Main FastAPI application entry point with API endpoints
- `models/requests.py`: Pydantic models for request validation
- `services/gemini_service.py`: Service class for Gemini AI integration
- `utils/timezone_helper.py`: Timezone conversion utilities for IST
- `requirements.txt`: Python dependencies for FastAPI backend

### Frontend (Flask)

- `app.py`: Main Flask application with routes and API proxy
- `templates/base.html`: Base HTML template with common layout
- `templates/index.html`: Main application page with text/image input
- `static/css/style.css`: Custom CSS styles with stationery theme
- `static/js/main.js`: JavaScript for frontend functionality
- `requirements.txt`: Python dependencies for Flask frontend

### Configuration

- `.env` files: Environment variables for both backend and frontend
- `.gitignore`: Git ignore patterns for Python projects
- `README.md`: Updated documentation for Flask/FastAPI architecture
# MOM Builder Free

MOM Builder Free is a web application that generates professional Minutes of Meeting (MOM) from text or images of handwritten notes using Google Gemini 2.5 Flash AI.

## Project Structure

This repository contains both the backend and frontend of the application:

- [Backend](#backend) - FastAPI server with Gemini integration
- [Frontend](#frontend) - Flask web application with HTML templates

## Backend

The backend is a FastAPI application that provides RESTful APIs for processing text and images using the Gemini 2.5 Flash model.

### Features
- RESTful API for processing text and image inputs
- Integration with Gemini 2.5 Flash for OCR and text processing
- Support for both text and image inputs (1-10 images)
- Privacy-first approach with secure, temporary processing
- Timezone handling (IST/Asia-Kolkata)
- Structured MOM output in Markdown format
- Async processing for better performance

### Tech Stack
- FastAPI
- Google Generative AI (Gemini API)
- Pydantic for data validation
- Python-dotenv for environment management
- Uvicorn for ASGI server

### Getting Started
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8000
   ```

4. Start the server:
   ```bash
   python main.py
   ```
   Or using uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### API Endpoints
- GET `/` - Root endpoint
- GET `/api/health` - Health check endpoint
- POST `/api/process-text` - Process text input
- POST `/api/process-images` - Process image inputs (base64)

## Frontend

The frontend is a Flask web application that provides a clean UI for users to input text or upload images and receive generated MOMs.

### Features
- Clean, modern UI with stationery material theme
- Text input area for pasting meeting notes
- Image upload for 1-10 images of handwritten notes
- Real-time processing status
- Downloadable MOM in Markdown format
- Responsive design for all devices
- Server-side rendering with Jinja2 templates

### Tech Stack
- Flask
- Jinja2 templates
- Tailwind CSS for styling
- Vanilla JavaScript for interactivity
- Marked.js for Markdown rendering

### Getting Started
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file:
   ```
   SECRET_KEY=your-secret-key-here
   BACKEND_URL=http://localhost:8000
   PORT=5000
   ```

4. Start the development server:
   ```bash
   python app.py
   ```

## Running the Complete Application

1. Start the FastAPI backend:
   ```bash
   cd backend
   python main.py
   ```

2. Start the Flask frontend (in a new terminal):
   ```bash
   cd frontend
   python app.py
   ```

3. Open your browser and navigate to `http://localhost:5000`

## Deployment

### Backend Deployment
The FastAPI backend can be deployed using:
- Docker containers
- Cloud platforms (AWS, GCP, Azure)
- Heroku, Railway, or similar PaaS

### Frontend Deployment
The Flask frontend can be deployed using:
- Traditional web servers (Apache, Nginx)
- Cloud platforms
- PaaS solutions

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
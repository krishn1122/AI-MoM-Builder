# 📝 MOM Builder Free

<div align="center">

![MOM Builder Free](https://img.shields.io/badge/MOM%20Builder-Free-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=for-the-badge&logo=fastapi)
![Flask](https://img.shields.io/badge/Flask-3.0+-red?style=for-the-badge&logo=flask)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Generate professional Minutes of Meeting (MOM) from text, images, PDFs, and documents using Google Gemini 2.5 Flash AI**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🎯 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🤝 Contributing](#-contributing)

</div>

---

## 🎯 Features

✨ **Multi-Format Input Support**
- 📝 **Text Input**: Paste meeting notes directly
- 📁 **File Upload**: Support for multiple file types:
  - 🖼️ **Images**: PNG, JPG, GIF, WEBP (OCR + Vision AI)
  - 📄 **PDFs**: Automatic text extraction
  - 📘 **Word Documents**: DOCX file processing
  - 📃 **Text Files**: Direct TXT file support
- 🔄 **Mixed Content**: Process images and documents together (up to 10 files)

🤖 **AI-Powered Processing**
- 🧠 Google Gemini 2.5 Flash integration
- 🔍 Advanced OCR for handwritten text and images
- 📄 Smart text extraction from PDFs and DOCX files
- 📋 Structured MOM generation with professional formatting

📥 **Multiple Download Formats**
- 📝 **Markdown (.md)**: Original format with full formatting
- 📄 **Plain Text (.txt)**: Clean text without formatting
- 📘 **Word Document (.docx)**: Professional document with styling
- 🎯 **Smart Naming**: Files named after meeting agenda/title

🎨 **Modern Interface**
- 📱 Responsive design for all devices
- 🎯 Clean, professional UI with Tailwind CSS
- ⚡ Real-time processing status and progress indicators
- 🖼️ Smart file previews with type-specific icons
- 🗂️ Drag & drop file upload with validation

🔒 **Privacy & Security**
- 🛡️ Secure, temporary processing
- 🌍 IST timezone handling
- 🔐 No data storage or retention
- 🔄 Client-side file processing where possible

---

## 📸 Interface Screenshots

### Text Input Interface
![Text Input Interface](./assets/text-input-interface.png)

### File Upload Interface
![File Upload Interface](./assets/image-upload-interface.png)
*Supports images, PDFs, DOCX, and TXT files with smart previews*

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/mom-builder-free.git
cd mom-builder-free
```

### 2️⃣ Install Dependencies
```bash
# Install all required dependencies automatically
python install_dependencies.py
```

### 3️⃣ Set Up Backend (FastAPI)
```bash
cd backend
# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
echo "PORT=8000" >> .env

# Start backend server
python main.py
```

### 4️⃣ Set Up Frontend (Flask)
```bash
# In a new terminal
cd frontend
# Create .env file
echo "SECRET_KEY=your-secret-key-here" > .env
echo "BACKEND_URL=http://localhost:8000" >> .env
echo "PORT=5000" >> .env

# Start frontend server
python app.py
```

### 5️⃣ Access the Application
Open your browser and navigate to: **http://localhost:5000**

---

## 🏗️ Project Structure

```
mom-builder-free/
├── 📁 backend/                 # FastAPI Backend
│   ├── 📁 models/             # Pydantic models
│   │   └── 📄 requests.py     # Request/response models
│   ├── 📁 services/           # Business logic
│   │   ├── 📄 gemini_service.py      # AI integration
│   │   ├── 📄 file_processor.py      # Multi-format file processing
│   │   └── 📄 file_converter.py      # Download format conversion
│   ├── 📁 utils/              # Helper utilities
│   │   └── 📄 timezone_helper.py     # IST timezone handling
│   ├── 📄 main.py             # FastAPI app entry point
│   └── 📄 requirements.txt    # Backend dependencies
├── 📁 frontend/               # Flask Frontend
│   ├── 📁 static/             # CSS, JS, assets
│   │   ├── 📁 css/           # Tailwind CSS styling
│   │   └── 📁 js/            # Interactive JavaScript
│   ├── 📁 templates/          # Jinja2 templates
│   │   └── 📄 index.html     # Main application interface
│   ├── 📄 app.py              # Flask app entry point
│   └── 📄 requirements.txt    # Frontend dependencies
├── 📁 assets/                 # Documentation & UI assets
│   ├── 📄 txt.png            # TXT file icon
│   ├── 📄 docx.png           # DOCX file icon
│   └── 📄 substance.png      # Markdown file icon
├── 📄 install_dependencies.py  # Automated dependency installer
├── 📄 main.py                 # Alternative backend entry point
├── 📄 README.md               # Project documentation
└── 📄 .gitignore             # Git ignore rules
```

---

## 🛠️ Tech Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern, fast web framework
- **[Google Generative AI](https://ai.google.dev/)** - Gemini 2.5 Flash integration
- **[Pydantic](https://pydantic.dev/)** - Data validation and serialization
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server
- **[python-docx](https://python-docx.readthedocs.io/)** - Word document processing
- **[PyPDF2](https://pypdf2.readthedocs.io/)** - PDF text extraction
- **[pdfplumber](https://github.com/jsvine/pdfplumber)** - Advanced PDF processing

### Frontend
- **[Flask](https://flask.palletsprojects.com/)** - Lightweight web framework
- **[Jinja2](https://jinja.palletsprojects.com/)** - Template engine
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Marked.js](https://marked.js.org/)** - Markdown parser and renderer
- **Vanilla JavaScript** - Interactive file handling and UI

---

## 📖 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root endpoint |
| `GET` | `/api/health` | Health check with IST timestamp |
| `POST` | `/api/process-text` | Process text input for MOM generation |
| `POST` | `/api/process-images` | Process files (images, PDFs, DOCX, TXT) |
| `POST` | `/api/download-mom/txt` | Download MOM as plain text |
| `POST` | `/api/download-mom/docx` | Download MOM as Word document |

### Example Request (Text Processing)
```bash
curl -X POST "http://localhost:8000/api/process-text" \
     -H "Content-Type: application/json" \
     -d '{"text": "Meeting notes here..."}'
```

### Example Request (File Processing)
```bash
curl -X POST "http://localhost:8000/api/process-images" \
     -H "Content-Type: application/json" \
     -d '{"images": ["data:image/jpeg;base64,/9j/4AAQ...", "data:application/pdf;base64,JVBERi0x..."]}'
```

### Example Response
```json
{
  "success": true,
  "data": {
    "content": "# Minutes of Meeting — Project Kickoff\n\n**Date:** 30-Sep-2025 **Time:** 16:20 IST **Mode:** Hybrid\n\n## Agenda\n1. Project overview\n2. Timeline discussion\n3. Resource allocation\n\n## Key Discussion Points\n- Budget approved for Q4\n- Team expansion planned\n- New technology stack evaluation\n\n## Decisions Made\n- Go-live date: December 15, 2025\n- Weekly sprint reviews\n- Remote work policy updated\n\n## Action Items\n| Task | Assignee | Due Date |\n|------|----------|----------|\n| Setup development environment | John Doe | Oct 5, 2025 |\n| Finalize requirements | Jane Smith | Oct 10, 2025 |\n\n## Next Meeting\n**Date:** October 7, 2025 **Time:** 2:00 PM IST",
    "format": "markdown"
  }
}
```

---

## 🚀 Deployment

### Live Demo
- **Frontend**: [https://mom-builder-free.vercel.app](https://mom-builder-free.vercel.app) (Vercel)
- **Backend API**: [https://mom-builder-backend.railway.app](https://mom-builder-backend.railway.app) (Railway)

### Quick Deploy

#### Backend on Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

1. Click the Railway button above
2. Add your `GEMINI_API_KEY` environment variable
3. Deploy and note the Railway URL

#### Frontend on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/krishn1122/mom-builder-free&project-name=mom-builder-free&repository-name=mom-builder-free&root-directory=frontend)

1. Click the Vercel button above
2. Set root directory to `frontend`
3. Add environment variables:
   - `SECRET_KEY`: Your secret key
   - `BACKEND_URL`: Your Railway backend URL
   - `ENVIRONMENT`: `production`

### Manual Deployment
For detailed step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables

**Backend (Railway):**
```env
GEMINI_API_KEY=your_gemini_api_key_here
ENVIRONMENT=production
PORT=8000
```

**Frontend (Vercel):**
```env
SECRET_KEY=your-secret-key-here
BACKEND_URL=https://your-railway-app.railway.app
ENVIRONMENT=production
```

---

## 🎯 Usage Guide

### 📝 Text Input Mode
1. Click on **"Text Input"** tab
2. Paste your meeting notes, agendas, or discussions
3. Click **"Generate MOM"**
4. Download in your preferred format (MD, TXT, DOCX)

### 📁 File Upload Mode
1. Click on **"File Upload"** tab
2. Upload files (up to 10):
   - **Images**: Meeting photos, whiteboard captures, handwritten notes
   - **PDFs**: Meeting agendas, presentation slides
   - **DOCX**: Word documents with meeting content
   - **TXT**: Plain text files with notes
3. Mix different file types as needed
4. Click **"Generate MOM from Files"**
5. Download with smart filename based on meeting title

### 📥 Download Options
- **📝 Markdown (.md)**: Full formatting preserved
- **📄 Text (.txt)**: Clean, readable plain text
- **📘 Word (.docx)**: Professional document with styling

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup
```bash
# Install all dependencies
python install_dependencies.py

# Run backend tests
cd backend && python -m pytest

# Run frontend in development mode
cd frontend && python app.py
```

### 🐛 Known Issues & Limitations
- PDF processing works best with text-based PDFs
- Handwritten text recognition depends on image quality
- Maximum file size: 10MB per file
- DOCX processing supports basic formatting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** for providing advanced AI capabilities
- **[FastAPI](https://fastapi.tiangolo.com/)** for the excellent web framework
- **[Flask](https://flask.palletsprojects.com/)** for the lightweight frontend framework
- **[Tailwind CSS](https://tailwindcss.com/)** for the beautiful UI components
- **Open Source Community** for the amazing tools and libraries

---

## 🔄 Version History

### v2.0.0 (Latest) - Multi-Format Support
- ✅ Added support for PDF, DOCX, and TXT files
- ✅ Multiple download formats (MD, TXT, DOCX)
- ✅ Smart file previews with type-specific icons
- ✅ Enhanced UI with dropdown download menu
- ✅ Automated dependency installation script

### v1.0.0 - Initial Release
- ✅ Text input processing
- ✅ Image upload with OCR
- ✅ Basic markdown download
- ✅ Responsive web interface

---

## 🚀 Future Roadmap

- [ ] **Real-time Collaboration**: Multi-user editing
- [ ] **Meeting Templates**: Pre-defined MOM formats
- [ ] **Calendar Integration**: Automatic meeting scheduling
- [ ] **Audio Processing**: Voice-to-MOM conversion
- [ ] **Export Options**: PowerPoint, Excel formats
- [ ] **Meeting Analytics**: Insights and reporting
- [ ] **Mobile App**: Native iOS/Android applications

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**🚀 Built with cutting-edge AI technology for modern teams**

Made with ❤️ by [Krishn Jatav](https://github.com/krishn1122)

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=krishn1122.mom-builder-free)
![GitHub Stars](https://img.shields.io/github/stars/krishn1122/mom-builder-free?style=social)
![GitHub Forks](https://img.shields.io/github/forks/krishn1122/mom-builder-free?style=social)

</div>

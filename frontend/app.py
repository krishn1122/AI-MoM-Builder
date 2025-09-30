from flask import Flask, render_template, request, jsonify, send_from_directory, Response
import requests
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Backend API URL
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:8000')

@app.route('/')
def index():
    """Main page with text and image input options"""
    return render_template('index.html')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    """Serve assets from the assets folder"""
    import os
    try:
        # Get the project root directory (parent of frontend folder)
        current_dir = os.path.dirname(os.path.abspath(__file__))  # frontend folder
        project_root = os.path.dirname(current_dir)  # project root
        assets_dir = os.path.join(project_root, 'assets')
        
        if not os.path.exists(assets_dir):
            return jsonify({'error': f'Assets directory not found: {assets_dir}'}), 404
            
        file_path = os.path.join(assets_dir, filename)
        if not os.path.exists(file_path):
            return jsonify({'error': f'Asset file not found: {filename}'}), 404
            
        return send_from_directory(assets_dir, filename)
    except Exception as e:
        return jsonify({'error': f'Error serving asset: {str(e)}'}), 500

@app.route('/api/process-text', methods=['POST'])
def process_text():
    """Process text input via backend API"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Text input is required'}), 400
        
        # Forward request to FastAPI backend
        response = requests.post(
            f"{BACKEND_URL}/api/process-text",
            json={'text': data['text']},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            error_data = response.json() if response.headers.get('content-type') == 'application/json' else {'detail': 'Unknown error'}
            return jsonify({'error': error_data.get('detail', 'Failed to process text')}), response.status_code
            
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Backend connection error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/api/process-images', methods=['POST'])
def process_images():
    """Process image inputs via backend API"""
    try:
        data = request.get_json()
        
        if not data or 'images' not in data:
            return jsonify({'error': 'Images are required'}), 400
        
        if not isinstance(data['images'], list) or len(data['images']) == 0:
            return jsonify({'error': 'At least one image is required'}), 400
        
        if len(data['images']) > 10:
            return jsonify({'error': 'Maximum 10 images allowed'}), 400
        
        # Forward request to FastAPI backend
        response = requests.post(
            f"{BACKEND_URL}/api/process-images",
            json={'images': data['images']},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            error_data = response.json() if response.headers.get('content-type') == 'application/json' else {'detail': 'Unknown error'}
            return jsonify({'error': error_data.get('detail', 'Failed to process images')}), response.status_code
            
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Backend connection error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/api/download-mom/<format>', methods=['POST'])
def download_mom(format):
    """Download MOM in specified format via backend API"""
    try:
        data = request.get_json()
        
        if not data or 'content' not in data:
            return jsonify({'error': 'Content is required'}), 400
        
        # Forward request to FastAPI backend
        response = requests.post(
            f"{BACKEND_URL}/api/download-mom/{format}",
            json=data,
            headers={'Content-Type': 'application/json'},
            stream=True
        )
        
        if response.status_code == 200:
            # Forward the file response
            def generate():
                for chunk in response.iter_content(chunk_size=8192):
                    yield chunk
            
            # Get filename from backend response headers
            content_disposition = response.headers.get('Content-Disposition', '')
            
            return Response(
                generate(),
                mimetype=response.headers.get('Content-Type'),
                headers={'Content-Disposition': content_disposition}
            )
        else:
            error_data = response.json() if response.headers.get('content-type') == 'application/json' else {'detail': 'Unknown error'}
            return jsonify({'error': error_data.get('detail', f'Failed to download {format} file')}), response.status_code
            
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Backend connection error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/health')
def health():
    """Health check endpoint"""
    try:
        # Check backend health
        response = requests.get(f"{BACKEND_URL}/api/health", timeout=5)
        backend_status = response.status_code == 200
    except:
        backend_status = False
    
    return jsonify({
        'status': 'OK' if backend_status else 'WARNING',
        'frontend': 'OK',
        'backend': 'OK' if backend_status else 'UNAVAILABLE',
        'service': 'MOM Builder Free Frontend'
    })

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

# For Vercel deployment
app.debug = os.getenv('ENVIRONMENT', 'development') == 'development'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('ENVIRONMENT', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

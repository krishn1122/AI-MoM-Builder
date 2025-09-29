// MOM Builder Free - Frontend JavaScript

class MOMBuilder {
    constructor() {
        this.activeTab = 'text';
        this.uploadedImages = [];
        this.isProcessing = false;
        this.currentMOMContent = '';
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Tab switching
        document.getElementById('text-tab').addEventListener('click', () => this.switchTab('text'));
        document.getElementById('image-tab').addEventListener('click', () => this.switchTab('image'));
        
        // Text processing
        document.getElementById('process-text-btn').addEventListener('click', () => this.processText());
        
        // Image processing
        document.getElementById('process-images-btn').addEventListener('click', () => this.processImages());
        
        // File input and dropzone
        const fileInput = document.getElementById('file-input');
        const dropzone = document.getElementById('dropzone');
        
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        dropzone.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
        dropzone.addEventListener('dragover', (e) => this.handleDragOver(e));
        dropzone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        dropzone.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Download MOM
        document.getElementById('download-btn').addEventListener('click', () => this.downloadMOM());
        
        // Text input validation
        const textInput = document.getElementById('meeting-notes');
        textInput.addEventListener('input', () => this.validateTextInput());
    }

    switchTab(tab) {
        this.activeTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active', 'border-indigo-500', 'text-indigo-600');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        
        const activeTabBtn = document.getElementById(`${tab}-tab`);
        activeTabBtn.classList.add('active', 'border-indigo-500', 'text-indigo-600');
        activeTabBtn.classList.remove('border-transparent', 'text-gray-500');
        
        // Update content sections
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.add('hidden');
        });
        
        document.getElementById(`${tab}-input-section`).classList.remove('hidden');
        
        // Clear errors
        this.hideError();
    }

    validateTextInput() {
        const text = document.getElementById('meeting-notes').value.trim();
        const processBtn = document.getElementById('process-text-btn');
        
        processBtn.disabled = !text || this.isProcessing;
    }

    async processText() {
        const text = document.getElementById('meeting-notes').value.trim();
        
        if (!text) {
            this.showError('Please enter some text');
            return;
        }
        
        this.setProcessing(true);
        this.hideError();
        
        try {
            const response = await fetch('/api/process-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                this.displayMOM(data.data.content);
            } else {
                this.showError(data.error || 'Failed to process text');
            }
        } catch (error) {
            console.error('Error processing text:', error);
            this.showError('Network error. Please check your connection and try again.');
        } finally {
            this.setProcessing(false);
        }
    }

    async processImages() {
        if (this.uploadedImages.length === 0) {
            this.showError('Please upload at least one image');
            return;
        }
        
        this.setProcessing(true);
        this.hideError();
        
        try {
            const imageStrings = this.uploadedImages.map(img => img.dataUrl);
            
            const response = await fetch('/api/process-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ images: imageStrings })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                this.displayMOM(data.data.content);
            } else {
                this.showError(data.error || 'Failed to process images');
            }
        } catch (error) {
            console.error('Error processing images:', error);
            this.showError('Network error. Please check your connection and try again.');
        } finally {
            this.setProcessing(false);
        }
    }

    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.processFiles(files);
    }

    handleDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('dragover');
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('dragover');
    }

    handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('dragover');
        
        const files = Array.from(event.dataTransfer.files);
        this.processFiles(files);
    }

    processFiles(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length === 0) {
            this.showError('Please select valid image files (PNG, JPG)');
            return;
        }
        
        if (this.uploadedImages.length + imageFiles.length > 10) {
            this.showError('Maximum 10 images allowed');
            return;
        }
        
        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                    id: Math.random().toString(36).substr(2, 9),
                    file: file,
                    dataUrl: e.target.result
                };
                
                this.uploadedImages.push(imageData);
                this.updateImagePreview();
            };
            reader.readAsDataURL(file);
        });
    }

    updateImagePreview() {
        const container = document.getElementById('image-preview-container');
        const grid = document.getElementById('image-preview-grid');
        const count = document.getElementById('image-count');
        const processBtn = document.getElementById('process-images-btn');
        
        count.textContent = this.uploadedImages.length;
        
        if (this.uploadedImages.length > 0) {
            container.classList.remove('hidden');
            processBtn.disabled = false;
        } else {
            container.classList.add('hidden');
            processBtn.disabled = true;
        }
        
        grid.innerHTML = '';
        
        this.uploadedImages.forEach(image => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-preview';
            imageDiv.innerHTML = `
                <img src="${image.dataUrl}" alt="Preview">
                <button type="button" class="remove-image" onclick="momBuilder.removeImage('${image.id}')">
                    <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `;
            grid.appendChild(imageDiv);
        });
    }

    removeImage(imageId) {
        this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
        this.updateImagePreview();
    }

    displayMOM(content) {
        this.currentMOMContent = content;
        
        const container = document.getElementById('mom-container');
        const contentDiv = document.getElementById('mom-content');
        
        // Convert markdown to HTML using marked.js
        contentDiv.innerHTML = marked.parse(content);
        
        container.classList.remove('hidden');
        
        // Scroll to MOM section
        container.scrollIntoView({ behavior: 'smooth' });
    }

    downloadMOM() {
        if (!this.currentMOMContent) {
            this.showError('No MOM content to download');
            return;
        }
        
        const blob = new Blob([this.currentMOMContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mom.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    setProcessing(processing) {
        this.isProcessing = processing;
        
        const loadingContainer = document.getElementById('loading-container');
        const processTextBtn = document.getElementById('process-text-btn');
        const processImagesBtn = document.getElementById('process-images-btn');
        
        if (processing) {
            loadingContainer.classList.remove('hidden');
            processTextBtn.disabled = true;
            processImagesBtn.disabled = true;
        } else {
            loadingContainer.classList.add('hidden');
            this.validateTextInput();
            processImagesBtn.disabled = this.uploadedImages.length === 0;
        }
    }

    showError(message) {
        const container = document.getElementById('error-container');
        const messageEl = document.getElementById('error-message');
        
        messageEl.textContent = message;
        container.classList.remove('hidden');
        
        // Scroll to error
        container.scrollIntoView({ behavior: 'smooth' });
    }

    hideError() {
        document.getElementById('error-container').classList.add('hidden');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.momBuilder = new MOMBuilder();
});

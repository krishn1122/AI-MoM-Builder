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
        
        // Download MOM dropdown
        document.getElementById('download-btn').addEventListener('click', () => this.toggleDownloadDropdown());
        document.getElementById('download-txt').addEventListener('click', () => this.downloadMOM('txt'));
        document.getElementById('download-docx').addEventListener('click', () => this.downloadMOM('docx'));
        document.getElementById('download-md').addEventListener('click', () => this.downloadMOM('md'));
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
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
        const supportedTypes = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/msword', // .doc
            'text/plain'
        ];
        
        const validFiles = files.filter(file => {
            return supportedTypes.includes(file.type) || 
                   file.name.toLowerCase().endsWith('.txt') ||
                   file.name.toLowerCase().endsWith('.docx') ||
                   file.name.toLowerCase().endsWith('.pdf');
        });
        
        if (validFiles.length === 0) {
            this.showError('Please select valid files (Images: PNG, JPG, GIF, WEBP; Documents: PDF, DOCX, TXT)');
            return;
        }
        
        if (this.uploadedImages.length + validFiles.length > 10) {
            this.showError('Maximum 10 files allowed');
            return;
        }
        
        validFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                // Handle images as before (base64)
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileData = {
                        id: Math.random().toString(36).substr(2, 9),
                        file: file,
                        dataUrl: e.target.result,
                        type: 'image',
                        name: file.name
                    };
                    
                    this.uploadedImages.push(fileData);
                    this.updateImagePreview();
                };
                reader.readAsDataURL(file);
            } else {
                // Handle documents (base64 for transmission)
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileData = {
                        id: Math.random().toString(36).substr(2, 9),
                        file: file,
                        dataUrl: e.target.result,
                        type: this.getFileType(file),
                        name: file.name,
                        size: this.formatFileSize(file.size)
                    };
                    
                    this.uploadedImages.push(fileData);
                    this.updateImagePreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    getFileType(file) {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) return 'pdf';
        if (file.type.includes('wordprocessingml') || file.name.toLowerCase().endsWith('.docx')) return 'docx';
        if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) return 'txt';
        return 'unknown';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    getFileIcon(fileType) {
        switch (fileType) {
            case 'pdf':
                return `<svg class="h-12 w-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>`;
            case 'docx':
                return `<svg class="h-12 w-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>`;
            case 'txt':
                return `<svg class="h-12 w-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>`;
            default:
                return `<svg class="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>`;
        }
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
        
        this.uploadedImages.forEach(file => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'image-preview file-preview';
            
            if (file.type === 'image') {
                fileDiv.innerHTML = `
                    <img src="${file.dataUrl}" alt="Preview" class="file-thumbnail">
                    <div class="file-info">
                        <span class="file-name">${file.name}</span>
                    </div>
                    <button type="button" class="remove-image" onclick="momBuilder.removeImage('${file.id}')">
                        <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
            } else {
                const fileIcon = this.getFileIcon(file.type);
                fileDiv.innerHTML = `
                    <div class="file-icon-container">
                        ${fileIcon}
                    </div>
                    <div class="file-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${file.size}</span>
                    </div>
                    <button type="button" class="remove-image" onclick="momBuilder.removeImage('${file.id}')">
                        <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
            }
            grid.appendChild(fileDiv);
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

    toggleDownloadDropdown() {
        const dropdown = document.getElementById('download-dropdown');
        const isHidden = dropdown.classList.contains('hidden');
        
        if (isHidden) {
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    }
    
    handleOutsideClick(event) {
        const dropdown = document.getElementById('download-dropdown');
        const downloadBtn = document.getElementById('download-btn');
        
        if (!dropdown.contains(event.target) && !downloadBtn.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    }
    
    getAgendaHeading() {
        // Extract the main heading from MOM content for filename
        const lines = this.currentMOMContent.split('\n');
        for (let line of lines) {
            if (line.startsWith('# ')) {
                // Remove markdown heading and clean up for filename
                return line.replace('# ', '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_');
            }
        }
        return 'mom'; // fallback filename
    }
    
    async downloadMOM(format = 'md') {
        if (!this.currentMOMContent) {
            this.showError('No MOM content to download');
            return;
        }
        
        // Hide dropdown
        document.getElementById('download-dropdown').classList.add('hidden');
        
        const agendaHeading = this.getAgendaHeading();
        
        if (format === 'md') {
            // Direct markdown download
            const blob = new Blob([this.currentMOMContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${agendaHeading}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
        } else {
            // For txt and docx, call backend API
            try {
                const response = await fetch(`/api/download-mom/${format}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        content: this.currentMOMContent,
                        filename: agendaHeading
                    })
                });
                
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${agendaHeading}.${format}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    
                    URL.revokeObjectURL(url);
                } else {
                    const errorData = await response.json();
                    this.showError(errorData.error || `Failed to download ${format.toUpperCase()} file`);
                }
            } catch (error) {
                console.error(`Error downloading ${format} file:`, error);
                this.showError(`Network error. Failed to download ${format.toUpperCase()} file.`);
            }
        }
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

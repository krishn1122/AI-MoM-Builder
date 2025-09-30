#!/usr/bin/env python3
"""
Install missing dependencies for MOM Builder Free
"""

import subprocess
import sys
import os

def install_package(package):
    """Install a package using pip"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"✅ Successfully installed {package}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install {package}: {e}")
        return False

def main():
    print("🚀 Installing MOM Builder Free Dependencies")
    print("=" * 50)
    
    # Backend dependencies
    backend_deps = [
        "python-docx==1.1.0",
        "markdown==3.5.1",
        "PyPDF2==3.0.1",
        "pdfplumber==0.10.3"
    ]
    
    print("\n📦 Installing backend dependencies...")
    for dep in backend_deps:
        install_package(dep)
    
    print("\n✨ Installation complete!")
    print("\nNext steps:")
    print("1. Start the backend: cd backend && python main.py")
    print("2. Start the frontend: cd frontend && python app.py")
    print("3. Open http://localhost:5000 in your browser")

if __name__ == "__main__":
    main()

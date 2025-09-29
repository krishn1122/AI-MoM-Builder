#!/usr/bin/env python3
"""
Setup script for MOM Builder Free
This script helps set up the development environment
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=cwd, 
            capture_output=True, 
            text=True
        )
        if result.returncode != 0:
            print(f"Error running command: {command}")
            print(f"Error: {result.stderr}")
            return False
        return True
    except Exception as e:
        print(f"Exception running command: {command}")
        print(f"Exception: {e}")
        return False

def check_python_version():
    """Check if Python version is 3.8 or higher"""
    if sys.version_info < (3, 8):
        print("Error: Python 3.8 or higher is required")
        return False
    print(f"✓ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def setup_backend():
    """Set up the backend environment"""
    print("\n🔧 Setting up backend...")
    
    backend_path = Path("backend")
    if not backend_path.exists():
        print("Error: backend directory not found")
        return False
    
    # Install backend dependencies
    print("Installing backend dependencies...")
    if not run_command("pip install -r requirements.txt", cwd=backend_path):
        return False
    
    # Check if .env exists
    env_file = backend_path / ".env"
    if not env_file.exists():
        print("⚠️  Backend .env file not found. Please create one with your Gemini API key.")
        print("   Copy .env.example to .env and fill in your values.")
    
    print("✓ Backend setup complete")
    return True

def setup_frontend():
    """Set up the frontend environment"""
    print("\n🎨 Setting up frontend...")
    
    frontend_path = Path("frontend")
    if not frontend_path.exists():
        print("Error: frontend directory not found")
        return False
    
    # Install frontend dependencies
    print("Installing frontend dependencies...")
    if not run_command("pip install -r requirements.txt", cwd=frontend_path):
        return False
    
    # Check if .env exists
    env_file = frontend_path / ".env"
    if not env_file.exists():
        print("⚠️  Frontend .env file not found. Please create one.")
        print("   Copy .env.example to .env and fill in your values.")
    
    print("✓ Frontend setup complete")
    return True

def create_env_files():
    """Create .env files from examples if they don't exist"""
    print("\n📝 Checking environment files...")
    
    # Root .env.example
    if Path(".env.example").exists() and not Path(".env").exists():
        print("Creating root .env file from example...")
        with open(".env.example", "r") as src, open(".env", "w") as dst:
            dst.write(src.read())
    
    # Backend .env
    backend_env = Path("backend/.env")
    if not backend_env.exists():
        print("Creating backend .env file...")
        with open(backend_env, "w") as f:
            f.write("GEMINI_API_KEY=your_gemini_api_key_here\n")
            f.write("PORT=8000\n")
            f.write("ENVIRONMENT=development\n")
    
    # Frontend .env
    frontend_env = Path("frontend/.env")
    if not frontend_env.exists():
        print("Creating frontend .env file...")
        with open(frontend_env, "w") as f:
            f.write("SECRET_KEY=your-secret-key-here\n")
            f.write("BACKEND_URL=http://localhost:8000\n")
            f.write("PORT=5000\n")
            f.write("ENVIRONMENT=development\n")

def main():
    """Main setup function"""
    print("🚀 MOM Builder Free Setup")
    print("=" * 40)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Create environment files
    create_env_files()
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed")
        sys.exit(1)
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        sys.exit(1)
    
    print("\n🎉 Setup complete!")
    print("\nNext steps:")
    print("1. Add your Gemini API key to backend/.env")
    print("2. Update frontend/.env with a secure secret key")
    print("3. Run the backend: cd backend && python main.py")
    print("4. Run the frontend: cd frontend && python app.py")
    print("5. Open http://localhost:5000 in your browser")
    
    print("\n📚 For more information, see README.md")

if __name__ == "__main__":
    main()

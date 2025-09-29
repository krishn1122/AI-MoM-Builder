# Contributing to MOM Builder Free

We love your input! We want to make contributing to MOM Builder Free as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/yourusername/mom-builder-free/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/mom-builder-free/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

### Prerequisites
- Python 3.8+
- Git
- Google Gemini API key

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/mom-builder-free.git
   cd mom-builder-free
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Backend .env
   echo "GEMINI_API_KEY=your_api_key_here" > backend/.env
   
   # Frontend .env
   echo "SECRET_KEY=your_secret_key" > frontend/.env
   echo "BACKEND_URL=http://localhost:8000" >> frontend/.env
   ```

5. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python main.py
   
   # Terminal 2 - Frontend
   cd frontend
   python app.py
   ```

## Code Style

We use the following tools to maintain code quality:

- **Black** for code formatting
- **isort** for import sorting
- **flake8** for linting
- **mypy** for type checking

Run these before submitting:
```bash
black .
isort .
flake8 .
mypy .
```

## Testing

We use `pytest` for testing. Please add tests for any new functionality:

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=.
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example:
```
feat: add image batch processing endpoint
fix: resolve timezone conversion bug
docs: update API documentation
```

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists or is planned
2. Open an issue with the `enhancement` label
3. Provide a clear description of the feature
4. Explain the use case and benefits
5. Consider implementation details if possible

## Questions?

Don't hesitate to ask questions by opening an issue with the `question` label or reaching out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

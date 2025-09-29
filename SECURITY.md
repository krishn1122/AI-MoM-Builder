# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

The MOM Builder Free team and community take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

To report a security issue, please use the GitHub Security Advisory ["Report a Vulnerability"](https://github.com/yourusername/mom-builder-free/security/advisories/new) tab.

The MOM Builder Free team will send a response indicating the next steps in handling your report. After the initial reply to your report, the security team will keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining the module.

## Security Considerations

### API Keys
- Never commit API keys to the repository
- Use environment variables for sensitive configuration
- Rotate API keys regularly
- Use least-privilege access principles

### Data Handling
- No user data is stored permanently
- All processing is done in memory
- Images and text are processed temporarily and discarded
- No logging of sensitive information

### Network Security
- Use HTTPS in production
- Implement proper CORS policies
- Validate all input data
- Use secure headers

### Dependencies
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use dependency scanning tools
- Pin dependency versions

## Security Features

### Input Validation
- All API inputs are validated using Pydantic models
- File type and size restrictions for image uploads
- Text input sanitization

### Rate Limiting
- Consider implementing rate limiting in production
- Monitor for abuse patterns
- Implement proper error handling

### Environment Isolation
- Use virtual environments
- Separate development and production configurations
- Implement proper logging and monitoring

## Best Practices for Contributors

1. **Never commit secrets**: Use `.env` files and environment variables
2. **Validate inputs**: Always validate and sanitize user inputs
3. **Update dependencies**: Keep dependencies up to date
4. **Follow security guidelines**: Implement security best practices
5. **Test security**: Include security testing in your development process

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all releases still under maintenance
4. Release new versions as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved please submit a pull request.

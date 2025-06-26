# Contributing to Material Launcher

Thank you for your interest in contributing to Material Launcher! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/material-launcher.git`
3. Install dependencies: `npm install`
4. Start development: `npm run dev`

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development
```bash
npm run dev          # Start web development server
npm run electron-dev # Start desktop app in development
npm run build        # Build for production
```

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` types
- Use proper type annotations

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement error boundaries where needed

### Material-UI
- Follow Material Design 3 principles
- Use theme-based styling
- Maintain consistent spacing and typography
- Ensure accessibility compliance

## Contribution Guidelines

### Issues
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Provide reproduction steps for bugs
- Include environment details

### Pull Requests
- Create feature branches from `main`
- Use descriptive commit messages
- Keep PRs focused and small
- Update documentation as needed
- Add tests for new features

### Commit Messages
```
feat: add weather API integration
fix: resolve calendar navigation bug
docs: update README installation steps
style: improve button spacing in task manager
```

## Project Structure
```
src/
├── components/     # React components
├── types/         # TypeScript interfaces
├── App.tsx        # Main application
└── main.tsx       # Entry point
```

## Testing
- Write unit tests for new components
- Test across different screen sizes
- Verify desktop app functionality
- Check accessibility compliance

## Code Review Process
1. Submit PR with clear description
2. Automated checks must pass
3. Code review by maintainers
4. Address feedback
5. Merge after approval

## Questions?
- Open an issue for questions
- Check existing documentation
- Review similar implementations

We appreciate all contributions, from bug reports to feature implementations!
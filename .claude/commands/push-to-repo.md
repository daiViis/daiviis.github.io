# Upload Project to selected Repository

## Description
Upload the current project to a Git repository with basic setup.

## Arguments
- `--repo-url`: The URL of the target repository (required if not specified in CLAUDE.md file)
= `--branch`: The branch that should be used for PUSH. (optional default is either master or main branch)

## Usage Examples
```bash
# Basic upload
upload-to-repo --repo-url https://github.com/username/repo

# Upload with custom name and private
upload-to-repo --repo-url https://github.com/username/repo --branch "Branch"
```

## What It Does
- Creates new repository
- Sets up basic README.md if it does not exists
- Pushes your code
- Sets up basic .gitignore file if is does not exists

## Change Notes
- Repository created at specified URL
- README.md added/updated with project info
- .gitignore configured for Node.js/React
- Initial commit pushed to main branch
- Remote origin set to repository URL

## Requirements
- Git installed
- Repository access permissions
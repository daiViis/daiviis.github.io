# Upload Project to Repository

## Description
Upload the current project to a Git repository with basic setup.

## Arguments
- `--repo-url`: The URL of the target repository (required)
- `--repo-name`: Name for the repository (optional)
- `--private`: Make repository private (optional, defaults to public)

## Usage Examples
```bash
# Basic upload
upload-to-repo --repo-url https://github.com/username/zenith

# Upload with custom name and private
upload-to-repo --repo-url https://github.com/username/zenith --repo-name "Zenith App" --private
```

## What It Does
- Creates new repository
- Sets up basic README.md
- Pushes your code
- Sets up .gitignore

## Change Notes
- Repository created at specified URL
- README.md added/updated with project info
- .gitignore configured for Node.js/React
- Initial commit pushed to main branch
- Remote origin set to repository URL

## Requirements
- Git installed
- Repository access permissions

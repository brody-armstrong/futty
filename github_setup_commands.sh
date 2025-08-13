# GitHub Repository Setup Commands

# 1. Create a new repository on GitHub.com
# Go to https://github.com/new
# Repository name: futty-fantasy-soccer
# Description: Fantasy soccer web application with draft-style gameplay
# Make it Public or Private as preferred
# DO NOT initialize with README, .gitignore, or license (we already have these)

# 2. After creating the repository, run these commands:

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/futty-fantasy-soccer.git
git branch -M main
git push -u origin main

# 3. Optional: Create a GitHub Pages deployment
# Go to Settings > Pages > Source: Deploy from a branch > main > / (root)

# 4. For future updates:
git add .
git commit -m "Your commit message"
git push

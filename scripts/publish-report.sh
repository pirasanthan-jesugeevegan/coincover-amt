#!/bin/bash

upload_to_github_pages() {
    # Set your GitHub username, repository name, and branch name
    GITHUB_USERNAME="pirasanthan-jesugeevegan"
    REPO_NAME="coincover-amt"
    BRANCH_NAME="gh-pages"

    # Set the HTML file path
    HTML_FILE_PATH="../allure-result"

    # Set the commit message
    COMMIT_MESSAGE="Upload API HTML file"

    # Set the remote repository URL
    REMOTE_REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

    # Create a temporary directory
    TEMP_DIR=$(mktemp -d)

    # Copy the HTML file to the temporary directory
    cp "$HTML_FILE_PATH" "$TEMP_DIR"

    # Initialize a new Git repository
    git init "$TEMP_DIR"

    # Navigate to the temporary directory
    cd "$TEMP_DIR"

    # Set the Git configuration
    git config user.name "$GITHUB_USERNAME"
    git config user.email "$GITHUB_USERNAME@example.com"

    # Add the HTML file
    git add .

    # Commit the changes
    git commit -m "$COMMIT_MESSAGE"

    # Set the remote repository
    git remote add origin "$REMOTE_REPO_URL"

    # Push the changes to the GitHub Pages branch
    git push origin "$BRANCH_NAME" --force

    # Cleanup temporary directory
    rm -rf "$TEMP_DIR"
}
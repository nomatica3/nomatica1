#!/usr/bin/env bash
# Add Poetry to PATH
export PATH="/opt/render/project/poetry/bin:$PATH"
# Confirm Poetry version
poetry --version
# Install dependencies
poetry install --no-root

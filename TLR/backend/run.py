#!/usr/bin/env python3
"""
Startup script for FastAPI backend.
Handles Python path setup and starts uvicorn.
"""
import sys
import os

# Add current directory to Python path so imports work
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app
import uvicorn

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, log_level='info')

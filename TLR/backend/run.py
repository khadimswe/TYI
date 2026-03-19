#!/usr/bin/env python3
import sys
sys.path.insert(0, '/Users/adamburkey/bankHackathon/TYI/TLR/backend')
from app.main import app
import uvicorn

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, log_level='info')

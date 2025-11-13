#!/bin/bash
cd /home/kavia/workspace/code-generation/hotel-finder-map-223956-223958/hotel_finding_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


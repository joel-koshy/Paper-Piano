# Paper Keys
We bring music to your fingertips, allowing users to practice piano anywhere with just a laptop and a printed template.

## Team Members
Vishnu Kunnummal, Joel Jeny, Joshua Joseph, Suryaprakash Murugavvel

## Purpose
PaperKeys transforms any laptop into a portable piano using a webcam and a printed template. The program tracks hand movements and detects key presses by recognizing fingertip positions on the template. Users align the template with on-screen guides, enabling accurate note detection. Additionally, integrated sheet music provides real-time guidance for structured practice and learning. 

This means you no longer have to carry a MIDI keyboard or any instrument while traveling—just print the template and play anytime, anywhere

## Execution
We developed PaperKeys using MediaPipe, JavaScript, and React, dividing the work into backend and frontend teams:
- Frontend:
  - Developed the user interface using React and JavaScript.
  - Designed the camera view and manual template alignment system.
  - Integrated the sheet music display for guided practice.
- Backend:
  - Used JavaScript and MediaPipe for hand tracking and fingertip detection.
  - Implemented a React canvas element to visualize fingertip positions.
  - Placed virtual nodes over piano keys to detect key presses.

## Challenges
- Template Alignment: Initially, we used OpenCV to automatically detect the edges of the printed template, but lighting conditions and shadows affected its accuracy. To ensure reliability within our timeframe, we opted for a manual alignment system.

- Key Press Detection: Some adjacent keys mistakenly detected presses when only one key was played. We resolved this by introducing a collision threshold factor to minimize detection errors.

## Tools
- MediaPipe
- React
- JavaScript


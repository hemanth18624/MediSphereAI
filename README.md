# MediSphere AI

## Table of Contents
1. [Problem Statement](#problem-statement)
2. [Project Overview](#project-overview)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Future Enhancements](#future-enhancements)
6. [Installation Guide](#installation-guide)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

---

## Problem Statement
In today's fast-paced world, accessing timely and accurate healthcare assistance is crucial. Many individuals struggle with finding nearby hospitals, determining the appropriate medication for their symptoms, or predicting potential health risks based on their medical history. Additionally, in emergencies, immediate assistance and communication with emergency contacts can be life-saving. MediSphere AI aims to bridge these gaps by leveraging AI and advanced web technologies to provide intelligent healthcare solutions.

## Project Overview
MediSphere AI is an AI-powered healthcare web application designed to enhance medical accessibility and emergency preparedness. The platform integrates multiple features, including a hospital locator, AI-driven emergency assistance, intelligent medication recommendations, and a health risk predictor based on QR-coded medical records. Users can receive personalized healthcare insights and make informed decisions for better health management.

## Features
1. **Nearby Hospital Finder**
   - Uses Leaflet.js for interactive mapping.
   - Displays hospitals within a 6 km radius based on user location.
   - Provides essential details such as hospital names, addresses, and contact information.

2. **AI-Based Emergency Assistance**
   - Users can describe their emergency, and the AI provides real-time first-aid guidance.
   - If applicable, AI suggests the nearest emergency room or specialist.

3. **AI-Based Medication Recommendation**
   - Users can input symptoms as text or upload an image of an external injury.
   - AI suggests medicines based on user input.
   - Users can choose between different types of medicine: **Allopathy (English medicine), Homeopathy, and Ayurvedic.**
   - AI also recommends the best-suited type of medication for the given symptoms.

4. **AI-Based Health Risk Predictor**
   - Users can upload a QR code containing their health details.
   - The AI scans the QR code and predicts potential health risks.
   - If a user does not have a QR code, they can manually enter health details, and the system will generate a QR code for future use.

## Tech Stack
- **Frontend:** React.js, qrcode.react (for generating QR codes), Leaflet.js (for maps)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini AI API
- **QR Code Handling:** zxing/browser (for QR encoding and scanning)

## Future Enhancements
- **Panic Button Feature:**
  - Users can log in and add emergency contact details.
  - In case of an emergency, clicking the panic button will send an alert message to the registered emergency contacts with the user's current location.
  - Integration with SMS services for real-time emergency notifications.

## Installation Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/hemanth18624/MediSphereAI.git
   cd MediSphereAI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables for API keys (Google Gemini AI API, Map API, etc.).
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Start the frontend:
   Navigate to the frontend folder :
   ```bash
   cd frontend
   ```
   ```bash
   npm start
   ```

## Usage
- Visit the application in the browser.
- Use the search feature to find nearby hospitals.
- Input symptoms or upload an image for AI-based medication recommendations.
- Upload or generate a QR code for health risk analysis.
- Access AI-based emergency assistance in urgent situations.

## Contributing
We welcome contributions! If you'd like to enhance the project, please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a Pull Request.

## License
This project is open-source and available under the [MIT License](LICENSE).


# Voygr

This web application generates personalized travel itineraries based on user preferences such as budget, interests, and trip duration. By providing a user-friendly interface and dynamic recommendations, it delivers detailed itineraries tailored to the individual user's travel style.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Architecture](#project-architecture)
- [Database Schema](#database-schema)
- [Future Improvements](#future-improvements)

## Project Overview

The **Personalized Travel Itinerary Generator** enables users to create travel plans by selecting preferences for budget, interests, activities, and dates. The system recommends the best places to visit based on these preferences and also provides a downloadable PDF of the itinerary.

### Key Features:
- Selectable budget, interests, and activities.
- Dynamic itinerary generation based on user input.
- Supports specific date range selection (start date and end date).
- Personalized recommendations ranked by relevance to preferences.
- Option to download the generated itinerary as a PDF.
- Deployed frontend on GitHub Pages and backend on Render.

## Features

- **Interactive Form**: Allows users to input preferences (budget, interests, activities) and select travel dates.
- **Itinerary Recommendations**: Backend logic to suggest top places based on user preferences, budget, and travel dates.
- **PDF Export**: Users can download their customized itinerary in PDF format.
- **Dark Theme**: The user interface incorporates a sleek dark theme for improved aesthetics.

## Tech Stack

**Frontend**:
- React.js for a responsive and interactive UI.
- Bootstrap for styling (dark theme).
  
**Backend**:
- Node.js with Express.js for API handling.
- MongoDB for storing places, interests, activities, and hotels.
- pdfkit for generating downloadable PDFs.

**Deployment**:
- Frontend: Hosted on GitHub Pages.
- Backend: Hosted on Render.

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or Atlas)

### Clone the Repository
```bash
git clone https://github.com/prernamittal/travel-itinerary-generator.git
cd travel-itinerary-generator
```

### Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Configure Environment Variables
In the `backend` folder, create a `.env` file with the following contents:
```bash
MONGO_URI=<connection_string>
```

### Run the Application
Start both frontend and backend servers:

```bash
# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm start
```

The frontend will be running at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Usage

1. Open the application in your browser (`http://localhost:3000`).
2. Fill in your preferences: budget, interests, activities, and travel dates.
3. Submit the form to generate your personalized itinerary.
4. Download the generated itinerary as a PDF by clicking on the "Export to PDF" button.

## API Endpoints

- `GET /api/places/interests-activities`: Fetches the available interests and activities from the database.
- `POST /api/itinerary/generate`: Generates personalized travel itineraries based on user input.
  
Example request body for `/api/itinerary/generate`:
```json
{
  "budget": 2000,
  "interests": ["Adventure", "Culture"],
  "activities": ["Hiking", "Museum"],
  "startDate": "2024-09-01",
  "endDate": "2024-09-10"
}
```

## Project Architecture

### Client-Server Architecture
- **Frontend (React.js)**: Handles the user interface, form inputs, and communicates with the backend to display results.
- **Backend (Node.js/Express.js)**: Processes user inputs, interacts with the MongoDB database, and returns recommendations.
- **Database (MongoDB)**: Stores place data, including interests, activities, and hotels.

### High-Level Diagram
![HLA](https://github.com/user-attachments/assets/e2d8c692-b59d-439e-ba47-84ea489d8d84)

## Database Schema
![schema](https://github.com/user-attachments/assets/5b4b1f32-c0f1-4b4f-bcf1-4f4dccde8a63)

## Future Improvements
- **User Authentication:** Adding user login functionality would allow users to save and return to their previous itineraries.
- **Real-time Pricing:** Integrating APIs for flight and hotel pricing could make the itinerary more precise and actionable.
- **Enhanced Recommendation Algorithm:** Currently, the cost function focuses on a weighted combination of preferences. Future iterations could include user ratings or reviews to further personalize suggestions.

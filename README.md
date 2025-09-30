# Verbatim — AI-Powered Touch Typing Learning Platform

A modern full-stack typing platform with real-time drills, AI insights (Gemini 2.5 Pro), and competitive modes.  
Built with **Angular 20**, **.NET 9 Web API**, **MongoDB**, and **SignalR**.

---

## Features

- Live stats: real-time WPM, accuracy, error maps, corrections counter  
- Competitive drills: create/join rooms & race friends live with SignalR  
- Classics mode: type passages from real books (seeded via EPUBs)  
- Leaderboards: track rankings & compare progress  
- Dark/Light themes with smooth switching  
- AI Insights: adaptive drills & feedback from error patterns  
- Secure authentication with JWT (login, register, forgot/reset password)  

---

## Tech Stack

**Frontend**  
- Angular 20  
- ng-zorro (UI components)  
- RxJS  

**Backend**  
- .NET 9 Web API  
- MongoDB  
- SignalR (real-time communication)  
- Scalar/Swagger for API docs
- FastAPI (Python)

**Utilities**  
- BookSeeder: console tool for EPUB → MongoDB ingestion  
- External fuzzy search microservice (RapidFuzz)

---

## Repository Structure
verbatim-app/
├─ client/         # Angular SPA
├─ server/         # .NET 9 Web API + SignalR
└─ BookSeeder/     # Console tool for EPUB ingestion

---

## Quick Start

### Prerequisites
- Node.js 18+ and Angular CLI  
- .NET 9 SDK  
- MongoDB (local or Atlas)
- Python 3.10+ with PIP

### Start the API
```bash
cd server
dotnet restore
dotnet run
# runs at http://localhost:5079
```

### Start the Client
```
cd client
npm install
npm start
# runs at http://localhost:4200
```

### Run Fuzzy Search Microservice
```
cd server/MicroServices/FuzzySearch
pip install --no-cache-dir -r requirements.txt
uvicorn FuzzySearch:app --host 0.0.0.0 --port 8080
```

By default, the client expects:
```
apiBaseUrl: 'http://localhost:5079/api',
hubUrl:     'http://localhost:5079/competitive-hub'
```

## Configuration

Server → server/appsettings.Development.json
```json
{
  "AppSettings": {
    "Token": "REPLACE_WITH_SECRET",
    "Issuer": "verbatim-auth",
    "Audience": "verbatim-api"
  },
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017/",
    "DatabaseName": "verbatim"
  },
  "FuzzySearchMicroservice": {
    "ConnectionString": "https://fuzzy-search-api.up.railway.app"
  }
}
```

Client → client/src/environments/
	•	environment.ts (development)
	•	environment.prod.ts (production)

## API & Hub
  •	REST API: /api
  •	SignalR Hub: /competitive-hub
  •	Scalar/Swagger UI: /scalar

Controllers include: Auth, Drill, Competitive, Book, Profile, AIInsight.

## Contributing
  1. Fork and create a feature branch
	2. Add tests where possible
	3. Open a pull request with a clear title and description

## License
Yet to be Licensed





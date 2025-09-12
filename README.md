Before running the project, ensure you have the following installed:
	•	Node.js (v18+) & npm
	•	Angular CLI (npm install -g @angular/cli)
	•	.NET SDK (v9.0 or later)
	•	Python 3.10+ & pip
	•	MongoDB (local or cloud instance, e.g., MongoDB Atlas)

1. Frontend
cd frontend
npm install
ng serve

2. Backend
cd backend
dotnet build
dotnet run

3. Microservice
cd microservice
pip install fastapi uvicorn
uvicorn main:app --reload

# 📘 **FDP & Workshop Management System**

A complete **Faculty Development Program (FDP) & Workshop Management System** built using the **MERN stack**.
It helps institutions manage, track, and generate reports for faculty programs such as Workshops, FDPs, Seminars, etc.

---

🚀 Live Demo

Frontend: [https://faculty-development-program-workshop.onrender.com](https://faculty-development-program-workshop-inx0.onrender.com)

Backend API: https://faculty-development-program-workshop.onrender.com

Click the frontend link to interact with the deployed application directly.

---

## 🚀 **Features**

### 🔹 Dashboard

* View total programs
* View total faculty participants
* Track ongoing and completed programs
* Recent activities list

### 🔹 Records Management

* Add new FDP/Workshop
* Edit or delete records
* Search & filter records
* View program details (title, organizer, faculty, dates, venue, status)

### 🔹 Reports

* Generate reports based on filters (type, date, faculty)
* Export-ready structured layout

### 🔹 Add Record Modal

* Program Title
* Type (Workshop / FDP / Seminar)
* Organizer
* Faculty Name
* Department
* Start & End Dates
* Venue
* Description

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js
* Axios
* React Hooks
* CSS / Tailwind (depending on your UI)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* dotenv for environment variables

### **Database**

* MongoDB Atlas / Local MongoDB

---

## 📂 **Project Folder Structure**

```
FDP-Workshop-Management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Record.js
│   ├── routes/
│   │   └── records.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddRecordModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RecordsList.jsx
│   │   │   └── Reports.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/your-username/fdp-workshop-management.git
cd fdp-workshop-management
```

---

## **2️⃣ Backend Setup**

```
cd backend
npm install
```

Create **.env** file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start backend:

```
npm start
```

---

## **3️⃣ Frontend Setup**

3️⃣ Frontend Setup
```
cd frontend
npm install
```

Important: Before running the frontend, update the API URL in your frontend code to point to your local backend instead of the deployed Render backend.

Example: in src/services/api.js (or wherever you define your API URL):
```
// Change this to run locally
const API_URL = "http://localhost:5000/api";
```

Then start the frontend:
```
npm start

```
Your app now runs at:

Frontend: http://localhost:3000
 (default CRA port)

Backend: http://localhost:5000

---

## 📡 **API Endpoints**

### **Base URL:** `/api/records`

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| GET    | `/`      | Fetch all records |
| POST   | `/`      | Add new record    |
| PUT    | `/:id`   | Update a record   |
| DELETE | `/:id`   | Delete a record   |

---

## 🖼️ **Screenshots**

### Dashboard

<img width="1456" height="914" alt="Screenshot 2025-11-15 214634" src="https://github.com/user-attachments/assets/3f6551b1-f4fe-4535-bde2-429f607e8d88" />

### Records Page

<img width="1451" height="820" alt="Screenshot 2025-11-15 214656" src="https://github.com/user-attachments/assets/c1aa104c-b4d6-46da-bd19-2c7a9904a957" />

### Add Record Modal

<img width="633" height="841" alt="Screenshot 2025-11-15 214751" src="https://github.com/user-attachments/assets/6b361999-ce52-458d-ae81-9ccbf26cd2a8" />

### Reports page

<img width="1428" height="629" alt="Screenshot 2025-11-15 214719" src="https://github.com/user-attachments/assets/245ea17b-5076-4990-89a3-50feb8a68b2c" />

---

## 📌 **Future Enhancements**

* PDF report generation
* Export to Excel
* Faculty login system
* Admin role management
* Automated email notifications

---

## 🤝 **Contributing**

Pull requests are welcome. For major updates, please open an issue first.

---

## 📝 License

This project is open-source under MIT License.

---


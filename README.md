# 🚀 BUGPULSE – Real-Time Bug Reporting and Tracking System

BUGPULSE is a full-stack web application designed to simplify bug reporting, tracking, and management. It integrates AI-based duplicate detection, priority prediction, and a modern Kanban-style dashboard for efficient bug lifecycle management.

---

# ✨ Features

## 🐞 Bug Management

* Create bug reports with title, description, and image upload
* Drag-and-drop Kanban board (Open → In Progress → Fixed)
* Delete and Reopen bugs

## 🧠 AI Capabilities

* Duplicate bug detection using cosine similarity
* Automatic priority prediction using ML model

## 🖼️ Image Support

* Upload screenshots/logs using Multer
* Display images in bug cards

## ⚙️ Backend APIs

* RESTful APIs using Express.js
* MongoDB for persistent storage

---

# 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* @hello-pangea/dnd (Drag & Drop)

### Backend

* Node.js + Express
* MongoDB + Mongoose
* Multer (file uploads)

### AI / ML

* Custom vectorization
* Cosine similarity
* Lightweight ML model for priority prediction

---

# 📁 Project Structure

```
BUGPULSE/
│
├── client/        # React frontend
│   ├── src/
│   ├── .env
│
├── server/        # Node backend
│   ├── routes/
│   ├── models/
│   ├── uploads/
│   ├── .env
│
└── README.md
```

---

# ⚙️ Environment Variables

## 📍 Client (`client/.env`)

```
VITE_PORT=4000
VITE_API_URL=http://localhost:4000
```

---

## 📍 Server (`server/.env`)

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/Db
```

---

# ▶️ How to Run the Project

## 🧩 Step 1: Clone Repository

```
git clone https://github.com/Chitravansh/BUGPULSE.git
cd BUGPULSE
```

---

## 🧩 Step 2: Setup Backend

```
cd server
npm install
```

### Start backend server:

```
npm run dev
```

👉 Server runs on: [http://localhost:4000](http://localhost:4000)

---

## 🧩 Step 3: Setup Frontend

```
cd ../client
npm install
```

### Start frontend:

```
npm run dev
```

👉 Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## 🧩 Step 4: Ensure MongoDB is Running

Make sure MongoDB is running locally:

```
mongodb://localhost:27017/Db
```

---

## 🧩 Step 5: Access Application

Open in browser:

```
http://localhost:5173
```

---

# 📸 Image Upload Notes

* Uploaded images are stored in:

```
server/uploads/
```

* Served via:

```js
app.use("/uploads", express.static("uploads"));
```

---

# 🧠 How It Works

1. User submits bug with description & image
2. Backend:

   * Vectorizes description
   * Predicts priority
   * Checks duplicate using cosine similarity
3. Bug stored in MongoDB
4. Displayed in Kanban board
5. Status updated via drag-and-drop

---

# 🚀 Future Improvements

* 🔐 Authentication (JWT-based roles)
* 💬 Comment system for collaboration
* 📊 Analytics dashboard (charts & insights)
* ⚡ Real-time updates using Socket.IO
* 👨‍💻 Developer assignment system

---

# 🧪 API Endpoints

| Method | Endpoint               | Description   |
| ------ | ---------------------- | ------------- |
| POST   | `/api/bugs`            | Create bug    |
| GET    | `/api/bugs`            | Get all bugs  |
| PUT    | `/api/bugs/:id/status` | Update status |
| DELETE | `/api/bugs/:id`        | Delete bug    |

---

# 👨‍💻 Author

* Ujjwal Srivastava
* B.Tech IT (2026)

---

# ⭐ Final Note

BUGPULSE bridges the gap between traditional bug tracking systems and modern real-time, AI-driven development workflows.

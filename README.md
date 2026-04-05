# 🚀 BUGPULSE – Real-Time AI-Powered Bug Tracking System

BUGPULSE is a full-stack, real-time bug tracking platform enhanced with AI capabilities. It enables teams to report, manage, analyze, and collaborate on bugs efficiently with intelligent insights.

---

# 📌 Features Overview

## 🐞 Bug Management

* Create bugs with title, description, and image upload
* Drag-and-drop workflow (Open → In Progress → Fixed)
* Delete and reopen bugs

## 🤖 AI Integration

* Automatic bug priority prediction (Low / Medium / High)
* Duplicate bug detection using cosine similarity
* AI-generated bug analysis (summary, root cause, suggested fixes)

## 🔐 Authentication & Roles

* JWT-based authentication
* Role-based access control:

  * User → create bugs
  * Tester → verify bugs
  * Developer → fix bugs
  * Admin → full control

## 💬 Collaboration System

* Comment on bugs
* Threaded discussions (optional extension)
* Admin can delete comments

## 📊 Analytics Dashboard

* Bug status distribution (Pie chart)
* Priority breakdown (Bar chart)
* Total bugs overview
* Real-time updates

## 🔔 Notifications System

* Real-time notifications using Socket.IO
* Bell icon with unread count
* Tracks:

  * Bug creation
  * Status updates
  * Deletion
  * Comments

## ⚡ Real-Time System

* Instant updates across users
* No manual refresh required

---

# 🏗️ Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* Recharts (analytics)
* Axios
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (file uploads)
* JWT Authentication
* Socket.IO

## AI / ML

* Custom ML model for priority prediction
* Cosine similarity for duplicate detection
* OpenAI API (optional advanced AI insights)

---

# 📁 Project Structure

```
BUGPULSE/
│
├── client/              # React frontend
│   ├── src/
│   └── .env
│
├── server/              # Node backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── ai/
│   └── uploads/
│
└── README.md
```

---

# ⚙️ Environment Setup

## 🔹 Client (.env)

```
VITE_PORT=4000
VITE_API_URL=http://localhost:4000
```

## 🔹 Server (.env)

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/Db
OPENROUTER_API_KEY=your_key_here (optional)
```

---

# ▶️ How to Run the Project

## 1️⃣ Clone Repository

```
git clone https://github.com/Chitravansh/BUGPULSE.git
cd BUGPULSE
```

## 2️⃣ Install Dependencies

### Backend

```
cd server
npm install
```

### Frontend

```
cd client
npm install
```

---

## 3️⃣ Start Backend

```
cd server
node index.js
```

Expected:

```
MongoDB connected
Server running on 4000
```

---

## 4️⃣ Start Frontend

```
cd client
npm run dev
```

Open browser:

```
http://localhost:5173
```

---

# 🔄 Real-Time Flow (How It Works)

1. User performs an action (create/update/delete bug)
2. Backend processes request
3. Socket.IO emits event
4. Frontend listens to event
5. UI updates instantly

---

# 🤖 AI Workflow

1. User submits bug description
2. Text is vectorized
3. Model predicts priority
4. Similarity check detects duplicates
5. (Optional) LLM generates analysis

---

# 🔔 Notification Flow

1. Action occurs (bug/comment)
2. Notification saved in DB
3. Socket event emitted
4. Frontend updates bell icon + dropdown

---

# 📊 Analytics Flow

1. Backend aggregates bug data
2. API returns stats
3. Frontend renders charts
4. Real-time updates refresh charts

---

# 🧠 Future Enhancements

* Bug assignment system
* Email notifications
* AI chatbot for debugging
* CI/CD integration
* Advanced NLP models

---

# 🧪 Testing Tips

* Open 2 browser tabs → test real-time
* Upload images → verify display
* Move bugs → check analytics updates
* Add comments → verify notifications

---

# 🧠 Key Learning Outcomes

* Full-stack development
* Real-time systems (WebSockets)
* AI/ML integration in web apps
* Role-based authentication
* Data visualization

---

# 👨‍💻 Author

Developed as a final-year project demonstrating real-world scalable system design.

---

# ⭐ Conclusion

BUGPULSE is a complete intelligent bug tracking solution combining:

* AI
* Real-time collaboration
* Analytics
* Modern UI/UX

It showcases production-level architecture and advanced engineering practices.

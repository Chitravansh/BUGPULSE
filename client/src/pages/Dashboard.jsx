import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Search, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import Analytics from "../components/Analytics";
import Comments from "../components/Comments";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;
const API = `${URL}/api/bugs`;

export default function Dashboard({user}) {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  // const fetchBugs = async () => {
  //   const res = await axios.get(API);
  //   setBugs(res.data);
  // };
  const fetchBugs = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setBugs(res.data);
};

  useEffect(() => {
    fetchBugs();
  }, []);

  useEffect(() => {
  const socket = io(URL);

  socket.on("bugCreated", () => fetchBugs());
  socket.on("bugUpdated", () => fetchBugs());
  socket.on("bugDeleted", () => fetchBugs());
  socket.on("commentAdded", () => fetchBugs());

  return () => socket.disconnect();
}, []);

  const submitBug = async () => {
    if (!form.title || !form.description) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (file) formData.append("image", file);

    await axios.post(API, formData, {
      headers: { 
         Authorization:`Bearer ${token}`,
        "Content-Type": "multipart/form-data"
       },
    });

    setForm({ title: "", description: "" });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    fetchBugs();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}/status`,
       { status },
      { 
        headers: { Authorization:`Bearer ${token}` },
      } 
    );
    fetchBugs();
  };

  const deleteBug = async (id) => {
    await axios.delete(`${API}/${id}`, {
        headers : {Authorization: `Bearer ${token}`
          
        },
    });
    
    fetchBugs();
  };

  const columns = {
    open: { label: "Open", icon: <AlertCircle className="text-red-500 w-5 h-5" /> },
    "in-progress": { label: "In Progress", icon: <Clock className="text-blue-500 w-5 h-5" /> },
    fixed: { label: "Fixed", icon: <CheckCircle2 className="text-green-500 w-5 h-5" /> },
  };

  return (
    <DragDropContext
      onDragEnd={(res) =>
        res.destination &&
        updateStatus(res.draggableId, res.destination.droppableId)
      }
    >
      {/* 👉 PASTE YOUR EXISTING JSX HERE */}
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-6">
        {/* Modern Header & Search */}
        {/* <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

            
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
            🚀{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              BUGPULSE
            </span>
          </h1>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="Search bugs..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header> */}

        <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

  {/* LEFT: TITLE */}
  <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
    🚀
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
      BUGPULSE
    </span>
  </h1>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4 w-full md:w-auto">

    {/* 🔍 SEARCH */}
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
      <input
        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        placeholder="Search bugs..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* 👤 USER INFO */}
    <div className="bg-white px-3 py-2 rounded-xl shadow border text-sm text-center">
      <p className="font-semibold">{user?.name}</p>
      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
    </div>

    {/* 🔴 LOGOUT */}
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
    >
      Logout
    </button>

  </div>
</header>

        {/* Improved Submit Form */}
        <section className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-xl border border-slate-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input-field"
              placeholder="Bug Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <textarea
              className="input-field md:col-span-2"
              placeholder="Reproduction steps or description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <button
            onClick={submitBug}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Report Issue
          </button>
        </section>
        <Analytics/>

        {/* Kanban Board */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(columns).map(([key, col]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-slate-100/50 p-4 rounded-3xl min-h-[600px] border border-slate-200"
                >
                  <div className="flex items-center gap-2 mb-6 px-2">
                    {col.icon}
                    <h2 className="text-xl font-bold text-slate-700">
                      {col.label}
                    </h2>
                    <span className="ml-auto bg-white px-2 py-0.5 rounded-lg text-sm font-bold shadow-sm">
                      {bugs.filter((b) => (b.status || "open") === key).length}
                    </span>
                  </div>

                  {bugs
                    .filter(
                      (b) =>
                        (b.status || "open") === key &&
                        b.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    )
                    .map((bug, index) => {
                      console.log("IMAGE PATH:", bug.image); // ✅ DEBUG LINE
                      return (
                        <Draggable
                          key={bug._id}
                          draggableId={bug._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-slate-100 group hover:border-blue-300 transition-all"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                                  {bug.title}
                                </h3>
                                {bug.duplicateOf && (
                                  <span className="text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-1 rounded">
                                    Duplicate
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {bug.description}
                              </p>
                              {bug.image && (
                                <img
                                  src={`${URL}${bug.image}`}
                                  alt="bug"
                                  className="w-full h-40 object-cover rounded-lg mb-3"
                                />
                              )}
                              <div className="flex items-center gap-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase ${bug.priority === "high" ? "bg-red-500" : "bg-green-500"}`}
                                >
                                  {bug.priority}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 mt-3 text-xs">
                               
                                
                                {bug.status !== "open" && (
                                  <button
                                    onClick={() =>
                                      updateStatus(bug._id, "open")
                                    }
                                    className="bg-gray-500 text-white px-2 py-1 rounded"
                                  >
                                    Reopen
                                  </button>
                                )}

                                <button
                                  onClick={() => deleteBug(bug._id)}
                                  className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                  Delete
                                </button>
                              </div>
                               <Comments bugId={bug._id} user={user} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </main>
      </div>
    </DragDropContext>
  );
}
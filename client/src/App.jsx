// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
// } from "@hello-pangea/dnd";

// const URL = import.meta.env.VITE_API_URL;

// const API = `${URL}/api/bugs`;

// export default function App() {
//   const [bugs, setBugs] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDesc] = useState("");
//   const [file, setFile] = useState(null);


//   const fetchBugs = async () => {
//     const res = await axios.get(API);
//     setBugs(res.data);
//   };

//   useEffect(() => {
//     fetchBugs();
//   }, []);

// const submitBug = async () => {
//   if (!title || !description) return;

//   const formData = new FormData(); // ✅ create

//   formData.append("title", title);
//   formData.append("description", description);

//   if (file) {
//     formData.append("image", file);
//   }

//   await axios.post(API, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   setTitle("");
//   setDesc("");
//   setFile(null);

//   fetchBugs();
// };


//   const updateStatus = async (id, status) => {
//     await axios.put(`${API}/${id}/status`, { status });
//   };

//   const onDragEnd = async (result) => {
//     if (!result.destination) return;

//     const id = result.draggableId;
//     const newStatus = result.destination.droppableId;

//     await updateStatus(id, newStatus);
//     fetchBugs();
//   };

//   const columns = {
//     open: "Open",
//     "in-progress": "In Progress",
//     fixed: "Fixed",
//   };

//   const priorityColor = (p) =>
//     p === "high"
//       ? "bg-red-500"
//       : p === "medium"
//       ? "bg-yellow-500"
//       : "bg-green-500";

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="min-h-screen bg-gray-100 p-8">

//         {/* Header */}
//         <h1 className="text-3xl font-bold text-center mb-8">
//           🚀 BUGPULSE Dashboard
//         </h1>

//         {/* Submit Form */}
//        <div className="flex flex-col items-center gap-3 mb-10">

//   <div className="flex gap-3">
//     <input
//       className="border rounded-lg p-2 w-48"
//       placeholder="Bug title"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//     />

//     <input
//       className="border rounded-lg p-2 w-80"
//       placeholder="Bug description"
//       value={description}
//       onChange={(e) => setDesc(e.target.value)}
//     />

//     <input
//       type="file"
//       accept="image/*"
//       onChange={(e) => setFile(e.target.files[0])}
//       className="text-sm"
//     />

//     <button
//       onClick={submitBug}
//       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
//     >
//       Submit
//     </button>
//   </div>

//   {/* 🔥 PREVIEW BELOW FORM */}
//   {file && (
//     <img
//       src={URL.createObjectURL(file)}
//       alt="preview"
//       className="h-20 rounded shadow border"
//     />
//   )}
// </div>


//         {/* Board */}
//         <div className="grid grid-cols-3 gap-6">

//           {Object.entries(columns).map(([key, label]) => (
//             <Droppable droppableId={key} key={key}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="bg-white rounded-2xl shadow-md p-4 min-h-[500px]"
//                 >
//                   <h2 className="text-lg font-semibold mb-4">{label}</h2>

//                   {bugs
//                     .filter((b) => (b.status || "open") === key)
//                     .map((bug, index) => (
                      
//                       <Draggable
//                         key={bug._id}
//                         draggableId={bug._id}
//                         index={index}
//                       >
                        
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-gray-50 rounded-xl p-3 mb-3 shadow hover:shadow-lg transition"
//                           >
//                             <h3 className="font-semibold">{bug.title}</h3>

//                             <p className="text-sm text-gray-600">
//                               {bug.description}
//                             </p>
//                              {/* 🔥 SHOW UPLOADED IMAGE */}
//                               {bug.image && (
//                                 <img
//                                   src={`http://localhost:5000${bug.image}`}
//                                   alt="bug"
//                                   className="mt-2 rounded-lg max-h-32 object-cover border"
//                                 />
//                               )}


//                             <div className="flex justify-between items-center mt-2">
//                               <span
//                                 className={`text-white text-xs px-2 py-1 rounded ${priorityColor(
//                                   bug.priority
//                                 )}`}
//                               >
//                                 {bug.priority}
//                               </span>

//                               {bug.duplicateOf && (
//                                 <span className="text-red-500 text-xs">
//                                   Duplicate
//                                 </span>
//                               )}
//                             </div>

//                             {/* 🔥 ACTION BUTTONS */}
// <div className="flex gap-2 mt-3 text-xs">
//   {bug.status !== "open" && (
//     <button
//       onClick={() => {
//         updateStatus(bug._id, "open");
//         fetchBugs();
//       }}
//       className="bg-gray-400 text-white px-2 py-1 rounded"
//     >
//       Open
//     </button>
//   )}

//   {bug.status !== "in-progress" && (
//     <button
//       onClick={() => {
//         updateStatus(bug._id, "in-progress");
//         fetchBugs();
//       }}
//       className="bg-blue-500 text-white px-2 py-1 rounded"
//     >
//       Start
//     </button>
//   )}

//   {bug.status !== "fixed" && (
//     <button
//       onClick={() => {
//         updateStatus(bug._id, "fixed");
//         fetchBugs();
//       }}
//       className="bg-green-600 text-white px-2 py-1 rounded"
//     >
//       Fix
//     </button>
//   )}
// </div>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}

//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </div>
//     </DragDropContext>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Search, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react"; // Icons for better UX

const URL = import.meta.env.VITE_API_URL;
const API = `${URL}/api/bugs`;

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  const fetchBugs = async () => {
    const res = await axios.get(API);
    setBugs(res.data);
  };

  useEffect(() => { fetchBugs(); }, []);

  const submitBug = async () => {
    if (!form.title || !form.description) return;
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (file) formData.append("image", file);

    await axios.post(API, formData);
    setForm({ title: "", description: "" });
    setFile(null);
    fetchBugs();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}/status`, { status });
    fetchBugs();
  };

  const columns = {
    open: { label: "Open", icon: <AlertCircle className="text-red-500 w-5 h-5" /> },
    "in-progress": { label: "In Progress", icon: <Clock className="text-blue-500 w-5 h-5" /> },
    fixed: { label: "Fixed", icon: <CheckCircle2 className="text-green-500 w-5 h-5" /> },
  };

  return (
    <DragDropContext onDragEnd={(res) => res.destination && updateStatus(res.draggableId, res.destination.droppableId)}>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-6">
        
        {/* Modern Header & Search */}
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
            🚀 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">BUGPULSE</span>
          </h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="Search bugs..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Improved Submit Form */}
        <section className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-xl border border-slate-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Bug Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700" onChange={e => setFile(e.target.files[0])} />
            <textarea className="input-field md:col-span-2" placeholder="Reproduction steps or description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <button onClick={submitBug} className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Report Issue
          </button>
        </section>

        {/* Kanban Board */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(columns).map(([key, col]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-slate-100/50 p-4 rounded-3xl min-h-[600px] border border-slate-200">
                  <div className="flex items-center gap-2 mb-6 px-2">
                    {col.icon}
                    <h2 className="text-xl font-bold text-slate-700">{col.label}</h2>
                    <span className="ml-auto bg-white px-2 py-0.5 rounded-lg text-sm font-bold shadow-sm">
                      {bugs.filter(b => (b.status || "open") === key).length}
                    </span>
                  </div>

                  {bugs.filter(b => (b.status || "open") === key && b.title.toLowerCase().includes(searchTerm.toLowerCase())).map((bug, index) => (
                    <Draggable key={bug._id} draggableId={bug._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-slate-100 group hover:border-blue-300 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{bug.title}</h3>
                            {bug.duplicateOf && <span className="text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-1 rounded">Duplicate</span>}
                          </div>
                          <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{bug.description}</p>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase ${bug.priority === 'high' ? 'bg-red-500' : 'bg-green-500'}`}>
                              {bug.priority}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
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
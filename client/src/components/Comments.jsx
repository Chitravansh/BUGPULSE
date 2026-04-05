// import { useEffect, useState } from "react";
// import axios from "axios";

// const URL = import.meta.env.VITE_API_URL;

// export default function Comments({ bugId, user }) {
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchComments = async () => {
//     const res = await axios.get(`${URL}/api/comments/${bugId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setComments(res.data);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [bugId]);

//   const addComment = async () => {
//     if (!text.trim()) return;

//     await axios.post(
//       `${URL}/api/comments`,
//       { bugId, text },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setText("");
//     fetchComments();
//   };

//   const addReply = async (parentId) => {
//     if (!replyText.trim()) return;

//     await axios.post(
//       `${URL}/api/comments`,
//       { bugId, text: replyText, parentId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setReplyText("");
//     setReplyTo(null);
//     fetchComments();
//   };

//   const deleteComment = async (id) => {
//     await axios.delete(`${URL}/api/comments/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     fetchComments();
//   };

//   // 🔥 Separate main comments & replies
//   const mainComments = comments.filter(c => !c.parentId);
//   const replies = comments.filter(c => c.parentId);

//   return (
//     <div className="mt-3 bg-slate-50 p-3 rounded-lg border text-xs">

//       {/* ADD COMMENT */}
//       <div className="flex gap-2 mb-3">
//         <input
//           className="flex-1 border px-2 py-1 rounded"
//           placeholder="Add comment..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button onClick={addComment} className="bg-blue-500 text-white px-2 rounded">
//           Send
//         </button>
//       </div>

//       {/* COMMENTS */}
//       {mainComments.map((c) => (
//         <div key={c._id} className="mb-2">

//           {/* MAIN COMMENT */}
//           <div className="bg-white p-2 rounded border">
//             <div className="flex justify-between">
//               <span className="font-semibold">{c.user}</span>

//               {/* 🔥 ADMIN DELETE */}
//               {user?.role === "admin" && (
//                 <button
//                   onClick={() => deleteComment(c._id)}
//                   className="text-red-500"
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>

//             <p>{c.text}</p>

//             {/* REPLY BUTTON */}
//             <button
//               onClick={() => setReplyTo(c._id)}
//               className="text-blue-500 text-xs"
//             >
//               Reply
//             </button>
//           </div>

//           {/* REPLIES */}
//           <div className="ml-4 mt-1">
//             {replies
//               .filter(r => r.parentId === c._id)
//               .map((r) => (
//                 <div key={r._id} className="bg-gray-100 p-2 rounded mb-1">
//                   <span className="font-semibold">{r.user}: </span>
//                   {r.text}
//                 </div>
//               ))}
//           </div>

//           {/* REPLY INPUT */}
//           {replyTo === c._id && (
//             <div className="flex gap-2 mt-1 ml-4">
//               <input
//                 className="border px-2 py-1 rounded"
//                 placeholder="Reply..."
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//               />
//               <button
//                 onClick={() => addReply(c._id)}
//                 className="bg-green-500 text-white px-2 rounded"
//               >
//                 Send
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquare, Send, Reply, Trash2, CornerDownRight, X } from "lucide-react";

const URL = import.meta.env.VITE_API_URL;

export default function Comments({ bugId, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    const res = await axios.get(`${URL}/api/comments/${bugId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [bugId]);

  const addComment = async () => {
    if (!text.trim()) return;
    await axios.post(
      `${URL}/api/comments`,
      { bugId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    fetchComments();
  };

  const addReply = async (parentId) => {
    if (!replyText.trim()) return;
    await axios.post(
      `${URL}/api/comments`,
      { bugId, text: replyText, parentId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReplyText("");
    setReplyTo(null);
    fetchComments();
  };

  const deleteComment = async (id) => {
    await axios.delete(`${URL}/api/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchComments();
  };

  // Separate main comments & replies
  const mainComments = comments.filter((c) => !c.parentId);
  const replies = comments.filter((c) => c.parentId);

  // Helper to generate a simple avatar
  const getAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";
    return (
      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
        {initial}
      </div>
    );
  };

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[400px]">
      
      {/* Header */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-700 text-sm">Discussion ({comments.length})</h3>
      </div>

      {/* Comments List (Scrollable) */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
        {mainComments.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-4">No comments yet. Start the conversation!</p>
        ) : (
          mainComments.map((c) => (
            <div key={c._id} className="text-sm">
              
              {/* MAIN COMMENT */}
              <div className="group flex gap-3">
                {getAvatar(c.user)}
                <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800">{c.user}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setReplyTo(c._id)} className="text-slate-400 hover:text-blue-500 transition-colors" title="Reply">
                        <Reply className="w-3.5 h-3.5" />
                      </button>
                      {user?.role === "admin" && (
                        <button onClick={() => deleteComment(c._id)} className="text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              </div>

              {/* REPLY INPUT AREA */}
              {replyTo === c._id && (
                <div className="ml-10 mt-2 flex gap-2 items-center">
                  <CornerDownRight className="w-4 h-4 text-slate-300" />
                  <div className="flex-1 flex bg-white border border-blue-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-100">
                    <input
                      autoFocus
                      className="flex-1 px-4 py-1.5 outline-none text-sm"
                      placeholder={`Reply to ${c.user}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addReply(c._id)}
                    />
                    <button onClick={() => addReply(c._id)} className="px-3 text-blue-600 hover:bg-blue-50 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                    <button onClick={() => setReplyTo(null)} className="px-3 text-slate-400 hover:bg-slate-50 transition-colors border-l">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* REPLIES THREAD */}
              {replies.filter((r) => r.parentId === c._id).length > 0 && (
                <div className="ml-3 mt-3 pl-6 border-l-2 border-slate-200 space-y-3">
                  {replies
                    .filter((r) => r.parentId === c._id)
                    .map((r) => (
                      <div key={r._id} className="group flex gap-2">
                        {getAvatar(r.user)}
                        <div className="flex-1 bg-slate-100/80 p-2.5 rounded-2xl rounded-tl-none border border-slate-200/60">
                          <div className="flex justify-between items-start mb-0.5">
                            <span className="font-bold text-slate-700 text-xs">{r.user}</span>
                            {user?.role === "admin" && (
                              <button onClick={() => deleteComment(r._id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <p className="text-slate-600 text-xs">{r.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* NEW COMMENT INPUT */}
      <div className="p-3 bg-white border-t border-slate-200">
        <div className="flex bg-slate-50 border border-slate-200 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
          <input
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
          />
          <button 
            onClick={addComment} 
            disabled={!text.trim()}
            className="px-4 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
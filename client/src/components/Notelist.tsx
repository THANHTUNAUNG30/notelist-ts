import { useState, useEffect } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/notes";
import { FaRegStickyNote, FaTrash, FaEdit, FaPlus, FaSave } from "react-icons/fa";

const Notelist = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const makeRefresh = () => {
    setRefresh(!refresh);
  }

  const showAlert = (message: string) => {
    setAlertMsg(message);
    setTimeout(() => setAlertMsg(null), 2000);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        throw new Error("Failed to fetch data!");
      }
    };
    fetchNotes();
  }, [refresh]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) {
      return;
    }
    try {
      if(editMode){
        await updateNote(editId, msg);
        showAlert("Note updated successfully!");
        setEditMode(false);
      }else{
        await createNote(msg);
        showAlert("New note added!");
      }
      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to create or update note!");
    }
  }


  const handleModelChange = (title : string, id : string) => {
    setEditMode(true);
    setMsg(title);
    setEditId(id);
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      showAlert("Note deleted successfully!");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to delete note!");
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto mt-14 p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 mb-6 border-b pb-2 font-mono">
          <FaRegStickyNote className="text-indigo-500 text-2xl" /> Note List
        </h1>

        <form className="flex gap-3 mb-6" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Add a new note..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-indigo-500 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-600 transition"
          >
            {editMode ? (
                          <>
                            <FaSave /> Update
                          </>
                        ) : (
                          <>
                            <FaPlus /> Add
                          </>
                        )}
          </button>
        </form>

        {alertMsg && (
          <div className="fixed font-sm top-5 right-1/2 translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-mono">
            {alertMsg}
          </div>
        )}

        {notes.length === 0 ? (
          <p className="text-gray-500 text-center font-mono">No notes available.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note._id}
                className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-2xl shadow flex justify-between items-center hover:shadow-lg transition"
              >
                <span className="font-medium text-gray-700 font-mono">{note.title}</span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={()=>handleModelChange(note.title, note._id)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(note._id);
                      setShowConfirm(true);
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 font-mono">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this note?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedId) handleDelete(selectedId);
                  setShowConfirm(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notelist;

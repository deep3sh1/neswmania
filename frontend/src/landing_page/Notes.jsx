import React, { useEffect, useState } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  // FETCH NOTES
  const fetchNotes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(`${apiUrl}/api/notes`, {
        headers: {
          Authorization: token,
        },
      });
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const createNote = async (e) => {
    e?.preventDefault();
    if (!title.trim() && !content.trim()) return;

    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(
        `${apiUrl}/api/notes`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.log("Error saving note:", error);
    } finally {
      setSaving(false);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${apiUrl}/api/notes/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchNotes();
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container-fluid py-4 py-md-5 px-3 px-sm-4 px-lg-5" style={{ maxWidth: "1240px" }}>
      {/* HEADER */}
      <div className="d-flex align-items-center mb-4">
        <span className="p-2 bg-dark text-white rounded-3 me-3">
          <i className="fa-regular fa-note-sticky fs-4"></i>
        </span>
        <div>
          <h1 className="fw-bold fs-2 fs-md-1 mb-0">My Personal Notes</h1>
          <p className="text-secondary small mb-0">Save and organize key takeaways from breaking news</p>
        </div>
      </div>

      {/* CREATE NOTE CARD */}
      <div className="card border rounded-4 p-3 p-sm-4 mb-4 mb-md-5 shadow-sm bg-white">
        <h5 className="fw-bold mb-3 d-flex align-items-center">
          <i className="fa-solid fa-pen-nib text-danger me-2"></i>
          Write a New Note
        </h5>

        <form onSubmit={createNote}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Note title (e.g. Key takeaways on clean energy)"
              className="form-control rounded-3 py-2 px-3 shadow-none border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Write your note, analysis, or thoughts..."
              className="form-control rounded-3 py-2 px-3 shadow-none border"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-danger rounded-3 px-4 py-2 fw-semibold btn-touch"
              style={{ minWidth: "140px" }}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-regular fa-floppy-disk me-2"></i>
                  Save Note
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* NOTES GRID */}
      <div className="mb-3">
        <h4 className="fw-bold fs-4 mb-3">Saved Notes ({notes.length})</h4>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
            <p className="mt-2 text-secondary">Loading your notes...</p>
          </div>
        ) : notes.length > 0 ? (
          <div className="row g-3 g-md-4">
            {notes.map((note) => (
              <div className="col-12 col-sm-6 col-lg-4 d-flex" key={note._id}>
                <div className="card border rounded-4 p-3 p-md-4 w-100 d-flex flex-column shadow-xs bg-white">
                  <h5 className="fw-bold text-dark text-break mb-2" style={{ fontSize: "17px" }}>
                    {note.title}
                  </h5>

                  <p
                    className="text-secondary text-break mb-4 small flex-grow-1"
                    style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}
                  >
                    {note.content}
                  </p>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                    <small className="text-muted">
                      <i className="fa-regular fa-clock me-1"></i>
                      Saved
                    </small>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                    >
                      <i className="fa-regular fa-trash-can me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 border rounded-4 bg-light p-4">
            <div className="p-3 bg-white rounded-circle d-inline-flex mb-3 shadow-sm text-secondary">
              <i className="fa-regular fa-clipboard fs-2"></i>
            </div>
            <h5 className="fw-bold text-dark">No notes yet</h5>
            <p className="text-secondary small mb-0">Use the form above to jot down notes while browsing news.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
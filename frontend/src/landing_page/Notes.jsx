import React, { useEffect, useState } from "react";
import axios from "axios";

function Notes() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");


  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setNotes(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  // CREATE NOTE
  const createNote = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/notes",
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

      console.log(error);
    }
  };


  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchNotes();

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <div className="container py-5">

      <h1 className="fw-bold mb-4">
        My Notes
      </h1>

      {/* CREATE NOTE */}
      <div className="card p-4 mb-5">

        <input
          type="text"
          placeholder="Note title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          className="form-control mb-3"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createNote}
          className="btn btn-danger"
        >
          Save Note
        </button>
      </div>

      {/* NOTES */}
      <div className="row">

        {notes.map((note) => (

          <div className="col-md-4 mb-4" key={note._id}>

            <div className="card p-3 h-100">

              <h4>{note.title}</h4>

              <p>{note.content}</p>

              <button
                onClick={() => deleteNote(note._id)}
                className="btn btn-dark mt-auto"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notes;
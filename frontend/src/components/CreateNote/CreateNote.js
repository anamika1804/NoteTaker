import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./CreateNote.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be empty!');
      return;
    }
    if(!content.trim()){
      alert('Content cannot be empty!');
      return;
    }
    const note = { title, content };

    axios({
      method: "POST",
      url: `http://127.0.0.1:8000/notes`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: note,
    }).then(() => {
      console.log("New Note Added");
      navigate("/dashboard");
    });
  };

  return (
    <div className="CreateForm">
      <div className="FormContent">
        <form onSubmit={handleSubmit}>
          <div className="NoteForm">
            <h3 className="TextHead">Note</h3>
            <div>
              <input
                className="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
              </div>
              <div>
              <ReactQuill
                className="Content"
                value={content}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["video"],
                    ["clean"],
                  ],
                }}
              />
              </div>
              <button className="CreateNoteBtn" onClick={handleSubmit}>
                Create Note
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;

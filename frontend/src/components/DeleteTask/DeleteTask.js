import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import "./DeleteTask.css";

const DeleteTask = () => {
  const [noteE, setNote] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios({
      url: `http://127.0.0.1:8000/notes/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNote(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id, token]);

  const handleYesDelete = () => {
    axios({
      url: `http://127.0.0.1:8000/notes/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => navigate("/dashboard"));
  };

  const handleNoDelete = () => {
    navigate("/dashboard");
  };

  console.log(noteE);

  return (
    <div className="DeleteTask">
      <h2 className="DelQuestion">
        Are you sure you want to delete this note?
      </h2>
      <div className="NoteDelete">
        <div className="NoteContent">
          {noteE && (
            <div
              style={{
                fontSize: "20px",
                color: "#2b2b2b",
                paddingBottom: "10px",
              }}
            >
              Title - {noteE.title}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: noteE.content }} />
        </div>
      </div>
      <div className="DeleteBtns">
        <button
          onClick={handleNoDelete}
          className="NoDeleteButton DeleteButton"
        >
          No
        </button>
        <button
          onClick={handleYesDelete}
          className="YesDeleteButton DeleteButton"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;

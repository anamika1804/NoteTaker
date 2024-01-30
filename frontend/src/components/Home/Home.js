import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import DeleteIcon from "@material-ui/icons/Delete";

const Home = () => {
  const [noteList, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const callFn = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/notes?sort=${sortOrder}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    callFn();
  }, [sortOrder,setNotes]);

  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  return (
    <div className="Home">
      <div className="Header">
        <h1 className="HomeNotes">My Notes</h1>
        <button
          className="SortBtn"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          Sort by Time
        </button>
      </div>

      <Link to="/create">
        <button className="AddBtn">+</button>
      </Link>

      {!noteList ||
        (noteList.length == 0 && (
          <h2 className="NoNotesFound">No Notes Found</h2>
        ))}
      <div className="NoteList">
        {noteList && (
          <div>
            {noteList.map((note) => (
              <div className="Note" key={note._id}>
                <div className="NoteContent">
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#2b2b2b",
                      paddingBottom: "10px"
                    }}
                  >
                    Title - {note.title}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                  <div className="NoteTimestamp">
                    {formatCreatedAt(note.createdAt)}
                  </div>
                </div>
                <Link to={`/deletetask/${note._id}`}>
                  <span className="DelIcon">
                    <DeleteIcon />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

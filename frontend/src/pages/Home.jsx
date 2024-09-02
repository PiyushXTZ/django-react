import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import "../styles/Logout.css";
// import Navbar from "../components/Navbar"; 

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filteredNotes, setFilteredNotes] = useState([]); 
    const [editMode, setEditMode] = useState(false); 
    const [currentNoteId, setCurrentNoteId] = useState(null); 

    useEffect(() => {
        getNotes();
    }, []);

    useEffect(() => {
        filterNotes();
    }, [searchTerm, notes]); 

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                setFilteredNotes(data); 
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        if (editMode) {
            updateNote();
        } else {
            api
                .post("/api/notes/", { content, title })
                .then((res) => {
                    if (res.status === 201) alert("Note created!");
                    else alert("Failed to create note.");
                    getNotes();
                    setContent(""); 
                    setTitle("");
                })
                .catch((err) => alert(err));
        }
    };

    const updateNote = () => {
        api
            .put(`/api/notes/update/${currentNoteId}/`, { content, title })
            .then((res) => {
                if (res.status === 200) alert("Note updated!");
                else alert("Failed to update note.");
                getNotes();
                setContent(""); 
                setTitle("");
                setEditMode(false); 
                setCurrentNoteId(null); 
            })
            .catch((err) => alert(err));
    };

    const editNote = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setCurrentNoteId(note.id);
        setEditMode(true); 
    };

    const filterNotes = () => {
        if (searchTerm.trim() === "") {
            setFilteredNotes(notes); 
        } else {
            const filtered = notes.filter((note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNotes(filtered); 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        sessionStorage.removeItem("authToken");
        window.location.href = "/login"; 
    };

    return (
        <>
            <div>
                <h2 id="createnote">{editMode ? "Edit Note" : "Create a Note"}</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value={editMode ? "Update Note" : "Submit"} />
                </form>
                <br />
                <input
                    type="button"
                    onClick={handleLogout}
                    className="btn logout-button"
                    value="Logout"
                />
                <br />
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <h2 id="note">Notes</h2>
                <div className="notes-grid">
                    {filteredNotes.map((note) => (
                        <Note
                            note={note}
                            onDelete={deleteNote}
                            onEdit={() => editNote(note)} // Pass the note to the edit function
                            key={note.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;

import { useEffect, useState } from "react"
import api from "../api"
import "../styles/Note.css"
import "../styles/Form.css"
import Note from "../components/Note"
import Header from "../components/Header"
import LoadingSpinner from "../components/LoadingSpinner"

function Home() {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [loading, setLoading] = useState("")

    useEffect(() => {
        getNote()
    }, [])

    const getNote = () => {
        setLoading(true)
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data)
            })
            .catch((err) => console.log(err))
        setLoading(false)
    }
    const deleteNote = async (id) => {
        await api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("Note Deleted")
            }
            else alert("Errror")
        }).catch((err) => console.log(err))
        getNote()
    }
    const createNote = async () => {
        await api.post("api/notes/", { title: title, description: description }).then((res) => {
            if (res.status == 201) {
                alert("Note Created")
            } else alert("Error")
        }).catch((err) => console.log(err))
        getNote()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createNote()
    }
    return <>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Header />
        </div>
        <div className="note-grid">
            <div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <h3>Create Notes :</h3>
                    <input className="form-input" placeholder="Enter Note Topic" onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                    <textarea className="form-input" placeholder="Enter Description..." onChange={(e) => setDesc(e.target.value)} value={description} type="text" />
                    <button className="form-button" type="submit">Create Note</button>
                </form>
            </div>
            <div className="scrollable-notes">
                {loading ? <LoadingSpinner /> :
                    notes.map((note) => {
                        return <Note note={note} onDelete={deleteNote} key={note.id} />
                    })}
            </div>
        </div>
    </>
}

export default Home
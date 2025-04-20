function Note({ note, onDelete }) {
    return <div className="notes-container">
        <p>{note.title}</p>
        <p>{note.description}</p>
        <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
}

export default Note
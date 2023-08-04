import "./Notes.css";
import { CiSearch } from "react-icons/ci";
import notes from "../notes";
import NoteItem from "../components/NoteItem";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
function Notes() {
  return (
    <>
      <section className="container">
        <h1>
          Ninja-<span>Note</span>
        </h1>
        <div className="input-group">
          <input
            type="text"
            className="input"
            placeholder="Buscar..."
            autoComplete="off"
          />
          <button className="button--submit" value="Subscribe" type="submit">
            <CiSearch></CiSearch>
          </button>
        </div>
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
        <Link class="button-fixed" to="/create">
          <BsPlusLg />
        </Link>
      </section>
    </>
  );
}

export default Notes;

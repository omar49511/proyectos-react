import { CiSearch } from "react-icons/ci";
import notes from "../notes";
import NoteItem from "../components/NoteItem";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
function Notes() {
  return (
    <section>
      <header>
        <h2>Notes</h2>
        <input type="text" />
        <button>
          <CiSearch></CiSearch>
        </button>
      </header>
      <div className="notes__container">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to="/create">
        <BsPlusLg />
      </Link>
    </section>
  );
}

export default Notes;

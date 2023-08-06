import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./CreateNote.css";

function CreateNote() {
  return (
    <section className="container">
      <h1>
        Ninja-<span>Note</span>
      </h1>
      <header className="header">
        <Link className="button-back" to="/">
          <IoIosArrowBack />
        </Link>
        <button className="button-save" type="submit">
          SAVE
        </button>
      </header>
      <form className="create-note__form" action="">
        <input className="create-note__input" placeholder="Title" type="text" />
        <textarea
          className="create-note__textarea"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </form>
    </section>
  );
}

export default CreateNote;

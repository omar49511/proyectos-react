import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function CreateNote() {
  return (
    <section className="container">
      <header>
        <Link to="/">
          <IoIosArrowBack />
        </Link>
        <button>save</button>
      </header>
      <form action="">
        <input type="text" />
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </form>
    </section>
  );
}

export default CreateNote;

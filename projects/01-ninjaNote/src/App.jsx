import "./App.css";

import EditNote from "./pages/EditNote";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />}></Route>
          <Route path="/edit-note/:id" element={<EditNote />}></Route>
          <Route path="/create-note" element={<CreateNote />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

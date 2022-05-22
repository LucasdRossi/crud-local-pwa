import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";

import Books from "./Books";
import Classes from "./Classes";

export default function Router() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/livros" element={<Books />} />
        <Route path="/cursos" element={<Classes />} />
      </Routes>
    </>
  );
}

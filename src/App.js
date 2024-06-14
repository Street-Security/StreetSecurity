import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./components/login/Login";
// import Cadastro from "./components/cadastro/Cadastro";
import Problema from "./components/problema/Problema";
import LandingPage from "./components/landingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} /> Rota para a tela de login */}
        {/* <Route path="/cadastro" element={<Cadastro />} /> */}
        <Route path="/problema" element={<Problema />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
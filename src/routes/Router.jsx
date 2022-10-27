import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filter from "../components/filter/Filter";
import Vuelos from "../components/vuelos/Vuelos";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Filter />} />
        <Route path="vuelos" element={<Vuelos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

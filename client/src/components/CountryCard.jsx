import React from "react";
import { Link } from "react-router-dom";

export default function Card({img, name, continent, id}){
  return (
    <div>
      <Link to={`/home/${id}`}>
      <img src={img} alt="not found" />
      <h3>Country Name: {name}</h3>
      <h3>Continent: {continent}</h3>
      </Link>
    </div>
  )
};
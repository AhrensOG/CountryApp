import React from "react";

export default function Card({img, name, continent}){
  return (
    <div>
      <img src={img} alt="not found" />
      <h3>Country Name: {name}</h3>
      <h3>Continent: {continent}</h3>
    </div>
  )
};
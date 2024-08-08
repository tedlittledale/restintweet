"use client";
import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};

export default function SimpleWordcloud({ words } = { words: [] }) {
  return <ReactWordcloud size={[600, 400]} options={options} words={words} />;
}

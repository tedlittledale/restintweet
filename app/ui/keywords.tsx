import React from "react";

import WordCloud from "react-d3-cloud";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
];

const Cloud = () => {
  return (
    <div className="w-full h-[400px]">
      <WordCloud data={data} width={800} height={400} />
    </div>
  );
};

export default Cloud;

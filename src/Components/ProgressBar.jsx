import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar({percent, title}) {
  return (
    <>
      <div className="prbar">
        <CircularProgressbar  value={percent} text={`${percent}%`} />
        <h4>{title}</h4>
      </div>
    </>
  );
}

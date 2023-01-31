import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Components/Navbar";
import ProgressBarContainers from "./Components/ProgressBarContainers";
import Tasks from "./Components/Tasks";
import './todostyle.css'

export default function App() {
  return (
    <>
    <Navbar/>
      <ProgressBarContainers/>
    <Tasks/>
     
    </>
  );
}

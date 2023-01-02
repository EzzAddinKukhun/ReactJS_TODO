import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

export default function ProgressBarContainers() {

  let [dataParsed, setDataParsed] = useState([]);


  function getDataFromLocalStorage() {
    let jsonFormatData = localStorage.getItem("Tasks");
    if (jsonFormatData != null) {
      setDataParsed(JSON.parse(jsonFormatData));
    }
  }



  function renderProgressBar() {
    let donesCount = 0;
    let todoCount = 0;
    dataParsed.map((task) => {
      if (task.done == 1) {
        donesCount++;
      }
      else {
        todoCount++;
      }
    })

    let donesPercent = (donesCount / dataParsed.length) * 100;
    let todoPercent = (todoCount / dataParsed.length) * 100;

    return (
      <>
        <Fade delay={1600}>
          <ProgressBar title={"DONE(" + donesCount + ")"} percent={parseInt(donesPercent)} />
        </Fade>

        <Fade delay={2200}>
          <ProgressBar title={"TODO(" + todoCount + ")"} percent={parseInt(todoPercent)} />
        </Fade>
      </>
    );
  }


  useEffect(() => {
    getDataFromLocalStorage();
  }, []);


  return (

    <>
      <div className="prog-container">
        <div className="introduction">
          <h2>
            <Zoom cascade left>My Dashboard</Zoom></h2>
          <p>
            <Zoom cascade left delay={1000}>
              This is a small dasboard for adding tasks for users to do them, and
              the user must see the name of the task to be sure about what
              he will todo in this task, you can search about the task, confirm
              it, and remove it. With our TODO list you can organize your tasks, so
              you can add the task required from you to the list to remember it, and
              when you finished the task, you can mark it as it done, and if the task canceled
              you can remove it from the list
            </Zoom>
          </p>
        </div>

        {renderProgressBar()}
      </div>
    </>
  );
}

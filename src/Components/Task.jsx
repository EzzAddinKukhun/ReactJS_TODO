import React from "react";
import "../todostyle.css";
export default function Task({ id, name, assignee, startDate, endDate, setItemDone, deleteTask, doneAttribute }) {

  return (
    <>
      <div className="task">
        <div>
          <b>{id}</b>
        </div>
        <div>{name}</div>
        <div>{assignee}</div>
        <div>{startDate}</div>
        <div>{endDate}</div>
        <div>
          {
            doneAttribute? "" :  <button onClick={setItemDone} type="button" class="btn btn-success">
            <i class="fa-solid fa-check"></i>
          </button>
          }   
        </div>
        <div>
          <button onClick={deleteTask} type="button" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </>
  );
}

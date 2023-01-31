import React, { useEffect, useState } from "react";
import Task from "./Task";
import Swal from "sweetalert2";
import Fade from 'react-reveal/Fade';
import Modal from "./Modal";
import TableHeader from './TableHeader';

export default function Tasks() {
  let [dataParsed, setDataParsed] = useState([]);
  let [toggle, setToggle] = useState(0);
  let [token, setToken] = useState("");


  async function getTasks() {
    await fetch(`http://localhost:8000/allTodos`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        setDataParsed(json);
      });
  }



  async function addNewTodo(name, assignee, startDate, endDate) {
    let dataObject = {
      name,
      assignee,
      startDate,
      endDate,
      done: 0
    };

    await fetch(`http://localhost:8000/addNewTodo`, {
      method: 'POST',
      body: JSON.stringify(dataObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.message == 'success') {
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success',

          );
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      });
  }


  async function setTodoDone(Id) {
    let todoId = Id;  
    await fetch(`http://localhost:8000/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.message == 'success') {
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success',

          );
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      });
  }

  async function deleteTask(Id) {
    let todoId = Id; 
   
    await fetch(`http://localhost:8000/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.message == 'success') {
          Swal.fire(
            'Good job!',
            'Task Deleted Successfully!',
            'success',

          );
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      });

  }


  function displayData() {
    return (
      dataParsed.filter((task) =>
        task.name.toLowerCase().includes(token)
      ).map((element, key) => {
        return (
          element.done == toggle ?
            < Task
              id={element.id}
              name={element.name}
              assignee={element.assignee}
              startDate={element.startDate}
              doneAttribute={element.done}
              setTodoDone={() => setTodoDone(element.id)}
              deleteTask={() => deleteTask(element.id)}
              endDate={element.endDate}
            /> : "")
      }))
  }

 

 

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Fade>
        <div className="tasks-container">
          <div className="tasks-table">
            <div className="controlBar">
              <div className="search-input">
                <input onChange={(e) => {

                  setToken(e.target.value);

                }} type="text" placeholder="Search"></input>
              </div>

              <div className="controlBtns">
                <button
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  type="button" class="btn btn-success">
                  <i class="fa-sharp fa-solid fa-circle"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-primary "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="tasksTable">
              <div className="tb-header text-muted">
                <TableHeader />
              </div>
              <div id="tasksTable" className="tasks-table-container">
                {displayData()}

              </div>
            </div>
          </div>
        </div>
      </Fade>

      <Modal addNewTodo={addNewTodo} />

    </>
  );
}

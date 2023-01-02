import React, { useEffect, useState } from "react";
import Task from "./Task";
import Swal from "sweetalert2";
import Fade from 'react-reveal/Fade';

export default function Tasks() {
  let [dataParsed, setDataParsed] = useState([]);
  let [toggle, setToggle] = useState(0);
  let [token, setToken] = useState("");

  console.log(token)

  function getDataFromLocalStorage() {
    let jsonFormatData = localStorage.getItem("Tasks");
    if (jsonFormatData != null) {
      setDataParsed(JSON.parse(jsonFormatData));
    }
  }

  function addToLocalStorage(name, assignee, startDate, endDate) {
    let dataObject = {
      name,
      assignee,
      startDate,
      endDate,
      done: 0
    };
    dataParsed.push(dataObject);
    setDataParsed(dataParsed)
    let localStorageData = JSON.stringify(dataParsed)
    localStorage.setItem("Tasks", localStorageData);
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success',

    );
    setTimeout(() => {
      window.location.reload();
    }, 1400);
  }

  function displayData() {
    return (
      dataParsed.filter((task) =>
        task.name.toLowerCase().includes(token)
      ).map((element, key) => {
        return (
          element.done == toggle ?
            < Task
              id={key}
              name={element.name}
              assignee={element.assignee}
              startDate={element.startDate}
              doneAttribute={element.done}
              setItemDone={() => setItemDone(key)}
              deleteTask={() => deleteTask(key)}
              endDate={element.endDate}
            /> : "")
      }))
  }

  function setItemDone(id) {
    dataParsed.find((element) => {
      if (dataParsed.indexOf(element) == id) {
        dataParsed[id].done = 1;
      }
      setDataParsed(dataParsed);
      let localStorageData = JSON.stringify(dataParsed)
      localStorage.setItem("Tasks", localStorageData);
      Swal.fire(
        'Good job!',
        'Task is Done Successfully!',
        'success',

      );
      setTimeout(() => {
        window.location.reload();
      }, 1400);

    })

  }


  function deleteTask(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dataParsed.find((element) => {
          if (dataParsed.indexOf(element) == id) {
            dataParsed.splice(id, 1);

          }
          setDataParsed(dataParsed);
          let localStorageData = JSON.stringify(dataParsed)
          localStorage.setItem("Tasks", localStorageData);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          setTimeout(() => {
            window.location.reload();
          }, 1400);

        })


      }
    })

  }


  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <>
      <Fade delay={2600}>
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
                <div>#</div>
                <div>Task Name</div>
                <div>Assignee</div>
                <div>From</div>
                <div>To</div>
                <div>Done</div>
                <div>Remove</div>
              </div>
              <div id="tasksTable" className="tasks-table-container">
                {displayData()}

              </div>
            </div>
          </div>
        </div>
        </Fade>

        {/* MODAL */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add Task
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="taskname"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Task Name</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="assignee"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Assignee</label>
                </div>
                <div className="w-100 mb-3">
                  <h6>Start Date</h6>
                  <input id="startdate" className="date w-100" type="date" />
                </div>
                <div className="w-100">
                  <h6>End Date</h6>
                  <input id="enddate" className="date w-100" type="date" />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    var taskname = document.getElementById("taskname").value;
                    var assignee = document.getElementById("assignee").value;
                    var startDate = document.getElementById("startdate").value;
                    var endDate = document.getElementById("enddate").value;
                    addToLocalStorage(taskname, assignee, startDate, endDate);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

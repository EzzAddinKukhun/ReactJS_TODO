import React from 'react'

export default function Modal({addToLocalStorage}) {
    return (
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
    )
}

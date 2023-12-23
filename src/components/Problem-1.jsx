import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", status: "Active" },
    { id: 2, name: "Task 2", status: "Completed" },
    { id: 3, name: "Task 3", status: "Pending" },
    // Add more tasks as needed
  ]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const status = e.target.elements.status.value;

    // Add a new task to the list
    setTasks([...tasks, { id: tasks.length + 1, name, status }]);
    // Reset the form
    e.target.reset();
  };

  const getFilteredTasks = () => {
    switch (show) {
      case "active":
        return tasks.filter((task) => task.status.toLowerCase() === "active");
      case "completed":
        return tasks.filter(
          (task) => task.status.toLowerCase() === "completed"
        );
      case "pending":
        return tasks.filter((task) => task.status.toLowerCase() === "pending");
      case "archive":
        return tasks.filter((task) => task.status.toLowerCase() === "archive");
      case "all":
      default:
        return tasks.sort((a, b) => {
          const order = ["active", "completed", "pending", "archive"];

          const getStatusOrder = (status) => {
            const index = order.indexOf(status);
            return index !== -1 ? index : order.length;
          };

          const compare =
            getStatusOrder(a.status.toLowerCase()) -
            getStatusOrder(b.status.toLowerCase());

          if (compare === 0) {
            // If statuses are the same, sort by ID (newest first)
            return b.id - a.id;
          }

          return compare;
        });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "pending" && "active"}`}
                type="button"
                onClick={() => handleClick("pending")}
              >
                Pending
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "archive" && "active"}`}
                type="button"
                onClick={() => handleClick("archive")}
              >
                Archive
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredTasks().map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem1;

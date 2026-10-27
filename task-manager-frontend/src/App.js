import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/tasks";
const STATUSES = ["Pending", "Ongoing", "Completed"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchTasks() {
    try {
      const response = await axios.get(API);
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Could not fetch tasks. Check that the backend and MongoDB are running.");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function createTask() {
    if (!title.trim()) {
      setError("Task title cannot be empty.");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(API, { title: title.trim() });
      setTasks((current) => [response.data, ...current]);
      setTitle("");
      setError("");
      setSuccess("Task created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create task.");
      setSuccess("");
    }
  }

  async function updateTaskStatus(id, newStatus) {
    try {
      const response = await axios.patch(`${API}/${id}`, { status: newStatus });
      setTasks((current) =>
        current.map((task) => (task._id === id ? response.data : task))
      );
      setError("");
      setSuccess("Task status updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update task status.");
      setSuccess("");
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${API}/${id}`);
      setTasks((current) => current.filter((task) => task._id !== id));
      setError("");
      setSuccess("Task deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete task.");
      setSuccess("");
    }
  }

  return (
    <main className="container py-5">
      <header className="dashboard-header mb-4">
        <p className="eyebrow mb-2">PROJECT WORKSPACE</p>
        <h1>Task Manager</h1>
        <p className="subtitle mb-0">
          Add tasks, track progress, and manage your project in one place.
        </p>
      </header>

      <section className="summary-row row g-3 mb-4">
        {STATUSES.map((status) => (
          <div className="col-md-4" key={status}>
            <div className={`summary-card ${status.toLowerCase()}`}>
              <span>{status} Tasks</span>
              <strong>{tasks.filter((task) => task.status === status).length}</strong>
            </div>
          </div>
        ))}
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <section className="add-task card border-0 shadow-sm mb-4">
        <div className="card-body">
          <label htmlFor="taskTitle" className="form-label fw-semibold">
            Add a new task
          </label>
          <div className="input-group">
            <input
              id="taskTitle"
              className="form-control"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && createTask()}
              placeholder="Enter task title"
            />
            <button className="btn btn-primary px-4" onClick={createTask}>
              Add Task
            </button>
          </div>
        </div>
      </section>

      <section className="row g-3">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);
          return (
            <div className="col-md-4" key={status}>
              <div className="task-column h-100">
                <div className="column-heading">
                  <h2>{status}</h2>
                  <span>{columnTasks.length}</span>
                </div>

                {columnTasks.length === 0 ? (
                  <p className="empty-state">No tasks in this category.</p>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>
      <footer className="text-center mt-5 small text-muted">
     Project Management Dashboard
      </footer>
    </main>
  );
}

function TaskCard({ task, onUpdateStatus, onDelete }) {
  return (
    <article className="task-card card border-0 shadow-sm mb-3">
      <div className="card-body">
        <h3 className="task-title">{task.title}</h3>
        <p className="small text-muted mb-3">Status: {task.status}</p>
        <div className="d-flex flex-wrap gap-2">
          {task.status !== "Pending" && (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => onUpdateStatus(task._id, "Pending")}>
              Pending
            </button>
          )}
          {task.status !== "Ongoing" && (
            <button className="btn btn-sm btn-info" onClick={() => onUpdateStatus(task._id, "Ongoing")}>
              Mark Ongoing
            </button>
          )}
          {task.status !== "Completed" && (
            <button className="btn btn-sm btn-success" onClick={() => onUpdateStatus(task._id, "Completed")}>
              Complete
            </button>
          )}
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

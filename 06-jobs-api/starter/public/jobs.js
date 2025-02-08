import {
  enableInput,
  inputEnabled,
  message,
  setToken,
  token,
  setDiv,
} from "./index.js";
import { showAddEdit } from "./addEdit.js";
import { showLoginRegister } from "./loginRegister.js";

let jobsDiv = null;
let jobsTable = null;
let jobsTableHeader = null;

export const handleJobs = () => {
  jobsDiv = document.getElementById("jobs");
  const logoff = document.getElementById("logoff");
  const addJob = document.getElementById("add-job");
  jobsTable = document.getElementById("jobs-table");
  jobsTableHeader = document.getElementById("jobs-table-header");

  jobsDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addJob) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        jobsTable.replaceChildren([jobsTableHeader]);
        showLoginRegister();
      } else if (e.target.classList.contains("deleteButton")) {
        enableInput(false);
        try {
          const jobId = e.target.dataset.id;
          const response = await fetch(`/api/v1/jobs/${jobId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (response.status === 200) {
            message.textContent = data.msg;
            e.target.closest("tr").remove();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target.classList.contains("editButton")) {
        const jobId = e.target.dataset.id;
        showAddEdit(jobId);
      }
    }
  });
};

export const showJobs = async () => {
  enableInput(false);
  try {
    const response = await fetch("/api/v1/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      jobsTable.replaceChildren([jobsTableHeader]);
      if (data.jobs.length === 0) {
        message.textContent = "No jobs found.";
      } else {
        data.jobs.forEach((job) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${job.company}</td>
            <td>${job.position}</td>
            <td>${job.status}</td>
            <td><button class="editButton" data-id="${job._id}">Edit</button></td>
            <td><button class="deleteButton" data-id="${job._id}">Delete</button></td>
          `;
          jobsTable.appendChild(row);
        });
        message.textContent = "Jobs loaded successfully.";
      }
      setDiv(jobsDiv);
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.error(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
};

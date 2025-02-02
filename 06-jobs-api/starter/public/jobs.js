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
      }
      // Обработчик для удаления
      else if (e.target.classList.contains("deleteButton")) {
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
            message.textContent = data.msg; // "The entry was deleted."
            e.target.closest("tr").remove(); // Удаление строки из таблицы
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      }
    }
  });
};

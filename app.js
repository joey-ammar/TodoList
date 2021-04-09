// Starting printing the date today in JS
const today = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNumber = today.getDate();
const dayString = days[today.getDay()];
const year = today.getFullYear();
const month = months[today.getMonth()];
let statement = "";
statement += `${dayNumber}, ${dayString} ${month} ${year}`;
const headerDate = document.querySelector(".header");
headerDate.innerHTML = statement;

// TODO LIST

/**
 * Newer Syntax
 */
const ul = document.querySelector("ul");
const input = document.querySelector("#inpt");
const btn = document.querySelector("#btn");
const filter = document.querySelector("#filter");
const remove = document.querySelector("#remove");

/**
 * Add Event Listeners
 */

btn.addEventListener("click", (e) => {
  // Prevent Default
  e.preventDefault();
  // if it is empty string it alert will pop up
  if (input.value === "") {
    alert("Add a Task!");
    return;
  }
  const inputValue = input.value;
  // Adding the Task
  //Creating the LI
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  //Create the Icon
  const icon = document.createElement("i");
  icon.classList = "fas fa-times";
  const anotherIcon = document.createElement("i");
  anotherIcon.classList = "fas fa-check";
  //Append the icon to Li
  li.appendChild(icon);
  li.appendChild(anotherIcon);
  //Append Li to Ul
  ul.appendChild(li);
  //Clear the input
  input.value = "";

  /**
   * *****************+
   * ******************
   * *****************+
   * ******************
   * Remove task
   */
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete ?")) {
      li.parentElement.removeChild(li);
      //Remove from the local Storage
      removeTaskFromLocalStorage(li);
    }
  });

  function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  /**
   * *****************+
   * ******************
   * *****************+
   * ******************
   * Mark as done
   */
  anotherIcon.addEventListener("click", () => {
    li.style.background = "#013a6b";
    li.style.color = "#fff";
    li.style.textDecoration = "line-through";
  });

  //Calling the localStorage function
  toLocalStorage(inputValue);
});

/**
 * *****************+
 * ******************
 * *****************+
 * ******************
 * Local Storage
 */
function toLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * *****************+
 * ******************
 * *****************+
 * ******************
 * Filter Tasks
 */

filter.addEventListener("keyup", (e) => {
  e.preventDefault();
  const characters = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((singleTask) => {
    const item = singleTask.firstChild.textContent;
    if (item.toLowerCase().indexOf(characters) != -1) {
      singleTask.style.display = "flex";
    } else {
      singleTask.style.display = "none";
    }
  });
});

/**
 * *****************+
 * ******************
 * *****************+
 * ******************
 * //Clear all the Tasks
 */
remove.addEventListener("click", () => {
  ul.innerHTML = "";
  localStorage.clear();
});
/**
 * *****************+
 * ******************
 * *****************+
 * ******************
 * Load Tasks inside the DOM after refresh or get back
 */
document.addEventListener("DOMContentLoaded", () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    //Create the Icon
    const icon = document.createElement("i");
    icon.classList = "fas fa-times";
    const anotherIcon = document.createElement("i");
    anotherIcon.classList = "fas fa-check";
    //Append the icon to Li
    li.appendChild(icon);
    li.appendChild(anotherIcon);
    //Append Li to Ul
    ul.appendChild(li);
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to delete ?")) {
        li.parentElement.removeChild(li);
        //Remove from the local Storage
        removeTaskFromLocalStorage(li);
      }
    });
    function removeTaskFromLocalStorage(taskItem) {
      console.log(taskItem);
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    /**
     * *****************+
     * ******************
     * *****************+
     * ******************
     * Mark as done
     */
    anotherIcon.addEventListener("click", () => {
      li.style.background = "#013a6b";
      li.style.color = "#fff";
      li.style.textDecoration = "line-through";
    });

    remove.addEventListener("click", () => {
      ul.innerHTML = "";
      localStorage.clear();
    });
  });
});

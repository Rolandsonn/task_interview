const API = "https://jsonplaceholder.typicode.com/users";
const tbody = document.querySelector(".tbody");
const filter = document.querySelector(".filter");
const refreshBtn = document.getElementById("refresh");
const sortSelect = document.getElementById("sortSelect");
let usersData = [];

const renderData = (usersData) => {
  tbody.innerHTML = "";

  usersData.forEach((user) => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const phoneTd = document.createElement("td");

    nameTd.innerHTML = user.name;
    tr.appendChild(nameTd);

    emailTd.innerHTML = user.email;
    tr.appendChild(emailTd);

    phoneTd.innerHTML = user.phone;
    tr.appendChild(phoneTd);

    return tbody.appendChild(tr);
  });
};

const fetchData = async () => {
  try {
    await fetch(API)
      .then((response) => response.json())
      .then((data) => {
        usersData = data;

        renderData(usersData);
      })
      .catch((err) => console.error(err));
  } catch (error) {
    alert("Error fetching users.");
    throw new Error("Error fetching data Users from fetchData" + error.message);
  }
};

const sortUsers = () => {
  const parameter = sortSelect.value;
  usersData.sort((a, b) => a[parameter].localeCompare(b[parameter]));
  renderData(usersData);
};

const filterUsers = () => {
  const searchTerm = filter.value.toLowerCase();
  const parameter = sortSelect.value;

  const filteredUsers = usersData.filter((user) => {
    const userValue = user[parameter].toLowerCase();
    return userValue.includes(searchTerm);
  });

  renderData(filteredUsers);
};

window.addEventListener("DOMContentLoaded", fetchData);
refreshBtn.addEventListener("click", fetchData);
sortSelect.addEventListener("change", sortUsers);
filter.addEventListener("input", filterUsers);

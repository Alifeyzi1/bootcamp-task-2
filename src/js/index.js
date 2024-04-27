const getDataBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".search-input");
const table = document.querySelector(".transaction-list");
const tableBody = document.querySelector(".tbl-body");
const tableHeader = document.querySelector(".tbl-header");
const chevron = document.querySelector(".fa-chevron-up");

chevron.addEventListener("click", sortData);
getDataBtn.addEventListener("click", getData);
searchInput.addEventListener("input", searchInData);

function getData() {
  table.classList.remove("hidden");
  getDataBtn.classList.add("hidden");
  searchInput.classList.remove("hidden");
  fetch("http://localhost:3000/transactions")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let transaction = "";
      tableHeader.classList.remove("hidden");

      data.forEach((item) => {
        transaction += `
          <tr>
            <td>${item.id}</td>
            <td><span class=${
              item.type === "افزایش اعتبار" ? "color-success" : "color-error"
            }>${item.type}</span></td>
            <td>${item.price}</td>
            <td>${item.refId}</td>
            <td>${new Date(item.date).toLocaleDateString("fa-IR")}</td>
          </tr>
       `;
      });

      tableBody.innerHTML = transaction;
    })
    .catch((err) => console.log(err));
}

function searchInData(e) {
  const query = e.target.value;
  fetch(`http://localhost:3000/transactions?refId_like=${query}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let transaction = "";
      tableHeader.classList.remove("hidden");
      getDataBtn.classList.add("hidden");
      searchInput.classList.remove("hidden");
      data.forEach((item) => {
        transaction += `
          <tr>
            <td>${item.id}</td>
            <td><span class=${
              item.type === "افزایش اعتبار" ? "color-success" : "color-error"
            }>${item.type}</span></td>
            <td>${item.price}</td>
            <td>${item.refId}</td>
            <td>${new Date(item.date).toLocaleDateString("fa-IR")}</td>
          </tr>
       `;
      });

      tableBody.innerHTML = transaction;
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
}

function sortData() {
  if (chevron.classList.contains("rotate")) {
    chevron.classList.remove("rotate");
    fetch(`http://localhost:3000/transactions?_sort=price&_order=desc`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let transaction = "";
        tableHeader.classList.remove("hidden");
        getDataBtn.classList.add("hidden");
        searchInput.classList.remove("hidden");
        data.forEach((item) => {
          transaction += `
        <tr>
          <td>${item.id}</td>
          <td><span class=${
            item.type === "افزایش اعتبار" ? "color-success" : "color-error"
          }>${item.type}</span></td>
          <td>${item.price}</td>
          <td>${item.refId}</td>
          <td>${new Date(item.date).toLocaleDateString("fa-IR")}</td>
        </tr>
     `;
        });
        tableBody.innerHTML = transaction;
      })
      .catch((err) => console.log(err));
  } else {
    chevron.classList.add("rotate");
    fetch(`http://localhost:3000/transactions?_sort=price&_order=asc`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let transaction = "";
        tableHeader.classList.remove("hidden");
        getDataBtn.classList.add("hidden");
        searchInput.classList.remove("hidden");
        data.forEach((item) => {
          transaction += `
        <tr>
          <td>${item.id}</td>
          <td><span class=${
            item.type === "افزایش اعتبار" ? "color-success" : "color-error"
          }>${item.type}</span></td>
          <td>${item.price}</td>
          <td>${item.refId}</td>
          <td>${new Date(item.date).toLocaleDateString("fa-IR")}</td>
        </tr>
     `;
        });
        tableBody.innerHTML = transaction;
      })
      .catch((err) => console.log(err));
  }
}

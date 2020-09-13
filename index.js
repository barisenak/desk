const title = document.querySelector("#title");
const description = document.querySelector("#description");
const submitBtn = document.querySelector("#submitBtn");
const desk = document.querySelector(".desk");
const form = document.querySelector("#form");
const modal = document.querySelector("#modal");
const inputTitle = document.querySelector("#inputTitle");
const inputDesk = document.querySelector("#inputDesk");
const redoBtn = document.querySelector("#redoBtn");
const closeBtn = document.querySelector("#closeBtn");

const arr = [];

function getDate() {
  const date = new Date();
  dateValue = `Created:${date.getDate()}/0${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return dateValue;
}

function getDesk() {
  arr.forEach((item) => {
    desk.innerHTML += `<div class="card"><p class="title">${item.title}</p>
                  <p class="desc">${item.description}</p>
                  <p>${item.date}</p>
                  <button id="delete">Удалить</button>
                  <button id="edit">Редактировать</button>
                  </div>`;
  });
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  desk.innerHTML = "";
  getDate();
  arr.push({
    title: title.value,
    description: description.value,
    date: dateValue,
  });
  form.reset();

  getDesk();
  const arrCard = document.querySelectorAll(".card");
  arrCard.forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      item.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    });
    item.addEventListener("mouseleave", (event) => {
      item.style.boxShadow = "none";
    });
  });
});

function doDelete() {
  const card = event.target.closest(".card");
  const titleValue = card.querySelector(".title").textContent;
  const descriptionValue = card.querySelector(".desc").textContent;

  arr.forEach((item, index) => {
    if (titleValue === item.title && descriptionValue === item.description) {
      arr.splice(index, 1);
    }
  });
  desk.innerHTML = "";
  getDesk();
}

function doEdit() {
  const card = event.target.closest(".card");
  let titleValue = card.querySelector(".title").textContent;
  let descriptionValue = card.querySelector(".desc").textContent;
  openModal();
  inputTitle.value = `${titleValue}`;
  inputDesk.value = `${descriptionValue}`;
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  redoBtn.addEventListener("click", () => {
    arr.forEach((item, index) => {
      if (titleValue === item.title && descriptionValue === item.description) {
        getDate();
        arr.splice(index, 1, {
          title: inputTitle.value,
          description: inputDesk.value,
          date: dateValue,
        });
        modal.style.display = "none";
        desk.innerHTML = "";
        getDesk();
      }
    });
  });
}

desk.addEventListener("click", (event) => {
  if (event.target.closest("#delete")) {
    doDelete();
  }
  if (event.target.closest("#edit")) {
    doEdit();
  }
});

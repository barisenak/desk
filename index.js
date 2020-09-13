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

let date = new Date();
date = `Created:${date.getDate()}/0${
  date.getMonth() + 1
}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  desk.innerHTML = "";
  arr.push({ title: title.value, description: description.value });
  form.reset();

  arr.forEach((item) => {
    desk.insertAdjacentHTML(
      "afterbegin",
      `<div class="card"><p class="title">${item.title}</p>
        <p class="desc">${item.description}</p>
        <p>${date}</p>
        <button id="delete">Удалить</button>
        <button id="edit">Редактировать</button>
        </div>`
    );
  });
  const arrCard = document.querySelectorAll(".card");
  arrCard.forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      event.preventDefault();
      item.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    });
    item.addEventListener("mouseleave", (event) => {
      event.preventDefault();
      item.style.boxShadow = "none";
    });
  });
});

desk.addEventListener("click", (event) => {
  if (event.target.closest("#delete")) {
    const card = event.target.closest(".card");
    const titleValue = card.querySelector(".title").textContent;
    const descriptionValue = card.querySelector(".desc").textContent;

    arr.forEach((item, index) => {
      if (titleValue === item.title && descriptionValue === item.description) {
        arr.splice(index, 1);
      }
    });
    desk.innerHTML = "";
    arr.forEach((item) => {
      desk.innerHTML += `<div class="card"><p class="title">${item.title}</p>
                    <p class="desc">${item.description}</p>
                    <p>${date}</p>
                    <button id="delete">Удалить</button>
                    <button id="edit">Редактировать</button>
                    </div>`;
    });
  }
});

desk.addEventListener("click", (event) => {
  if (event.target.closest("#edit")) {
    const card = event.target.closest(".card");
    let titleValue = card.querySelector(".title").textContent;
    let descriptionValue = card.querySelector(".desc").textContent;
    modal.style.display = "flex";
    inputTitle.value = `${titleValue}`;
    inputDesk.value = `${descriptionValue}`;
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    redoBtn.addEventListener("click", () => {
      arr.forEach((item, index) => {
        if (
          titleValue === item.title &&
          descriptionValue === item.description
        ) {
          arr.splice(index, 1, {
            title: inputTitle.value,
            description: inputDesk.value,
          });
          modal.style.display = "none";
          desk.innerHTML = "";
          arr.reverse();
          arr.forEach((item) => {
            desk.innerHTML += `<div class="card"><p class="title">${item.title}</p>
                          <p class="desc">${item.description}</p>
                          <p>${date}</p>
                          <button id="delete">Удалить</button>
                          <button id="edit">Редактировать</button>
                          </div>`;
          });
        }
      });
    });
  }
});

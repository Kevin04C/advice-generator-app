const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

const newAdvice = () => {
  document.body.innerHTML = `<img src="images/loader.svg" alt="cargando" class="loader">`;

  fetch("https://api.adviceslip.com/advice")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      const {
        slip: { id, advice },
      } = json;

      const div = document.createElement("div");
      div.classList.add("advice");

      div.innerHTML = `<p class="advice__title">ADVICE #${id}</p>
      <p class="advice__message">
        "${advice} "
      </p>
      <img src="images/pattern-divider-desktop.svg" alt="" /
      class="advice__divider">
      <button type="button" class="btn__message">
        <img src="images/icon-dice.svg" alt="" class="message__img" />
      </button>`;

      document.body.innerHTML = "";
      document.body.appendChild(div);
    })
    .catch((err) => {
      document.body.innerHTML = "";

      let message = err.statusText || "Ocurrió Un error";
      document.body.innerHTML = `<p class="advice-error">Error: ${err.status}: ${message}</p>`;
    });
};

document.addEventListener("DOMContentLoaded", newAdvice);

document.addEventListener("click", (e) => {
  if (
    e.target.matches(".btn__message") ||
    e.target.matches(".btn__message *")
  ) {
    newAdvice();
  }
});

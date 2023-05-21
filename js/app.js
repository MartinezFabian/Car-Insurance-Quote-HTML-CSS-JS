// funciones constructoras
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

function UserInterface() {}

// llenar el select year con opciones de años desde el año actual hasta 20 años atrás
UserInterface.prototype.fillOptionsYears = () => {
  const maxYear = new Date().getFullYear(); //devuelve el año actual
  const minYear = maxYear - 20; //devuelve el año actual menos 20 años

  const selectYear = document.querySelector("#year");

  for (let i = maxYear; i >= minYear; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;

    selectYear.appendChild(option);
  }
};

UserInterface.prototype.showMessage = (message, type) => {
  let existMessage = document.querySelector(".form__message");

  if (!existMessage) {
    const div = document.createElement("DIV");

    if (type === "error") {
      div.classList.add("form__message", "form__message--error");
    } else {
      div.classList.add("form__message", "form__message--success");
    }

    div.textContent = message;

    const form = document.querySelector("#form");

    form.insertBefore(div, form.querySelector("#form__result"));

    //luego de 3 segundos eliminar el mensaje
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  const ui = new UserInterface();
  ui.fillOptionsYears(); //llenar el select con los años

  //Variables
  const form = document.querySelector("#form");

  //funciones

  registerEventListeners();

  function registerEventListeners() {
    form.addEventListener("submit", quoteInsurance);
  }

  //cotizar seguro
  function quoteInsurance(e) {
    e.preventDefault(); //prevenir el comportamiento predeterminado del evento submit

    // leer valores seleccionados en el formulario
    const selectBrand = document.querySelector("#brand").value;

    const selectYear = document.querySelector("#year").value;

    /* selecciona el elemento <input> que tiene un atributo name con el valor 'type-insurance' 
     y que está marcado como "checked" (seleccionado) */
    const typeInsurance = document.querySelector("input[name='type-insurance']:checked").value;

    if (selectBrand === "" || selectYear === "" || typeInsurance === "") {
      ui.showMessage("Todos los campos son obligatorios", "error");
      return;
    }

    //si todos los campos están seleccionados

    ui.showMessage("Cotizando...", "success");
  }
}

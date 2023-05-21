// funciones constructoras
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

//cotizar seguro
Insurance.prototype.quote = function (basePrice) {
  /*
    1 = Americano   1.15
    2 =  Asiático   1.05 
    3 = Europeo     1.35
  */

  let finalPrice = 0;

  switch (this.brand) {
    case "1":
      finalPrice = basePrice * 1.15;
      break;

    case "2":
      finalPrice = basePrice * 1.05;
      break;

    case "3":
      finalPrice = basePrice * 1.35;
      break;

    default:
      break;
  }

  // por cada año de antigüedad del automóvil el precio se reduce en un 3%

  //conseguimos el año actual
  let currentYear = new Date().getFullYear();

  //le restamos al año actual el año del automóvil
  let difference = currentYear - this.year;

  // Reducción del precio en función de la antigüedad del automóvil
  finalPrice -= (difference * 3 * finalPrice) / 100;

  /*
    Seguro de tipo básico: 30% mas
    Seguro de tipo completo: 50% mas 
  */

  finalPrice = this.type === "basic" ? finalPrice * 1.3 : this.type === "full" ?? finalPrice * 1.5;

  return finalPrice;
};

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

    //luego de 2 segundos eliminar el mensaje
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

    const insurance = new Insurance(selectBrand, selectYear, typeInsurance);

    //le pasamos el precio base
    let result = insurance.quote(2000);
    console.log(result);
  }
}

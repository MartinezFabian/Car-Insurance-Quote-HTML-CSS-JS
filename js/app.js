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

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  const ui = new UserInterface();

  //llenar el select con los años
  ui.fillOptionsYears();
}

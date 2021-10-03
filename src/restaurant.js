const menu = {
  food: { coxinha: 3.9, sanduiche: 9.9, sashimi: 10.9, churrasquinho: 12.5 },
  drinks: { agua: 3.9, cerveja: 6.9, refrigerante: 5.8, suco: 4.5 },
};

const createMenu = (objParam) => ({
  fetchMenu: () => objParam,
  consumption: [],
});
const myRestaurant = createMenu(menu);

const orderFromMenu = (obj, orderParam) => {
  obj.consumption.push(orderParam);
  return obj;
};

let restaurant = {
  menu: myRestaurant.fetchMenu(),
  consumption: [],
  order: (string) => orderFromMenu(restaurant, string),
};

function getFood(food) {
  let value = 0;
  for (
    let index = 0;
    index < Object.entries(restaurant.menu.food).length;
    index += 1
  ) {
    if (Object.entries(restaurant.menu.food)[index][0] === food) {
      value += Object.entries(restaurant.menu.food)[index][1];
    }
  }

  return value;
}

function getDrink(drink) {
  let value = 0;
  for (
    let index = 0;
    index < Object.entries(restaurant.menu.drinks).length;
    index += 1
  ) {
    if (Object.entries(restaurant.menu.drinks)[index][0] === drink) {
      value += Object.entries(restaurant.menu.drinks)[index][1];
    }
  }

  return value;
}

function setPay(obj) {
  let value = 0;
  for (let index = 0; index < Object.entries(obj).length; index += 1) {
    let consumption = obj[index];
    value += getFood(consumption);
    value += getDrink(consumption);
  }
  value += (value / 100) * 10;
  return value.toFixed(2);
}

const getKeysMenu = () => {
  const newMenu = [];
  for (
    let index = 0;
    index < Object.entries(restaurant.menu.food).length;
    index += 1
  ) {
    newMenu.push(Object.entries(myRestaurant.fetchMenu().food)[index][0]);
    newMenu.push(Object.entries(myRestaurant.fetchMenu().drinks)[index][0]);
  }
  return newMenu;
};

const setMenu = () => {
  const menuFood = document.querySelector("#food");
  const menuDrink = document.querySelector("#drinks");
  for (
    let index = 0;
    index < Object.entries(restaurant.menu.food).length;
    index += 1
  ) {
    const listItensFood = document.createElement("li");
    const listItensDrink = document.createElement("li");
    const itemFood = Object.entries(menu.food)[index];
    const itemDrink = Object.entries(menu.drinks)[index];

    listItensFood.innerHTML = `${itemFood[0]} - R$ ${itemFood[1]}0`;
    menuFood.appendChild(listItensFood);

    listItensDrink.innerHTML = `${itemDrink[0]} - R$ ${itemDrink[1]}0`;
    menuDrink.appendChild(listItensDrink);
  }
};

const setOrder = () => {
  const orderListTotal = document.querySelector("#order-value");
  const orderList = document.querySelector("#order-list");
  const itemListTotal = document.createElement("li");
  const listItensOrder = document.createElement("li");
  for (
    let index = 0;
    index < Object.entries(restaurant.consumption).length;
    index += 1
  ) {
    listItensOrder.innerHTML = restaurant.consumption[index];
    orderList.appendChild(listItensOrder);
  }
  orderListTotal.innerHTML = "";
  itemListTotal.innerHTML = `R$ ${setPay(restaurant.consumption)}`;
  orderListTotal.appendChild(itemListTotal);
};

const addOrder = () => {
  const orderInput = document.querySelector(".order-input__input").value;
  const keysMenu = getKeysMenu();
  const valueInput = orderInput.toLowerCase();

  for (let index = 0; index < keysMenu.length; index++) {
    if (!keysMenu.includes(valueInput)) {
      return alert("Não existem esse produto no cardápio!");
    }
  }

  restaurant.order(valueInput);
  setOrder();
};

setMenu();

const btnGetOder = document.querySelector(".order-input__button");
btnGetOder.addEventListener("click", addOrder);

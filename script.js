let dishes = [
  {
    "name": "Heidelbeer-Zitronen-Pancakes",
    "description": "Luftige Buttermilch-Pancakes mit frischen Heidelbeeren und einem Hauch von Zitrone.",
    "price": 11.99
  },
  {
    "name": "Himbeer-Pancakes",
    "description": "Luftige Buttermilch-Pancakes mit frischen Himbeeren, serviert mit Ahornsirup.",
    "price": 10.99
  },
  {
    "name": "Haselnuss-Bananen-Waffeln",
    "description": "Knusprige Waffeln mit geschnittenen Bananen, gehackten Haselnüssen und einem Hauch Nutella.",
    "price": 9.49
  },
  {
    "name": "Belgische Schokoladen-Waffeln",
    "description": "Knusprige belgische Waffeln mit reichhaltiger Schokoladensauce, Beeren und Sahne.",
    "price": 8.99
  },
  {
    "name": "Vanille-Berliner",
    "description": "Fluffige Berliner gefüllt mit cremiger Vanillefüllung und bestäubt mit Puderzucker.",
    "price": 4.99
  },
  {
    "name": "Schokoladen-Berliner",
    "description": "Weiche Berliner gefüllt mit reichhaltiger Schokoladenganache und bestäubt mit Puderzucker.",
    "price": 5.99
  },
  {
    "name": "Minz-Schokoladen-Chip-Eis",
    "description": "Cremiges Minzeis mit Schokoladenstückchen, eine perfekte erfrischende Leckerei.",
    "price": 8.99
  },
  {
    "name": "Cookies & Cream Eisbecher",
    "description": "Vanilleeis mit zerstoßenen Schokoladenkeksen, Schokoladensauce und Schlagsahne.",
    "price": 8.99
  },
  {
    "name": "Erdnussbutter-Bananen-Shake",
    "description": "Megaleckerer Shake mit einer Mischung aus cremiger Erdnussbutter, Bananen und Vanilleeis.",
    "price": 4.99
  },
  {
    "name": "Erdbeer-Karamell-Shake",
    "description": "Erfrischender Shake mit frischen Erdbeeren, Karamellsirup und Vanilleeis.",
    "price": 4.99
  }
]


let basketItems = [];
let amount = [];
let addedPrices = [];


document.addEventListener("DOMContentLoaded", function () {
  loadBasket();
  showDishes();
  showBasket();
});


function showDishes() {
  var container = document.getElementById('dishContainer');
  if (container) {
    container.innerHTML = ``;
    dishes.forEach(function (dish, index) {
      container.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <div class="addSection">
                            <img onclick="addToBasket(${index})" class="addImage" src="./img/add.png" alt="Hinzufügen">
                        </div>
                        <span class="dishName">${dish.name}</span>
                        <br>
                        <span class="dishDescription">${dish.description}</span>
                        <br>
                        <span class="dishPrice">${dish.price.toFixed(2).replace('.', ',')} €</span>
                    </div>
                </div>
            `;
    });
  } else {
    console.error("Das Element mit der ID 'dishContainer' wurde nicht gefunden.");
  }
}


function addToBasket(i) {
  let existingItem = basketItems.find(item => item.name === dishes[i].name);

  if (existingItem) {
    existingItem.amount++;
    let existingIndex = basketItems.findIndex(item => item.name === existingItem.name);
    amount[existingIndex]++;
  } else {
    let newItem = Object.assign({}, dishes[i]);
    newItem.amount = 1;
    basketItems.push(newItem);
    amount.push(1);
  }

  saveBasket();
  showBasket();
}


function addAmount(i) {
  basketItems[i].amount++;
  amount[i]++;
  saveBasket();
  showBasket();
}


function showBasket() {
  let basket = document.getElementById('basket');
  basket.innerHTML = ``;
  if (basketItems.length > 0) {
    addedItems();
    showCosts();
  } else {
    emptyBasket();
  }
}


function addedItems() {
  basketItems.forEach(function (item, i) {
    basket.innerHTML += `<div class="card card-body cardDistance">
              <div class="basketContent">
              <p>${item.name}</p>
              <p>${item.price.toFixed(2).replace('.', ',')} €</p></div>
              <div class="deleteContainer">
                  <img class="garbageImage" src="./img/minus.png" alt="Entfernen" onclick="deleteAmount(${i})">
                  <span class="amountCounter">${amount[i]}</span>
                  <img class="garbageImage" src="./img/plus.png" alt="Hinzufügen" onclick="addAmount(${i})">
              </div>
              </div>`;
  });
}


function showCosts() {
  basket.innerHTML += `<div class="calcContent">
        <p>Zwischensumme: ${calculateSubtotal().toFixed(2).replace('.', ',')} €</p>
        <p>Lieferkosten: ${calculateDeliveryCosts().toFixed(2).replace('.', ',')} €</p>
        <p><b><u>Gesamt: ${calculateTotal().toFixed(2).replace('.', ',')} €</u></b></p>
        <p style="font-size: 14px; color: darkgray">${deliveryCostText()}</p>
    </div>`;

    basket.innerHTML += `<div class="orderButtonContainer">
        <button class="orderButton">Bestellen</button>
    </div>`;
}


function emptyBasket() {
  basket.innerHTML = `
  <div class="basketStyle">
      <img class="basketImage" src="./img/shopping-cart.png" alt="Warenkorb">
      <h1 class="cartHeadline"><b>Fülle deinen Warenkorb</b></h1>
      <h2 class="cartH2">Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</h2>
  </div>
`;
}


function calculateSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < basketItems.length; i++) {
    subtotal += basketItems[i].price * amount[i];
  }
  return subtotal;
}


function calculateDeliveryCosts() {
  if (calculateSubtotal() > 15) {
    return 0;
  } else {
    return 2.50;
  }
}

function deliveryCostText() {
  if (calculateSubtotal() > 15) {
    return ``;
  } else {
    return `<i>Bestelle für min. 15 € für eine kostenlose Lieferung.</i>`
  }
}


function calculateTotal() {
  return calculateSubtotal() + calculateDeliveryCosts();
}



function saveBasket() {
  const basketData = { items: basketItems, amounts: amount };

  localStorage.setItem('basketData', JSON.stringify(basketData));
  localStorage.setItem('addedPrices', JSON.stringify(addedPrices));
}


function loadBasket() {
  let savedBasketData = localStorage.getItem('basketData');
  let savedAddedPrices = localStorage.getItem('addedPrices');

  if (savedBasketData && savedAddedPrices) {
    const basketData = JSON.parse(savedBasketData);
    const savedPrices = JSON.parse(savedAddedPrices);

    basketItems = basketData.items;
    amount = basketData.amounts;

    addedPrices = savedPrices;
  }
}


function deleteAmount(i) {
  basketItems[i].amount--;
  amount[i]--;

  if (basketItems[i].amount === 0) {
    basketItems.splice(i, 1);
    amount.splice(i, 1);
  }

  saveBasket();
  showBasket();
}
async function fetchDishes() {
  const response = await fetch("./data/dishes.json");
  if (response.ok) {
    const dishes = await response.json();
    displayDishes(dishes);
  }
}

async function fetchDish(id) {
  const response = await fetch("./data/dishes.json");
  if (response.ok) {
    const dishes = await response.json();
    if (id) {
      const dish = dishes.filter((dish) => dish.id === id)
      return dish[0];
    }
  }
  return null;
}

function displayDishes(dishes) {
  let html = "";
  for (let i = 0; i < dishes.length; i++) {
    const { image, title, price, dishesAvailable, id } = dishes[i];
    html += `<div class="dish">
              <img src="${image}" alt="Dish 1" />
              <div class="dish-title">${title}</div>
              <div class="dish-price">$ ${price}</div>
              <div class="dishes-available">${dishesAvailable} bowls available</div>
              <div class="add-to-cart" onclick="addToOrder(${id})">Add to Order</div>
            </div>`;
  }
  document.getElementById("load-dishes").innerHTML = html;
}

async function addToOrder(id) {
  const dish = await fetchDish(id);
  
  displayOrder(dish);
}

function displayOrder(dish) {
  const tbody = document.querySelector('.order-list tbody');
  const orderItem = `<tr>
    <td>
      <img src="${dish.image}" />
      <div class="d-details">
        <span class="d-title">${dish.title}</span>
        <span class="d-price">${dish.price}</span>
      </div>
    </td>
    <td>
      <input type="text" id="qty-input" dish-id="${dish.id}" dish-price="${dish.price}" onkeyup="computeSubtotal(event)"/>
    </td>
    <td id="sb-price">
      <span class="subtotal" id="subtotal-${dish.id}"></span>
      <button id="remove-btn" onclick="removeDish()">Del</button>
    </td>
  </tr>`;
  let orderItems = tbody.innerHTML;
  orderItems += orderItem;
  tbody.innerHTML = orderItems;
}

function computeSubtotal(e) {
  const qtyInput = e.target;
  const id = qtyInput.getAttribute('dish-id');
  const price = +qtyInput.getAttribute('dish-price');
  const qty = +qtyInput.value;
  let subtotal = 0;
  if (qty > 0) {
    subtotal = price * qty;
  }
  document.querySelector('#subtotal-' + id).innerHTML = subtotal;
}

function removeDish() {
  alert('removing...')
}

fetchDishes();



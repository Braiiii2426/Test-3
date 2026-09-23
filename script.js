let cart = [];
let total = 0;

// SHOW DETAILS BASED ON ORDER TYPE
function showOrderDetails() {

    let type = document.getElementById("orderType").value;
    let details = document.getElementById("orderDetails");

    details.innerHTML = "";

    if (type === "dinein") {

        details.innerHTML = `
            <input type="number" id="guests" placeholder="Number of Guests">
            <input type="time" id="reservationTime">
        `;

    } else if (type === "pickup") {

        details.innerHTML = `
            <input type="time" id="pickupTime">
        `;

    } else if (type === "delivery") {

        details.innerHTML = `
            <input type="text" id="address" placeholder="Delivery Address">
            <input type="time" id="deliveryTime">
        `;
    }
}


// ADD ITEM
function addItem(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}


// UPDATE CART
function updateCart() {

    let cartDiv = document.getElementById("cart");

    cartDiv.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>No items added yet.</p>";
    }

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        cartDiv.innerHTML += `
            <div>
                <span>
                    ${item.name} x${item.quantity}
                </span>

                <span>
                    ₱${subtotal}
                    <button onclick="removeItem(${index})">X</button>
                </span>
            </div>
        `;
    });

    document.getElementById("total").innerText =
        "Total: ₱" + total;
}


// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// CHECKOUT
function checkout() {

    let name = document.getElementById("name").value;
    let contact = document.getElementById("contact").value;
    let orderType = document.getElementById("orderType").value;

    if (name === "" || contact === "") {
        alert("Please enter your name and contact number.");
        return;
    }

    if (cart.length === 0) {
        alert("Please add at least one item.");
        return;
    }

    if (orderType === "") {
        alert("Please select an order type.");
        return;
    }

    let details = "";

    if (orderType === "dinein") {

        let guests = document.getElementById("guests").value;
        let time = document.getElementById("reservationTime").value;

        if (guests === "" || time === "") {
            alert("Please complete the reservation details.");
            return;
        }

        details = `
            <p><b>Order Type:</b> Dine-in</p>
            <p><b>Guests:</b> ${guests}</p>
            <p><b>Reservation Time:</b> ${time}</p>
        `;

    } else if (orderType === "pickup") {

        let time = document.getElementById("pickupTime").value;

        if (time === "") {
            alert("Please enter your pickup time.");
            return;
        }

        details = `
            <p><b>Order Type:</b> Pickup</p>
            <p><b>Pickup Time:</b> ${time}</p>
        `;

    } else if (orderType === "delivery") {

        let address = document.getElementById("address").value;
        let time = document.getElementById("deliveryTime").value;

        if (address === "" || time === "") {
            alert("Please complete the delivery details.");
            return;
        }

        total += 50;

        details = `
            <p><b>Order Type:</b> Delivery</p>
            <p><b>Address:</b> ${address}</p>
            <p><b>Delivery Time:</b> ${time}</p>
            <p><b>Delivery Fee:</b> ₱50</p>
        `;
    }

    // CREATE RECEIPT
    let receipt = document.getElementById("receipt");

    let items = "";

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        items += `
            <p>
                ${item.name} x${item.quantity}
                - ₱${subtotal}
            </p>
        `;
    });

    receipt.innerHTML = `
        <h2>🧾 RECEIPT</h2>

        <p><b>Restaurant:</b> Wayne's Restaurant</p>
        <p><b>Customer:</b> ${name}</p>
        <p><b>Contact:</b> ${contact}</p>

        <hr>

        ${details}

        <hr>

        ${items}

        <hr>

        <h3>Total: ₱${total}</h3>

        <p>Thank you for ordering!</p>

        <button onclick="window.print()">Print Receipt</button>
    `;

    receipt.style.display = "block";

    receipt.scrollIntoView({
        behavior: "smooth"
    });
}

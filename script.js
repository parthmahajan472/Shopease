let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function addToCart(id, name, price) {
    let product = { id, name, price };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to the cart.`);
}

function loadCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
        `;
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function placeOrder() {
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let postal = document.getElementById('postal').value;

    if (!name || !address || !city || !postal) {
        alert('Please fill all fields');
        return;
    }

    let order = {
        name,
        address,
        city,
        postal,
        items: cart,
        date: new Date().toLocaleString()
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Order placed successfully!');
    window.location.href = 'order-history.html';
}

function loadOrderHistory() {
    let orderHistoryContainer = document.getElementById('order-history');
    
    if (orders.length === 0) {
        orderHistoryContainer.innerHTML = '<p>No orders yet.</p>';
        return;
    }

    orders.forEach(order => {
        orderHistoryContainer.innerHTML += `
            <div class="order-item">
                <h3>Order for ${order.name}</h3>
                <p>${order.address}, ${order.city}, ${order.postal}</p>
                <p>Order placed on: ${order.date}</p>
                <h4>Items:</h4>
                <ul>
                    ${order.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
                </ul>
            </div>
        `;
    });
}

if (document.location.pathname.includes('cart.html')) {
    loadCart();
} else if (document.location.pathname.includes('order-history.html')) {
    loadOrderHistory();
}

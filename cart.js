function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartItems(items) {
    localStorage.setItem('cart', JSON.stringify(items));
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';
    let total = 0;
    const cartItems = getCartItems();
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.images[0];
        img.alt = item.title;
        itemElement.appendChild(img);

        // Create and append item details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'item-details';

        const titleH3 = document.createElement('h3');
        titleH3.textContent = item.title;
        detailsDiv.appendChild(titleH3);

        const priceP = document.createElement('p');
        priceP.textContent = `Price: $${item.price.toFixed(2)}`;
        detailsDiv.appendChild(priceP);

        itemElement.appendChild(detailsDiv);

        // Create and append item actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'item-actions';

        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => updateQuantity(item.id, -1));
        quantityDiv.appendChild(minusButton);

        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        quantityDiv.appendChild(quantitySpan);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => updateQuantity(item.id, 1));
        quantityDiv.appendChild(plusButton);

        actionsDiv.appendChild(quantityDiv);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItem(item.id));
        actionsDiv.appendChild(removeButton);

        itemElement.appendChild(actionsDiv);

        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function updateQuantity(itemId, change) {
    const cartItems = getCartItems();
    const existItem = cartItems.find(item => item.id === itemId);
    if (existItem) {
        existItem.quantity = Math.max(0, existItem.quantity + change);
        if (existItem.quantity === 0) {
            removeItem(itemId);
        } else {
            saveCartItems(cartItems);
            renderCart();
        }
    }
}

function removeItem(itemId) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartItems(cartItems);
    renderCart();
}

renderCart();

window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        renderCart();
    }
});


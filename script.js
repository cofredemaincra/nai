// Datos de ejemplo
const products = [
    { id: 1, name: 'Camiseta', price: 19.99, category: 'ropa', image: 'https://via.placeholder.com/150', description: 'Una cómoda camiseta de algodón.' },
    { id: 2, name: 'Pantalón', price: 39.99, category: 'ropa', image: 'https://via.placeholder.com/150', description: 'Un pantalón elegante y duradero.' },
    { id: 3, name: 'Zapatos', price: 59.99, category: 'ropa', image: 'https://via.placeholder.com/150', description: 'Zapatos cómodos para el día a día.' },
    { id: 4, name: 'Teléfono', price: 299.99, category: 'electronica', image: 'https://via.placeholder.com/150', description: 'Un teléfono inteligente de última generación.' },
    { id: 5, name: 'Laptop', price: 699.99, category: 'electronica', image: 'https://via.placeholder.com/150', description: 'Una potente laptop para trabajo y entretenimiento.' },
    { id: 6, name: 'Sartén', price: 29.99, category: 'hogar', image: 'https://via.placeholder.com/150', description: 'Una sartén antiadherente de alta calidad.' },
    // Añade más productos aquí...
];

let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [...products];
const cart = [];

// Elementos del DOM
const productContainer = document.getElementById('products');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');
const categorySelect = document.getElementById('category');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const productModal = document.getElementById('product-modal');
const productDetails = document.getElementById('product-details');
const productReviews = document.getElementById('product-reviews');
const reviewForm = document.getElementById('review-form');

// Funciones
function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    productContainer.innerHTML = '';
    pageProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="view-product" data-id="${product.id}">Ver Detalles</button>
            <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
        `;
        productContainer.appendChild(productElement);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    currentPageSpan.textContent = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

function filterProducts() {
    const category = categorySelect.value;
    const maxPrice = parseInt(priceRange.value);
    const searchTerm = searchInput.value.toLowerCase();

    filteredProducts = products.filter(product => 
        (category === '' || product.category === category) &&
        product.price <= maxPrice &&
        product.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    displayProducts();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.length;
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    productDetails.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
    `;

    // Aquí normalmente cargarías las reseñas desde un servidor
    productReviews.innerHTML = '<h3>Reseñas</h3>';
    productModal.style.display = 'block';
}

// Event Listeners
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
});

categorySelect.addEventListener('change', filterProducts);

priceRange.addEventListener('input', () => {
    priceValue.textContent = `$${priceRange.value}`;
    filterProducts();
});

searchBtn.addEventListener('click', filterProducts);

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos de inicio de sesión a un servidor
    alert('Inicio de sesión exitoso');
    loginModal.style.display = 'none';
});

cartBtn.addEventListener('click', () => {
    updateCart();
    cartModal.style.display = 'block';
});

checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí normalmente procesarías el pago y enviarías los datos a un servidor
    alert('Compra realizada con éxito');
    cart.length = 0;
    updateCart();
    checkoutModal.style.display = 'none';
});

productContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    } else if (e.target.classList.contains('view-product')) {
        const productId = parseInt(e.target.dataset.id);
        showProductDetails(productId);
    }
});

cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(e.target.dataset.id);
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }
});

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí normalmente enviarías la reseña a un servidor
    alert('Reseña enviada con éxito');
    reviewForm.reset();
});

// Cerrar modales al hacer clic fuera de ellos
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Inicialización
displayProducts();

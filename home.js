let loadCnt = 0;
let allProduct = null;
let howMany = 10;

async function fetchAndRenderProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        //console.log(response)
        const product = await response.json(); 
        console.log(product)
        allProduct = product.products;
        showAllProducts(allProduct)

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function showAllProducts(allProduct) {
    const productGrid = document.getElementById('productGrid');

    for (let i = loadCnt; i < howMany && i < allProduct.length; i++) {
        const productCard = document.createElement('div');
        productCard.addEventListener("click",()=>{showDetails(allProduct[i].id)})
        productCard.className = 'product-card';
        //productCard.setAttribute("id",`${allProduct[i].id}`);
        productCard.innerHTML = `
            <img src="${allProduct[i].images[0]}" alt="">
            <h3>${allProduct[i].title}</h3>
            <p>$${allProduct[i].price}</p>
            <button class="addToCart" id="${allProduct[i].title}">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
        
        loadCnt++;
        if (loadCnt + 1 == allProduct.length) { // Hide load more button if all products are loaded
            loadBtn.style.display = "none";
        }
    }
    
    // Add event listeners to all 'Add to Cart' buttons
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', myCart);
    });
}


let loadDiv = document.querySelector("#load");
let loadBtn = document.createElement("button");
loadBtn.setAttribute("id", "loadBtn");
loadBtn.innerText = "Load More";
loadBtn.addEventListener("click", () => {
    howMany += 10;
    showAllProducts(allProduct);
});

loadDiv.append(loadBtn);

fetchAndRenderProducts();

//===========================add to cart============================================================

function myCart(event) {
     event.stopPropagation();
    myAlert();
    const productId = event.target.id; 
    const product = allProduct.find(p => p.title === productId); 
   
    let cart = JSON.parse(localStorage.getItem('cart')) ?? []; 
    let productExists = false; 
    cart.forEach(item => {
        if (item.title === productId) {
            item.quantity += 1;
            productExists = true;
        }
    });
    if (!productExists) {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
}

function myAlert(){
    Swal.fire("Item has been added in your cart!");
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// If you want to ensure the sticky class is applied correctly on page load
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    }
});

function showDetails(id){
    //console.log(id)
    let obj=allProduct.find((e)=>{
        return e.id==id;
    })
    //console.log(obj)
    let data=encodeURIComponent(JSON.stringify(obj));
    //console.log(data);
    window.location.href=`detail.html?abc=${data}`;
}
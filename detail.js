
//---------------------
function otherWork(productAllData){

    const container=document.querySelector(".container");
    console.log(container);
    
    container.innerHTML=`
        <div class="product-image">
                <div class="main-image">
                    <img id="mainImage"
                        src="${productAllData.images[0]}"
                        alt="${productAllData.title}">
                </div>
                <div class="thumbnail-images">
                    
                </div>
            </div>
            <div class="product-details">
                <h1 class="product-title">${productAllData.title}</h1>
                <span class="product-rating">${productAllData.rating} ★</span>
                <div class="product-price">
                    ${productAllData.price} <span class="product-discount">${productAllData.discountPercentage}% off</span>
                </div>
                <p class="product-description">${productAllData.description}</p>
                <div class="product-meta">
                    <p>Brand: ${productAllData.brand}</p>
                    <p>Category: ${productAllData.category}</p>
                    <p>SKU: ${productAllData.sku}</p>
                    <p>Availability: ${productAllData.availabilityStatus} (5 ${productAllData.stock})</p>
                    <p>Shipping: ${productAllData.shippingInformation}</p>
                    <p>Return Policy: ${productAllData.returnPolicy}</p>
                    <p>Warranty: ${productAllData.warrantyInformation}</p>
                </div>
                <button class="buy-button">ADD TO CART</button>
            </div> `
           afterOther(productAllData);

}

function afterOther(productAllData){
    const mainImage = document.getElementById('mainImage');
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    
    function updateMainImage(src) {
        mainImage.src = src;
       
    }
    
    
    productAllData.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.addEventListener('click', () => updateMainImage(image));
        thumbnailContainer.appendChild(thumbnail);
    });
}
//------------------------------------------------------------
document.addEventListener("DOMContentLoaded",()=>{
    let search=new URLSearchParams(window.location.search)
    let obj=JSON.parse(decodeURIComponent(search.get('abc')));
    console.log(obj)
    
    //===================================================
    const productData = {
        "image": [
           
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/2.png",
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/3.png"
        ]
    };
    productData.image.unshift(obj.images);
    let images=productData.image.flat(Infinity);
    obj.images=images;
    //---------------
    const productAllData={...obj}
    console.log(productAllData);
            otherWork(productAllData)
            reviewShow(productAllData)
})

//========================commit=================================
function reviewShow(productAllData){
    const reviewContainer=document.querySelector(".reviews")
    productAllData.reviews.forEach((ele)=>{
      let  reviewDiv=document.createElement("div");
        reviewDiv.setAttribute("class","review")
        reviewDiv.innerHTML=`
               <p><strong>${ele.reviewerName}</strong> - 2 ★</p>
               <p>${ele.comment}</p>
               <small>${ele.reviewerEmail}</small> 
       `
       reviewContainer.append(reviewDiv)
    })
   
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});
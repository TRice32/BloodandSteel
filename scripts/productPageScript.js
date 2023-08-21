
// burger menu

// const menu = document.querySelector(".menuContainer")
// const burger = document.querySelector(".burgerContainer")
// const burgerInput = document.querySelector("#burger")
// burger.addEventListener("click", function() {
//     menu.classList.toggle("menuContainerSelected")
// })

// document.addEventListener('keydown', function(e) {
//     if(e.key === "Escape" && burgerInput.checked) {
//         burgerInput.checked = false
//         menu.classList.toggle("menuContainerSelected")
//     }
// })

// modal

const itemImage = document.querySelectorAll(".itemImageGalleryContainer")
// const subGallery = document.querySelectorAll(".subGallery")
const itemContainer = document.querySelector(".itemImageGallery")
itemImage.forEach(item => (item.addEventListener("click", (e) => {
    itemImage.forEach(item => item.classList.remove("showcaseItem"))
    itemContainer.prepend(e.target.parentNode)
    e.target.parentNode.classList.add("showcaseItem")
})));

// burger menu script

const menu = document.querySelector(".menuContainer")
const burger = document.querySelector(".burgerContainer")
const burgerInput = document.querySelector("#burger")
// burger.addEventListener("click", function() {
//     menu.classList.toggle("menuContainerSelected")
//     menuContainerSelected = !menuContainerSelected
// })

document.addEventListener('keydown', function(e) {
    if(e.key === "Escape" && burgerInput.checked) {
        burgerInput.checked = false
        menu.classList.toggle("menuContainerSelected")
    }
})



//render products
const productElement = document.querySelector(".productSection")
// const accessorySection = document.querySelector(".accessoriesContainer")

const itemToAdd = document.querySelector(".itemMainPage")

function renderProducts() {
    products.forEach((product) => {
        productElement.setAttribute("id", product.id);
    })
}




let imageModal = (src) => {
    const modal = document.createElement("div")
    modal.classList.add("modal");
    document.querySelector(".productPageContainer").append(modal);
    const newImage = document.createElement("img")
    newImage.setAttribute("src", src)
    const closeButton = document.createElement("p")
    closeButton.classList.add("modalImageClose")
    const closeSymbol = document.createTextNode("X")
    closeButton.appendChild(closeSymbol)
    newImage.addEventListener("pointerover", zoomIn)
    newImage.addEventListener("pointermove", zoomIn)
    newImage.addEventListener("pointerleave", zoomOut) 
    closeButton.addEventListener("click", () => {
        modal.remove()
    })
    document.addEventListener("keydown", (e) => {
        if(e.key = "Escape") {
            modal.remove()
        }
    })
    modal.append(newImage, closeButton)
    
}

// image hover zoom

let imageZoom;


function zoomIn(e) {
    imageZoom = e.target
    // console.log(imageZoom);
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    imageZoom.style.transformOrigin = `${x}px ${y}px`
    imageZoom.style.left = "0";
    imageZoom.style.width = "100%";
    imageZoom.style.transform = "translateX(0%)";
    imageZoom.style.transform = "scale(2.5)";
}   
    
function zoomOut(e) {
    imageZoom.style.transformOrigin = `center center`;
    imageZoom.style.transform = "scale(1)";
    imageZoom.style.width = "90%";
    imageZoom.style.transform = "translateX(-50%)";
    imageZoom.style.left = "50%";
}


const cart = document.querySelector(".cart")
const addToCartButton = document.querySelectorAll(".addToCartButton")
const images = document.querySelectorAll(".itemImage");
let imgsource;


images.forEach(img => {
    img.addEventListener("click", (e) => {
        imgsource = e.target.src;
        // console.log(imgsource);
        imageModal(imgsource)
    })
})

// add item to cart

const productPage = document.querySelector(".itemMainPage");
const cartSlider = document.querySelector(".cartSliderContainerInner")
const cartSliderOuter = document.querySelector(".cartSliderContainer")
// const continueShoppingButton = cartSliderOuter.querySelector(".continueShop")
const cartNumbersDisplay =  document.querySelector(".cartMenu")
const removeItemSelect = document.querySelectorAll(".removeItem")
const checkoutButton = document.querySelector(".checkout")
const continueShop = document.querySelector(".continueShop")
const upsellAddToCartButton = document.querySelector(".upsellAddToCartButton")

let menuContainerSelected = false
let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || []
let cartNumbers =  parseInt(localStorage.getItem("updateCart"))
let cartCost = JSON.parse(localStorage.getItem("totalCost"))
let item;
let cartDisplay = false
let itemIsRemoved = false
let itemRemoved = [];
updateCart()
// console.log(cartItems);


// upsellAddToCartButton.addEventListener("click", (e) => {
//     console.log(e.target.id);
// })

products.forEach((product) => {
    addToCartButton.forEach((button) => button.addEventListener("click", (e) => {
        if(product.id == e.target.id) {
            productPage.setAttribute("id", product.id);
            menuCartNumbers()
            assignProduct(product)
            updateCart()
            cartSliderOuter.style.transform = "translateX(0)";
            cartDisplay = true
            menu.classList.remove("menuContainerSelected")
        }
    })
)})

burger.addEventListener("click", function() {
    menu.classList.toggle("menuContainerSelected")
    menuContainerSelected = !menuContainerSelected
    // console.log(cartDisplay);
    if(cartDisplay == true) {
        cartSliderOuter.style.transform = "translateX(500px)"
        // console.log(hello);
    }
})


cartNumbersDisplay.addEventListener("click", () => {
    if(cartDisplay == false) {
        
        // menu.classList.contains("menuContainerSelected")
        
        
        cartSliderOuter.style.transform = "translateX(0)"
        cartDisplay = true;
        if(menuContainerSelected == true && cartDisplay == true) {
            // cartSliderOuter.style.transform = "translateX(0px)"
            menuContainerSelected = !menuContainerSelected
            menu.classList.toggle("menuContainerSelected")
            
        } else {
            
            console.log(menuContainerSelected);
        }
    } else {
        cartSliderOuter.style.transform = "translateX(500px)"
        cartDisplay = false
    }
})


// TO DO: update menuCartNumbers, update storage: updateCart, totalCost, productsInCart (DONE ALL I THINK)...
// burger menu click slides away cart and vice versa---done!!!
// new issue (sigh)... when removed items are added back, the incart isn't reset, adds on to previous incart number--- fixed!!
// ! new to do: single + - for items,
// ! proceed to checkout display behaving oddly
// ! make addtocart link target whole button instead of just word
// !create dedicated function that handles translateX and toggle menuContainer etc to prevent repeating same code kinda


function removeItem(id, incart) {
    let items = Object.values(cartItems)
    
    cartItems = items.filter(product1 => product1.id != id)

    cartItems = cartItems.reduce((acc, val) => {
        return {...acc, [val.name]: val}}
        , [])
    
        // console.log(cartItems);
        cartNumbers -= incart;
        // console.log(cartNumbers);
    // itemIsRemoved = true;
    if(!(itemRemoved.includes(id))) {
        // console.log("yola");
        itemRemoved.push(id);
    } 
    console.log(itemRemoved);
    removeTrigger = true;
    menuCartNumbers()
    updateCart()
    
    if(cartNumbers === 0) {
        checkoutButton.style.display = "none"
        continueShop.innerHTML = "Start Shopping"
    }
}

function assignProduct(product) {
    // console.log(cartItems.length);
    // console.log(itemRemoved.includes(product.id));
    // console.log(product.id, itemRemoved);
    if(product.instock > 0) {
        if(cartItems.length != 0 && !(itemRemoved.includes(product.id))) {
            
            if(cartItems[product.name] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.name]: product 
                }
                console.log("hi1");
            }
            console.log("hi2");
            cartItems[product.name].incart += 1
            
        } else if(cartItems.length != 0 && itemRemoved.includes(product.id)) {
            if(cartItems[product.name] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.name]: product 
                }
            }
            cartItems[product.name].incart = 1
            itemRemoved = itemRemoved.filter(id => id != product.id)
            console.log("hi new", itemRemoved);
            
        } else if(cartItems.length == 0 && itemRemoved.includes(product.id)){
            itemRemoved = itemRemoved.filter(id => id != product.id)
            product.incart = 1
            console.log("hi7");
            cartItems = {[product.name]: product}
            
        } else {
            product.incart = 1
            console.log("hi8");
            cartItems = {[product.name]: product}
        }
    } else {
        outOfStock()
    }
    // product.instock > 0 ? cartArray.push(item) : outOfStock();
}

function updateCart() {
    updateCartSlider(cartItems)
    // removeItem(product)
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    if (cartNumbers > 0) {
        cartNumbersDisplay.innerHTML = `Cart ${cartNumbers}`;
    } else {
        cartNumbersDisplay.innerHTML = `Cart`;
    }
}

let removeTrigger = false;

function menuCartNumbers() {
    
    if(removeTrigger) {
        localStorage.setItem("updateCart", cartNumbers) 
    } else if(cartNumbers) {
        localStorage.setItem("updateCart", cartNumbers += 1) 
    } else {
        localStorage.setItem("updateCart", cartNumbers = 1)
    }    
    removeTrigger = false;
}

function outOfStock() {
    alert("out of stock");
    // ! needs more...
}


function updateCartSlider(cartItems) {
    cartSlider.innerHTML = "";
    if(Object.keys(cartItems).length != 0 && cartItems.constructor === Object && cartItems) {
        const item = Object.values(cartItems)
        let getCartSliderItems = `
        <h3>Cart</h3>
        `
        
        item.forEach((item) => {
            const keys = ["imgSource", "name", "incart", "price", "id"]

            if (typeof cartItems === "string") {
                cartItems = JSON.parse({[item.name] : cartItems});
                // console.log(cartItems);
            }  

            getCartSliderItems += 
            `
            <div class = "cartItem">
                <img src = "${item.imgSource}" alt = "cartItems" class = "cartSliderImage">
                <div>
                    <p>${item.name}</p>
                    <p>${item.incart} in cart</p>
                    <p>Price: $${item.price} AUD</p>
                    <button class = "removeItem" onclick = "removeItem(${item.id}, ${item.incart})">X Remove</button>
                </div>
            </div>
            `
            return getCartSliderItems
        })
        
        const subtotal = item.map(product => product.incart * product.price)  
 
        const total = subtotal.reduce((acc, val) => acc + val, 0)

        const totalToCart = `<p id = "subtotal">Subtotal (${cartNumbers}) items: $${total} AUD</p>`
        getCartSliderItems += totalToCart;

        localStorage.setItem("totalCost", total)
        // console.log(cartItems);
        cartSlider.innerHTML = getCartSliderItems
            
        continueShop.addEventListener("click", () => {
            cartSliderOuter.style.transform = "translateX(500px)";
        })
    } else {
        cartSlider.innerHTML = "Your cart is empty"

    }
}

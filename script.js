var allProducts = []
var cart = []
var account = []

async function getProducts() {
    let r = await fetch('products.json')
    let response = await r.json();
    allProducts = response
    displayProducts(allProducts)
    return allProducts
}

async function displayProducts(products) {
    let container = document.querySelector(`.grid`)
    container.innerHTML = ""

    for (const element of products) {
        container.innerHTML = container.innerHTML +
            `<div class="item">
                                <img src="${element.image}" alt="image">
                                <div class="product-name">${element.name}</div>
                                <div class="tag">
                                    <div class="Price">Rs. ${element.price}</div>
                                    <button class="btn" data-id = "${element.id}">Add to cart</button>
                                </div>
                            </div>`
    }
}

getProducts()


document.addEventListener("click", (e) => {




if (e.target.classList.contains("accountnav")) {
    let modal = document.querySelector(".AccountModelBox");
    modal.classList.remove("hidden");
    if (account.length > 0) {
        
        let loginContainer = document.querySelector(".AccountModelCard")
                loginContainer.classList.remove("hidden");

        loginContainer.innerHTML = ""
        loginContainer.innerHTML = `<button class="AccountCloseBtn">X</button>
        
        <div>
                                        <span> <label for="email">Email</label> </span>
                                        <span> <input type="text" id="login-email"> </span>
                                    </div>

                                    <div>
                                        <span> <label for="password">Password</label> </span>
                                        <span> <input type="text" id="login-password"> </span>
                                    </div>

                                    <div>
                                    <button class="login">Login</button>
                                    </div>`
    } else {
        

        let accountModalCard = document.querySelector(`.AccountModelCard`);
        accountModalCard.classList.remove("hidden");
        accountModalCard.innerHTML = ""
        accountModalCard.innerHTML =      `<button class="AccountCloseBtn">X</button>
        <div>
                                        <span> <label for="yourname">Your Name</label> </span>
                                        <span> <input type="text"  id="yourName"> </span>
                                    </div>

                                    <div>
                                        <span> <label for="email">Your Email</label> </span>
                                        <span> <input type="text"  id="email"> </span>
                                    </div>

                                    <div>
                                        <span> <label for="number">Your Contact No.</label> </span>
                                        <span> <input type="text"  id="number"> </span>
                                    </div>

                                    <div>
                                        <span> <label for="password">Create Password</label> </span>
                                        <span> <input type="text"  id="password"> </span>
                                    </div>

                                    <div>
                                        <span> <label for="adress">Your Adress</label> </span>
                                        <span> <input type="text" id="adress"> </span>
                                    </div>

                                    <div>
                                       <label for="country">Country</label>
                                        <select>
                                            <option value="america">America</option>
                                            <option value="china">China</option>
                                            <option value="pakistan">Pakistan</option>
                                            <option value="inida">India</option>
                                            <option value="australia">Australia</option>
                                            <option value="scotland">Scotland</option>
                                            <option value="turkey">Turkey</option>
                                        </select>
                                    </div>

                                    <div>
                                    <button class="submit">Submit</button>
                                    </div>`
    }
}
})



    document.addEventListener("click", (e)=>{
        if (e.target.classList.contains("login")){
            let inputEmail = document.querySelector("#login-email").value
            let inputPassword = document.querySelector("#login-password").value

            let userFound = account.find(w => w.email == inputEmail && w.password == inputPassword)

            if(userFound){
                alert("Login Sucessful")

                document.querySelector(".AccountModelBox").classList.add("hidden");
            }
            else{
                alert("Incorrect email OR password")
            }
        }
    })

    document.addEventListener("click", (e) => {
    if (e.target.classList.contains("submit")) {
        let Username = document.querySelector("#yourName").value
        let email = document.querySelector("#email").value
        let number = document.querySelector("#number").value
        let password = document.querySelector("#password").value
        let adress = document.querySelector("#adress").value

        let UserAccount = {Username, email, number, password, adress}
        account.push(UserAccount)
        document.querySelector(".AccountModelBox").classList.add("hidden");
    }

})



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn") && e.target.dataset.id) {
        if(account.length>0){
                    let productId = e.target.dataset.id;
        let item = allProducts.find(p => p.id == productId)
        cart.push(item)
        updateCart(cart)

    }
    else {
        alert("You naeed to register your account before buying anything or adding them to cart")
    }
}
})


async function updateCart(cart) {
    let total = 0
    let cartainer = document.querySelector(`.CartModelCard`);
    cartainer.innerHTML = ""
    
    cartainer.innerHTML = `<button class="CartCloseBtn">X</button>`
    
    for (const each of cart) {


        cartainer.innerHTML += 
            `            <div>
                                <img src="${each.image}" alt="image">
                                <span>${each.name}</span>
                                <span>Rs. ${each.price}</span>
                                <span><button class="remove" data-id = "${each.id}"> X </button></span>
                            </div>`

        total += each.price
    }
    cartainer.innerHTML += `<div>
                                Total: Rs. ${total}
                            </div>`;
}

updateCart(cart)

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cartnav")) {
        document.querySelector(".CartModelBox").classList.remove("hidden")
        updateCart(cart)
    }
})


        document.addEventListener("click", (e) => {
                                if (e.target.classList.contains("remove")) {
                                    let removeId = e.target.dataset.id;
                                                                        cart = cart.filter(l => l.id != removeId)
                                    updateCart(cart)
                                }
        })





document.addEventListener("change", (e) => {
    if (e.target.id === "category-filter") {
        let selected = e.target.value.toLowerCase();
        if (selected === "all") {
            displayProducts(allProducts);
        } else {
            let filtered = allProducts.filter(item => item.category && item.category.toLowerCase() === selected);
            displayProducts(filtered);
        }
    }
});



document.addEventListener("change", (e)=>{
    if (e.target.id == "price-filter"){
        let Selected = e.target.value
        if(Selected == "low-to-high"){
            let sorted = [...allProducts].sort((a, b) => a.price - b.price)
            displayProducts(sorted)
        }
        else if(Selected == "high-to-low"){
                        let sorted = [...allProducts].sort((a, b) => b.price - a.price);
            displayProducts(sorted)
        }
        else{
            displayProducts(allProducts)
        }
    }
})


document.addEventListener("click", (e) => {
    if (e.target.id === "search-btn") {
        let query = document.querySelector("#search-input").value.toLowerCase().trim();
        let matches = allProducts.filter(item => item.name.toLowerCase().includes(query));
        displayProducts(matches);
    }
});



                        document.addEventListener("click", (e) => {
    if (e.target.classList.contains("AccountCloseBtn")) {
        document.querySelector(".AccountModelBox").classList.add("hidden");
    }
    if (e.target.classList.contains("CartCloseBtn")) {
        document.querySelector(".CartModelBox").classList.add("hidden");
    }
});
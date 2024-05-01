function loadMenu() {
    let cardDish;
    try
    {
        cardDish = JSON.parse(localStorage["orderList"])
    }catch (e){
        cardDish = []
    }
    console.log("loading");
    fetch("https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/menu", {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            const dishList = document.getElementById("dish-list");
            dishList.innerHTML = "";

            console.log("result", data);
            data.forEach(dish => {
                const card = document.createElement("div");
                card.className = "food-menu-item";
                const imgElement = document.createElement("img");
                imgElement.src = "data:image/png;base64," + dish.image.toString();
                imgElement.alt = "Dish Image"; // Set alt attribute for accessibility
                imgElement.width = 80;
                imgElement.height = 80;

                const imgDiv = document.createElement("div")
                imgDiv.className = "food-img"
                imgDiv.appendChild(imgElement)
                card.appendChild(imgDiv)
                // Append the imgElement directly to the row

                const divDescr = document.createElement("div")
                divDescr.className = "food-description";
                const h2 = document.createElement("h2")
                h2.className = "food-titile"
                h2.textContent = dish.name
                const p = document.createElement("p")
                p.textContent = dish.description
                const price = document.createElement("p")
                price.className ="food-price"
                price.textContent = "Price: $" + dish.price;
                const addBtn = document.createElement("button")
                addBtn.className = "add-btn"
                addBtn.textContent = "Add";
                addBtn.addEventListener("click",()=>{
                    cardDish.push(dish)
                    console.log(cardDish)
                    localStorage.setItem("orderList",JSON.stringify(cardDish))
                })
                divDescr.appendChild(h2)
                divDescr.appendChild(p)
                divDescr.appendChild(price)
                divDescr.appendChild(addBtn)
                card.appendChild(divDescr)
                dishList.appendChild(card);
            });
        });
}
loadMenu()

function addCustomer() {
    console.log("hello")
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ageInput = document.getElementById("age");

    const customer = {
        fullname: nameInput.value,
        email: emailInput.value,
        age: ageInput.value,
    };

    fetch("https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/guests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (response.ok) {
                nameInput.value = ""
                emailInput.value =""
                ageInput.value =""
            }
        });
}



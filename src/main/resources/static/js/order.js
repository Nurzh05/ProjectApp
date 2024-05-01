function loadCard(){
    let tot = 0;
    let cardDish = JSON.parse(localStorage["orderList"])
    console.log(cardDish)
    if(cardDish === null){
        return
    }
    const total = document.getElementById("total")
const dishList = document.getElementById("order-list");
dishList.innerHTML = "";
    cardDish.forEach(dish => {
        tot += dish.price
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
                const removeBtn = document.createElement("button")
                removeBtn.className = "remove-btn"
                removeBtn.textContent = "Remove";
                removeBtn.addEventListener("click",()=>{
                    const newArray = cardDish.filter(function(element) {
                        return element !== dish;
                    });
                    console.log(newArray)
                    localStorage.setItem("orderList",JSON.stringify(newArray))
                    loadCard()
                })
                divDescr.appendChild(h2)
                divDescr.appendChild(p)
                divDescr.appendChild(price)
                divDescr.appendChild(removeBtn)
                card.appendChild(divDescr)
                dishList.appendChild(card);
            });
    total.innerHTML = "Total: $" + tot.toString()
}

loadCard()

function sendEmail() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ageInput = document.getElementById("age");
    const message = document.getElementById("message")

    // Make an AJAX request to the server to send the email
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-email', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Email sent successfully!');
        } else if (xhr.readyState === 4) {
            alert('Failed to send email. Please try again.');
        }
    };

    const orders = JSON.parse(localStorage["orderList"]).map(it=>
        it.name
    )

    const adminEmail = "lagalas10102000@gmail.com"
    const data = JSON.stringify({
        to: adminEmail,
        subject: "New customer "+ nameInput.value + " age: " + ageInput.value  + "email: " +emailInput.value,
        message: message.value + "Orders :" + orders.toString()
    });
    console.log(data)
    xhr.send(data);
}

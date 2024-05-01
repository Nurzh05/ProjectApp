let token;
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Save the token in a variable or storage for later use
                token = data.token;
                console.log(token)
                // Use the token to access the admin page
                accessAdminPage(token);
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        });
}

function accessAdminPage(token) {
    // Assume your admin page URL is "/page/admin", replace it with your actual URL
    const adminPageUrl = "https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/page/admin";

    // Include the token in the request headers
    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "text/html" // Adjust content type if needed
    };

    // Make a request to the admin page with the token
    fetch(adminPageUrl, {
        method: "GET",
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                // Successfully loaded the protected HTML page
                return response.text();
            } else {
                throw new Error("Failed to load the protected HTML page. Status: " + response.status);
            }
        })
        .then(htmlContent => {
            // Insert the HTML content into the body
            document.body.innerHTML = htmlContent;

        })
        .catch(error => {
            console.error("Load protected HTML page error:", error);
            alert("Failed to load the protected HTML page. Please check your token.");
            window.location.href = "/login";
        });
}

const menuUrl = "https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/menu/secured"
function addDish(token) {
    console.log("hello")
    const nameInput = document.getElementById("dish-name");
    const descriptionInput = document.getElementById("dish-description");
    const category = document.getElementById("dish-category");
    const price = document.getElementById("dish-price");
    const fileInput = document.getElementById('fileInput');
    let base64Image

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Read the file as a data URL
        reader.readAsDataURL(file);

        // Define the callback for when the file is read
        reader.onload = function () {
            base64Image = reader.result.split(',')[1]; // Extract the base64 string
            console.log('FileReader result:', reader.result); // Log the entire result for debugging
            console.log('Base64 Image:', base64Image);

            const dish = {
                name: nameInput.value,
                description: descriptionInput.value,
                category: category.value,
                price: Number(price.value),
                image: base64Image.toString()
            };

            fetch(menuUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(dish)
            })
                .then(response => {
                    if (response.ok) {
                        nameInput.value = ""
                        descriptionInput.value =""
                        category.value =""
                        price.value =""
                        fileInput.value = ''
                    }
                });
        };
    } else {
        alert('Please select an image to upload.');
    }
}

function loadMenuAdmin() {
    console.log("loading");
    fetch("https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/menu", {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            const dishList = document.getElementById("dish-list");
            dishList.innerHTML = "";

            console.log("result", data);
            data.forEach(dish => {
                const row = document.createElement("tr");
                const imgElement = document.createElement("img");
                imgElement.src = "data:image/png;base64," + dish.image.toString();
                imgElement.alt = "Dish Image"; // Set alt attribute for accessibility
                imgElement.width = 80;
                imgElement.height = 80;
                // Append the imgElement directly to the row
                row.appendChild(imgElement);

                // Append other columns
                row.innerHTML += `
                    <td>${dish.name}</td>
                    <td>${dish.description}</td>
                    <td>${dish.category}</td>
                    <td>${dish.price}</td>
                    <td>
                     <button onclick="editDish(${dish.id})" class="edit-button">Edit</button>
                        <button onclick="deleteDish(${dish.id})">Delete</button>
                    </td>
                `;

                // Append the entire row to the dishList
                dishList.appendChild(row);
            });
        });
}


function deleteDish(dishId) {
    const headers = {
        "Authorization": "Bearer " + token,
    };
    fetch(`https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/menu/secured/${dishId}`, {
        method: "DELETE",
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                loadMenuAdmin();
            }
        });
}

function editDish(dishId) {
    const fileInput = document.getElementById('fileInput');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    let base64Image;

    // Specify accepted file types if needed

    // Listen for the change event on the file input
    fileInput.addEventListener('change', () =>{
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            // Handle the selected file, for example, display a preview
            const file = fileInput.files[0];
            const reader = new FileReader();

            // Read the file as a data URL
            reader.readAsDataURL(file);

            // Define the callback for when the file is read
            reader.onload = function () {
                base64Image = reader.result.split(',')[1]; // Extract the base64 string
                console.log('FileReader result:', reader.result); // Log the entire result for debugging
                console.log('Base64 Image:', base64Image);
                const newName = prompt("Enter the new name:");
                const newDescription = prompt("Enter the new description:");
                const newCategory = prompt("Enter the new category:");
                const newPrice = prompt("Enter the new price:");
                const updatedContact = {
                    name: newName,
                    description: newDescription,
                    category: newCategory,
                    price: newPrice,
                    image: base64Image.toString()
                };

                fetch(`https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/menu/secured/${dishId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(updatedContact)
                })
                    .then(response => {
                        if (response.ok) {
                            loadMenuAdmin();
                        }
                    });
            }
        }
    })
}

function loadCustomers(){
    console.log("loading");
    fetch("https://crud-app-amir-cd8dba7e0a2b.herokuapp.com/api/v1/guests", {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            const dishList = document.getElementById("guest-list");
            dishList.innerHTML = "";

            console.log("result", data);
            data.forEach(guest => {
                const row = document.createElement("tr");
                row.innerHTML += `
                    <td>${guest.fullname}</td>
                    <td>${guest.email}</td>
                    <td>${guest.age}</td>
                `;

                dishList.appendChild(row);
            });
        });
}



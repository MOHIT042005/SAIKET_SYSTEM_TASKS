// TOGGLE
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});


// ADD TO CART ALERT
let buttons = document.querySelectorAll(".addCart");

buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        alert("Item added to cart!");
    });
});

// FORM VALIDATION
document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let errorMsg = document.getElementById("errorMsg");
    let successMsg = document.getElementById("successMsg");

    errorMsg.textContent = "";
    successMsg.textContent = "";

    // VALIDATION
    if (name === "" || email === "" || message === "") {
        errorMsg.textContent = "All fields are required!";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        errorMsg.textContent = "Enter a valid email!";
        return;
    }

    if (message.length < 5) {
        errorMsg.textContent = "Message should be at least 5 characters!";
        return;
    }

    successMsg.textContent = "Form submitted successfully!";
});
document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let errorMsg = document.getElementById("errorMsg");
    let successMsg = document.getElementById("successMsg");

    errorMsg.textContent = "";
    successMsg.textContent = "";

    if (name === "" || email === "" || message === "") {
        errorMsg.textContent = "All fields are required!";
        return;
    }

    if (!email.includes("@")) {
        errorMsg.textContent = "Enter a valid email!";
        return;
    }

    successMsg.textContent = "Form submitted successfully!";
});
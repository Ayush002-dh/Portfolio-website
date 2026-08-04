const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Hide all content
        contents.forEach((content) => {
            content.classList.remove("active");
        });

        // Active current button
        button.classList.add("active");
        // Show current content
        const id = button.dataset.tab;
        document.getElementById(id).classList.add("active");
    });
});
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success === "true") {
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for contacting me."
            });

            form.reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Message not sent."
            });
        }

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message
        });
    }
});
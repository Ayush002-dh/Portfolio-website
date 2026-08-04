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

    const response = await fetch(form.action, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for contacting me."
        });

        form.reset();
    }
});
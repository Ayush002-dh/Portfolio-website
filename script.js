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

    const submitBtn = form.querySelector('input[type="submit"]');

    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    Swal.fire({
        title: "Sending...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        if (response.ok) {

            Swal.fire({
                icon: "success",
                title: "Message Sent Successfully!",
                text: "Thank you for contacting me.",
                confirmButtonColor: "#00EEFF"
            });

            form.reset();   // ✅ Input fields clear

        } else {

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Message could not be sent."
            });

        }

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Please try again later."
        });

    } finally {

        submitBtn.value = "Send Message";
        submitBtn.disabled = false;

    }
});
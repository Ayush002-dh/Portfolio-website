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

    // Loading Popup
    Swal.fire({
        title: "Sending Message...",
        text: "Please wait...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {

      const response = await fetch("https://portfolio-website-fs1h.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                phone: document.getElementById("phone").value,
                subject: document.getElementById("subject").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            })
        });
        const result = await response.json();
        Swal.close();

        if (result.success) {

            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for contacting me. I will reply soon.",
                confirmButtonColor: "#00EEFF"
            });

            form.reset();

        } else {

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Unable to send your message.",
                confirmButtonColor: "#ff4d4d"
            });

        }

    } catch (error) {

        Swal.close();

        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Something went wrong. Please try again later.",
            confirmButtonColor: "#ff4d4d"
        });

    } finally {

        submitBtn.value = "Send Message";
        submitBtn.disabled = false;

    }

});
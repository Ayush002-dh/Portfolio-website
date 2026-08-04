const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running 🚀");
});

app.post("/send-email", async (req, res) => {

    const { firstName, lastName, phone, subject, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        await transporter.sendMail({

            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: subject,

            html: `
                <h2>New Contact Form</h2>

                <p><b>First Name:</b> ${firstName}</p>
                <p><b>Last Name:</b> ${lastName}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Subject:</b> ${subject}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `
        });

        res.json({ success: true });

    } catch (err) {

        console.error(err);
        res.status(500).json({ success: false });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
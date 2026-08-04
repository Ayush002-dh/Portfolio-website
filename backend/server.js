const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/send-email", async (req, res) => {

    const { firstName, lastName, phone, subject, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    try {

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: subject,
            html: `
                <h2>New Contact Form</h2>

                <p><b>First Name:</b> ${firstName}</p>
                <p><b>Last Name:</b> ${lastName}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Phone:</b> ${subject}</p>
                <p><b>Email:</b> ${email}</p>

                <p><b>Message:</b></p>

                <p>${message}</p>
            `

        });

        res.json({ success: true });

    } catch (err) {

        console.log(err);

        res.status(500).json({ success: false });

    }

});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
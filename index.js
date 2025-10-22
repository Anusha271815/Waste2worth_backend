require('dotenv').config(); // load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Idea = require("./models/idea"); // make sure this path is correct
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop the server if DB fails
  }
}

// Connect to DB immediately
connectDB();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "kesarwanianusha58@gmail.com",
    pass: process.env.EMAIL_PASS || "kykegvywazsydljy", // app password
  },
});

// Routes
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/api/ideas", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    console.error("❌ Error fetching ideas:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received contact form:", name, email, message);

  const mailOptions = {
    from: `"Waste2Worth Contact Form" <${email}>`,
    to: process.env.EMAIL_USER || "your_email@gmail.com",
    subject: `New message from ${name}`,
    text: `
You have received a new message from the Waste2Worth contact form:

Name: ${name}
Email: ${email}
Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    res.status(200).json({ success: true, message: "Message sent and email delivered!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start server after MongoDB connects
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});

module.exports = app;


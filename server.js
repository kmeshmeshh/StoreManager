const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let qrCodeData = null;
let isReady = false;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

client.on("qr", async (qr) => {
    qrCodeData = await qrcode.toDataURL(qr);
    console.log("QR Code generated - scan it!");
});

client.on("ready", () => {
    isReady = true;
    qrCodeData = null;
    console.log("WhatsApp client is ready!");
});

client.on("disconnected", () => {
    isReady = false;
    console.log("WhatsApp client disconnected");
    client.initialize();
});

client.initialize();

app.get("/status", (req, res) => {
    res.json({ isReady, hasQR: !!qrCodeData });
});

app.get("/qr", (req, res) => {
    if (isReady) return res.json({ message: "Already connected" });
    if (!qrCodeData) return res.json({ message: "QR not generated yet" });
    res.json({ qr: qrCodeData });
});

app.post("/send", async (req, res) => {
    const { phones, message } = req.body;

    if (!isReady) {
        return res.status(400).json({ error: "WhatsApp not connected" });
    }

    if (!phones || !phones.length || !message) {
        return res.status(400).json({ error: "phones and message required" });
    }

    const results = [];

    for (let i = 0; i < phones.length; i++) {
        const phone = phones[i];
        try {
            const formattedPhone = phone.replace(/[^0-9]/g, "");
            const chatId = formattedPhone + "@c.us";
            await client.sendMessage(chatId, message);
            results.push({ phone, status: "sent" });

            if (i < phones.length - 1) {
                const delay = Math.floor(Math.random() * 3000) + 3000;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        } catch (err) {
            results.push({ phone, status: "failed", error: err.message });
        }
    }

    res.json({
        total: phones.length,
        sent: results.filter((r) => r.status === "sent").length,
        failed: results.filter((r) => r.status === "failed").length,
        results,
    });
});

app.listen(3001, () => {
    console.log("WhatsApp Service running on http://localhost:3001");
});
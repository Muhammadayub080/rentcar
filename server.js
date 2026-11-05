require("dotenv").config(); // .env faylini o'qish uchun
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3005;

// POST: Yangi mashina qo'shish
app.post("/rent", async (req, res) => {
    // car_name ham qo'shildi
    const { brand, car_name, color, is_new, year, price } = req.body;

    const { data, error } = await supabase
        .from("rentcar") // Kichik harflar bilan yozildi
        .insert({ brand, car_name, color, is_new, year, price })
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// GET: Barcha mashinalarni olish
app.get("/rent", async (req, res) => {
    const { data, error } = await supabase
        .from("rentcar") // Kichik harflar bilan yozildi
        .select("*");

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

// Asosiy sahifa
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
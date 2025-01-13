const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/:wallet', async (req, res) => {
    const { wallet } = req.params;

    try {
        const response = await axios.get(`https://jupuary-airdrop-api.jup.ag/get/checkAirdrop/${wallet}/${wallet}`);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa airdrop.' });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});

module.exports = app;  // Untuk deployment di Vercel

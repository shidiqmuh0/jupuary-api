const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Izinkan semua origin untuk mengakses API ini
app.use(cors());

// Route untuk memeriksa airdrop berdasarkan wallet address
app.get('/api/checkAirdrop/:wallet', async (req, res) => {
  const wallet = req.params.wallet;

  try {
    const response = await axios.get(`https://jupuary-airdrop-api.jup.ag/get/checkAirdrop/${wallet}/${wallet}`, {
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": '"Chromium";v="128", "Not A Brand";v="24", "Brave";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows"
      }
    });

    // Kirim data hasil response ke frontend
    res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data dari API Jupuary' });
  }
});

// Listen pada port (opsional untuk local testing)
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

module.exports = app; // Agar dapat digunakan di Vercel

// server.js (Node.js)
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const port = 3000;
app.use(cors());
// Database connection setup
const client = new Client({
    user: "postgres", 
    password: "Vivan@123",
    host: "inakr42011wspr.ad001.siemens.net",
    port: 5432,
    database: "PCI_trial_data"
  });

client.connect();

// Define API endpoints
app.get('/getData', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pci_temp_data_new Order by signal_id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

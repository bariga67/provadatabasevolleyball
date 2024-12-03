const express = require('express');
const app = express();

// Route per la root ("/")
app.get('/', (req, res) => {
  res.send('Benvenuto nel mio server!');
});

// Avvia il server sulla porta 3000
app.listen(3000, () => {
  console.log('Server in esecuzione su http://localhost:3000');
});

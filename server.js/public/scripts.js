

const express = require('express');
const app = express();
const PORT = 3000;

// Servire file statici dalla cartella "public"
app.use(express.static('public'));

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

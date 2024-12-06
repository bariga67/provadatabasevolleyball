const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura il middleware per interpretare JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connessione al database SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err.message);
  } else {
    console.log('Connesso al database SQLite.');
  }
});

// Crea la tabella dei punteggi, se non esiste già
db.run(`CREATE TABLE IF NOT EXISTS punteggi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  squadra1 TEXT,
  punteggio1 INTEGER,
  squadra2 TEXT,
  punteggio2 INTEGER
)`);

// Endpoint POST per inserire un punteggio
app.post('/inserisci-punteggio', (req, res) => {
  const { squadra1, punteggio1, squadra2, punteggio2 } = req.body;

  // Query di inserimento nel database
  const query = `INSERT INTO punteggi (squadra1, punteggio1, squadra2, punteggio2) VALUES (?, ?, ?, ?)`;

  db.run(query, [squadra1, punteggio1, squadra2, punteggio2], function (err) {
    if (err) {
      console.error('Errore durante l\'inserimento dei dati:', err.message);
      return res.status(500).json({ error: 'Errore nell\'inserimento dei dati' });
    }
    res.status(200).json({ success: 'Punteggio inserito con successo', id: this.lastID });
  });
});

// Servire file statici dalla cartella "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route di test
app.get('/test', (req, res) => {
  res.send('Questa è una route di test!');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
app.use(express.static(path.join(__dirname, 'public')));

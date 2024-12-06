const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inizializza Express
const app = express();
app.use(bodyParser.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/fantavolley', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso al database MongoDB'))
  .catch(err => console.log('Errore di connessione al database:', err));

// Schema per i dati delle squadre
const teamSchema = new mongoose.Schema({
  name: String,
  players: Number,
  points: Number,
  penalties: Number,
});

const Team = mongoose.model('Team', teamSchema);

// Rotte per aggiornare i dati della squadra
app.post('/updateTeam', (req, res) => {
  const { teamId, name, players, points, penalties } = req.body;

  Team.findOneAndUpdate({ _id: teamId }, { name, players, points, penalties }, { upsert: true, new: true })
    .then(team => res.json(team))
    .catch(err => res.status(500).json({ error: 'Errore durante l\'aggiornamento della squadra' }));
});

// Rotta per ottenere i dati di una squadra
app.get('/getTeam/:teamId', (req, res) => {
  Team.findById(req.params.teamId)
    .then(team => res.json(team))
    .catch(err => res.status(500).json({ error: 'Errore durante il recupero dei dati' }));
});

// Avvia il server
const port = 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

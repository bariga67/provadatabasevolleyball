document.getElementById('partitaForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const giocatori = document.getElementById('giocatori').value;
  const punti_totali = document.getElementById('punti_totali').value;
  const penalita = document.getElementById('penalita').value;

  const response = await fetch('/api/partita', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          giocatori: giocatori,
          punti_totali: punti_totali,
          penalita: penalita
      }),
  });

  if (response.ok) {
      const nuovaPartita = await response.json();
      aggiungiPartitaAllaLista(nuovaPartita);
      this.reset(); // Pulisce il modulo
  }
});

async function caricaPartite() {
  const response = await fetch('/api/partite');
  const partite = await response.json();
  partite.forEach(aggiungiPartitaAllaLista);
}

function aggiungiPartitaAllaLista(partita) {
  const li = document.createElement('li');
  li.textContent = `${partita.giocatori} - Punti: ${partita.punti_totali} - Penalità: ${partita.penalita}`;
  document.getElementById('partiteList').appendChild(li);
}

// Carica le partite all'avvio
caricaPartite();

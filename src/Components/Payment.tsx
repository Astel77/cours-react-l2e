import { saveReservation } from "../Data/Reservations";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function Payment({ data }: any) {

  // 🎟️ Génération ticket PDF + QR
  const generateTicketPDF = async () => {
    const doc = new jsPDF();

    const ticketId = "CINE-" + Date.now();

    // 📦 QR DATA
    const qrData = {
      id: ticketId,
      film: data.movie.title,
      heure: data.session.time,
      salle: data.session.room,
      places: data.seats,
      total: data.total,
    };

    const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));

    // 🎬 DESIGN TICKET
    doc.setFontSize(20);
    doc.text("🎬 CINEMA TICKET", 20, 20);

    doc.rect(15, 30, 180, 120);

    doc.setFontSize(12);
    doc.text(`ID: ${ticketId}`, 20, 45);
    doc.text(`Film: ${data.movie.title}`, 20, 55);
    doc.text(`Heure: ${data.session.time}`, 20, 65);
    doc.text(`Salle: ${data.session.room}`, 20, 75);

    doc.text(`Places: ${data.seats.join(", ")}`, 20, 90);
    doc.text(`Total: ${data.total} FCFA`, 20, 100);

    // 📲 QR CODE
    doc.addImage(qrImage, "PNG", 140, 45, 50, 50);

    doc.setFontSize(10);
    doc.text("Présente ce QR à l'entrée 🎟️", 20, 140);

    doc.save(`${data.movie.title}-ticket.pdf`);
  };

  // 💳 PAYMENT LOGIC
  const pay = async () => {
    try {

      // 1️⃣ sauvegarde réservation
      saveReservation(data);

      // 2️⃣ génération ticket
      await generateTicketPDF();

      // 3️⃣ message succès
      alert(
        `🎟 Réservation réussie !\n\n` +
        `Film: ${data.movie.title}\n` +
        `Places: ${data.seats.join(", ")}\n` +
        `Heure: ${data.session.time}\n\n` +
        `📄 Ticket téléchargé automatiquement`
      );

    } catch (error) {
      alert("❌ Erreur lors du paiement ou du ticket");
      console.error(error);
    }
  };

  return (
    <div className="p-6 text-white">

      <h2 className="text-yellow-400 text-xl mb-4">
        Paiement
      </h2>

      {/* 💳 logos */}
      <div className="flex gap-4 mb-4">
        <img className="h-6" src="src/wave.png" />
        <img className="h-6" src="src/orange money.png" />
        <img className="h-6" src="src/carte.jpg" />
      </div>

      {/* 💰 total */}
      <p className="text-lg mb-3">
        Total: <span className="text-green-400">{data.total} FCFA</span>
      </p>

      {/* 🔘 bouton paiement */}
      <button
        onClick={pay}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Confirmer paiement
      </button>

    </div>
  );
}
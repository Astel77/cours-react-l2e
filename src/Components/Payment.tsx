import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { reservationsService } from "../Data/reservations.service";
import { getErrorMessage } from "../Data/api";
import type { Movie, Session } from "../Data/types";

type PaymentData = {
  movie: Movie;
  session: Session;
  seats: number[];
  total: number;
};

export default function Payment({ data }: { data: PaymentData }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // 🎟️ Génération ticket PDF + QR
  const generateTicketPDF = async (ticketId: string) => {
    const doc = new jsPDF();

    const qrData = {
      id: ticketId,
      film: data.movie.title,
      heure: data.session.time,
      salle: data.session.room,
      places: data.seats,
      total: data.total,
    };

    const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));

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

    doc.addImage(qrImage, "PNG", 140, 45, 50, 50);

    doc.setFontSize(10);
    doc.text("Présente ce QR à l'entrée 🎟️", 20, 140);

    doc.save(`${data.movie.title}-ticket.pdf`);
  };

  // 💳 PAYMENT LOGIC — crée la réservation via l'API
  const pay = async () => {
    setLoading(true);
    try {
      // 1️⃣ réservation persistée côté backend (vérifie les conflits de sièges)
      const reservation = await reservationsService.create(data.session.id, data.seats);

      // 2️⃣ génération du ticket
      await generateTicketPDF(reservation.ticketId || reservation.id);

      setDone(true);

      alert(
        `🎟 Réservation réussie !\n\n` +
          `Film: ${data.movie.title}\n` +
          `Places: ${data.seats.join(", ")}\n` +
          `Heure: ${data.session.time}\n\n` +
          `📄 Ticket téléchargé automatiquement`
      );
    } catch (error) {
      alert("❌ " + getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-yellow-400 text-xl mb-4">Paiement</h2>

      <div className="flex gap-4 mb-4">
        <img className="h-6" src="/src/wave.png" />
        <img className="h-6" src="/src/orange money.png" />
        <img className="h-6" src="/src/carte.jpg" />
      </div>

      <p className="text-lg mb-3">
        Total: <span className="text-green-400">{data.total} FCFA</span>
      </p>

      <button
        onClick={pay}
        disabled={loading || done}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-60"
      >
        {done ? "✅ Réservation confirmée" : loading ? "Traitement..." : "Confirmer paiement"}
      </button>
    </div>
  );
}

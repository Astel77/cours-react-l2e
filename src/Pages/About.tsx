export default function About() {
    return (
      <div className="bg-black min-h-screen text-white p-8">
  
        <h1 className="text-yellow-400 text-4xl font-bold mb-6">
          À propos
        </h1>
        //Travail de fatou
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
  
          <p className="mb-4 text-gray-300">
            CINÉMA PATHE est une plateforme moderne de réservation de tickets de cinéma
            inspirée des plus grandes expériences cinématographiques.
          </p>
  
          <p className="mb-4 text-gray-300">
            Notre objectif est de permettre aux utilisateurs de :
          </p>
  
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li>🎬 Rechercher des films facilement</li>
            <li>💺 Réserver des places en temps réel</li>
            <li>🎟 Acheter des tickets rapidement</li>
            <li>💳 Payer via Wave, Orange Money ou Carte bancaire</li>
            <li>📱 Profiter d’une expérience cinéma moderne</li>
          </ul>
  
          <div className="mt-6 p-4 bg-black rounded border border-yellow-400">
            <p className="text-yellow-400 font-bold">
              CINÉMA PATHE — Vivez le cinéma autrement 🍿
            </p>
          </div>
  
        </div>
      </div>
    );
  }
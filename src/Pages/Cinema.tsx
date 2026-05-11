export default function Cinema() {

    const cinemas = [
  
      {
        id: 1,
        name: "CINÉMA Pathe",
        address: "Dakar",
        rooms: 8,
      },
  
      {
        id: 2,
        name: "CINÉMA Pathe",
        address: "Parcelle",
        rooms: 5,
      },
  
      {
        id: 3,
        name: "CINÉMA pathe",
        address: "Thies ",
        rooms: 4,
      },
  
    ];
  
    return (
      <div className="bg-black min-h-screen text-white p-6">
  
        <h1 className="text-yellow-400 text-4xl font-bold mb-8">
          Nos Cinémas
        </h1>
  
        <div className="grid md:grid-cols-3 gap-6">
  
          {cinemas.map((cinema) => (
  
            <div
              key={cinema.id}
              className="
                bg-gray-900
                border border-yellow-400
                rounded-lg
                p-6
              "
            >
  
              <h2 className="text-yellow-400 text-2xl font-bold mb-3">
                {cinema.name}
              </h2>
  
              <p className="text-gray-300 mb-2">
                📍 {cinema.address}
              </p>
  
              <p className="text-white">
                🎬 {cinema.rooms} salles disponibles
              </p>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
    );
  }
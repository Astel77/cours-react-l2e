export default function Footer() {
    return (
      <footer className="bg-black py-16 border-t border-white/10 flex flex-col items-center justify-center text-center w-full">
        <h2 className="text-white text-3xl font-black italic mb-6">
          CINEMA <span className="text-yellow-500">PATHE</span>
        </h2>
        
        <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
        <p className="text-gray-700 text-[9px] uppercase tracking-[0.4em]">
          © 2026 CINEMA PATHE -  DAKAR
        </p>
      </footer>
    );
  }
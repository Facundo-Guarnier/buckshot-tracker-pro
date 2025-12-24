
import React from 'react';
import { Slot, RoundType } from '../types';

interface SlotCardProps {
  slot: Slot;
  index: number;
  onUpdate: (updates: Partial<Slot>) => void;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot, index, onUpdate }) => {
  const isUnknown = slot.type === 'unknown';
  const isLive = slot.type === 'live';
  const isBlank = slot.type === 'blank';
  const isFired = slot.isFired;

  // Determinar estilos base según estado
  let cardStyles = "glass border-zinc-800"; // Default unknown
  let indicatorColor = "text-zinc-700";

  if (isFired) {
    // Estilos para estado DISPARADO (Oscuro, "Quemado")
    if (isLive) {
      cardStyles = "bg-red-950/20 border-red-900/30 shadow-none"; 
    } else if (isBlank) {
      cardStyles = "bg-blue-950/20 border-blue-900/30 shadow-none";
    } else {
      cardStyles = "bg-zinc-950/50 border-zinc-900/50";
    }
  } else {
    // Estilos para estado ACTIVO (Brillante, Neón)
    if (isLive) {
      cardStyles = "glass border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]";
    } else if (isBlank) {
      cardStyles = "glass border-blue-600/50 shadow-[0_0_15px_rgba(37,99,235,0.2)]";
    }
  }

  return (
    <div className={`
      slot-card group relative p-1 md:p-2 flex flex-col items-center justify-between aspect-[4/5] rounded-md border
      transition-all duration-300
      ${cardStyles}
    `}>
      {/* Texture Overlay for Fired State */}
      {isFired && (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]" />
      )}

      {/* Index Number */}
      <div className={`absolute top-0.5 left-1 text-[8px] md:text-[10px] mono font-bold z-10 ${isFired ? 'text-zinc-700' : 'text-zinc-600'}`}>
        #{index + 1}
      </div>

      {/* "FIRED" Stamp Overlay */}
      {isFired && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="border-2 md:border-4 border-zinc-700/40 text-zinc-700/40 font-black text-xs md:text-2xl uppercase tracking-widest -rotate-12 p-1 md:p-2 rounded mask-image-grunge">
            FIRED
          </div>
        </div>
      )}

      {/* Main Icon Content - Ajustado tamaño para versión compacta */}
      <div className={`flex-1 flex items-center justify-center z-10 transition-opacity ${isFired ? 'opacity-30' : 'opacity-100'}`}>
        {isUnknown ? (
          <span className="text-xl md:text-3xl font-black text-zinc-700">?</span>
        ) : isLive ? (
          <div className="flex flex-col items-center">
            {/* Bala roja más pequeña en móvil */}
            <div className="w-3.5 h-7 md:w-8 md:h-12 bg-red-600 rounded-sm border-t-2 md:border-t-4 border-red-400 relative shadow-lg">
               <div className="absolute bottom-1 w-full h-1 md:h-2 bg-yellow-600/50"></div>
            </div>
            {!isFired && <span className="text-[7px] md:text-[10px] mono mt-1 font-bold text-red-500 uppercase animate-pulse">Live</span>}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Bala gris más pequeña en móvil */}
            <div className="w-3.5 h-7 md:w-8 md:h-12 bg-zinc-200 rounded-sm border-t-2 md:border-t-4 border-zinc-100 relative shadow-lg">
               <div className="absolute bottom-1 w-full h-1 md:h-2 bg-yellow-600/30"></div>
            </div>
            {!isFired && <span className="text-[7px] md:text-[10px] mono mt-1 font-bold text-zinc-400 uppercase">Blank</span>}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full flex gap-0.5 md:gap-1 mt-0.5 md:mt-2 z-30">
        <button
          onClick={() => onUpdate({ type: isLive ? 'unknown' : 'live' })}
          className={`flex-1 py-0.5 md:py-1 text-[7px] md:text-[9px] mono font-bold uppercase rounded border transition-all ${
            isLive 
              ? (isFired ? 'bg-red-900/20 text-red-800 border-red-900/20' : 'bg-red-600 text-white border-red-400') 
              : 'bg-zinc-900 text-red-600 border-red-900/40 hover:bg-zinc-800'
          }`}
          title="Mark as LIVE"
        >
          L
        </button>
        <button
          onClick={() => onUpdate({ type: isBlank ? 'unknown' : 'blank' })}
          className={`flex-1 py-0.5 md:py-1 text-[7px] md:text-[9px] mono font-bold uppercase rounded border transition-all ${
            isBlank 
              ? (isFired ? 'bg-zinc-800 text-zinc-500 border-zinc-700' : 'bg-zinc-200 text-black border-white')
              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
          }`}
          title="Mark as BLANK"
        >
          B
        </button>
        <button
          onClick={() => onUpdate({ isFired: !slot.isFired })}
          className={`flex-1 py-0.5 md:py-1 text-[7px] md:text-[9px] rounded border transition-all flex items-center justify-center ${
            isFired 
              ? 'bg-yellow-600/20 text-yellow-600 border-yellow-600/50 hover:bg-yellow-600/40' 
              : 'bg-zinc-900 text-zinc-600 border-zinc-800 hover:bg-zinc-800 hover:text-yellow-500'
          }`}
          title="Toggle Fired"
        >
          <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 24 24">
            {isFired ? (
               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            ) : (
               <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SlotCard;

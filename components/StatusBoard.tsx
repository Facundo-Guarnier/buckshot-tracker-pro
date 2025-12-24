
import React from 'react';

interface StatusBoardProps {
  initialLive: number;
  initialBlank: number;
  remainingToIdentifyLive: number;
  remainingToIdentifyBlank: number;
  totalRemainingInChamber: number;
  activeLive: number;
  activeBlank: number;
  liveProb: number;
  status: 'known-live' | 'known-blank' | 'calculated' | 'empty';
}

const StatusBoard: React.FC<StatusBoardProps> = ({
  initialLive,
  initialBlank,
  remainingToIdentifyLive,
  remainingToIdentifyBlank,
  totalRemainingInChamber,
  activeLive,
  activeBlank,
  liveProb,
  status
}) => {
  
  // Determinamos el color y texto basado en el estado exacto
  const getProbStyles = () => {
    switch (status) {
      case 'known-live':
        return { 
          borderColor: 'border-red-600', 
          textColor: 'text-red-500', 
          shadow: 'shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]',
          label: 'KNOWN LIVE' 
        };
      case 'known-blank':
        return { 
          borderColor: 'border-zinc-400', 
          textColor: 'text-zinc-400', 
          shadow: 'shadow-[inset_0_0_20px_rgba(161,161,170,0.1)]',
          label: 'KNOWN BLANK' 
        };
      case 'calculated':
        return { 
          borderColor: 'border-yellow-600', 
          textColor: 'text-yellow-500', 
          shadow: '',
          label: 'ESTIMATED' 
        };
      default:
        return { 
          borderColor: 'border-zinc-800', 
          textColor: 'text-zinc-700', 
          shadow: '',
          label: 'NO DATA' 
        };
    }
  };

  const styles = getProbStyles();

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
      {/* Live Tracker - Columna 1 en móvil */}
      <div className="glass p-2 md:p-4 rounded-lg border-l-2 md:border-l-4 border-red-600 col-span-1">
        <div className="flex justify-between items-start mb-0.5 md:mb-2">
          <span className="text-[9px] md:text-xs mono text-zinc-500 uppercase">Live</span>
          <span className="text-lg md:text-2xl font-black text-red-500 leading-none">{initialLive}</span>
        </div>
        <div className="flex flex-col gap-0.5 md:gap-0">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-zinc-400 mono text-[9px] md:text-sm">To ID:</span>
            <span className={`font-bold transition-all duration-300 ${remainingToIdentifyLive > 0 ? 'text-red-400 animate-pulse-red' : 'text-zinc-600'}`}>
              {remainingToIdentifyLive}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs md:text-sm mt-0.5">
            <span className="text-zinc-400 mono text-[9px] md:text-sm">In Gun:</span>
            <span className="font-bold text-red-600">{activeLive}</span>
          </div>
        </div>
      </div>

      {/* Blank Tracker - Columna 2 en móvil */}
      <div className="glass p-2 md:p-4 rounded-lg border-l-2 md:border-l-4 border-zinc-400 col-span-1">
        <div className="flex justify-between items-start mb-0.5 md:mb-2">
          <span className="text-[9px] md:text-xs mono text-zinc-500 uppercase">Blank</span>
          <span className="text-lg md:text-2xl font-black text-zinc-100 leading-none">{initialBlank}</span>
        </div>
        <div className="flex flex-col gap-0.5 md:gap-0">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-zinc-400 mono text-[9px] md:text-sm">To ID:</span>
            <span className={`font-bold transition-all duration-300 ${remainingToIdentifyBlank > 0 ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {remainingToIdentifyBlank}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs md:text-sm mt-0.5">
            <span className="text-zinc-400 mono text-[9px] md:text-sm">In Gun:</span>
            <span className="font-bold text-zinc-100">{activeBlank}</span>
          </div>
        </div>
      </div>

      {/* Probability Display - Ancho completo abajo en móvil, columna 3 en desktop */}
      <div className={`glass p-2 md:p-4 rounded-lg border-l-2 md:border-l-4 transition-all duration-500 flex flex-col justify-center col-span-2 md:col-span-1 ${styles.borderColor} ${styles.shadow}`}>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[9px] md:text-xs mono text-zinc-500 uppercase mb-0.5 md:mb-1">
              Next Shot {styles.label}
            </span>
            <span className={`text-xl md:text-3xl font-black transition-colors leading-none ${styles.textColor}`}>
              {liveProb.toFixed(1)}%
            </span>
          </div>
          <div className="text-right">
             <span className="text-[9px] md:text-xs mono text-zinc-500 uppercase block">Remaining</span>
             <span className="text-base md:text-xl font-bold text-zinc-400 leading-none">{totalRemainingInChamber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBoard;


import React, { useState } from 'react';

interface SetupFormProps {
  onStart: (live: number, blank: number) => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onStart }) => {
  // Inicializamos en vacío para no tener el "0" molesto por defecto
  const [live, setLive] = useState<string>('');
  const [blank, setBlank] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseInt(live) || 0;
    const b = parseInt(blank) || 0;
    if (l + b > 0) {
      onStart(l, b);
    }
  };

  const presets = [1, 2, 3, 4, 5, 6];

  return (
    <form onSubmit={handleSubmit} className="glass p-5 md:p-8 rounded-xl border border-zinc-800 space-y-5 md:space-y-8">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-100">Round Configuration</h2>
        <p className="text-[10px] md:text-xs mono text-zinc-500">Awaiting user input for chamber loading...</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {/* LIVE ROUNDS SECTION */}
        <div className="space-y-2 md:space-y-3">
          <label className="text-[10px] md:text-xs mono uppercase text-red-500 font-bold block">Live Rounds</label>
          <input 
            type="number" 
            min="0" 
            max="12"
            placeholder="-"
            value={live}
            onChange={(e) => setLive(e.target.value)}
            className="w-full bg-zinc-950 border border-red-900/50 rounded p-2 md:p-3 text-xl md:text-2xl font-black text-red-500 focus:outline-none focus:border-red-600 transition-colors placeholder-zinc-800"
          />
          {/* Live Presets */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
            {presets.map((num) => (
              <button
                key={`live-${num}`}
                type="button"
                onClick={() => setLive(num.toString())}
                className="py-1.5 md:py-2 text-[10px] mono font-bold text-zinc-500 bg-zinc-900/50 border border-zinc-800 hover:border-red-500 hover:text-red-500 hover:bg-red-950/30 rounded transition-all"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* BLANK ROUNDS SECTION */}
        <div className="space-y-2 md:space-y-3">
          <label className="text-[10px] md:text-xs mono uppercase text-zinc-400 font-bold block">Blank Rounds</label>
          <input 
            type="number" 
            min="0" 
            max="12"
            placeholder="-"
            value={blank}
            onChange={(e) => setBlank(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 md:p-3 text-xl md:text-2xl font-black text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors placeholder-zinc-800"
          />
          {/* Blank Presets */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
            {presets.map((num) => (
              <button
                key={`blank-${num}`}
                type="button"
                onClick={() => setBlank(num.toString())}
                className="py-1.5 md:py-2 text-[10px] mono font-bold text-zinc-500 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-all"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit"
          disabled={(parseInt(live || '0') + parseInt(blank || '0')) === 0}
          className="w-full py-3 md:py-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-900 disabled:text-zinc-700 disabled:border disabled:border-zinc-800 text-white font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.99] text-xs md:text-base"
        >
          Initialize Chamber
        </button>
      </div>

      <div className="pt-3 md:pt-4 border-t border-zinc-800/50">
        <p className="text-[9px] md:text-[10px] mono text-zinc-600 leading-relaxed text-center">
          NOTICE: SYSTEM CALCULATIONS ARE BASED ON USER INPUT ACCURACY.
        </p>
      </div>
    </form>
  );
};

export default SetupForm;

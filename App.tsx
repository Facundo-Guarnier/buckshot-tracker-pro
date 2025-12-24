
import React, { useState, useMemo, useCallback } from 'react';
import { GameState, Slot, RoundType, HistoryEntry } from './types';
import SlotCard from './components/SlotCard';
import StatusBoard from './components/StatusBoard';
import SetupForm from './components/SetupForm';
import HistoryLog from './components/HistoryLog';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    initialLive: 0,
    initialBlank: 0,
    slots: [],
    isStarted: false,
  });

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleStart = (live: number, blank: number) => {
    const total = live + blank;
    const initialSlots: Slot[] = Array.from({ length: total }, (_, i) => ({
      id: `slot-${i}-${Date.now()}`,
      type: 'unknown',
      isFired: false,
    }));

    setState({
      initialLive: live,
      initialBlank: blank,
      slots: initialSlots,
      isStarted: true,
    });
  };

  const handleReset = () => {
    // Si hay un juego en progreso, guardamos el historial antes de borrar
    if (state.isStarted) {
      const newEntry: HistoryEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        live: state.initialLive,
        blank: state.initialBlank,
        roundsFired: state.slots.filter(s => s.isFired).length,
        totalRounds: state.slots.length
      };
      setHistory(prev => [newEntry, ...prev]);
    }

    setState({
      initialLive: 0,
      initialBlank: 0,
      slots: [],
      isStarted: false,
    });
  };

  const updateSlot = useCallback((id: string, updates: Partial<Slot>) => {
    setState(prev => {
      const targetIndex = prev.slots.findIndex(s => s.id === id);
      if (targetIndex === -1) return prev;

      const newSlots = [...prev.slots];
      
      // Aplicar la actualización al slot específico
      newSlots[targetIndex] = { ...newSlots[targetIndex], ...updates };

      // Lógica de Cascada: Si se marca como disparada (isFired: true),
      // todas las anteriores deben marcarse también como disparadas.
      if (updates.isFired === true) {
        for (let i = 0; i < targetIndex; i++) {
          if (!newSlots[i].isFired) {
            newSlots[i] = { ...newSlots[i], isFired: true };
          }
        }
      }

      return {
        ...prev,
        slots: newSlots
      };
    });
  }, []);

  const counters = useMemo(() => {
    // --- ESTADO FÍSICO DE LA RECÁMARA ---
    const unfiredSlots = state.slots.filter(s => !s.isFired);
    const firedSlots = state.slots.filter(s => s.isFired);
    
    // Contamos qué ha salido YA de la escopeta (Usuario debe marcar qué era)
    const firedLive = firedSlots.filter(s => s.type === 'live').length;
    const firedBlank = firedSlots.filter(s => s.type === 'blank').length;

    // --- ESTADO DE CONOCIMIENTO ---
    // Balas que vemos en la recámara (marcadas pero NO disparadas)
    // Estas NO son parte del cálculo de probabilidad, son certezas.
    const visibleLiveInChamber = unfiredSlots.filter(s => s.type === 'live').length;
    const visibleBlankInChamber = unfiredSlots.filter(s => s.type === 'blank').length;

    // --- CÁLCULO DEL "POOL DE MISTERIO" ---
    // Cuántas balas Live quedan teóricamente ocultas en los casilleros "?"
    // Total Inicial - Las que salieron - Las que ya veo en la recámara
    const mysteryLiveCount = Math.max(0, state.initialLive - firedLive - visibleLiveInChamber);
    const mysteryBlankCount = Math.max(0, state.initialBlank - firedBlank - visibleBlankInChamber);
    const totalMysteryPool = mysteryLiveCount + mysteryBlankCount;

    // --- LÓGICA DEL SIGUIENTE DISPARO ---
    const nextSlot = unfiredSlots[0]; // El primer casillero disponible
    let liveProb = 0;
    let status: 'known-live' | 'known-blank' | 'calculated' | 'empty' = 'empty';

    if (!nextSlot) {
      status = 'empty';
      liveProb = 0;
    } else if (nextSlot.type === 'live') {
      // Si yo ya marqué que es Live, es 100% seguro.
      status = 'known-live';
      liveProb = 100;
    } else if (nextSlot.type === 'blank') {
      // Si yo ya marqué que es Blank, es 0% (o 100% de ser Blank).
      status = 'known-blank';
      liveProb = 0;
    } else {
      // Es 'unknown'. Calculamos basado estrictamente en el Pool de Misterio.
      status = 'calculated';
      if (totalMysteryPool > 0) {
        liveProb = (mysteryLiveCount / totalMysteryPool) * 100;
      } else {
        // Si no queda nada en el pool (error de input del usuario o final), 0.
        liveProb = 0;
      }
    }

    // --- CONTADORES GENERALES ---
    // Totales identificados en cualquier estado (para saber cuántas me faltan marcar)
    const totalMarkedLive = state.slots.filter(s => s.type === 'live').length;
    const totalMarkedBlank = state.slots.filter(s => s.type === 'blank').length;

    return {
      toIdentifyLive: Math.max(0, state.initialLive - totalMarkedLive),
      toIdentifyBlank: Math.max(0, state.initialBlank - totalMarkedBlank),
      activeLive: state.initialLive - firedLive, // Reales que quedan en el arma (ocultas o visibles)
      activeBlank: state.initialBlank - firedBlank, // Fogueo que quedan en el arma
      totalRemainingCount: unfiredSlots.length,
      liveProb,
      status
    };
  }, [state.slots, state.initialLive, state.initialBlank]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* DISCLAIMER BANNER (SPANISH) */}
      <div className="w-full bg-yellow-600/10 border-b border-yellow-600/20 py-2 px-2 md:px-4 text-center backdrop-blur-sm z-50">
        <p className="text-[9px] md:text-xs mono text-yellow-500/80 leading-tight">
          <span className="font-bold">⚠️ APP NO OFICIAL: </span>
          <a 
            href="https://store.steampowered.com/app/2835570/Buckshot_Roulette/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-yellow-400 transition-colors ml-1"
          >
            BUCKSHOT ROULETTE (STEAM)
          </a>
          . NO USAR EN VIDA REAL.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto p-3 md:p-8 flex flex-col items-center flex-grow">
        <header className="w-full flex justify-between items-center mb-4 md:mb-8 pb-3 md:pb-4 border-b border-red-900/30">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-red-600 flex items-center gap-2">
              <span className="w-2 h-6 md:w-3 md:h-8 bg-red-600 inline-block"></span>
              Buckshot Tracker
            </h1>
            <p className="text-[10px] md:text-xs mono text-zinc-500 uppercase">Dealer Status: Operational</p>
          </div>
          
          {state.isStarted && (
            <button 
              onClick={handleReset}
              className="px-3 py-1.5 md:px-4 md:py-2 border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-[10px] md:text-xs mono uppercase transition-colors"
            >
              Reset
            </button>
          )}
        </header>

        {!state.isStarted ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-md mt-4 md:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <SetupForm onStart={handleStart} />
            </div>
            {/* Mostramos el historial solo en la pantalla de setup */}
            <HistoryLog entries={history} />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 md:gap-8">
            <StatusBoard 
              initialLive={state.initialLive}
              initialBlank={state.initialBlank}
              remainingToIdentifyLive={counters.toIdentifyLive}
              remainingToIdentifyBlank={counters.toIdentifyBlank}
              totalRemainingInChamber={counters.totalRemainingCount}
              activeLive={counters.activeLive}
              activeBlank={counters.activeBlank}
              liveProb={counters.liveProb}
              status={counters.status}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
              {state.slots.map((slot, index) => (
                <SlotCard 
                  key={slot.id}
                  slot={slot}
                  index={index}
                  onUpdate={(updates) => updateSlot(slot.id, updates)}
                />
              ))}
            </div>

            <div className="mt-4 md:mt-8 p-4 md:p-6 glass border-red-900/20 rounded-lg">
              <h3 className="text-xs mono uppercase text-zinc-500 mb-2 md:mb-4 tracking-widest">Protocol Instructions</h3>
              <ul className="text-xs md:text-sm text-zinc-400 space-y-1 md:space-y-2 list-disc list-inside">
                <li>Input total <span className="text-red-500 font-bold">LIVE</span> and <span className="text-blue-500 font-bold">BLANK</span> rounds.</li>
                <li>Mark slot as <span className="text-red-500 underline">LIVE</span> (L) or <span className="text-blue-500 underline">BLANK</span> (B) when identified.</li>
                <li>Toggle the <span className="text-yellow-500 font-bold">FLAG</span> icon when a round is fired.</li>
                <li>The <span className="text-white font-bold italic">Probability Engine</span> calculates next shot odds.</li>
              </ul>
            </div>
          </div>
        )}

        <footer className="mt-auto pt-8 md:pt-12 text-center text-[9px] md:text-[10px] mono uppercase text-zinc-700 tracking-[0.2em]">
          SYSTEM v4.3.3 // LOGIC KERNEL ONLINE
        </footer>
      </div>
    </div>
  );
};

export default App;

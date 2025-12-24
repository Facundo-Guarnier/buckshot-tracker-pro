
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryLogProps {
  entries: HistoryEntry[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ entries }) => {
  if (entries.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mt-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px bg-zinc-800 flex-1"></div>
        <h3 className="text-xs mono uppercase text-zinc-600 tracking-widest">Session Log</h3>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>

      <div className="glass border border-zinc-800/50 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 text-[10px] mono uppercase text-zinc-500 border-b border-zinc-800">
              <th className="p-3 font-normal">#ID</th>
              <th className="p-3 font-normal">Time</th>
              <th className="p-3 font-normal">Loadout</th>
              <th className="p-3 font-normal text-right">Usage</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {entries.map((entry, index) => (
              <tr key={entry.id} className="border-b border-zinc-800/30 hover:bg-white/5 transition-colors">
                <td className="p-3 mono text-zinc-600 text-xs">
                  {(entries.length - index).toString().padStart(3, '0')}
                </td>
                <td className="p-3 mono text-zinc-400 text-xs">
                  {entry.timestamp}
                </td>
                <td className="p-3">
                  <div className="flex gap-2 text-xs font-bold">
                    <span className="text-red-500">{entry.live} LIVE</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-400">{entry.blank} BLANK</span>
                  </div>
                </td>
                <td className="p-3 text-right mono text-xs text-zinc-500">
                  <span className="text-zinc-300">{entry.roundsFired}</span>/{entry.totalRounds} FIRED
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;

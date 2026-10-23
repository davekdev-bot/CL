import React, { useState } from 'react';
import { SYNAPSE_NODES } from '../constants';
import { SynapseNode } from '../types';
import {
  Compass,
  Search,
  X,
  ArrowRight,
  Layers,
  Sparkles,
  Film,
  Music,
  DollarSign,
  Shield,
  Activity
} from 'lucide-react';

interface UniversalNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabKey: any) => void;
}

export const UniversalNavigatorModal: React.FC<UniversalNavigatorModalProps> = ({
  isOpen,
  onClose,
  onSelectTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { key: 'all', label: 'Alle Module' },
    { key: 'content', label: 'Video & Content' },
    { key: 'audio', label: 'Musik & Audio' },
    { key: 'monetization', label: 'Monetarisierung & Cashflow' },
    { key: 'autonomy', label: 'Autonomie & Unabhängigkeit' },
    { key: 'analysis', label: 'Analyse & Algorithmus' }
  ];

  const filteredNodes = SYNAPSE_NODES.filter((node) => {
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    const matchesSearch =
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.primaryMetric.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (targetKey: string) => {
    onSelectTab(targetKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Modal Search Bar Header */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center gap-3">
          <Compass className="w-5 h-5 text-brand-coral shrink-0" />
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Funktion, Modul oder Werkzeug suchen (z.B. Thumbnail, Suno, Vertrag, TikTok Audit)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-neutral-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-brand-coral"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="p-2 border-b border-neutral-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none px-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition ${
                selectedCategory === cat.key
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Functional Modules */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
            Verfügbare Synapsen ({filteredNodes.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleSelect(node.targetTabKey)}
                className="p-3 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 hover:border-brand-coral transition cursor-pointer flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">
                      {node.category}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono group-hover:text-brand-coral transition">
                      Öffnen →
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-brand-coral transition">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-snug mt-0.5 line-clamp-2">
                    {node.description}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-neutral-200/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Kern-Fokus:</span>
                  <strong className="text-neutral-800">{node.primaryMetric}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-center text-[11px] text-neutral-400">
          Tipp: Drücke ESC oder wähle ein Modul, um direkt in den jeweiligen Arbeitsbereich zu springen.
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ToolItem } from '../types';
import { TOOLS_DATABASE } from '../constants';
import { ExternalLink, Search, Sparkles, Filter } from 'lucide-react';

export const ToolsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: ToolItem['category'][] = [
    'Content',
    'KI',
    'Musik',
    'Links',
    'Analyse',
    'Planung',
    'SEO',
    'Transkript',
  ];

  const filteredTools = TOOLS_DATABASE.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by category to match the clean card grouping in the OCR screenshot
  const groupedCategories = categories.filter((cat) =>
    selectedCategory === 'All' ? true : cat === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* OCR Subtitle Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900">
            Gratis- & Freemium-Werkzeuge
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Gratis oder mit Gratis-Tarif. Bedingungen und Limits ändern sich, bitte vor Nutzung prüfen.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tools nach Name oder Funktion filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm pl-9 pr-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === 'All'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              Alle ({TOOLS_DATABASE.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Groups matching the OCR cards exactly */}
      <div className="space-y-5">
        {groupedCategories.map((categoryName) => {
          const categoryTools = filteredTools.filter((t) => t.category === categoryName);
          if (categoryTools.length === 0) return null;

          return (
            <div
              key={categoryName}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3"
            >
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight border-b border-neutral-100 pb-2">
                {categoryName}
              </h3>

              <div className="divide-y divide-neutral-100">
                {categoryTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50/60 rounded-lg px-2 -mx-2 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-sm font-bold text-neutral-900 min-w-[140px]">
                        {tool.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {tool.desc}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                      <span className="text-[11px] text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                        {tool.pricing}
                      </span>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-coral hover:text-brand-coralHover transition"
                      >
                        Öffnen
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

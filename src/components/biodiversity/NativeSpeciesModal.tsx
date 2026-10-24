'use client';

import React from 'react';
import { TreePine, Droplets, Wind, ShieldCheck, X, Sparkles, Sprout } from 'lucide-react';
import { REGIONAL_NATIVE_SPECIES } from '@/lib/geo/carbon';

interface NativeSpeciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NativeSpeciesModal: React.FC<NativeSpeciesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-300">
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Sprout className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Indigenous Botanical Database
                <span className="text-[10px] font-mono bg-emerald-900 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Western Ghats & Tropical Plains
                </span>
              </h2>
              <p className="text-xs text-emerald-300/80">
                Calibrated allometric growth rates & stormwater infiltration parameters
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-emerald-900 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table / Cards */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Miyawaki Multi-Strata Philosophy:</strong> EcoPlanar recommends a four-tiered planting structure (Canopy, Sub-canopy, Shrub, Ground-cover) using 100% native saplings to achieve 30x higher biodiversity density and 0% invasive monoculture risk.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {REGIONAL_NATIVE_SPECIES.map((spec) => (
              <div
                key={spec.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-300 transition"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{spec.commonName}</h3>
                    <div className="text-[11px] italic text-slate-500 font-serif">{spec.botanicalName}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {spec.layer}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">CO₂ Capture</span>
                    <span className="font-bold text-emerald-800 font-mono">{spec.annualCo2SequestrationKg} kg/yr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Water Intake</span>
                    <span className="font-bold text-blue-800 font-mono">{spec.waterAbsorptionLitersDay} L/day</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Drought Resist</span>
                    <span className="font-bold text-slate-700 font-mono">{spec.droughtTolerance}</span>
                  </div>
                </div>

                <div className="mt-2.5 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Root Anchorage Depth: <strong className="font-mono text-slate-800">{spec.rootDepthMeters}m</strong></span>
                  <span>Erosion Rating: <strong className="font-mono text-emerald-700">{spec.soilErosionControlRating}/10</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Aligned with <strong>Nagar Van Yojana</strong> & Indian Forest Service native flora guidelines.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

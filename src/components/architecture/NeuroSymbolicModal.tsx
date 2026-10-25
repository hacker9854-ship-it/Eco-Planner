'use client';

import React from 'react';
import {
  Cpu,
  Brain,
  ShieldCheck,
  Binary,
  Layers,
  ArrowRight,
  X,
  CheckCircle2,
  Zap,
  Globe2
} from 'lucide-react';

interface NeuroSymbolicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NeuroSymbolicModal: React.FC<NeuroSymbolicModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl">
              <Brain className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Neuro-Symbolic GIS Pipeline
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Architecture Specification
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Cognitive Intent Parsing + Deterministic Spatial Constraint Enforcement
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Why Pure LLMs Fail in GIS */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5">
            <div className="font-bold text-sm text-rose-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              The Spatial Hallucination Problem (Why Pure LLMs Cannot Plan Cities)
            </div>
            <p className="text-xs leading-relaxed text-rose-950/80">
              Large Language Models cannot perform floating-point geometric intersections, polygon topology validation, or slope gravity math. When pure LLMs generate raw GeoJSON, they routinely draw parks across 10-story buildings or place drainage basins uphill.
            </p>
          </div>

          {/* The Two-Engine Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engine 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2 font-mono">
                  <Brain className="w-4 h-4 text-emerald-700" />
                  Layer 1: Cognitive Planner
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-semibold mb-2">
                  Gemini 3.8 Flash + Groq (450ms Failover)
                </div>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Parses unstructured natural language human planning goals.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Resolves conflicting trade-offs (e.g. Flood vs Heat vs Budget).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Extracts budget caps in USD ($K / $M) and demolition limits.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                Output: Structured Intent JSON (Non-spatial)
              </div>
            </div>

            {/* Engine 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sky-800 font-bold text-sm mb-2 font-mono">
                  <Cpu className="w-4 h-4 text-sky-700" />
                  Layer 2: Symbolic Spatial Solver
                </div>
                <div className="text-[11px] font-mono text-sky-700 font-semibold mb-2">
                  Turf.js + OSM Overpass + SRTM Elevation
                </div>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span><strong>Building Footprint Subtraction:</strong> Mathematically carves out OSM buildings from ground greening.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span><strong>Topographic Low-Point Routing:</strong> Places rain gardens at digital elevation low gradients.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span><strong>Infrastructure Snapping:</strong> Snaps bioswales to road verges and green roofs to detected building slabs.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                Output: Topologically Verified GeoJSON Interventions
              </div>
            </div>
          </div>

          {/* Pareto Optimization Layer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              Layer 3: Multi-Objective Pareto Optimization Engine
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Once valid non-colliding candidate geometries are compiled, the system solves a multi-objective knapsack optimization problem across three non-dominated Pareto scenarios:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-blue-700 block">Flood First</span>
                <span className="text-[10px] text-slate-500">Maximizes stormwater infiltration per dollar invested.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-emerald-800 block">Biodiversity First</span>
                <span className="text-[10px] text-slate-500">Maximizes native flora density & canopy connectivity.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="font-bold text-teal-800 block">Balanced Resilience</span>
                <span className="text-[10px] text-slate-500">Equitable compromise under strict municipal budget caps.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">
            ⚡ Live Engine Status: <strong className="text-slate-800">Groq 600ms Active / Gemini 3.8 Standby</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

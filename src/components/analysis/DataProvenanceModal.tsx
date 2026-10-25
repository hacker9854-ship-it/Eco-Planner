'use client';

import React from 'react';
import { X, Database, ShieldCheck, Calendar, Cpu, AlertTriangle } from 'lucide-react';
import { MetricWithProvenance } from '@/types/provenance';

interface DataProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: MetricWithProvenance<any> | null;
}

export const DataProvenanceModal: React.FC<DataProvenanceModalProps> = ({
  isOpen,
  onClose,
  metric
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Database className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Data Provenance & Telemetry Lineage</h3>
              <p className="text-[11px] text-slate-500">Scientific observation transparency & metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {metric ? (
          <div className="space-y-3">
            {/* Metric Title & Category Badge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">{metric.name}</span>
                <span className="text-sm font-mono font-bold text-emerald-800">{metric.formattedValue}</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                  metric.provenance.category === 'OBSERVED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : metric.provenance.category === 'DERIVED'
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {metric.provenance.category}
              </span>
            </div>

            {/* Lineage Details */}
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Primary Sensor / Source</span>
                </div>
                <div className="text-slate-800 font-sans text-xs">{metric.provenance.source}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-700" />
                  <span>Observation / Calculation Date</span>
                </div>
                <div className="text-slate-800">{metric.provenance.date}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-700" />
                  <span>Calculation Methodology</span>
                </div>
                <div className="text-slate-700 font-sans text-xs leading-relaxed">{metric.provenance.method}</div>
              </div>

              {metric.description && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-sans text-slate-600">
                  {metric.description}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">
              EcoPlanar enforces rigorous scientific categorization across three tiers:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-bold font-mono">GREEN: REAL / OBSERVED</span>
                <p className="text-[11px] text-slate-600 pt-0.5">
                  Direct physical telemetry: Copernicus Sentinel-2 multispectral bands, OpenStreetMap vector coordinates, Open-Meteo climate records, and SRTM DEM elevation.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
                <span className="font-bold font-mono">BLUE: DERIVED METRICS</span>
                <p className="text-[11px] text-slate-600 pt-0.5">
                  Deterministic geospatial formulas: NDVI vegetation coverage, imperviousness percentage, terrain slope gradient, and runoff vulnerability index.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-bold font-mono">ORANGE: MODELED SCENARIOS</span>
                <p className="text-[11px] text-slate-600 pt-0.5">
                  Future hypothetical scenario simulations: Rain garden placements, tree canopy corridors, standard cost models, and stormwater interception liters.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition"
        >
          Close Lineage Inspector
        </button>
      </div>
    </div>
  );
};

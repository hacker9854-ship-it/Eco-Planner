'use client';

import React, { useState } from 'react';
import { CloudRain, AlertTriangle, Droplets, ShieldCheck, Zap } from 'lucide-react';
import { simulateCloudburstRunoff } from '@/lib/geo/carbon';

interface CloudburstSliderProps {
  siteAreaHa?: number;
  baselineImperviousPercent?: number;
  intervenedGreenAreaHa?: number;
  rainfallIntensityMm?: number;
  onRainfallChange?: (intensityMm: number) => void;
  className?: string;
}

export const CloudburstSlider: React.FC<CloudburstSliderProps> = ({
  siteAreaHa = 15.0,
  baselineImperviousPercent = 78.5,
  intervenedGreenAreaHa = 2.4,
  rainfallIntensityMm,
  onRainfallChange,
  className = ''
}) => {
  const [internalRainfallMm, setInternalRainfallMm] = useState<number>(65);
  const rainfallMm = rainfallIntensityMm !== undefined ? rainfallIntensityMm : internalRainfallMm;

  const simulation = simulateCloudburstRunoff({
    siteAreaHa,
    baselineImperviousPercent,
    rainfallIntensityMm: rainfallMm,
    intervenedGreenAreaHa
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalRainfallMm(val);
    if (onRainfallChange) onRainfallChange(val);
  };

  return (
    <div className={`p-3.5 rounded-2xl border transition-all ${
      simulation.isCloudburst
        ? 'bg-blue-950/15 border-blue-400/60 shadow-sm'
        : 'bg-slate-50 border-slate-200'
    } ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <CloudRain className={`w-4 h-4 ${simulation.isCloudburst ? 'text-blue-600 animate-bounce' : 'text-slate-600'}`} />
          <span className="text-xs font-bold text-slate-900">
            Monsoon Stress Simulator
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
            simulation.rainfallIntensityMm >= 180
              ? 'bg-rose-100 text-rose-800 border border-rose-300'
              : simulation.rainfallIntensityMm >= 100
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          {simulation.stressLevel}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-1 mb-2.5">
        <div className="flex justify-between items-center text-[11px] font-mono">
          <span className="text-slate-500">Rainfall Intensity</span>
          <span className="font-bold text-slate-900 text-xs">
            {rainfallMm} mm / storm
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="250"
          step="5"
          value={rainfallMm}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[9px] font-mono text-slate-400">
          <span>40mm (Normal)</span>
          <span>100mm (Heavy)</span>
          <span>250mm (Cloudburst)</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200/80">
        <div className="p-2 rounded-xl bg-white border border-slate-200">
          <span className="text-[10px] text-slate-500 block uppercase font-bold">Stormwater Infiltration</span>
          <span className="text-xs font-bold font-mono text-blue-700">
            {(simulation.totalWaterRetainedLiters / 1000000).toFixed(2)}M Litres
          </span>
          <span className="text-[9px] text-slate-400 block">Absorbed on-site</span>
        </div>

        <div className="p-2 rounded-xl bg-white border border-slate-200">
          <span className="text-[10px] text-slate-500 block uppercase font-bold">Discharge Attenuation</span>
          <span className="text-xs font-bold font-mono text-emerald-700">
            {simulation.retentionPercent}% peak cut
          </span>
          <span className="text-[9px] text-slate-400 block">{simulation.qBaselineM3PerSec} ➔ {simulation.qPostM3PerSec} m³/s</span>
        </div>
      </div>
    </div>
  );
};

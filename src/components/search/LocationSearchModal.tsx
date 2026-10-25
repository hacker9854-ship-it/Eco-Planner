'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, Navigation, Compass, Globe, Check, AlertCircle, Loader2 } from 'lucide-react';
import { GeoLocation } from '@/types/geo';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: GeoLocation) => void;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSearchError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quickHotspots: GeoLocation[] = [
    {
      name: 'Thane Naupada Urban Catchment',
      formattedAddress: 'Naupada - Central Resilience Demonstration Zone, Thane, Maharashtra',
      center: [72.9781, 19.2183],
      zoom: 14,
      placeType: 'city'
    },
    {
      name: 'Mumbai Kurla / Mithi River Basin',
      formattedAddress: 'Mithi River Basin & Kurla West Flood Centroid, Mumbai, Maharashtra',
      center: [72.8777, 19.0760],
      zoom: 14,
      placeType: 'city'
    },
    {
      name: 'Bengaluru Bellandur Corridor',
      formattedAddress: 'Bellandur Lake Catchment & Tech Corridor, Bengaluru, Karnataka',
      center: [77.6744, 12.9260],
      zoom: 14,
      placeType: 'city'
    },
    {
      name: 'Istanbul Kadıköy Coastal Catchment',
      formattedAddress: 'Kadıköy Coastal Stormwater Catchment, Istanbul, Türkiye',
      center: [29.0250, 40.9850],
      zoom: 14,
      placeType: 'city'
    },
    {
      name: 'Chicago Central & Loop District',
      formattedAddress: 'Chicago, Cook County, Illinois, United States',
      center: [-87.6298, 41.8781],
      zoom: 12,
      placeType: 'city'
    },
    {
      name: 'Singapore Marina Bay Catchment',
      formattedAddress: 'Singapore Central Urban Catchment, Singapore',
      center: [103.8198, 1.3521],
      zoom: 12,
      placeType: 'city'
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearchError(null);

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          setResults([]);
          setSearchError("Couldn't find that location. Try a city, neighbourhood, or coordinates (e.g. 19.2183, 72.9781).");
        }
      } else {
        setSearchError("Failed to search location. Please verify your query or connection.");
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError("Network error while searching location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Select Geographic Site</h3>
              <p className="text-[11px] text-slate-500">Search global cities, districts, or precise coordinates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (searchError) setSearchError(null);
            }}
            placeholder="Search city, town, district or lat, lng (e.g. Chicago, London, 19.2183, 72.9781)..."
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:bg-white transition"
            autoFocus
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-xs font-semibold text-white transition disabled:opacity-50 flex items-center space-x-1 shadow-xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>{loading ? 'Locating...' : 'Search'}</span>
          </button>
        </form>

        {/* Error Notification */}
        {searchError && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>{searchError}</span>
          </div>
        )}

        {/* Dynamic Search Results */}
        {results.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Search Results ({results.length})
            </span>
            <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
              {results.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 flex items-start space-x-3 transition group"
                >
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 truncate">
                        {loc.name}
                      </span>
                      {loc.placeType && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {loc.placeType}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-sm">
                      {loc.formattedAddress}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Global & Indian Urban Hotspots */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quick Selected Urban Sites</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {quickHotspots.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className="text-left p-2.5 rounded-xl bg-slate-50/80 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition flex items-start space-x-2 group"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 truncate">{loc.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{loc.formattedAddress}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

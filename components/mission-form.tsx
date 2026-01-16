"use client";

import { useState } from "react";
import { MissionCreate, TargetCreate } from "@/types/mission";
import { missionApi, ApiError } from "@/lib/api";

interface MissionFormProps {
  onSuccess: () => void;
}

export function MissionForm({ onSuccess }: MissionFormProps) {
  const [targets, setTargets] = useState<TargetCreate[]>([
    { name: "", country: "", notes: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validTargets = targets.filter(t => t.name && t.country);
    
    if (validTargets.length === 0) {
      setError("at least one target required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await missionApi.create({ targets: validTargets });
      setTargets([{ name: "", country: "", notes: "" }]);
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to create mission");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTarget = (index: number, field: keyof TargetCreate, value: string) => {
    const newTargets = [...targets];
    newTargets[index] = { ...newTargets[index], [field]: value };
    setTargets(newTargets);
  };

  const addTarget = () => {
    if (targets.length < 3) {
      setTargets([...targets, { name: "", country: "", notes: "" }]);
    }
  };

  const removeTarget = (index: number) => {
    if (targets.length > 1) {
      setTargets(targets.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-100">create new mission</h2>
      
      {error && (
        <div className="mb-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-300">
              targets (1-3)
            </label>
            {targets.length < 3 && (
              <button
                type="button"
                onClick={addTarget}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                + add target
              </button>
            )}
          </div>

          <div className="space-y-3">
            {targets.map((target, index) => (
              <div key={index} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-slate-400">target {index + 1}</span>
                  {targets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTarget(index)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      remove
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="name"
                  required
                  value={target.name}
                  onChange={(e) => updateTarget(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />

                <input
                  type="text"
                  placeholder="country"
                  required
                  value={target.country}
                  onChange={(e) => updateTarget(index, "country", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />

                <textarea
                  placeholder="notes (optional)"
                  value={target.notes}
                  onChange={(e) => updateTarget(index, "notes", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "creating..." : "create mission"}
        </button>
      </form>
    </div>
  );
}

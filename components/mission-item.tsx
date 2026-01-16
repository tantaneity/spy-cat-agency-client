"use client";

import { useState, useEffect } from "react";
import { Mission } from "@/types/mission";
import { SpyCat } from "@/types/spy-cat";
import { missionApi, spyCatApi, ApiError } from "@/lib/api";

interface MissionItemProps {
  mission: Mission;
  cats: SpyCat[];
  onUpdate: () => void;
}

export function MissionItem({ mission, cats, onUpdate }: MissionItemProps) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignedCat = cats.find(cat => cat.id === mission.cat_id);

  const handleAssign = async () => {
    if (!selectedCatId) return;

    try {
      setLoading(true);
      setError(null);
      await missionApi.assignCat(mission.id, { cat_id: selectedCatId });
      setIsAssigning(false);
      setSelectedCatId(null);
      onUpdate();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to assign cat");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("delete mission?")) return;

    try {
      setLoading(true);
      setError(null);
      await missionApi.delete(mission.id);
      onUpdate();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to delete mission");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTargetComplete = async (targetId: number, currentStatus: boolean) => {
    try {
      setLoading(true);
      setError(null);
      await missionApi.updateTarget(targetId, { is_complete: !currentStatus });
      onUpdate();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to update target");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 hover:bg-slate-700/50 transition-colors">
      {error && (
        <div className="mb-2 bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium text-slate-100">
              mission #{mission.id}
            </h3>
            {mission.is_complete && (
              <span className="px-2 py-1 bg-green-900/50 border border-green-500 text-green-300 text-xs rounded">
                completed
              </span>
            )}
          </div>
          
          <div className="mt-2 text-sm text-slate-400">
            {assignedCat ? (
              <p>assigned to: <span className="text-slate-300">{assignedCat.name}</span></p>
            ) : (
              <p className="text-amber-400">not assigned</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!mission.cat_id && !isAssigning && (
            <button
              onClick={() => setIsAssigning(true)}
              disabled={loading}
              className="px-4 py-2 text-sm text-blue-400 hover:bg-blue-900/30 rounded transition-colors disabled:opacity-50"
            >
              assign cat
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={loading || mission.cat_id !== null}
            className="px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 rounded transition-colors disabled:opacity-50"
            title={mission.cat_id ? "cannot delete assigned mission" : "delete mission"}
          >
            delete
          </button>
        </div>
      </div>

      {isAssigning && (
        <div className="mb-3 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2">
            <select
              value={selectedCatId || ""}
              onChange={(e) => setSelectedCatId(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100"
            >
              <option value="">select cat...</option>
              {cats.filter(cat => !cat.mission).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.breed})
                </option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              disabled={!selectedCatId || loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              assign
            </button>
            <button
              onClick={() => { setIsAssigning(false); setSelectedCatId(null); }}
              disabled={loading}
              className="px-4 py-2 bg-slate-600 text-slate-200 text-sm rounded hover:bg-slate-500 transition-colors disabled:opacity-50"
            >
              cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 space-y-2">
        <h4 className="text-sm font-medium text-slate-300">targets:</h4>
        {mission.targets.map((target) => (
          <div
            key={target.id}
            className="p-3 bg-slate-900/50 rounded border border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${target.is_complete ? 'text-green-400 line-through' : 'text-slate-200'}`}>
                    {target.name}
                  </span>
                  <span className="text-xs text-slate-400">({target.country})</span>
                </div>
                {target.notes && (
                  <p className="mt-1 text-xs text-slate-400">{target.notes}</p>
                )}
              </div>
              {mission.cat_id && (
                <button
                  onClick={() => handleToggleTargetComplete(target.id, target.is_complete)}
                  disabled={loading}
                  className={`px-3 py-1 text-xs rounded transition-colors disabled:opacity-50 ${
                    target.is_complete
                      ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {target.is_complete ? 'reopen' : 'complete'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

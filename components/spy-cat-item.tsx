"use client";

import { useState } from "react";
import { SpyCat } from "@/types/spy-cat";
import { spyCatApi, ApiError } from "@/lib/api";

interface SpyCatItemProps {
  cat: SpyCat;
  onUpdate: () => void;
}

export function SpyCatItem({ cat, onUpdate }: SpyCatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [salary, setSalary] = useState(cat.salary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      await spyCatApi.update(cat.id, { salary });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to update cat");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`delete ${cat.name}?`)) return;

    try {
      setLoading(true);
      setError(null);
      await spyCatApi.delete(cat.id);
      onUpdate();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to delete cat");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSalary(cat.salary);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="px-6 py-4 hover:bg-slate-700/50 transition-colors">
      {error && (
        <div className="mb-2 bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-slate-100">{cat.name}</h3>
          <div className="mt-1 text-sm text-slate-400 space-y-1">
            <p>breed: {cat.breed}</p>
            <p>experience: {cat.years_of_experience} years</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={salary}
                  onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 bg-slate-700 border border-slate-600 rounded w-32 text-slate-100"
                />
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  save
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-3 py-1 bg-slate-600 text-slate-200 text-sm rounded hover:bg-slate-500 transition-colors disabled:opacity-50"
                >
                  cancel
                </button>
              </div>
            ) : (
              <p>salary: ${cat.salary.toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="px-4 py-2 text-sm text-blue-400 hover:bg-blue-900/30 rounded transition-colors disabled:opacity-50"
              >
                edit salary
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 rounded transition-colors disabled:opacity-50"
              >
                delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

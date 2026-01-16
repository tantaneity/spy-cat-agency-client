"use client";

import { useState } from "react";
import { SpyCatCreate } from "@/types/spy-cat";
import { spyCatApi, ApiError } from "@/lib/api";

interface SpyCatFormProps {
  onSuccess: () => void;
}

export function SpyCatForm({ onSuccess }: SpyCatFormProps) {
  const [formData, setFormData] = useState<SpyCatCreate>({
    name: "",
    years_of_experience: 0,
    breed: "",
    salary: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      await spyCatApi.create(formData);
      setFormData({ name: "", years_of_experience: 0, breed: "", salary: 0 });
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("failed to create cat");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">add new spy cat</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            years of experience
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.years_of_experience}
            onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            breed
          </label>
          <input
            type="text"
            required
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            salary
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "adding..." : "add spy cat"}
        </button>
      </form>
    </div>
  );
}

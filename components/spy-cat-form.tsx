"use client";

import { useState, useEffect } from "react";
import { SpyCatCreate } from "@/types/spy-cat";
import { spyCatApi, ApiError } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";

interface SpyCatFormProps {
  onSuccess: () => void;
}

export function SpyCatForm({ onSuccess }: SpyCatFormProps) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [formData, setFormData] = useState<SpyCatCreate>({
    name: "",
    years_of_experience: 0,
    breed: "",
    salary: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const data = await spyCatApi.getBreeds();
        setBreeds(data);
      } catch (err) {
        console.error("failed to load breeds:", err);
      } finally {
        setLoadingBreeds(false);
      }
    };
    loadBreeds();
  }, []);

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
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-100">add new spy cat</h2>
      
      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="years of experience"
          type="number"
          required
          min="0"
          value={formData.years_of_experience}
          onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
        />

        <Select
          label="breed"
          required
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          disabled={loadingBreeds}
        >
          <option value="">select breed...</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Select>

        <Input
          label="salary"
          type="number"
          required
          min="0"
          step="0.01"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "adding..." : "add spy cat"}
        </Button>
      </form>
    </div>
  );
}

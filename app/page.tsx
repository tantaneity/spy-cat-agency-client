"use client";

import { useState, useEffect } from "react";
import { SpyCat } from "@/types/spy-cat";
import { spyCatApi } from "@/lib/api";
import { SpyCatList } from "@/components/spy-cat-list";
import { SpyCatForm } from "@/components/spy-cat-form";

export default function Home() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await spyCatApi.getAll();
      setCats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to load cats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">spy cat agency</h1>
          <p className="mt-2 text-gray-600">manage spy cats</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SpyCatForm onSuccess={loadCats} />
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              </div>
            ) : (
              <SpyCatList cats={cats} onUpdate={loadCats} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

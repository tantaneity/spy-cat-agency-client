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
    <main className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-100">spy cat agency</h1>
          <p className="mt-2 text-slate-400">manage spy cats</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
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
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-400 border-r-transparent"></div>
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

"use client";

import { useState, useEffect } from "react";
import { SpyCat } from "@/types/spy-cat";
import { Mission } from "@/types/mission";
import { spyCatApi, missionApi } from "@/lib/api";
import { SpyCatList } from "@/components/spy-cat-list";
import { SpyCatForm } from "@/components/spy-cat-form";
import { MissionList } from "@/components/mission-list";

export default function Home() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [catsData, missionsData] = await Promise.all([
        spyCatApi.getAll(),
        missionApi.getAll(),
      ]);
      setCats(catsData);
      setMissions(missionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
            <SpyCatForm onSuccess={loadData} />
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-400 border-r-transparent"></div>
              </div>
            ) : (
              <div className="space-y-8">
                <SpyCatList cats={cats} onUpdate={loadData} />
                <MissionList missions={missions} cats={cats} onUpdate={loadData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

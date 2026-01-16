"use client";

import { useState } from "react";
import { SpyCat } from "@/types/spy-cat";
import { SpyCatItem } from "./spy-cat-item";

interface SpyCatListProps {
  cats: SpyCat[];
  onUpdate: () => void;
}

export function SpyCatList({ cats, onUpdate }: SpyCatListProps) {
  if (cats.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 text-center text-slate-400 border border-slate-700">
        no spy cats yet
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700">
      <div className="px-6 py-4 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-slate-100">spy cats</h2>
      </div>
      <div className="divide-y divide-slate-700">
        {cats.map((cat) => (
          <SpyCatItem key={cat.id} cat={cat} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

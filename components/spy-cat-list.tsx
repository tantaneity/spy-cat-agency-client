"use client";

import { SpyCat } from "@/types/spy-cat";
import { SpyCatItem } from "./spy-cat-item";
import { Card } from "@/components/ui/card";

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
    <Card title="spy cats">
      <div className="divide-y divide-slate-700">
        {cats.map((cat) => (
          <SpyCatItem key={cat.id} cat={cat} onUpdate={onUpdate} />
        ))}
      </div>
    </Card>
  );
}

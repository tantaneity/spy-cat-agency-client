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
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        no spy cats yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">spy cats</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {cats.map((cat) => (
          <SpyCatItem key={cat.id} cat={cat} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

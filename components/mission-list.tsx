"use client";

import { Mission } from "@/types/mission";
import { SpyCat } from "@/types/spy-cat";
import { MissionItem } from "./mission-item";
import { Card } from "@/components/ui/card";

interface MissionListProps {
  missions: Mission[];
  cats: SpyCat[];
  onUpdate: () => void;
}

export function MissionList({ missions, cats, onUpdate }: MissionListProps) {
  if (missions.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 text-center text-slate-400 border border-slate-700">
        no missions yet
      </div>
    );
  }

  return (
    <Card title="missions">
      <div className="divide-y divide-slate-700">
        {missions.map((mission) => (
          <MissionItem key={mission.id} mission={mission} cats={cats} onUpdate={onUpdate} />
        ))}
      </div>
    </Card>
  );
}

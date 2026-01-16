export interface Target {
  id: number;
  name: string;
  country: string;
  notes: string;
  is_complete: boolean;
}

export interface TargetCreate {
  name: string;
  country: string;
  notes?: string;
}

export interface TargetUpdate {
  notes?: string;
  is_complete?: boolean;
}

export interface Mission {
  id: number;
  cat_id: number | null;
  is_complete: boolean;
  targets: Target[];
}

export interface MissionCreate {
  targets: TargetCreate[];
}

export interface MissionAssignCat {
  cat_id: number;
}

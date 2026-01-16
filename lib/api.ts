import { SpyCat, SpyCatCreate, SpyCatUpdate } from "@/types/spy-cat";
import { Mission, MissionCreate, MissionAssignCat, TargetUpdate } from "@/types/mission";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "unknown error" }));
    throw new ApiError(response.status, error.detail || "request failed");
  }
  
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

export const spyCatApi = {
  async getBreeds(): Promise<string[]> {
    const response = await fetch(`${API_URL}/cats/breeds`);
    return handleResponse(response);
  },

  async getAll(): Promise<SpyCat[]> {
    const response = await fetch(`${API_URL}/cats`);
    return handleResponse(response);
  },

  async getById(id: number): Promise<SpyCat> {
    const response = await fetch(`${API_URL}/cats/${id}`);
    return handleResponse(response);
  },

  async create(data: SpyCatCreate): Promise<SpyCat> {
    const response = await fetch(`${API_URL}/cats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async update(id: number, data: SpyCatUpdate): Promise<SpyCat> {
    const response = await fetch(`${API_URL}/cats/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/cats/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

export const missionApi = {
  async getAll(): Promise<Mission[]> {
    const response = await fetch(`${API_URL}/missions`);
    return handleResponse(response);
  },

  async getById(id: number): Promise<Mission> {
    const response = await fetch(`${API_URL}/missions/${id}`);
    return handleResponse(response);
  },

  async create(data: MissionCreate): Promise<Mission> {
    const response = await fetch(`${API_URL}/missions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/missions/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  async assignCat(missionId: number, data: MissionAssignCat): Promise<Mission> {
    const response = await fetch(`${API_URL}/missions/${missionId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateTarget(targetId: number, data: TargetUpdate): Promise<Mission> {
    const response = await fetch(`${API_URL}/missions/targets/${targetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

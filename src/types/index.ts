export interface Grinder {
  id: string;
  name: string;
  brand: string;
  minGrindSetting: number;
  maxGrindSetting: number;
}

export interface Machine {
  id: string;
  name: string;
  brand: string;
  type: string;
}

export interface Bean {
  id: string;
  roaster: string;
  origin: string;
  roastType: string;
  roastLevel: string;
  notes: string;
  grindSetting?: number;
}

export interface Shot {
  id: string;
  beanId: string;
  grinderId: string;
  machineId: string;
  grindSize: number;
  shotTime: number;
  yieldOut: number;
  doseIn: number;
  temperature?: number;
  acidity: number;
  bitterness: number;
  sweetness: number;
  fruitiness: number;
  timestamp: Date;
}

export interface ShotStats {
  ratio: number;
  avgTime: number;
  avgGrindSize: number;
  avgYield: number;
  avgDose: number;
} 
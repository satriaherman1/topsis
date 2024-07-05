export type Kriteria = {
  type: "benefit" | "cost";
  value: number;
  weight: number;
  name: string;
};

export type Alternatif = {
  name: string;
  value: any;
};

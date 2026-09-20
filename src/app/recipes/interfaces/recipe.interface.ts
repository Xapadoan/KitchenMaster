export enum Unit {
  Gram,
  Cac,
  Cas,
  Milliliter,
  Unit,
  Unknown
}

export function unitAsString(u: Unit): string {
  switch (u) {
    case Unit.Gram:
      return "g"
    case Unit.Cac:
      return "cac"
    case Unit.Cas:
      return "cas"
    case Unit.Milliliter:
      return "ml"
    case Unit.Unit:
      return ""
  }

  return "?"
}

export type Ingredient = {
  name: string,
  amount: number,
  unit: Unit,
}

export type Recipe = {
  name: string;
  description?: string;
  ingredients: Ingredient[];
  steps: string[];
  anticipation?: string;
  quantity: number;
};

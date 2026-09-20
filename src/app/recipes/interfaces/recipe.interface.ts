export enum Unit {
  Gram,
  Cac,
  Cas,
  Milliliter,
  Unit,
  Unknown
}

function unitAsString(u: Unit): string {
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

export function formatIngredient(i: Ingredient): string {
  return `${i.amount.toFixed(1)}${unitAsString(i.unit)} ${i.name}`
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

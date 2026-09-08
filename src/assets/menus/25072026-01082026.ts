import { WeekMenu } from "../../app/menus/interfaces/menu.interface";

export const menu: WeekMenu = {
  sat: {
    breakfast: { title: "N/A" },
    lunch: { title: "Restes", recipeIds: ["N/A"] },
    dinner: { title: "Poulet a la cretoise" },
  },
  sun: {
    breakfast: { title: "N/A" },
    lunch: { title: "Poulet a la cretoise", recipeIds: ["N/A"] },
    dinner: { title: "N/A", recipeIds: ["N/A"] },
  },
  mon: {
    breakfast: { title: "N/A" },
    lunch: { title: "Riz poivrons aubergine" },
    dinner: { title: "Tarte tomate - mozza - basilic (froide)" },
  },
  tue: {
    breakfast: { title: "N/A" },
    lunch: { title: "Riz poivrons aubergine" },
    dinner: { title: "Tarte tomate - mozza - basilic (froide)" },
  },
  wed: {
    breakfast: { title: "N/A" },
    lunch: { title: "Pink pasta, betterave et pourprier" },
    dinner: { title: "Saumon et legumes marines" },
  },
  thu: {
    breakfast: { title: "N/A" },
    lunch: { title: "Pink pasta, betterave et pourprier" },
    dinner: {
      title:
        "Brochettes de magrets aux myrtilles + salade de fenouil, peche et jambon cru",
    },
  },
  fri: {
    breakfast: { title: "N/A" },
    lunch: { title: "Salade Mangue avocat + Vinaigrette a l'echalotte" },
    dinner: {
      title:
        "Brochettes de magrets + Salade tomates mozza, fraises et vinaigrette a la grenade",
    },
  },
};

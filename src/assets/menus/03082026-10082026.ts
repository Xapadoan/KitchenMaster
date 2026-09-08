import { WeekMenu } from "../../app/menus/interfaces/menu.interface";

export const menu: WeekMenu = {
  mon: {
    breakfast: { title: "N/A" },
    lunch: { title: "Poulet + pates cretoises" },
    dinner: {
      title: "Wraps Poulet Concombre",
      recipeIds: ["wraps-poulet-concombre"],
    },
  },
  tue: {
    breakfast: {
      title: "Oeuf cocotte au jambon cru + pain",
      recipeIds: ["oeuf-cocotte-jambon-cru"],
    },
    lunch: {
      title: "Gnocchis aux tomates fraiches, courgettes, fromage et basilic",
      recipeIds: ["gnocchis-tomates-courgettes-fromage"],
    },
    dinner: {
      title: "Wraps Poulet Concombre",
      recipeIds: ["wraps-poulet-concombre"],
    },
  },
  wed: {
    breakfast: {
      title: "Oueuf cocotte au jambon cru + pain",
      recipeIds: ["oeuf-cocotte-jambon-cru"],
    },
    lunch: {
      title: "Gnocchis aux tomates fraiches, courgettes, fromage et basilic",
      recipeIds: ["gnocchis-tomates-courgettes-fromage"],
    },
    dinner: {
      title: "Ceviche de bar, fruits de la passion + frites au paprika",
      recipeIds: ["ceviche-bar-fruit-passion", "frites-maison"],
    },
  },
  thu: {
    breakfast: {
      title: "Croc Saumon concombres",
      recipeIds: ["croc-saumon-concombre"],
    },
    lunch: {
      title: "Burgers tofu croustillant + Coleslaw",
      recipeIds: ["burger-tofu-marine-croustillant", "coleslaw"],
    },
    dinner: {
      title: "Salade 3 haricots",
      recipeIds: ["salade-trois-haricots"],
    },
  },
  fri: {
    breakfast: {
      title: "Croc Saumon concombres",
      recipeIds: ["croc-saumon-concombre"],
    },
    lunch: {
      title: "Burgers tofu croustillant + Coleslsaw",
      recipeIds: ["burger-tofu-marine-croustillant", "coleslaw"],
    },
    dinner: {
      title: "Orecchiettes aux pois chiches et brocoli",
      recipeIds: ["orecchiettes-pois-chiches-brocolis"],
    },
  },
  sat: {
    breakfast: {
      title: "Tartines beurre confiture",
      recipeIds: ["tartines-beurre-confiture"],
    },
    lunch: {
      title: "Lasagnes ricotta epinards",
      recipeIds: ["lasagnes-ricotta-epinards"],
    },
    dinner: {
      title: "Salade 3 haricots",
      recipeIds: ["salade-trois-haricots"],
    },
  },
  sun: {
    breakfast: {
      title: "Tartines beurre confiture",
      recipeIds: ["tartines-beurre-confiture"],
    },
    lunch: {
      title: "Lassagnes ricotta epinards",
      recipeIds: ["lasagnes-ricotta-epinards"],
    },
    dinner: {
      title: "Orecchiettes aux pois chiches et brocolis",
      recipeIds: ["orecchiettes-pois-chiches-brocolis"],
    },
  },
};

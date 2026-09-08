import { WeekMenu } from "../../app/menus/interfaces/menu.interface";

export const menu: WeekMenu = {
    mon: {
        breakfast: { title: "Toast oeuf avocat", recipeIds: ["toast-oeufs-avocats"]},
        lunch: { title: "Wellington Vegetarien", recipeIds: ["wellington-vegetarien"]},
        dinner: { title: ""}
    },
    tue: {
        breakfast: { title: "Toast oeuf avocat", recipeIds: ["toast-oeufs-avocats"]},
        lunch: { title: "Wellington Vegetarien", recipeIds: ["wellington-vegetarien"]},
        dinner: { title: "Tarte courgettes pesto parmesan + Salade verte tomates", recipeIds: ["quiche-courgette-pesto-mozzarella-parmesan", "salade-verte-tomate"]},
    },
    wed: {
        breakfast: { title: "Fromage blanc + avoine + bananes", recipeIds: ["fromage-blanc-avoine-fruits"]},
        lunch: { title: "Poivrons farcis + pates roses", recipeIds: ["poivrons-farcis", "pink-pasta-betterave-pourpier"]},
        dinner: { title: "Tarte courgettes pesto parmesan + Salade verte tomates", recipeIds: ["quiche-courgette-pesto-mozzarella-parmesan", "salade-verte-tomate"]},
    },
    thu: {
        breakfast: { title: "Fromage blanc + avoine + bananes", recipeIds: ["fromage-blanc-avoine-fruits"]},
        lunch: { title: "Poivrons farcis + pates roses", recipeIds: ["poivrons-farcis", "pink-pasta-betterave-pourpier"]},
        dinner: { title: "Salade Cesar", recipeIds: ["salade-cesar"]},
    },
    fri: {
        breakfast: { title: "Tartines beurre + confiture", recipeIds: ["tartines-beurre-confiture"]},
        lunch: { title: "Frittata courgette, feta et citron", recipeIds: ["frittata-courgettes-feta-citron"]},
        dinner: { title: "Salade Cesar", recipeIds: ["salade-cesar"]},
    },
    sat: {
        breakfast: { title: "Tartines beurre + confiture", recipeIds: ["tartines-beurre-confiture"]},
        lunch: { title: "Frittata courgette, feta et citron", recipeIds: ["frittata-courgettes-feta-citron"]},
        dinner: { title: "Salade tomates et fraises", recipeIds: ["salade-tomates-fraises-vinaigrette-grenade"]},
    },
    sun: {
        breakfast: { title: "N/A"},
        lunch: { title: "Quiche chorizo et poivrons", recipeIds: ["quiche-chorizo-poivrons"]},
        dinner: { title: "Salade tomates et fraises", recipeIds: ["salade-tomates-fraises-vinaigrette-grenade"]},
    },
}
export interface MealMenu {
	title: string;
	recipeIds?: string[];
}

export type DayMenu = {
	breakfast: MealMenu;
	lunch: MealMenu;
	dinner: MealMenu;
};

export function isKeyOfDayMenu(s: string): s is keyof DayMenu {
	return ["breakfast", "lunch", "dinner"].includes(s);
}

export type WeekMenu = {
	mon: DayMenu;
	tue: DayMenu;
	wed: DayMenu;
	thu: DayMenu;
	fri: DayMenu;
	sat: DayMenu;
	sun: DayMenu;
};

export function isKeyOfWeekMenu(s: string): s is keyof WeekMenu {
	return ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(s);
}

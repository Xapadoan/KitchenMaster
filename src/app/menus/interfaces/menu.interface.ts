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

export type WeekMenuData = {
	mon: DayMenu;
	tue: DayMenu;
	wed: DayMenu;
	thu: DayMenu;
	fri: DayMenu;
	sat: DayMenu;
	sun: DayMenu;
};

export type WeekMenu = {
	id: string;
	data: WeekMenuData;
};

export function isKeyOfWeekMenuData(s: string): s is keyof WeekMenuData {
	return ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(s);
}

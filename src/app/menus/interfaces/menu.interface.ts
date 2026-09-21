export interface MealMenu {
	title: string;
	recipeIds?: string[];
}

export type DayMenu = {
	breakfast: MealMenu;
	lunch: MealMenu;
	dinner: MealMenu;
};

export type WeekMenu = {
	mon: DayMenu;
	tue: DayMenu;
	wed: DayMenu;
	thu: DayMenu;
	fri: DayMenu;
	sat: DayMenu;
	sun: DayMenu;
};

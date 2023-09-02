export type TtaskList = {
	id: string;
	title: string;
	body: string;
	status: string;
};

export function getTaskList(): TtaskList[] {
	const activeData = localStorage.getItem("activeList");
	const completedData = localStorage.getItem("completedList");
	const deletedData = localStorage.getItem("deletedList");

	let activeTasks: (TtaskList | undefined)[] = [];
	let completedTasks: (TtaskList | undefined)[] = [];
	let deletedTasks: (TtaskList | undefined)[] = [];

	if (activeData) {
		activeTasks = JSON.parse(activeData);
	} else {
		activeTasks = [];
		localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
	}

	if (completedData) {
		completedTasks = JSON.parse(completedData);
	} else {
		completedTasks = [];
		localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
	}

	if (deletedData) {
		return (deletedTasks = JSON.parse(deletedData));
	} else {
		deletedTasks = [];
		localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
	}

	const result: (TtaskList | undefined)[][] = [activeTasks, completedTasks, deletedTasks];

	return result;
}

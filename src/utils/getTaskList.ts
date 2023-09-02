export type TtaskList = {
	id: string;
	title: string;
	body: string;
	status: string;
};

export function getTaskList(): [TtaskList[], TtaskList[], TtaskList[]] {
	const activeData = localStorage.getItem("activeTasks");
	const completedData = localStorage.getItem("completedTasks");
	const deletedData = localStorage.getItem("deletedTasks");

	let activeTasks: TtaskList[] = [];
	let completedTasks: TtaskList[] = [];
	let deletedTasks: TtaskList[] = [];

	if (activeData) {
		activeTasks = JSON.parse(activeData);
		localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
	} else {
		localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
	}

	if (completedData) {
		completedTasks = JSON.parse(completedData);
		localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
	} else {
		localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
	}

	if (deletedData) {
		deletedTasks = JSON.parse(deletedData);
		localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
	} else {
		localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
	}

	return [activeTasks, completedTasks, deletedTasks];
}

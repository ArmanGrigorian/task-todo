import { TtaskList } from "./getTaskList";

export function storageManager(newInfo: TtaskList) {
	const activeData = localStorage.getItem("activeTasks");
	const activeTasks = activeData && JSON.parse(activeData);
	const newActiveTasks = activeTasks.map((task: TtaskList) => {
		if (task.id === newInfo.id) {
			return newInfo;
		} else return task;
	});
	localStorage.setItem("activeTasks", JSON.stringify(newActiveTasks));
}

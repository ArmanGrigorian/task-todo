import { TtaskList } from "../utils/getTaskList.ts";

const activeData = localStorage.getItem("activeList");
const completedData = localStorage.getItem("completedList");
const deletedData = localStorage.getItem("deletedList");

const activeTasks = activeData ? JSON.parse(activeData) : [];
const completedTasks = completedData ? JSON.parse(completedData) : [];
const deletedTasks = deletedData ? JSON.parse(deletedData) : [];

const res1 = activeTasks?.reduce((acc: number, val: TtaskList): number => {
	const arr = [];
	arr.push(Number(val.id));
	acc = Math.max(...arr);
	return acc + 1;
}, 0);
const res2 = completedTasks?.reduce((acc: number, val: TtaskList): number => {
	const arr = [];
	arr.push(Number(val.id));
	acc = Math.max(...arr);
	return acc + 1;
}, 0);
const res3 = deletedTasks?.reduce((acc: number, val: TtaskList): number => {
	const arr = [];
	arr.push(Number(val.id));
	acc = Math.max(...arr);
	return acc + 1;
}, 0);

const sumArr = [res1, res2, res3];
const nextId = Math.max(...sumArr);

let initialId = nextId;

export function* idGenerator() {
	while (true) {
		yield initialId++;
	}
}

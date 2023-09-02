import { FC, ReactElement, useState, MouseEvent, FormEvent } from "react";
import Wrapper from "./components/wrapper/Wrapper.tsx";
import NewTask from "./components/newTask/NewTask.tsx";
import Section from "./components/section/Section.tsx";
import Task from "./components/task/Task.tsx";
import { idGenerator } from "./utils/idGenerator.ts";
import { getTaskList, TtaskList } from "./utils/getTaskList.ts";

const App: FC = (): ReactElement => {
	const taskLists: [TtaskList[], TtaskList[], TtaskList[]] = getTaskList();
	const activeList: TtaskList[] = taskLists[0];
	const completedList: TtaskList[] = taskLists[1];
	const deletedList: TtaskList[] = taskLists[2];

	const [active, setActive] = useState<TtaskList[]>(activeList);
	const [completed, setCompleted] = useState<TtaskList[]>(completedList);
	const [deleted, setDeleted] = useState<TtaskList[]>(deletedList);
	const nextId = idGenerator();

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		const form: HTMLFormElement = e.currentTarget as HTMLFormElement;

		const newTask: TtaskList = {
			id: String(nextId.next().value),
			title: form.taskTitle.value,
			body: form.taskBody.value,
			status: "active",
		};

		setActive((prevActive) => {
			if (prevActive) {
				localStorage.setItem("activeTasks", JSON.stringify([newTask, ...prevActive]));
				return [newTask, ...prevActive];
			} else {
				localStorage.setItem("activeTasks", JSON.stringify([newTask]));
				return [newTask] as TtaskList[];
			}
		});

		form.reset();
	}

	function handleClick(e: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
		const div: HTMLDivElement = e.currentTarget as HTMLDivElement;
		const button: HTMLButtonElement = e.target as HTMLButtonElement;

		switch (button.name) {
			case "completeButton":
				div.classList.add("action");

				setCompleted((prevCompleted) => {
					const newTask = active?.find((task) => task?.id === div.id);

					if (newTask) newTask.status = "completeAction";

					const newCompleted = [newTask, ...prevCompleted].filter(
						(val) => val !== undefined,
					) as TtaskList[];
					localStorage.setItem("completedTasks", JSON.stringify(newCompleted));

					return newCompleted as TtaskList[];
				});

				setActive((prevActive) => {
					const newActives = prevActive.filter((task) => task?.id !== div.id);
					localStorage.setItem("activeTasks", JSON.stringify(newActives));
					return newActives as TtaskList[];
				});
				break;

			case "deleteButton":
				div.classList.add("action");

				setDeleted((prevCompleted) => {
					const newTask =
						active?.find((task) => task?.id === div.id) ||
						completed?.find((task) => task?.id === div.id);

					if (newTask && newTask.status.startsWith("active")) {
						newTask.status = "deleteActionA";
					} else if (newTask && newTask.status.startsWith("completed")) {
						newTask.status = "deleteActionB";
					}

					const newDeleted = [newTask, ...prevCompleted];
					localStorage.setItem("deletedTasks", JSON.stringify(newDeleted));
					return newDeleted as TtaskList[];
				});

				setActive((prevState) => {
					const newActives = prevState?.filter((task) => task?.id !== div.id);
					localStorage.setItem("activeTasks", JSON.stringify(newActives));
					return newActives as TtaskList[];
				});
				setCompleted((prevState) => {
					const newCompleted = prevState?.filter((task) => task?.id !== div.id);
					localStorage.setItem("completedTasks", JSON.stringify(newCompleted));
					return newCompleted as TtaskList[];
				});

				break;
			default:
				break;
		}
	}

	return (
		<>
			<NewTask handleSubmit={handleSubmit} />
			<Wrapper>
				<Section title="ACTIVE" className="activeSec">
					{active &&
						active.map((task: TtaskList) => {
							return (
								<Task
									key={crypto.randomUUID()}
									task={task}
									handleClick={handleClick}
									setCompleted={setCompleted}
									setDeleted={setDeleted}
								/>
							);
						})}
				</Section>
				<Section title="COMPLETED" className="completedSec">
					{completed &&
						completed.map((task: TtaskList) => {
							return (
								<Task
									key={crypto.randomUUID()}
									task={task}
									handleClick={handleClick}
									setCompleted={setCompleted}
									setDeleted={setDeleted}
								/>
							);
						})}
				</Section>
				<Section title="DELETED" className="deletedSec">
					{deleted &&
						deleted.map((task: TtaskList) => {
							return (
								<Task
									key={crypto.randomUUID()}
									task={task}
									handleClick={handleClick}
									setCompleted={setCompleted}
									setDeleted={setDeleted}
								/>
							);
						})}
				</Section>
			</Wrapper>
		</>
	);
};

export default App;

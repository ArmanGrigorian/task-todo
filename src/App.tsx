import { FC, ReactElement, useState, MouseEvent, FormEvent } from "react";
import Wrapper from "./components/wrapper/Wrapper.tsx";
import NewTask from "./components/newTask/NewTask.tsx";
import Section from "./components/section/Section.tsx";
import Task from "./components/task/Task.tsx";
import { idGenerator } from "./utils/idGenerator.ts";
import { getTaskList, TtaskList } from "./utils/getTaskList.ts";

const App: FC = (): ReactElement => {
	const nextId = idGenerator();
	const tasksList = getTaskList();

	const [active, setActive] = useState<(TtaskList | undefined)[]>(tasksList[0]);
	const [completed, setCompleted] = useState<(TtaskList | undefined)[]>(tasksList[1]);
	const [deleted, setDeleted] = useState<(TtaskList | undefined)[]>(tasksList[2]);

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		const form: HTMLFormElement = e.currentTarget as HTMLFormElement;

		const newTask: TtaskList = {
			id: String(nextId.next().value),
			title: form.taskTitle.value,
			body: form.taskBody.value,
			status: "active",
		};

		const activeData = localStorage.getItem("activeList");
		if (activeData) {
			const oldTasks: (TtaskList | undefined)[] = JSON.parse(activeData);
			const newTasks: (TtaskList | undefined)[] = [...oldTasks, newTask];
			localStorage.setItem("activeList", JSON.stringify(newTasks));
		} else localStorage.setItem("activeList", JSON.stringify([newTask]));

		setActive((prevActive) => [newTask, ...prevActive]);
	}

	function handleClick(e: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
		const div: HTMLDivElement = e.currentTarget as HTMLDivElement;
		const button: HTMLButtonElement = e.target as HTMLButtonElement;

		switch (button.name) {
			case "completeButton":
				div.classList.add("action");

				setCompleted((prevCompleted) => {
					const newTask = active?.find((task) => task?.id === div.id);
					if (newTask) {
						newTask.status = "completeAction";
					}

					if (prevCompleted) return [newTask, ...prevCompleted];
				});
				setActive((prevActive) => {
					if (prevActive) {
						return prevActive.filter((task) => task?.id !== div.id);
					}
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

					return [newTask, ...prevCompleted];
				});

				setActive((prevState) => prevState?.filter((task) => task?.id !== div.id));
				setCompleted((prevState) => prevState?.filter((task) => task?.id !== div.id));

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

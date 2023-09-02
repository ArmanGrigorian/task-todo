import { FC, ReactElement, MouseEvent, Dispatch, AnimationEvent } from "react";
import "./Task.scss";
import { TtaskList } from "../../utils/getTaskList.ts";
import { AiOutlineDelete, AiOutlineCheckSquare } from "react-icons/ai";

type TaskProps = {
	task: TtaskList;
	handleClick: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
	setCompleted: Dispatch<React.SetStateAction<(TtaskList | undefined)[]>>;
	setDeleted: Dispatch<React.SetStateAction<(TtaskList | undefined)[]>>;
};

const Task: FC<TaskProps> = ({ task, handleClick, setCompleted, setDeleted }): ReactElement => {
	function handleAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
		const div: HTMLDivElement = e.currentTarget as HTMLDivElement;

		if (div.className === "completeAction") {
			setCompleted((prevCompleted) => {
				const newTask =
					prevCompleted &&
					prevCompleted.map((val) => {
						if (val?.id === task.id) {
							val.status = "completed";
							return val;
						} else return val;
					});
				return newTask;
			});
		} else if (div.className === "deleteActionA" || div.className === "deleteActionB") {
			setDeleted((prevDeleted) => {
				const newTask =
					prevDeleted &&
					prevDeleted.map((val) => {
						if (val?.id === task.id) {
							val.status = "deleted";
							return val;
						} else return val;
					});
				return newTask;
			});
		}
	}

	return (
		<div
			className={task.status}
			id={task.id}
			onClick={(e) => handleClick(e)}
			onAnimationEnd={(e) => {
				handleAnimationEnd(e);
			}}>
			<h2>{task.title}</h2>
			<p>{task.body}</p>

			{task.status !== "deleted" && (
				<div>
					{task.status !== "completed" && (
						<button type="button" name="completeButton">
							<AiOutlineCheckSquare />
						</button>
					)}
					<button type="button" name="deleteButton">
						<AiOutlineDelete />
					</button>
				</div>
			)}
		</div>
	);
};

export default Task;

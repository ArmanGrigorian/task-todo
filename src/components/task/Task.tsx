import {
	FC,
	ReactElement,
	MouseEvent,
	Dispatch,
	AnimationEvent,
	useState,
	ChangeEvent,
	SetStateAction,
} from "react";
import "./Task.scss";
import { TtaskList } from "../../utils/getTaskList.ts";
import { AiOutlineDelete, AiOutlineCheckSquare, AiOutlineEdit } from "react-icons/ai";
import { storageManager } from "../../utils/storageManager.ts";

type TaskProps = {
	task: TtaskList;
	handleClick: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
	setCompleted: Dispatch<SetStateAction<TtaskList[]>>;
	setDeleted: Dispatch<SetStateAction<TtaskList[]>>;
};

const Task: FC<TaskProps> = ({ task, handleClick, setCompleted, setDeleted }): ReactElement => {
	const [info, setInfo] = useState<TtaskList>(task);
	const [isEditable, setIsEditable] = useState<boolean>(false);

	function handleAnimationEnd(e: AnimationEvent<HTMLDivElement>) {
		const div: HTMLDivElement = e.currentTarget as HTMLDivElement;

		if (div.className === "completeAction") {
			setCompleted((prevCompleted) => {
				const newCompleted = prevCompleted?.map((val) => {
					if (val?.id === task.id) {
						val.status = "completed";
						return val;
					} else return val;
				});
				localStorage.setItem("completedTasks", JSON.stringify(newCompleted));
				return newCompleted;
			});
		} else if (div.className === "deleteActionA" || div.className === "deleteActionB") {
			setDeleted((prevDeleted) => {
				const newDeleted = prevDeleted?.map((val) => {
					if (val?.id === task.id) {
						val.status = "deleted";
						return val;
					} else return val;
				});
				localStorage.setItem("deletedTasks", JSON.stringify(newDeleted));
				return newDeleted;
			});
		}
	}

	function handleEdit(e: MouseEvent<HTMLDivElement | HTMLButtonElement>) {
		const button: HTMLButtonElement = e.target as HTMLButtonElement;

		switch (button.name) {
			case "editButton":
				setIsEditable(true);
				break;
			case "saveButton":
			case "cancelButton":
				setIsEditable(false);
				break;
			default:
				break;
		}
	}

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;

		switch (target.name) {
			case "taskTitle":
				setInfo((prevInfo) => {
					const newInfo = {
						id: prevInfo.id,
						title: target.value,
						body: prevInfo.body,
						status: prevInfo.status,
					};
					storageManager(newInfo);
					return newInfo;
				});
				break;
			case "taskBody":
				setInfo((prevInfo) => {
					const newInfo = {
						id: prevInfo.id,
						title: prevInfo.title,
						body: target.value,
						status: prevInfo.status,
					};
					storageManager(newInfo);
					return newInfo;
				});
				break;

			default:
				break;
		}
	}

	return (
		<div
			className={info.status}
			id={info.id}
			onClick={(e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
				handleEdit(e);
				handleClick(e);
			}}
			onAnimationEnd={(e) => {
				handleAnimationEnd(e);
			}}>
			{!isEditable ? (
				<h2>{info.title}</h2>
			) : (
				<input
					type="text"
					value={info.title}
					name="taskTitle"
					placeholder="title..."
					onChange={(e) => handleChange(e)}
				/>
			)}
			{!isEditable ? (
				<p>{info.body}</p>
			) : (
				<textarea
					value={info.body}
					name="taskBody"
					placeholder="body..."
					onChange={(e) => handleChange(e)}></textarea>
			)}

			{info.status !== "deleted" && (
				<div>
					{info.status !== "completed" &&
						(!isEditable ? (
							<>
								<button type="button" name="editButton">
									<AiOutlineEdit />
								</button>
								<button type="button" name="completeButton">
									<AiOutlineCheckSquare />
								</button>
							</>
						) : (
							<>
								<button type="button" name="saveButton">
									SAVE
								</button>
								<button type="button" name="cancelButton">
									CANCEL
								</button>
							</>
						))}
					{!isEditable && (
						<button type="button" name="deleteButton">
							<AiOutlineDelete />
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Task;

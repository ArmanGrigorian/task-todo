import { FC, ReactElement, FormEvent, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./NewTask.scss";

type NewTaskProps = {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const NewTask: FC<NewTaskProps> = ({ handleSubmit }): ReactElement => {

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	return (
		<div className="newTask">
			<button type="button" onClick={() => dialogRef.current!.showModal()}>
				ADD NEW TASK
			</button>
			<dialog ref={dialogRef}>
				<button onClick={() => dialogRef.current!.close()}>
					<AiOutlineClose />
				</button>
				<form method="dialog" onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
					<fieldset>
						<legend>ADD NEW TASK</legend>
						<input type="text" name="taskTitle" placeholder="title..." />
						<textarea name="taskBody" placeholder="body..."></textarea>
						<div>
							<input type="submit" value="ADD" />
							<input type="reset" value="RESET" />
						</div>
					</fieldset>
				</form>
			</dialog>
		</div>
	);
};

export default NewTask;

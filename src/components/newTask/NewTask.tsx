import { FC, ReactElement, FormEvent } from "react";
import "./NewTask.scss";

type NewTaskProps = {
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const NewTask: FC<NewTaskProps> = ({ handleSubmit }): ReactElement => {
	return (
		<form className="newTask" onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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
	);
};

export default NewTask;

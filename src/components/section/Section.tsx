import { FC, ReactElement, ReactNode } from "react";
import "./Section.scss";

type SectionProps = {
	className: string;
	title: string;
	children: ReactNode;
};

const Section: FC<SectionProps> = ({ children, className, title }): ReactElement => {
	return (
		<section className={className}>
			<h3>{title}</h3>
			{children}
		</section>
	);
};

export default Section;

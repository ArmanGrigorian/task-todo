import { FC, ReactElement, ReactNode } from "react";
import "./Wrapper.scss";

type WrapperProps = {
	children: ReactNode;
};

const Wrapper: FC<WrapperProps> = ({ children }): ReactElement => {
	return <div className="wrapper">{children}</div>;
};

export default Wrapper;

import { Eye, EyeOff } from "lucide-react";

interface ToggleInputVisionButtonProps {
	onClick: () => void;
	isVisible: boolean;
	className?: string;
}

export const ToggleInputVisionButton = ({
	onClick,
	isVisible,
	className,
}: ToggleInputVisionButtonProps) => {
	return (
		<button onClick={onClick}>
			{isVisible ? (
				<Eye className={className} size={23} />
			) : (
				<EyeOff className={className} size={23} />
			)}
		</button>
	);
};

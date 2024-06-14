import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface RoundButtonProps {
	logo?: ReactNode;
	text: string;
	buttonClassName?: string;
	textClassName?: string;
	onClick?: () => void;
	isDisabled?: boolean;
	type?: "button" | "submit" | "reset";
}

export const RoundButton = ({
	isDisabled = false,
	onClick,
	logo,
	text,
	textClassName,
	buttonClassName,
	type = "button",
}: RoundButtonProps) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={"flex flex-row gap-3 items-center justify-center w-full rounded-full shadow-md border border-gray-200 cursor-pointer"
				.concat(" ", buttonClassName || "")
				.concat(" ", isDisabled ? "bg-gray-500 border-gray-500" : "")}
			disabled={isDisabled}
		>
			{logo ? logo : null}

			<p
				className={"text-black font-medium text-center text-md".concat(
					" ",
					textClassName || ""
				)}
			>
				{text}
			</p>
		</button>
	);
};

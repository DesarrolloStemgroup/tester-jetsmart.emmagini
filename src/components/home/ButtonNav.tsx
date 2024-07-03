import Link from "next/link";

import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

interface ComponentProps {}

export const ButtonNav = ({}: ComponentProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		router.back();
	};
	return (
		<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[300px]">
			<div className="relative flex justify-center gap-10 px-7 py-2 bg-blueEmmagini mt-4 rounded-full border-4 border-gray-100 shadow-xl h-20">
				<button
					className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1"
					onClick={handleCardClick}
				>
					<div className="flex flex-col items-center">
						<FaArrowLeft size={18} className="text-white" />
						<span className="mt-1 text-md text-white">Volver</span>
					</div>
				</button>

				<Link href="/">
					<button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center w-[100px] h-full rounded-xl p-1">
						<div className="flex flex-col items-center">
							<IoHome size={18} className="text-white" />
							<span className="mt-1 text-md text-center text-white">
								Inicio
							</span>
						</div>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ButtonNav;

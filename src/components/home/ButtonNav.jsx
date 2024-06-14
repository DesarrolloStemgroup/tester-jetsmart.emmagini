import Link from "next/link";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";

function ButtonNav() {
	return (
		<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
			<div className="flex justify-center gap-10 px-7 py-2 bg-blueEmmagini mt-4 rounded-full border-4 border-gray-100 shadow-xl">
				<Link
					href="/app/subastas"
					className="flex flex-1 items-center justify-center"
				>
					<button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1">
						<div className="flex flex-col items-center">
							<BsGift size={18} className="text-white" />
							<span className="mt-1 text-md text-white">Subastas</span>
						</div>
					</button>
				</Link>

				<Link href="/app/productos">
					<button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1">
						<div className="flex flex-col items-center">
							<BsCartCheck size={18} className="text-white" />
							<span className="mt-1 text-md text-white">Comprar</span>
						</div>
					</button>
				</Link>

				<button className="flex flex-col items-center justify-center w-full h-full rounded-xl p-1">
					<div className="flex flex-col items-center">
						<AiOutlineTrophy size={18} className="text-white" />
						<span className="mt-1 text-md text-center text-white">Premium</span>
					</div>
				</button>
			</div>
		</div>
	);
}

export default ButtonNav;

import Image from "next/image";
import tester from "../../../../public/assets/tester.jpeg";
import { RoundButton } from "@/components/buttons/RoundButton";

function trivia() {
	return (
		<div className="flex flex-col lg:flex-row gap-5 pt-20 pb-5 w-screen h-screen overflow-hidden p-6">
			<div className="flex flex-col lg:gap-5 w-[705px]">
				<div className="flex flex-col gap-5">
					<Image src={tester} alt="tester" className="w-full h-[542px]" />
				</div>
			</div>

			<div className="w-[537px] col-span-3 flex flex-col gap-5">
				<h2>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
					recusandae vel! Quidem dolorem blanditiis libero voluptas repellat
					molestias, error quo quia magni, nulla alias. Nam fugit neque labore
					debitis enim.
				</h2>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 1"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
				<RoundButton
					buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300"
					text="respuesta 2"
				/>
			</div>
		</div>
	);
}

export default trivia;

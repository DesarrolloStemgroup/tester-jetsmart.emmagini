import Image from "next/image";
import "../../app/globals.css";

function CardHome({ text, imageCard, onClick, description }) {
	return (
		<div
			className="rounded-md shadow-md p-4 w-[280.24px] h-[263.01px] lg:w-full lg:h-[300px]  flex flex-col items-center cursor-pointer  drop-shadow-lg max-h-[640px] bg"
			onClick={onClick}
		>
			<div className="relative h-52 w-full">
				<Image
					src={imageCard}
					alt="Card"
					layout="fill"
					objectFit="cover"
					className="w-full h-full"
				/>
			</div>
			<span className="text-black font-bold text-base leading-5 text-center mt-2 aling-middle mt-4">
				{text}
			</span>
			<span className="text-black font-light text-sm leading-5 text-center mt-2 aling-middle mt-4">
				{description}
			</span>
		</div>
	);
}

export default CardHome;

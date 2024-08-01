import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";

interface ImageBannerProps {
	image: string;
	welcomeText?: string;
	title?: string;
	subtitle?: string;
	button?: boolean;
	link?: string;
	buttonClassName?: string;
	buttonText?: string;
}

export const ImageBanner = ({
	image,
	welcomeText,
	title,
	subtitle,
	button,
	link,
	buttonClassName,
	buttonText,
}: ImageBannerProps) => {
	const router = useRouter();
	const { language } = useDataContext();

	const idTrivia = "64776728-d5a0-11ee-a304-111c596b0bf7";

	const handleButtonTriviaClick = () => {
		router.push(`/${language}/trivia`);
	};
	return (
		<div className="relative overflow-hidden mt-10 h-auto">
			<div className="absolute inset-0">
				<Image
					src={image}
					alt="Banner"
					layout="fill"
					objectFit="cover"
					className="w-full h-full"
				/>
			</div>
			<div className="relative container mx-auto px-4 py-16 text-white mt-8">
				<div className="text-center align-middle ">
					<h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-8 mb-2 md:mb-4 text-center align-middle">
						{welcomeText}
					</h3>
					<h1 className="font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-10 mb-2 md:mb-4 text-center align-middle">
						{title}
					</h1>
					<h3 className="font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl leading-8 mt-2 md:mt-4 mb-4 text-center align-middle">
						{subtitle}
					</h3>
					{button && (
						<button
							onClick={handleButtonTriviaClick}
							className={"w-full sm:w-[323px] h-12 bg-blueEmmagini mt-4 rounded-[50px] border-4 border-gray-300".concat(
								" ",
								buttonClassName || ""
							)}
						>
							<span className="text-center align-middle text-white">
								{buttonText}
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageBanner;

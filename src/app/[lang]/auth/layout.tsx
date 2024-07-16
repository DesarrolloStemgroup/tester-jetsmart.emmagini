"use client";

import Image from "next/image";
import { useDataContext } from "@/context/DataProvider";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { empresa } = useDataContext();

	return (
		<main className="relative min-h-screen max-h-screen w-screen h-screen overscroll-none overflow-hidden bg-black">
			<div className="absolute inset-0 z-0 w-[500px]">
				<Image
					className="object-center w-full h-full"
					src={empresa?.fondo_login}
					alt={"Homepage background"}
					layout="fill"
				/>
			</div>

			<div className="relative z-10 flex md:flex-row flex-col items-center justify-center w-full h-full">
				<div className="flex items-center justify-center md:justify-start w-full md:w-5/12 h-auto md:h-full">
					<Image
						className="md:w-7/12 w-10/12 max-w-56 md:max-w-80"
						src={empresa?.logo_login}
						alt={"Emmagini Logo"}
						width={896}
						height={408}
					/>
				</div>

				<div className="flex flex-col items-center justify-center md:p-10 p-7 md:w-5/12 w-[80%] max-h-[68%] bg-white rounded-4xl shadow-lg overflow-auto max-w-[540px] rounded-3xl">
					{children}
				</div>
			</div>
		</main>
	);
}

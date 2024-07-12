"use client";

import Image from "next/image";
import { useDataContext } from "@/context/DataProvider";
import NavBar from "@/components/NavBar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { empresa } = useDataContext();

	return (
		<main className="relative min-h-screen max-h-screen w-screen h-screen overscroll-none overflow-hidden">
			<NavBar logo={empresa.logo} />
			<div className="absolute inset-0 z-0">
				<Image
					className="object-center w-full h-full"
					src={empresa?.fondo_login}
					alt={"Homepage background"}
					layout="fill"
				/>
			</div>

			<div className="relative z-10 flex md:flex-row flex-col items-center justify-center w-full h-full">
				<div className="flex flex-col items-center justify-center md:w-5/12 md:h-full w-full h-2/6">
					<Image
						className="md:w-7/12 w-10/12 max-w-56 md:max-w-80"
						src={empresa?.logo_login}
						alt={"Emmagini Logo"}
						width={896}
						height={408}
					/>
				</div>

				<div className="flex flex-col items-center justify-center md:p-10 p-7 md:w-5/12 md:h-[80%] md:max-h-[68%] w-[80%] max-h-[68%] bg-white rounded-4xl shadow-lg overflow-auto max-w-[540px] rounded-3xl">
					{children}
				</div>
			</div>
		</main>
	);
}

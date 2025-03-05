"use client";

import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";
import withAuth from "@/app/withAuth";
import NavBar from "@/components/home/NavBar";
import CardTrivia from "@/components/cards/CardTrivia";
import ButtonNav from "@/components/home/ButtonNav";
import WhileTap from "@/components/animations/WhileTap";
import triviaJulio from "@/utilities/trivia-julio.json";
import triviaAgosto from "@/utilities/trivia-agosto.json";
import triviaSeptiembre from "@/utilities/trivia-septiembre.json";
import triviaOctubre from "@/utilities/trivia-octubre.json";
import triviaNoviembre from "@/utilities/trivia-noviembre.json";
import triviaDiciembre from "@/utilities/trivia-diciembre.json";
import triviaEnero from "@/utilities/trivia-enero.json";
import triviaFebrero from "@/utilities/trivia-febrero.json";
import triviaMarzo from "@/utilities/trivia-marzo.json";
import portadaMarzo from "../../../../public/assets/portada-marzo.jpeg";
import "@/styles/styles.css";

function Page() {
	const { landing, empresa } = useDataContext();
	const router = useRouter();

	const triviaData = [
		{
			title: triviaJulio["trivia julio"].title,
			image: triviaJulio["trivia julio"].image,
			id: triviaJulio["trivia julio"].id,
			description: triviaJulio["trivia julio"].description,
		},
		{
			title: triviaAgosto["trivia agosto"].title,
			image: triviaAgosto["trivia agosto"].image,
			id: triviaAgosto["trivia agosto"].id,
			description: triviaAgosto["trivia agosto"].description,
		},
		{
			title: triviaSeptiembre["trivia septiembre"].title,
			image: triviaSeptiembre["trivia septiembre"].image,
			id: triviaSeptiembre["trivia septiembre"].id,
			description: triviaSeptiembre["trivia septiembre"].description,
		},
		{
			title: triviaOctubre["trivia octubre"].title,
			image: triviaOctubre["trivia octubre"].image,
			id: triviaOctubre["trivia octubre"].id,
			description: triviaOctubre["trivia octubre"].description,
		},
		{
			title: triviaNoviembre["trivia noviembre"].title,
			image: triviaNoviembre["trivia noviembre"].image,
			id: triviaNoviembre["trivia noviembre"].id,
			description: triviaNoviembre["trivia noviembre"].description,
		},
		{
			title: triviaDiciembre["trivia diciembre"].title,
			image: triviaDiciembre["trivia diciembre"].image,
			id: triviaDiciembre["trivia diciembre"].id,
			description: triviaDiciembre["trivia diciembre"].description,
		},
		{
			title: triviaEnero["trivia enero"].title,
			image: triviaEnero["trivia enero"].image,
			id: triviaEnero["trivia enero"].id,
			description: triviaEnero["trivia enero"].description,
		},
		{
			title: triviaFebrero["trivia febrero"].title,
			image: triviaFebrero["trivia febrero"].image,
			id: triviaFebrero["trivia febrero"].id,
			description: triviaFebrero["trivia febrero"].description,
		},
		{
			title: triviaMarzo["trivia marzo"].title,
			image: triviaMarzo["trivia marzo"].image,
			id: triviaMarzo["trivia marzo"].id,
			description: triviaMarzo["trivia marzo"].description,
		},
	];

	if (!landing || landing.length === 0) {
		return (
			<div className="mt-20 text-black">
				<div className="mt-96">
					<section className="dots-container">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</section>
					<h1 className="text-blueEmmagini text-center mt-4 font-semibold">
						CARGANDO
					</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			<NavBar logo={empresa?.logo} />
			<div className="mt-20 container mx-auto sm:px-6 lg:px-8 py-8 mb-32 flex justify-center">
				<div className="w-[700px]">
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-32 mt-6">
						{triviaData.map((trivia, index) => (
							<WhileTap key={index}>
								<div className="flex justify-center">
									<CardTrivia
										onClick={() => router.push(`/trivia/${trivia.id}`)}
										imageCard={trivia.image}
										text={trivia.title}
										description={trivia.description}
									/>
								</div>
							</WhileTap>
						))}
					</div>
				</div>
			</div>
			<ButtonNav />
		</>
	);
}

export default withAuth(Page);

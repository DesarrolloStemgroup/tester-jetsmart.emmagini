"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import CardHome from "@/components/cards/CardHome";
import { useDataContext } from "@/context/DataProvider";
import { Carousel } from "flowbite-react";
import WhileTap from "@/components/animations/WhileTap";
import "@/styles/styles.css";
import "@/app/globals.css";

interface ComponentProps {
	params: {
		idCategoria: string;
		idProducto: string;
		lang: string;
	};
}

export default function Page({
	params: { idCategoria, idProducto, lang },
}: ComponentProps) {
	const { landing, empresa } = useDataContext();
	const router = useRouter();

	const landingData = useMemo(() => landing?.[0], [landing]);

	const product = useMemo(() => {
		if (!landingData?.productos) return null;
		return landingData.productos.find(
			// @ts-ignore
			(productItem) => productItem.id === idProducto
		);
	}, [landingData]);

	const relatedProducts: any[] = useMemo(() => {
		if (!landingData?.productos || !product) return [];
		return landingData.productos.filter(
			// @ts-ignore
			(item) =>
				item.id !== idProducto &&
				(product.rel_1 === item.id ||
					product.rel_2 === item.id ||
					product.rel_3 === item.id)
		);
	}, [landingData, product]);

	const fixImageUrl = (url: string) => {
		if (url?.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	};

	const extractImageUrls = (): string[] => {
		// @ts-ignore
		const imageUrls = [];
		// @ts-ignore
		if (!product) return imageUrls;
		for (let i = 1; i <= 10; i++) {
			const imageUrl = product[`imagen_${i}`];
			if (imageUrl) {
				imageUrls.push(imageUrl);
			}
		}
		return imageUrls;
	};

	const imageUrls = useMemo(extractImageUrls, [product]);

	const handleCardClick = (idCategoria: string, idProducto: string) => {
		router.push(`/${lang}/${idCategoria}/${idProducto}`);
	};

	if (!landing || landing.length === 0) {
		return (
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
		);
	}

	const showCarousel = imageUrls.length > 1;

	return (
		<>
			<NavBar logo={empresa?.logo} />
			<div className="flex justify-center">
				<div className="w-[900px] px-4 sm:px-6 lg:px-8 mt-20 pb-20">
					{landingData?.estructura
						// @ts-ignore
						.filter((item) => item.p === product?.id)
						// @ts-ignore
						.map((item, index) => {
							switch (parseInt(item.c)) {
								case 1:
									return (
										<section
											key={index}
											className="descripcion mt-20"
											dangerouslySetInnerHTML={{ __html: product?.descripcion }}
										></section>
									);
								case 2:
									return (
										product?.video && (
											<section
												key={index}
												className="w-full sm:w-[480px] md:w-[836px] h-[500px] relative mt-6 mx-auto mb-8"
											>
												<video className="" controls>
													<source src={product.video} type="video/mp4" />
												</video>
											</section>
										)
									);
								case 3:
									return (
										product?.audio && (
											<section key={index} className="audio">
												<audio
													className="w-full h-[400px]"
													id="pista_audio"
													controls
												>
													<source src={product.audio} type="audio/mpeg" />
												</audio>
											</section>
										)
									);
								case 4:
									return (
										<section key={index} className="galeria">
											<div className="w-full sm:w-[480px] md:w-[836px] h-[500px] relative mt-6 mx-auto mb-8">
												{showCarousel ? (
													<Carousel>
														{imageUrls.map((url, imgIndex) => (
															<div key={imgIndex} className="h-[400px]">
																<Image
																	src={fixImageUrl(url)}
																	alt={`product image ${imgIndex}`}
																	className="w-full h-full object-cover"
																	layout="fill"
																/>
															</div>
														))}
													</Carousel>
												) : (
													<Image
														src={fixImageUrl(imageUrls[0])}
														alt={`product image 0`}
														className="w-full h-full object-cover"
														layout="fill"
													/>
												)}
											</div>
										</section>
									);
								case 5:
									return (
										<section
											key={index}
											className="contenido"
											dangerouslySetInnerHTML={{ __html: product?.contenido }}
										></section>
									);
								case 6:
									return (
										<section key={index} className="relacionado">
											<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-2">
												{relatedProducts.map((relatedProduct, relatedIndex) => (
													<WhileTap key={relatedIndex}>
														<div className="flex justify-center">
															<CardHome
																text={relatedProduct.titulo}
																imageCard={
																	fixImageUrl(relatedProduct.imagen_1) ||
																	fixImageUrl(relatedProduct.imagen_0) ||
																	fixImageUrl(relatedProduct.imagen) ||
																	fixImageUrl(relatedProduct.image)
																}
																onClick={() =>
																	handleCardClick(
																		relatedProduct.id_categoria,
																		relatedProduct.id
																	)
																}
															/>
														</div>
													</WhileTap>
												))}
											</div>
										</section>
									);
								default:
									return null;
							}
						})}
				</div>
			</div>
		</>
	);
}

/*

case 1:
									return (
										<section
											key={index}
											className="titulo"
											style={{ color: landing?.text_color_1 }}
										>
											{product?.titulo}
										</section>
									);


									*/

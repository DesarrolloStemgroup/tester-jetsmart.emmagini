"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/context/AuthProvider";
import { useDataContext } from "@/context/DataProvider";
import ButtonNav from "@/components/home/ButtonNav";
import { RoundButton } from "@/components/buttons/RoundButton";
import Modal from "@/components/extras/Modal";
import NavBar from "@/components/home/NavBar";
import "@/styles/styles.css";

interface ComponentProps {
	params: {
		idTrivia: string;
	};
}

function Trivia({ params: { idTrivia } }: ComponentProps) {
	const router = useRouter();
	const { token, userId } = useAuthContext();
	const { empresa } = useDataContext();
	const [loading, setLoading] = useState(true);
	const [isAnswerLoading, setIsAnswerLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState({ text: "", image: "" });

	const [videoData, setVideoData] = useState({
		es_trivia: false,
		id_video: "",
		id: "",
		error: 0,
		mensaje: "",
		modo: "",
		monedas: "",
		monedas_2: "",
		preguntas: [],
		time: "",
		url: "",
	});

	const getValidateData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/validate",
				{
					callback: `https://demo5.emmagini.com/home.php#v=album&id=${idTrivia}`,
					token: token,
					userid: userId,
					host: "demo5.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud de validación:", error);
			throw error;
		}
	}, [token, userId, idTrivia]);

	const getAlbumData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/get_album",
				{
					token: token,
					userid: userId,
					id: idTrivia,
					host: "demo5.emmagini.com",
					callback: "https://demo5.emmagini.com/home.php#v=inicio",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud del álbum:", error);
			throw error;
		}
	}, [token, userId, idTrivia]);

	const getVideoData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/get_video",
				{
					token: token,
					userid: userId,
					id: idTrivia,
					host: "demo5.emmagini.com",
					callback: "https://demo5.emmagini.com/home.php#v=inicio",
					lang: "es",
					trivia: "1",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud del video:", error);
			throw error;
		}
	}, [token, userId, idTrivia]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);

			const [validateResponse, albumResponse, videoResponse] =
				await Promise.all([getValidateData(), getAlbumData(), getVideoData()]);

			setVideoData(videoResponse);
			setLoading(false);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			setLoading(false);
		}
	}, [getValidateData, getAlbumData, getVideoData]);

	useEffect(() => {
		if (token && userId) {
			fetchData();
		}
	}, [fetchData, token, userId]);

	const fixImageUrl = (url: string) => {
		if (url?.startsWith("//")) {
			return `https:${url}`;
		}
		return url;
	};

	const getAnswerData = useCallback(
		async (preguntaId: string, respuestaId: string) => {
			setIsAnswerLoading(true);

			try {
				const requestBody: { [key: string]: any } = {
					id_album: idTrivia,
					id_video: videoData.id,
					sequencia: "0",
					host: "demo5.emmagini.com",
					lang: "es",
					trivia: "true",
					callback: `https://demo5.emmagini.com/home.php#v=album&id=${idTrivia}`,
					token: token,
					userid: userId,
				};
				requestBody[preguntaId] = respuestaId;

				const response = await axios.post(
					"https://backend.emmagini.com/api2/ans_video",
					requestBody,
					{
						headers: {
							"Content-Type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
					}
				);

				const { mensaje } = response.data;
				const isWrongAnswer = mensaje === "respuesta equivocada";
				const modalImage = isWrongAnswer
					? fixImageUrl(empresa.bootbox_nook_image)
					: fixImageUrl(empresa.bootbox_ok_image);
				const modalText = isWrongAnswer ? `Opppss! ${mensaje}` : mensaje;

				setModalData({
					image: modalImage,
					text: modalText,
				});
				setIsAnswerLoading(false);
				setModalOpen(true);

				return response.data;
			} catch (error) {
				console.error("Error al hacer la solicitud del video:", error);
				setIsAnswerLoading(false);
				throw error;
			}
		},
		[token, userId, idTrivia, videoData, empresa]
	);

	const handleAnswerClick = (preguntaId: string, respuestaId: string) => {
		getAnswerData(preguntaId, respuestaId);
	};

	const handleCardClick = () => {
		router.back();
	};

	const handleModalClose = useCallback(async () => {
		const videoResponse = await getVideoData();
		setVideoData(videoResponse);
		setModalOpen(false);
	}, [getVideoData, setVideoData, setModalOpen]);

	if (loading || !videoData.id) {
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

	if (isAnswerLoading) {
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
						Verificando respuesta
					</h1>
				</div>
			</div>
		);
	}

	return (
		<>
			<NavBar logo={empresa.logo} showButton={false} />
			<div className="flex flex-col lg:flex-row gap-10 pt-20 w-full max-w-[1300px] lg:h-screen overflow-hidden p-6 items-center mx-auto mt-6 pb-[190px]">
				<div className="flex flex-col lg:gap-5 w-full lg:w-[705px]">
					<Image
						// @ts-ignore
						src={fixImageUrl(videoData.url)}
						alt="Video Thumbnail"
						className="mx-auto"
						width={400}
						height={500}
					/>
				</div>
				<div className="w-full lg:w-[537px] md:h-[542px] flex flex-col gap-5 pb-[80px]">
					{videoData.preguntas && videoData.preguntas.length > 0
						? videoData.preguntas.map((pregunta: any, index: any) => (
								<div
									key={index}
									className="h-full flex flex-col justify-center items-center "
								>
									<h2 key={index} className="text-xl text-center mb-6">
										{pregunta.texto}
									</h2>

									{pregunta.respuestas.map((respuesta: any, index: any) => (
										<RoundButton
											buttonClassName="w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300 mb-6"
											text={respuesta.texto}
											key={index}
											onClick={() => {
												handleAnswerClick(pregunta.id, respuesta.id);
											}}
										/>
									))}
								</div>
						  ))
						: null}
				</div>
				<Modal
					text={modalData.text}
					isOpen={modalOpen}
					textButton="Siguiente"
					onClick={handleModalClose}
					image={modalData.image}
				/>
			</div>
			<ButtonNav />
		</>
	);
}

export default Trivia;

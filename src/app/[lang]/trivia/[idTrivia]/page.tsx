"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import withAuth from "@/app/withAuth";
import { useDataContext } from "@/context/DataProvider";
import ButtonNav from "@/components/home/ButtonNav";
import { RoundButton } from "@/components/buttons/RoundButton";
import triviaJulio from "@/utilities/trivia-julio.json";
import triviaAgosto from "@/utilities/trivia-agosto.json";
import triviaSeptiembre from "@/utilities/trivia-septiembre.json";
import triviaOctubre from "@/utilities/trivia-octubre.json";
import triviaNoviembre from "@/utilities/trivia-noviembre.json";
import triviaDiciembre from "@/utilities/trivia-diciembre.json";
import triviaEnero from "@/utilities/trivia-enero.json";
import triviaFebrero from "@/utilities/trivia-febrero.json";
import triviaMarzo from "@/utilities/trivia-marzo.json";
import { FaInstagram } from "react-icons/fa";
import "@/styles/styles.css";

interface ComponentProps {
	params: {
		lang: string;
		idTrivia: string;
	};
}

function Trivia({ params: { lang, idTrivia } }: ComponentProps) {
	const router = useRouter();

	const { empresa } = useDataContext();

	const [triviaData, setTriviaData] = useState<any>(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
	const [correctOptionId, setCorrectOptionId] = useState<string | null>(null);
	const [answered, setAnswered] = useState<boolean>(false);
	const [correctAnswers, setCorrectAnswers] = useState<number>(0);
	const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
	const [quizFinished, setQuizFinished] = useState<boolean>(false);

	useEffect(() => {
		const triviaMap: any = {
			julio: triviaJulio["trivia julio"],
			agosto: triviaAgosto["trivia agosto"],
			septiembre: triviaSeptiembre["trivia septiembre"],
			octubre: triviaOctubre["trivia octubre"],
			noviembre: triviaNoviembre["trivia noviembre"],
			diciembre: triviaDiciembre["trivia diciembre"],
			enero: triviaEnero["trivia enero"],
			febrero: triviaFebrero["trivia febrero"],
			marzo: triviaMarzo["trivia marzo"],
		};

		const selectedTrivia = triviaMap[idTrivia];
		if (selectedTrivia) {
			setTriviaData(selectedTrivia);
		} else {
			console.error("Trivia no encontrada");
			router.push("/");
		}
	}, [idTrivia, router]);

	const handleOptionClick = (optionId: string, isCorrect: boolean) => {
		if (answered) return;

		setSelectedOptionId(optionId);
		setCorrectOptionId(
			currentQuestion.options.find((option: any) => option.correct)?.id
		);

		if (isCorrect) {
			setCorrectAnswers((prev) => prev + 1);
		} else {
			setIncorrectAnswers((prev) => prev + 1);
		}

		setAnswered(true);
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => {
			const newIndex = prevIndex + 1;
			if (newIndex >= triviaData.questions.length) {
				setQuizFinished(true);
				return prevIndex;
			}
			return newIndex;
		});
		setSelectedOptionId(null);
		setCorrectOptionId(null);
		setAnswered(false);
	};

	if (!triviaData) {
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

	const currentQuestion = triviaData.questions[currentQuestionIndex];

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1300px] lg:h-screen overflow-hidden items-center mx-auto pb-[190px] mt-24">
				<div className="flex flex-col lg:gap-5 w-full lg:w-[705px]">
					<Link href={currentQuestion.link} target="_blank">
						<Image
							src={currentQuestion.image}
							alt="Pregunta"
							className="mx-auto max-h-[550px]"
							width={500}
							height={600}
						/>
					</Link>
				</div>
				<div className="w-full lg:w-[537px] md:h-[742px] flex flex-col gap-5 pb-[80px]">
					{quizFinished ? (
						<div className="flex flex-col items-center lg:mt-20">
							<p className="text-base md:text-xl text-center  md:mb-6 lg:mt-10 font-bold">
								Ya CASI estás participando!
							</p>
							<p className=" text-base md:text-lg">
								{" "}
								<br></br>¡Solamente debes seguir los pasos en la publicación del
								concurso en nuestra cuenta de instagram!:{" "}
							</p>
							<Link
								href="https://www.instagram.com/deviajetravel"
								className="text-blueEmmagini text-lg flex items-center mt-6"
								target="_blank"
							>
								<FaInstagram size={18} className="text-black mr-2" />
								<span className="text-base md:text-xl">@deviajetravel</span>
							</Link>
							<br></br>
							¡Donde además podrás conocer al ganador!
							<h2 className=" text-base md:text-xl text-center mb-4 font-bold md:mt-6">
								Resultados
							</h2>
							<p className=" text-base md:text-lg mb-4">
								Respuestas Correctas: {correctAnswers}
							</p>
							<p className=" text-base md:text-lg mb-4">
								Respuestas Incorrectas: {incorrectAnswers}
							</p>
							<RoundButton
								buttonClassName="w-full h-[48px] bg-blueEmmagini rounded-[50px] border-2 border-gray-300 mb-6 text-white"
								text="Volver"
								onClick={() => router.push(`/${lang}/trivia/`)}
							/>
						</div>
					) : (
						<>
							{currentQuestion && (
								<div className="h-full flex flex-col justify-center items-center h-auto">
									<h2 className="text-xl text-center mb-6 mt-4">
										{currentQuestion.question}
									</h2>

									{currentQuestion.options.map((option: any) => {
										let buttonClassName =
											"w-full h-[48px] bg-white rounded-[50px] border-2 border-gray-300 mb-6 p-4";

										if (answered) {
											if (option.id === correctOptionId) {
												buttonClassName =
													"w-full h-[48px] bg-green-500 rounded-[50px] border-2 border-gray-300 mb-6 text-white p-4";
											} else if (option.id === selectedOptionId) {
												buttonClassName =
													"w-full h-[48px] bg-red-500 rounded-[50px] border-2 border-gray-300 mb-6 text-white p-4";
											}
										}

										return (
											<RoundButton
												id={`${currentQuestion.id}-${option.id}`}
												buttonClassName={buttonClassName}
												text={option.text}
												key={option.id}
												onClick={() =>
													handleOptionClick(option.id, option.correct)
												}
												// @ts-ignore
												disabled={answered}
											/>
										);
									})}
								</div>
							)}
							<RoundButton
								buttonClassName="w-full h-[48px] bg-blueEmmagini rounded-[50px] border-2 border-gray-300 text-white"
								text="Siguiente"
								onClick={handleNextQuestion}
								// @ts-ignore
								disabled={!answered}
							/>
						</>
					)}
				</div>
			</div>
			<ButtonNav />
		</>
	);
}

export default withAuth(Trivia);

// codigo para traer la trivia desde el back

/*"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/context/AuthProvider";
import { useDataContext } from "@/context/DataProvider";
import withAuth from "@/app/withAuth";
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
	const [validateData, setValidateData] = useState();
	const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
	const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(0);
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
					callback: `https://demo9.emmagini.com/home.php#v=album&id=${idTrivia}`,
					token: token,
					userid: userId,
					host: "demo9.emmagini.com",
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setValidateData(response.data);

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
					id: "64776728-d5a0-11ee-a304-111c596b0bf7",
					host: "demo9.emmagini.com",
					callback: "https://demo9.emmagini.com/home.php#v=inicio",
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
					id: "64776728-d5a0-11ee-a304-111c596b0bf7",
					host: "demo9.emmagini.com",
					callback: "https://demo9.emmagini.com/home.php#v=inicio",
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
					id_album: "64776728-d5a0-11ee-a304-111c596b0bf7",
					id_video: videoData.id,
					sequencia: "0",
					host: "demo9.emmagini.com",
					lang: "es",
					trivia: "true",
					callback: `https://demo9.emmagini.com/home.php#v=album&id=${idTrivia}`,
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
				const modalText = isWrongAnswer
					? `Opppss! ${mensaje}`
					: "Felicidades! Has respondido correctamente";

				if (isWrongAnswer) {
					setRespuestasIncorrectas((prev) => prev + 1);
				} else {
					setRespuestasCorrectas((prev) => prev + 1);
				}

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
			<NavBar logo={empresa.logo} showCoins={false} />
			<h4 className="hidden md:block mt-[100px] text-center align-middle">
				Sesión actual: Respuesta correctas: {respuestasCorrectas}- Respuestas
				incorrectas: {respuestasIncorrectas}
			</h4>
			<h4 className="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden mt-[100px] text-center align-middle">
				Sesión actual: <br /> Respuesta correctas: {respuestasCorrectas} <br />
				Respuestas incorrectas: {respuestasIncorrectas}
			</h4>

			<div className="flex flex-col lg:flex-row gap-10  w-full max-w-[1300px] lg:h-screen overflow-hidden p-2 items-center mx-auto  pb-[190px]">
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
											id={`${pregunta.id}-${respuesta.id}`} // Agrega esta línea
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
					<RoundButton
						buttonClassName="w-full h-[48px] bg-blueEmmagini rounded-[50px] border-2 border-gray-300 mb-6 text-white "
						text={"Siguiente"}
						onClick={() => {
							handleModalClose();
						}}
					/>
				</div>
				{
					<Modal
						text={modalData.text}
						isOpen={modalOpen}
						textButton="Siguiente"
						onClick={handleModalClose}
						image={modalData.image}
					/>
				}
			</div>
			<ButtonNav />
		</>
	);
}

export default withAuth(Trivia);*/

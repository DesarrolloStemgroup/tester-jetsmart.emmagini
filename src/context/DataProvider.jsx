"use client";

import {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState();
	const [empresa, setEmpresa] = useState();
	const [landing, setLanding] = useState();
	const [language, setLanguage] = useState();

	const getAppData = useCallback(async () => {
		const isEsLa = language === "es-la";
		const callbackUrl = isEsLa
			? "https://demo5.emmagini.com/landing.php#"
			: "https://demo6.emmagini.com/landing.php#";
		const hostUrl = isEsLa ? "demo5.emmagini.com" : "demo6.emmagini.com";

		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/pulldata",
				{
					callback: callbackUrl,
					host: hostUrl,
					lang: "es",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
				}
			);

			setData(response.data);
			setEmpresa(response.data.empresa);
			setLanding(response.data.landing);

			return response.data;
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);

			throw error;
		}
	}, [language]);

	useEffect(() => {
		getAppData();
	}, [getAppData]);

	useEffect(() => {
		console.log("lenguaje", language);
	}, [language]);

	/*console.log("data", data);
		console.log("empresa", empresa);*/

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
				empresa,
				setEmpresa,
				landing,
				setLanding,
				language,
				setLanguage,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);

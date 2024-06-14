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

	const getAppData = useCallback(async () => {
		try {
			const response = await axios.post(
				"https://backend.emmagini.com/api2/pulldata",
				{
					callback: "https://demo6.emmagini.com/landing.php#",
					host: "demo6.emmagini.com",
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
	}, []);

	useEffect(() => {
		getAppData();
	}, [getAppData]);

	useEffect(() => {
		console.log("data", data);
		console.log("empresa", empresa);
	}, [data]);

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
				empresa,
				setEmpresa,
				landing,
				setLanding,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);

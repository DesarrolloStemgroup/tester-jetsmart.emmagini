"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDataContext } from "@/context/DataProvider";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { lang } = useParams();
	const { setLanguage } = useDataContext();

	useEffect(() => {
		if (lang) {
			setLanguage(lang);
		}
	}, [lang, setLanguage]);

	return children;
}

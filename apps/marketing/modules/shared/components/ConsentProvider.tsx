"use client";

import { setCookie } from "@repo/utils";
import { createContext, useState } from "react";

export const ConsentContext = createContext<{
	userHasConsented: boolean;
	allowCookies: () => void;
	declineCookies: () => void;
}>({
	userHasConsented: false,
	allowCookies: () => {},
	declineCookies: () => {},
});

export function ConsentProvider({
	children,
	initialConsent,
}: {
	children: React.ReactNode;
	initialConsent?: boolean;
}) {
	const [userHasConsented, setUserHasConsented] = useState(!!initialConsent);

	const allowCookies = () => {
		setCookie("consent", "true", { expiresInDays: 30 });
		setUserHasConsented(true);
	};

	const declineCookies = () => {
		setCookie("consent", "false", { expiresInDays: 30 });
		setUserHasConsented(false);
	};

	return (
		<ConsentContext.Provider value={{ userHasConsented, allowCookies, declineCookies }}>
			{children}
		</ConsentContext.Provider>
	);
}

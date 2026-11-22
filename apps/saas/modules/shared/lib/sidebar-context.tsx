"use client";

import { getCookie, setCookie } from "@repo/utils";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const SIDEBAR_COLLAPSED_COOKIE = "sidebar-collapsed";

interface SidebarContextValue {
	isCollapsed: boolean;
	setIsCollapsed: (collapsed: boolean) => void;
	toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	useEffect(() => {
		// Read from cookie on mount
		const cookieValue = getCookie(SIDEBAR_COLLAPSED_COOKIE);
		if (cookieValue !== undefined) {
			setIsCollapsed(cookieValue === "true");
		}
	}, []);

	const handleSetIsCollapsed = (collapsed: boolean) => {
		setIsCollapsed(collapsed);
		setCookie(SIDEBAR_COLLAPSED_COOKIE, collapsed ? "true" : "false", {
			expiresInDays: 365,
		});
	};

	const handleToggleCollapsed = () => {
		const newValue = !isCollapsed;
		setIsCollapsed(newValue);
		setCookie(SIDEBAR_COLLAPSED_COOKIE, newValue ? "true" : "false", {
			expiresInDays: 365,
		});
	};

	return (
		<SidebarContext.Provider
			value={{
				isCollapsed,
				setIsCollapsed: handleSetIsCollapsed,
				toggleCollapsed: handleToggleCollapsed,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
}

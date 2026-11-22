export function parseCookies(cookieHeader: string | null | undefined): Record<string, string> {
	const cookies: Record<string, string> = {};

	for (const part of (cookieHeader ?? "").split(";")) {
		const separatorIndex = part.indexOf("=");
		if (separatorIndex === -1) {
			continue;
		}

		const name = part.slice(0, separatorIndex).trim();
		if (!name || name in cookies) {
			continue;
		}

		const value = part
			.slice(separatorIndex + 1)
			.trim()
			.replace(/^"(.*)"$/, "$1");

		try {
			cookies[name] = decodeURIComponent(value);
		} catch {
			cookies[name] = value;
		}
	}

	return cookies;
}

export function getCookie(name: string): string | undefined {
	if (typeof document === "undefined") {
		return undefined;
	}

	return parseCookies(document.cookie)[name];
}

export function setCookie(
	name: string,
	value: string,
	{ expiresInDays, path = "/" }: { expiresInDays?: number; path?: string } = {},
) {
	let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;

	if (expiresInDays !== undefined) {
		const expires = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
		cookie += `; expires=${expires.toUTCString()}`;
	}

	document.cookie = cookie;
}

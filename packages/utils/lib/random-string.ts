const LOWERCASE_ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length: number, alphabet = LOWERCASE_ALPHANUMERIC) {
	// Reject bytes above the largest multiple of the alphabet size to avoid modulo bias.
	const maxUnbiasedByte = 256 - (256 % alphabet.length);
	let result = "";

	while (result.length < length) {
		for (const byte of crypto.getRandomValues(new Uint8Array(length))) {
			if (byte < maxUnbiasedByte && result.length < length) {
				result += alphabet[byte % alphabet.length];
			}
		}
	}

	return result;
}

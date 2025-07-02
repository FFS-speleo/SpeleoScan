export const base64ToUtf8 = (base64: string): string => {
  const binaryString = atob(base64);
  const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const utf8ToBase64 = (utf8: string): string => {
  const bytes = new TextEncoder().encode(utf8);
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
};

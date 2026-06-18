/*
  Turns a gift (the chosen gifts + the note) into a short text "code"
  that we can put in the website link, and back again.

  This is how the whole gift travels inside the URL — no database needed!
  You normally won't need to edit this file.
*/

// Make base64 safe for emojis / accents (handles all unicode characters)
function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  // URL-friendly base64 (no +, /, or = which break links)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64ToBytes(b64) {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// gift = { gifts: ["teddy", "candy"], note: "..." }
export function encodeGift(gift) {
  try {
    const json = JSON.stringify({ g: gift.gifts || [], n: gift.note || "" });
    const bytes = new TextEncoder().encode(json);
    return bytesToBase64(bytes);
  } catch {
    return "";
  }
}

export function decodeGift(code) {
  try {
    const bytes = base64ToBytes(code);
    const json = new TextDecoder().decode(bytes);
    const data = JSON.parse(json);
    return { gifts: data.g || [], note: data.n || "" };
  } catch {
    return null;
  }
}

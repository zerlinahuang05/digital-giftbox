// URL-safe base64 encode/decode used by the share & open pages.
// No need to edit this file.

export type GiftPayload = {
  gifts: string[]; // array of gift IDs the sender packed
  note: string; // the letter the sender wrote
};

export function encodePayload(payload: GiftPayload): string {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

export function decodePayload(encoded: string): GiftPayload {
  if (!encoded) return { gifts: [], note: "" };
  try {
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(normalized + padding);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Partial<GiftPayload>;
    return {
      gifts: Array.isArray(parsed.gifts) ? parsed.gifts : [],
      note: typeof parsed.note === "string" ? parsed.note : "",
    };
  } catch {
    return { gifts: [], note: "" };
  }
}

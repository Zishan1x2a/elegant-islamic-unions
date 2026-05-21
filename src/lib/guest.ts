// Personalization: parse ?token= base64 JSON guest payload.
// Example: ?token=eyJuYW1lIjoiQWhtYWQiLCJob25vcmlmaWMiOiJKaSIsIm5pa2FoQWNjZXNzIjp0cnVlfQ==

export type Guest = {
  name: string;
  honorific: string;
  nikahAccess: boolean;
};

const DEFAULT_GUEST: Guest = {
  name: "Ahmad",
  honorific: "Ji",
  nikahAccess: true,
};

export function readGuestFromUrl(): Guest {
  if (typeof window === "undefined") return DEFAULT_GUEST;
  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return DEFAULT_GUEST;
    const json = atob(token);
    const parsed = JSON.parse(json);
    return {
      name: parsed.name ?? DEFAULT_GUEST.name,
      honorific: parsed.honorific ?? DEFAULT_GUEST.honorific,
      nikahAccess:
        typeof parsed.nikahAccess === "boolean"
          ? parsed.nikahAccess
          : DEFAULT_GUEST.nikahAccess,
    };
  } catch {
    return DEFAULT_GUEST;
  }
}

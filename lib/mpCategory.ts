export const MP_CATEGORY_DEFAULT = "others"

const DEFAULT_MAP: Record<string, string> = {
  teclados: "electronics",
  ratones: "electronics",
  keyboard: "electronics",
  keyboards: "electronics",
  mouse: "electronics",
  mice: "electronics",
}

function readEnvMap(): Record<string, string> {
  try {
    const raw = process.env.MP_CATEGORY_MAP_JSON
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === "object") return parsed as Record<string, string>
  } catch {
    // ignore
  }
  return {}
}

export function mapMpCategoryId(input?: string | null): string {
  const value = String(input ?? "").trim()
  if (!value) return MP_CATEGORY_DEFAULT

  // Preserve MercadoLibre category ids or already valid strings
  if (/^ML[A-Z]?\d+/i.test(value)) return value

  const key = value.toLowerCase()
  const envMap = readEnvMap()

  return envMap[key] ?? DEFAULT_MAP[key] ?? value
}

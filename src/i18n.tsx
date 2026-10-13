import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "en" | "es"
export type L = { en: string; es: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (v: L) => string }

const LangContext = createContext<Ctx | null>(null)

// Idioma inicial: el que la persona eligió antes; si no hay, el primer idioma de su navegador
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("lang")
    if (saved === "es" || saved === "en") return saved
  } catch {}
  const browser = (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase()
  return browser.startsWith("es") ? "es" : "en"
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang)

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch {}
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, tr: (v) => v[lang] }}>{children}</LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LangProvider")
  return ctx
}
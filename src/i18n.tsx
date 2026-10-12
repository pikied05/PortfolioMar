import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "en" | "es"
export type L = { en: string; es: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (v: L) => string }

const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") === "es" ? "es" : "en"))

  useEffect(() => {
    localStorage.setItem("lang", lang)
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

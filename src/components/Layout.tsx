import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"
import { useLang } from "../i18n"
import { ui } from "../content"
import Sidebar, { type HomeSection } from "./Sidebar"

export default function Layout() {
  const { pathname, hash } = useLocation()
  const { lang, setLang, tr } = useLang()
  const isHome = pathname === "/"
  const [pastHero, setPastHero] = useState(false)
  const [homeSection, setHomeSection] = useState<HomeSection>("home")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname, hash])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
      if (!isHome) return
      const hero = document.getElementById("hero")
      const h = hero ? hero.offsetHeight : window.innerHeight
      setPastHero(window.scrollY > h * 0.6)
      const line = window.innerHeight * 0.5
      const projTop = document.getElementById("projects-preview")?.getBoundingClientRect().top ?? Infinity
      const aboutTop = document.getElementById("about")?.getBoundingClientRect().top ?? Infinity
      setHomeSection(projTop < line ? "projects" : aboutTop < line ? "about" : "home")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [isHome])

  const sidebarVisible = !isHome || pastHero

  return (
    <div className="relative min-h-screen">
      <header className={`absolute inset-x-0 top-0 z-30 flex h-[86px] items-center justify-between px-[22px] text-[12px] max-md:gap-3 max-md:px-4 ${isHome ? "" : "md:pl-[100px]"}`}>
        <div className="leading-tight">
          <p>{tr(ui.designPortfolio)}</p>
          <p>Mar Loa</p>
        </div>
        <div className="absolute left-1/2 flex h-[50px] w-[179px] -translate-x-1/2 items-center justify-center bg-fog max-md:static max-md:h-[40px] max-md:w-auto max-md:translate-x-0 max-md:px-1">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-2 transition-opacity hover:opacity-60 ${lang === "en" ? "font-medium underline underline-offset-4" : ""}`}
          >
            English
          </button>
          <span aria-hidden>|</span>
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-2 transition-opacity hover:opacity-60 ${lang === "es" ? "font-medium underline underline-offset-4" : ""}`}
          >
            Español
          </button>
        </div>
        <p className="max-md:hidden">2025 || 2026</p>
      </header>

      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-ink"
        style={{ transform: `scaleX(${progress})` }}
      />
      <Sidebar visible={sidebarVisible} homeSection={homeSection} />

      <main className={isHome ? "" : "pb-24 md:pl-[74px] md:pb-0"}>
        <div key={pathname} className="animate-page">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

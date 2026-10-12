import { Link, useLocation } from "react-router"
import { useLang } from "../i18n"
import { ui } from "../content"

export type HomeSection = "home" | "about" | "projects"

export default function Sidebar({ visible, homeSection }: { visible: boolean; homeSection: HomeSection }) {
  const { tr, lang, setLang } = useLang()
  const { pathname } = useLocation()
  const onHome = pathname === "/"

  const items = [
    { to: "/", label: ui.home, active: onHome && homeSection === "home" },
    { to: "/contact", label: ui.contact, active: pathname === "/contact" },
    { to: "/#about", label: ui.about, active: onHome && homeSection === "about" },
    {
      to: "/projects",
      label: ui.projects,
      active: (onHome && homeSection === "projects") || pathname.startsWith("/projects") || pathname.startsWith("/work"),
    },
  ]

  return (
    <nav
      aria-label="Main"
      className={`fixed z-40 bg-white/90 backdrop-blur transition-all duration-500
        max-md:inset-x-0 max-md:bottom-0 max-md:flex max-md:items-center max-md:justify-around max-md:border-t max-md:border-black/10 max-md:px-1 max-md:pb-[max(0.5rem,env(safe-area-inset-bottom))] max-md:pt-2
        md:left-0 md:top-0 md:flex md:h-screen md:w-[74px] md:flex-col md:items-center md:justify-center md:gap-[clamp(14px,3vh,36px)]
        ${visible ? "translate-x-0 translate-y-0 opacity-100" : "pointer-events-none opacity-0 max-md:translate-y-full md:-translate-x-full"}`}
    >
      {items.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          aria-current={it.active ? "page" : undefined}
          onClick={() => {
            if (!onHome) return
            if (it.to === "/") window.scrollTo({ top: 0, behavior: "smooth" })
            if (it.to === "/#about") document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
          style={{ ["--len" as string]: tr(it.label).length }}
          className={`relative rounded-full text-[13px] font-medium transition-all duration-300 active:scale-90
            max-md:px-2.5 max-md:py-2 max-md:text-[11px] max-md:tracking-normal
            md:block md:h-[calc(var(--len)*0.72em+1.4em)] md:w-[2em] md:text-[clamp(13px,2.4vh,20px)]
            ${it.active ? "bg-ink text-white" : "hover:bg-fog"}`}
        >
          <span className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:-rotate-90 md:whitespace-nowrap">
            {tr(it.label)}
          </span>
        </Link>
      ))}
      <button
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className="text-[12px] font-medium opacity-70 hover:opacity-100 md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2"
        aria-label="Switch language"
      >
        {lang === "en" ? "ES" : "EN"}
      </button>
    </nav>
  )
}

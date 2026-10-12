import { useEffect, useRef, type CSSProperties } from "react"
import { Link } from "react-router"
import { useLang } from "../i18n"
import { categories, heroLines, projects, ui } from "../content"
import SectionBar from "../components/SectionBar"
import ProjectCard from "../components/ProjectCard"
import Reveal from "../components/Reveal"

const featured = [...projects].sort((a, b) => b.year - a.year).slice(0, 4)

const adobe = ["Au", "Id", "Ae", "Pr", "Ai", "Ps"]
const webSkills = ["WordPress", "Wix", "React", "CSS"]

function FigmaMark() {
  return (
    <svg width="18" height="27" viewBox="0 0 24 36" fill="#fff" aria-hidden>
      <path d="M6 0h6v12H6a6 6 0 0 1 0-12z" />
      <path d="M12 0h6a6 6 0 0 1 0 12h-6z" />
      <path d="M6 12h6v12H6a6 6 0 0 1 0-12z" />
      <circle cx="18" cy="18" r="6" />
      <path d="M6 24h6v6a6 6 0 1 1-6-6z" />
    </svg>
  )
}

const layer = (mx: number, sy: number): CSSProperties => ({
  transform: `translate3d(calc(var(--mx) * ${mx}px), calc(var(--my) * ${mx}px + var(--sy) * ${sy}px), 0)`,
  willChange: "transform",
})

function DownArrow({ className }: { className: string }) {
  return (
    <button
      aria-label="Hello"
      onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      className={`absolute z-10 -translate-x-1/2 transition-transform hover:translate-y-1 ${className}`}
    >
      <div className="flex h-[44px] w-[30px] items-center justify-center">
        <div className="rotate-90">
          <div className="relative h-0 w-[44px]">
            <div className="absolute inset-[-14.73px_-4.55%_-14.73px_0]">
              <img alt="" className="block size-full max-w-none" src="/assets/4481e.svg" />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function Hero() {
  const { tr } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const setScroll = () => {
      raf = 0
      const h = el.offsetHeight || 1
      el.style.setProperty("--sy", String(Math.min(Math.max(window.scrollY / h, 0), 1.2)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(setScroll)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5))
      el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5))
    }
    const onLeave = () => {
      el.style.setProperty("--mx", "0")
      el.style.setProperty("--my", "0")
    }
    setScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("scroll", onScroll)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0, ["--sy" as string]: 0 }}
      className="relative overflow-hidden bg-stone"
    >
      <div className="relative mx-auto hidden aspect-[1440/1024] w-full max-w-[1920px] [container-type:inline-size] md:block">
        <h1 className="sr-only">Design | Development Portfolio 2026</h1>
        <p
          aria-hidden
          style={layer(10, -140)}
          className="font-display absolute left-[49.4%] top-[32.9%] w-[75%] -translate-x-1/2 -translate-y-1/2 text-center text-[8.89cqw] leading-[1.05]"
        >
          DESIGN |<br />
          DEVELOPMENT
        </p>
        <p
          aria-hidden
          style={layer(-8, -60)}
          className="absolute left-[49.8%] top-[53.8%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[13.89cqw] leading-none"
        >
          PorTfoLio
        </p>
        <div
          style={layer(24, 50)}
          className="absolute left-[36.1%] top-[57%] h-[14.75%] w-[27.3%]"
        >
          <div className="group relative grid size-full place-items-center transition-transform duration-500 hover:scale-105 hover:rotate-[-3deg]">
            <img alt="" src="/assets/0cb85.svg" className="absolute inset-0 size-full max-w-none" />
            <span className="font-display relative translate-y-[2%] text-[6.67cqw] leading-none">2026</span>
          </div>
        </div>

        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/work/${c.slug}`}
            style={{ left: `${c.left}%`, top: `${c.top}%` }}
            className="font-display group absolute -translate-x-1/2 -translate-y-1/2 text-center text-[2.22cqw] leading-[1.35] w-max max-w-[16cqw] transition-transform duration-300 hover:scale-110"
          >
            {(heroLines[c.slug] ?? [c.label]).map((line, i) => (
              <span key={i} className="block group-hover:underline group-hover:underline-offset-4">
                {tr(line)}
              </span>
            ))}
          </Link>
        ))}

        <DownArrow className="left-[13.1%] top-[92.9%]" />
        <DownArrow className="left-[50%] top-[92.9%]" />
        <DownArrow className="left-[86.9%] top-[92.9%]" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 pb-24 pt-28 text-center md:hidden">
        <p className="font-display text-[32px] leading-tight">
          DESIGN |<br />
          DEVELOPMENT
        </p>
        <p className="text-[18vw] leading-none">PorTfoLio</p>
        <p className="font-display rounded-[50%] bg-fog px-10 py-5 text-[28px]">2026</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {categories.map((c) => (
            <Link key={c.slug} to={`/work/${c.slug}`} className="font-display text-[14px] underline-offset-4 hover:underline">
              {tr(c.label)}
            </Link>
          ))}
        </div>
        <button
          aria-label="Hello"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-4 text-[40px]"
        >
          ↓
        </button>
      </div>
    </section>
  )
}

function About() {
  const { tr } = useLang()
  return (
    <section id="about" className="mx-auto max-w-[1440px] scroll-mt-0 px-6 pb-24 pt-10 md:pl-[110px] md:pr-12 md:pt-24">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-10">
        <Reveal from="left" className="md:-ml-8">
          <img
            alt="Mar Loa illustration"
            src="/assets/c07cd.png"
            loading="lazy"
            decoding="async"
            className="animate-float mx-auto aspect-square w-full max-w-[676px] object-cover"
          />
        </Reveal>
        <div>
          <Reveal from="scale">
            <h2 className="font-display mb-10 text-center text-[clamp(48px,8.9vw,128px)] leading-none tracking-[0.21em] md:mb-12">
              {tr(ui.hello)}
            </h2>
          </Reveal>
          <div className="max-w-[722px] space-y-[30px] text-[18px] font-medium leading-[30px] md:text-[20px]">
            <Reveal delay={100}><p>{tr(ui.bio1)}</p></Reveal>
            <Reveal delay={200}><p>{tr(ui.bio2)}</p></Reveal>
            <Reveal delay={300}><p>{tr(ui.bio3)}</p></Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[900px] gap-x-[80px] gap-y-10 md:mt-24 md:grid-cols-2">
        <Reveal from="left">
          <div className="flex min-h-[86px] items-center justify-center bg-fog px-4">
            <h3 className="font-display text-[clamp(18px,2vw,28px)] tracking-[0.21em]">{tr(ui.education)}</h3>
          </div>
          <div className="mt-6 space-y-5 text-center text-[18px] font-medium leading-[30px] md:text-[20px]">
            <p>{tr(ui.edu1)}</p>
            <hr className="border-t-[3px] border-black" />
            <p>
              {tr(ui.edu1b)}
              <br />
              {tr(ui.edu1c)}
            </p>
            <hr className="border-t-[3px] border-black" />
            <p>
              {tr(ui.edu2)}
              <br />
              <span className="mt-[30px] block">{tr(ui.edu2b)}</span>
              {tr(ui.edu2c)}
            </p>
          </div>
        </Reveal>

        <Reveal from="right" className="space-y-6">
          <div>
            <div className="flex min-h-[86px] items-center justify-center bg-fog px-4">
              <h3 className="font-display text-[clamp(18px,2vw,28px)] tracking-[0.21em]">{tr(ui.hardSkills)}</h3>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-4">
              <img alt="Unity" src="/assets/c6c72.png" className="aspect-video w-[200px] object-contain" />
              <ul className="flex flex-wrap items-center gap-2">
                <li title="Figma" className="grid size-[46px] cursor-default place-items-center rounded-[10px] bg-ink transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-6">
                  <FigmaMark />
                </li>
                {adobe.map((a) => (
                  <li key={a} className="grid size-[46px] cursor-default place-items-center rounded-[10px] bg-ink text-[22px] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-6 font-bold leading-none text-white">
                    {a}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap items-center gap-2">
                {webSkills.map((w) => (
                  <li key={w} className="grid h-[46px] cursor-default place-items-center rounded-[10px] bg-ink px-4 transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-3 text-[18px] font-bold leading-none text-white">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="flex min-h-[86px] items-center justify-center bg-fog px-4">
              <h3 className="font-display text-[clamp(18px,2vw,28px)] tracking-[0.21em]">{tr(ui.languages)}</h3>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="relative grid h-[89px] w-[192px] -rotate-[8deg] place-items-center transition-transform duration-300 hover:scale-110 hover:-rotate-[2deg]">
                <img alt="" src="/assets/8f4b7.svg" className="absolute inset-0 size-full max-w-none" />
                <p className="relative -rotate-[4deg] text-center text-[20px] font-medium leading-[30px]">
                  {tr(ui.spanish)}
                  <br />
                  {tr(ui.motherTongue)}
                </p>
              </div>
              <div className="relative grid h-[89px] w-[192px] rotate-[13.5deg] place-items-center transition-transform duration-300 hover:scale-110 hover:rotate-[6deg]">
                <img alt="" src="/assets/48861.svg" className="absolute inset-0 size-full max-w-none" />
                <p className="relative rotate-[2deg] text-center text-[20px] font-medium leading-[30px]">
                  {tr(ui.english)}
                  <br />
                  B2-C1
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Marquee() {
  const { tr } = useLang()
  const words = [...categories.map((c) => tr(c.label)), "2025 || 2026"]
  const row = words.map((w, i) => (
    <span key={i} className="font-display mx-8 whitespace-nowrap text-[clamp(20px,3vw,40px)]">
      {w} <span aria-hidden className="ml-8">✦</span>
    </span>
  ))
  return (
    <div aria-hidden className="group my-16 overflow-hidden bg-ink py-5 text-white md:ml-[74px]">
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}

function ProjectsPreview() {
  const { tr } = useLang()
  return (
    <section id="projects-preview" className="pb-28 md:pl-[74px] md:pb-24">
      <Reveal from="scale">
        <SectionBar>{tr(ui.projects)}</SectionBar>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-[1440px] grid-cols-2 gap-6 px-6 md:grid-cols-4 md:gap-10 md:px-14">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 120}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/projects" className="text-[18px] font-medium underline underline-offset-4 hover:opacity-60">
          {tr(ui.seeAll)}
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <ProjectsPreview />
    </>
  )
}

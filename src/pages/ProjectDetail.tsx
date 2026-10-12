import { Link, Navigate, useParams } from "react-router"
import { useLang } from "../i18n"
import { categories, projects, ui } from "../content"

export default function ProjectDetail() {
  const { slug } = useParams()
  const { tr } = useLang()
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx < 0) return <Navigate to="/projects" replace />
  const p = projects[idx]
  const cat = categories.find((c) => c.slug === p.category)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-16 pt-32 md:px-12">
      <Link to="/projects" className="text-[14px] font-medium hover:opacity-60">
        {tr(ui.back)}
      </Link>
      <h1 className="font-display mb-10 mt-6 text-[clamp(28px,4.5vw,64px)] leading-tight">{tr(p.title)}</h1>

      <div className="aspect-[16/9] w-full bg-fog" />

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_2fr]">
        <dl className="space-y-5 text-[16px]">
          <div>
            <dt className="text-[12px] uppercase tracking-widest opacity-60">{tr(ui.year)}</dt>
            <dd className="font-medium">{p.year}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-widest opacity-60">{tr(ui.category)}</dt>
            <dd className="font-medium">{cat && tr(cat.label)}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-widest opacity-60">{tr(ui.role)}</dt>
            <dd className="font-medium">{tr(p.role)}</dd>
          </div>
        </dl>
        <p className="text-[20px] font-medium leading-[30px]">{tr(p.summary)}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="aspect-[4/3] bg-fog" />
        <div className="aspect-[4/3] bg-fog" />
      </div>

      <div className="mt-16 flex justify-between border-t-[3px] border-black pt-6 text-[16px] font-medium">
        <Link to={`/projects/${prev.slug}`} className="hover:opacity-60">
          {tr(ui.prev)}
        </Link>
        <Link to={`/projects/${next.slug}`} className="hover:opacity-60">
          {tr(ui.next)}
        </Link>
      </div>
    </div>
  )
}

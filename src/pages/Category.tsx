import { Link, Navigate, useParams } from "react-router"
import { useLang } from "../i18n"
import { categories, projects, ui } from "../content"
import ProjectCard from "../components/ProjectCard"
import Reveal from "../components/Reveal"

export default function Category() {
  const { slug } = useParams()
  const { tr } = useLang()
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return <Navigate to="/" replace />
  const list = projects.filter((p) => p.category === cat.slug).sort((a, b) => b.year - a.year)

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-32 md:px-12">
      <Link to="/" className="text-[14px] font-medium hover:opacity-60">
        {tr(ui.back)}
      </Link>
      <h1 className="font-display break-words mb-12 mt-6 text-[clamp(28px,5vw,72px)] leading-tight">{tr(cat.label)}</h1>
      {list.length ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
          {list.map((p) => (
            <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-[20px] font-medium">{tr(ui.noProjects)}</p>
      )}
    </div>
  )
}

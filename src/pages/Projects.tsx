import { useLang } from "../i18n"
import { projects, ui } from "../content"
import ProjectCard from "../components/ProjectCard"
import Reveal from "../components/Reveal"

export default function Projects() {
  const { tr } = useLang()
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a)

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-32 md:px-12">
      <h1 className="font-display break-words mb-14 text-[clamp(28px,5vw,72px)] leading-tight">{tr(ui.projects)}</h1>
      {years.map((y) => (
        <section key={y} className="mb-16">
          <div className="mb-8 flex items-center gap-6">
            <h2 className="font-display text-[clamp(24px,3vw,40px)]">{y}</h2>
            <div className="h-[3px] flex-1 bg-black" />
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
            {projects
              .filter((p) => p.year === y)
              .map((p) => (
                <Reveal key={p.slug}>
                <ProjectCard project={p} />
              </Reveal>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}

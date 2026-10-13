import { Link } from "react-router"
import { useLang } from "../i18n"
import type { Project } from "../content"

export default function ProjectCard({ project }: { project: Project }) {
  const { tr } = useLang()
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[296/374] w-full overflow-hidden bg-fog transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg] group-hover:shadow-[8px_8px_0_#000]">
        {(project.thumb ?? project.cover) && (
          <img src={project.thumb ?? project.cover} alt={tr(project.title)} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        )}
        <span className="absolute z-10 left-3 top-3 text-[12px] font-medium transition-colors group-hover:text-white">{project.year}</span>
        <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-500 group-hover:translate-y-0" />
        <span className="font-display absolute bottom-3 right-4 translate-y-6 text-[32px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">↗</span>
      </div>
      <p className="mt-3 text-[16px] font-medium underline-offset-4 group-hover:underline">{tr(project.title)}</p>
    </Link>
  )
}

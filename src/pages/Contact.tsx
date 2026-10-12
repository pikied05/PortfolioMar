import { useState, type FormEvent } from "react"
import { useLang } from "../i18n"
import { CONTACT_EMAIL, ui } from "../content"

const links = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

const field =
  "w-full border-[3px] border-black bg-transparent px-4 py-3 text-[18px] font-medium outline-none transition-colors placeholder:text-black/40 focus:bg-fog"

export default function Contact() {
  const { tr } = useLang()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 pb-16 pt-32 md:px-12">
      <h1 className="font-display mb-10 text-[clamp(28px,5.5vw,80px)] leading-tight">{tr(ui.contactTitle)}</h1>
      <p className="max-w-[640px] text-[20px] font-medium leading-[30px]">{tr(ui.contactText)}</p>

      <form onSubmit={onSubmit} className="mt-12 grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <input required placeholder={tr(ui.formName)} aria-label={tr(ui.formName)} value={form.name} onChange={set("name")} className={field} />
          <input required type="email" placeholder={tr(ui.formEmail)} aria-label={tr(ui.formEmail)} value={form.email} onChange={set("email")} className={field} />
        </div>
        <input required placeholder={tr(ui.formSubject)} aria-label={tr(ui.formSubject)} value={form.subject} onChange={set("subject")} className={field} />
        <textarea required rows={7} placeholder={tr(ui.formMessage)} aria-label={tr(ui.formMessage)} value={form.message} onChange={set("message")} className={`${field} resize-y`} />
        <div className="flex flex-wrap items-center gap-6">
          <button type="submit" className="font-display bg-fog px-8 py-5 text-[clamp(14px,1.6vw,22px)] tracking-[0.15em] transition-colors hover:bg-black hover:text-white">
            {tr(ui.formSend)}
          </button>
          <p className="max-w-[320px] text-[13px] opacity-60">{tr(ui.formNote)}</p>
        </div>
      </form>

      <p className="mt-14 text-[16px] font-medium">
        {CONTACT_EMAIL} · {tr(ui.location)}
      </p>
      <ul className="mt-4 flex flex-wrap gap-8 text-[18px] font-medium">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-60">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

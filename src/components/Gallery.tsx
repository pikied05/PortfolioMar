import { useCallback, useEffect, useRef, useState } from "react"
import { asset } from "../asset"

type Props = { cover?: string; images: string[]; alt: string }

const INTERVAL = 4500

export default function Gallery({ cover, images, alt }: Props) {
  const all = [...(cover ? [cover] : []), ...images].map(asset)
  const total = all.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const thumbs = useRef<HTMLDivElement>(null)

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total])

  useEffect(() => {
    if (total < 2 || paused || open !== null) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, paused, open, total, go])

  useEffect(() => {
    const el = thumbs.current?.children[index] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [index])

  const step = (d: number) => {
    setZoom(false)
    setOpen((o) => (o === null ? o : (o + d + total) % total))
  }

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const round =
    "grid size-11 place-items-center rounded-full bg-ink text-[20px] text-white transition-transform hover:scale-110 active:scale-90"

  if (!total) {
    return (
      <div>
        <div className="aspect-[16/10] w-full bg-fog md:aspect-[16/9]" />
        <div className="mt-4 flex gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[56px] w-[88px] bg-fog md:h-[72px] md:w-[116px]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden bg-fog md:aspect-[16/9]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {all.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={i !== index}
            className={`absolute inset-0 size-full object-contain transition-all duration-700 ease-out ${i === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
          />
        ))}

        <button
          type="button"
          aria-label="Open image"
          onClick={() => {
            setZoom(false)
            setOpen(index)
          }}
          className="absolute inset-0 cursor-zoom-in"
        />

        {total > 1 && (
          <>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous" className={`${round} absolute left-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100`}>
              ←
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next" className={`${round} absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100`}>
              →
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[4px] bg-black/10">
              <div
                key={`${index}-${paused}`}
                className="h-full origin-left bg-ink"
                style={{ animation: paused ? "none" : `bar ${INTERVAL}ms linear forwards` }}
              />
            </div>
          </>
        )}
        <span className="pointer-events-none absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-ink text-white">⤢</span>
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <div ref={thumbs} className="flex flex-1 gap-3 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {all.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-[56px] w-[88px] shrink-0 overflow-hidden bg-fog outline-offset-2 transition-all duration-300 md:h-[72px] md:w-[116px] ${i === index ? "outline outline-[3px] outline-black" : "opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <p className="shrink-0 text-[14px] font-medium tabular-nums">
            {index + 1} / {total}
          </p>
        </div>
      )}

      {open !== null && all[open] && (
        <div className="fixed inset-0 z-[70] bg-black/95" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div className={`flex size-full overflow-auto ${zoom ? "" : "items-center justify-center"}`} onClick={(e) => e.stopPropagation()}>
            <img
              src={all[open]}
              alt={`${alt} ${open + 1}`}
              onClick={() => setZoom((z) => !z)}
              style={zoom ? { width: "200vw", maxWidth: "none", margin: "auto" } : undefined}
              className={zoom ? "cursor-zoom-out" : "max-h-[88vh] max-w-[94vw] cursor-zoom-in object-contain"}
            />
          </div>
          <button type="button" onClick={() => { setOpen(null); go(open) }} aria-label="Close" className={`${round} absolute right-4 top-4 bg-white text-ink`}>
            ✕
          </button>
          {total > 1 && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous" className={`${round} absolute left-4 top-1/2 -translate-y-1/2 bg-white text-ink`}>
                ←
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next" className={`${round} absolute right-4 top-1/2 -translate-y-1/2 bg-white text-ink`}>
                →
              </button>
            </>
          )}
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[14px] font-medium text-white">
            {open + 1} / {total}
          </p>
        </div>
      )}
    </div>
  )
}
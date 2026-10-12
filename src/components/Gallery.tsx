import { useCallback, useEffect, useRef, useState } from "react"

type Props = { cover?: string; images: string[]; alt: string }

export default function Gallery({ cover, images, alt }: Props) {
  const all = [...(cover ? [cover] : []), ...images]
  const offset = cover ? 1 : 0
  const slides: (string | undefined)[] = images.length ? images : cover ? [] : [undefined, undefined, undefined]
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const count = slides.length
  const total = all.length

  const goTo = useCallback(
    (i: number) => {
      const next = (i + count) % count
      const el = track.current?.children[next] as HTMLElement | undefined
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      setIndex(next)
    },
    [count],
  )

  const onScroll = () => {
    const t = track.current
    if (!t) return
    const first = t.children[0] as HTMLElement
    const step = first.offsetWidth + 16
    setIndex(Math.min(count - 1, Math.max(0, Math.round(t.scrollLeft / step))))
  }

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

  const btn =
    "grid size-12 place-items-center rounded-full bg-ink text-[22px] text-white transition-transform hover:scale-110 active:scale-90 disabled:opacity-30"

  return (
    <div>
      <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden bg-fog md:aspect-[16/9]">
        {cover && (
          <button
            type="button"
            onClick={() => {
              setZoom(false)
              setOpen(0)
            }}
            aria-label="Open image"
            className="group size-full cursor-zoom-in"
          >
            <img src={cover} alt={alt} decoding="async" className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-ink text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100">
              ⤢
            </span>
          </button>
        )}
      </div>

      {count > 0 && (
      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] w-[78%] shrink-0 snap-center overflow-hidden bg-fog md:w-[46%]"
            >
              {src && (
                <button
                  type="button"
                  onClick={() => {
                    setZoom(false)
                    setOpen(i + offset)
                  }}
                  aria-label="Open image"
                  className="group size-full cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-ink text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100">
                    ⤢
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      {count > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={() => goTo(index - 1)} aria-label="Previous">
              ←
            </button>
            <button type="button" className={btn} onClick={() => goTo(index + 1)} aria-label="Next">
              →
            </button>
          </div>
          <div className="flex items-center gap-2" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-ink" : "w-2 bg-black/30 hover:bg-black/60"}`}
              />
            ))}
          </div>
          <p className="text-[14px] font-medium tabular-nums">
            {index + 1} / {count}
          </p>
        </div>
      )}

      {open !== null && all[open] && (
        <div className="fixed inset-0 z-[70] bg-black/95" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <div
            className={`flex size-full overflow-auto ${zoom ? "" : "items-center justify-center"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={all[open]}
              alt={`${alt} ${open + 1}`}
              onClick={() => setZoom((z) => !z)}
              style={zoom ? { width: "200vw", maxWidth: "none", margin: "auto" } : undefined}
              className={zoom ? "cursor-zoom-out" : "max-h-[88vh] max-w-[94vw] cursor-zoom-in object-contain"}
            />
          </div>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className={`${btn} absolute right-4 top-4 bg-white text-ink`}
          >
            ✕
          </button>
          {total > 1 && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous" className={`${btn} absolute left-4 top-1/2 -translate-y-1/2 bg-white text-ink`}>
                ←
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next" className={`${btn} absolute right-4 top-1/2 -translate-y-1/2 bg-white text-ink`}>
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

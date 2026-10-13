import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { asset } from "../asset"

type Props = { cover?: string; images: string[]; alt: string }

const INTERVAL = 4500

export default function Gallery({ cover, images, alt }: Props) {
  // Sin repetidos: si la portada también está en images, no se muestra dos veces
  const all = [...new Set([...(cover ? [cover] : []), ...images])].map(asset)
  const total = all.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const [zoomW, setZoomW] = useState(0)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)
  const thumbs = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const dragged = useRef(false)
  const focus = useRef<{ rx: number; ry: number; cx: number; cy: number } | null>(null)

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
      if (e.key === "Escape") {
        // Con zoom, Escape primero sale del zoom; la segunda vez cierra el visor
        if (zoom) setZoom(false)
        else setOpen(null)
        return
      }
      // Con zoom, las flechas mueven la imagen (scroll) en vez de cambiar de foto
      if (zoom) return
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
  }, [open, zoom])

  // Tamaño real de la imagen abierta (para saber si es muy alta y cuánto ampliarla)
  const current = open !== null ? all[open] : undefined
  useEffect(() => {
    setDims(null)
    if (!current) return
    let alive = true
    const im = new Image()
    im.onload = () => {
      if (alive) setDims({ w: im.naturalWidth, h: im.naturalHeight })
    }
    im.src = current
    return () => {
      alive = false
    }
  }, [current])

  // Al ampliar, deja bajo el cursor el punto donde hiciste clic; al salir del zoom, vuelve al inicio
  useLayoutEffect(() => {
    const el = scroller.current
    if (!el) return
    el.focus({ preventScroll: true })
    const f = focus.current
    if (zoom && f) {
      const img = el.querySelector("img")
      if (img) {
        el.scrollLeft = f.rx * img.offsetWidth - f.cx
        el.scrollTop = f.ry * img.offsetHeight - f.cy
      }
      focus.current = null
    } else if (!zoom) {
      el.scrollTo(0, 0)
    }
  }, [zoom, zoomW, open])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragged.current = false
    const el = scroller.current
    if (!zoom || !el || e.pointerType !== "mouse" || e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop }
  }

  // Arrastrar con el mouse para mover la imagen ampliada (en pantallas táctiles se mueve con el dedo)
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const el = scroller.current
    if (!d || !el) return
    if (e.buttons === 0) {
      drag.current = null
      return
    }
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!dragged.current && Math.abs(dx) + Math.abs(dy) < 5) return
    dragged.current = true
    el.scrollLeft = d.left - dx
    el.scrollTop = d.top - dy
  }

  const endDrag = () => {
    drag.current = null
  }

  const onViewerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (dragged.current) return
    const target = e.target as HTMLElement
    if (target.tagName === "IMG") {
      if (zoom) {
        setZoom(false)
        return
      }
      const r = target.getBoundingClientRect()
      const s = e.currentTarget.getBoundingClientRect()
      focus.current = {
        rx: (e.clientX - r.left) / r.width,
        ry: (e.clientY - r.top) / r.height,
        cx: e.clientX - s.left,
        cy: e.clientY - s.top,
      }
      const natural = dims?.w ?? r.width * 2
      setZoomW(Math.min(Math.max(natural, r.width * 1.8), r.width * 3))
      setZoom(true)
    } else if (zoom) {
      setZoom(false)
    } else {
      setOpen(null)
    }
  }

  // Imágenes muy largas (capturas de páginas completas) se ven al ancho de la pantalla y se recorren con scroll
  const tall = dims ? dims.h / dims.w > 2.5 : false
  const imgStyle: CSSProperties =
    zoom && zoomW
      ? { width: zoomW, height: "auto", maxWidth: "none", maxHeight: "none" }
      : tall
        ? { width: "min(94vw, 1100px)", height: "auto", maxWidth: "none", maxHeight: "none" }
        : { maxWidth: "94vw", maxHeight: "88vh" }

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
        <div className="fixed inset-0 z-[70] bg-black/95" role="dialog" aria-modal="true">
          <div
            ref={scroller}
            tabIndex={-1}
            onClick={onViewerClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            className="absolute inset-0 select-none overflow-auto overscroll-contain outline-none"
          >
            <div className="flex min-h-full w-max min-w-full p-3">
              <img
                src={all[open]}
                alt={`${alt} ${open + 1}`}
                draggable={false}
                style={imgStyle}
                className={`m-auto block shrink-0 ${zoom ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              />
            </div>
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
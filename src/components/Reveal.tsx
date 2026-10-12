import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  from?: "up" | "left" | "right" | "scale"
}

const hidden = {
  up: "translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
  scale: "scale-90",
}

export default function Reveal({ children, delay = 0, className = "", from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style: CSSProperties = { transitionDelay: `${delay}ms` }
  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out ${shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${hidden[from]}`} ${className}`}
    >
      {children}
    </div>
  )
}

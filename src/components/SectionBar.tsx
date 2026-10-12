export default function SectionBar({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`flex min-h-[86px] items-center justify-center bg-fog px-4 text-center ${className}`}>
      <h2 className="font-display text-[clamp(20px,2.5vw,36px)] tracking-[0.21em]">{children}</h2>
    </div>
  )
}

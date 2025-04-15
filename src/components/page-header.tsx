import type React from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  background?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  background = "bg-gradient-to-r from-[#0089ff] to-[#1a6fc7]",
  children,
}: PageHeaderProps) {
  return (
    <div className={`w-full ${background} text-white py-6 sm:py-8 px-6 sm:px-8 rounded-b-lg shadow-md`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-white/80 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

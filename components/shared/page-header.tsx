interface PageHeaderProps {
  title: string
  description?: string
  backLink?: string
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {backLink && <div className="mb-4">{backLink}</div>}
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-slate-600 mt-2">{description}</p>}
      </div>
    </div>
  )
}

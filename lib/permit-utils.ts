import permits from '@/public/data/permit_categories.json'

export interface ConcessionRecord {
  code: string
  parties: string
  resource: string
  statut: string
  sup_sig_ha: string | number
  type: string
  date_do?: string
  date_de1?: string
  date_app?: string
  date_grant?: string
  date_expiry?: string
  zone?: string
  permit_category?: string
  permit_subcategory?: string
  category_id?: string
}

export const permitCategoriesData = permits

export function getPermitCategory(type: string): { categoryId: string; categoryName: string; icon: string; color: string } | null {
  for (const category of permitCategoriesData.categories) {
    const found = category.permits.find(
      p => p.short === type || p.code === type || p.name_fr.toLowerCase().includes(type.toLowerCase())
    )
    if (found) {
      return {
        categoryId: category.id,
        categoryName: category.name_en,
        icon: category.icon,
        color: category.color
      }
    }
  }
  return null
}

export function getStatusBadge(status: string): { name: string; badgeColor: string } {
  const statusKey = Object.keys(permitCategoriesData.status_mapping).find(
    k => permitCategoriesData.status_mapping[k as keyof typeof permitCategoriesData.status_mapping].name_en.toLowerCase() === status.toLowerCase()
      || permitCategoriesData.status_mapping[k as keyof typeof permitCategoriesData.status_mapping].name_fr.toLowerCase() === status.toLowerCase()
      || k === status
  ) as keyof typeof permitCategoriesData.status_mapping | undefined

  if (statusKey) {
    return {
      name: permitCategoriesData.status_mapping[statusKey].name_en,
      badgeColor: permitCategoriesData.status_mapping[statusKey].badge_color
    }
  }

  return {
    name: status,
    badgeColor: 'bg-gray-500'
  }
}

export function enrichConcessionData(record: ConcessionRecord): ConcessionRecord {
  const categoryInfo = getPermitCategory(record.type)
  
  if (categoryInfo) {
    return {
      ...record,
      category_id: categoryInfo.categoryId,
      permit_category: categoryInfo.categoryName,
      permit_subcategory: record.type
    }
  }
  
  return record
}

export function getAllPermitTypes() {
  const types: { code: string; name_fr: string; name_en: string; category: string; icon: string; color: string }[] = []
  
  for (const category of permitCategoriesData.categories) {
    for (const permit of category.permits) {
      types.push({
        code: permit.code,
        name_fr: permit.name_fr,
        name_en: permit.name_en,
        category: category.id,
        icon: category.icon,
        color: category.color
      })
    }
  }
  
  return types
}

export function getPermitsByCategory(categoryId: string) {
  const category = permitCategoriesData.categories.find(c => c.id === categoryId)
  return category ? category.permits : []
}

export function filterConcessions(concessions: ConcessionRecord[], filters: {
  company?: string
  resource?: string
  year?: number
  status?: string
  type?: string
  category?: string
  zone?: string
}): ConcessionRecord[] {
  return concessions.filter(c => {
    if (filters.company && !c.parties.toLowerCase().includes(filters.company.toLowerCase())) return false
    if (filters.resource && !c.resource.toLowerCase().includes(filters.resource.toLowerCase())) return false
    if (filters.year) {
      const year = c.date_app ? new Date(c.date_app).getFullYear() : null
      if (year !== filters.year) return false
    }
    if (filters.status && !c.statut.includes(filters.status)) return false
    if (filters.type && c.type !== filters.type) return false
    if (filters.category) {
      const categoryInfo = getPermitCategory(c.type)
      if (!categoryInfo || categoryInfo.categoryId !== filters.category) return false
    }
    if (filters.zone && c.zone !== filters.zone) return false
    
    return true
  })
}

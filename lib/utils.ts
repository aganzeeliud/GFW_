/**
 * Format large numbers with commas
 * Example: 1000000 -> "1,000,000"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Format hectares with appropriate suffix
 */
export function formatHectares(hectares: number): string {
  if (hectares >= 1000000) {
    return `${(hectares / 1000000).toFixed(2)}M ha`
  }
  if (hectares >= 1000) {
    return `${(hectares / 1000).toFixed(0)}K ha`
  }
  return `${hectares} ha`
}

/**
 * Format year range
 */
export function formatYearRange(startYear: number, endYear: number): string {
  return `${startYear}-${endYear}`
}

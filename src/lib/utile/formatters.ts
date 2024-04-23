const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
})
export function formatCurrency(number: number | bigint) {
  return CURRENCY_FORMATTER.format(number)
}

const NUMBER_FORMATTER = new Intl.NumberFormat(undefined)
export function formatNumber(number: number | bigint) {
  return NUMBER_FORMATTER.format(number)
}

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
})
export function formatCompactNumber(number: number | bigint) {
  return COMPACT_NUMBER_FORMATTER.format(number)
}





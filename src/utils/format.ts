import dayjs from "dayjs"

export function formatTime(time: number) {
  return dayjs(time * 1000).format("MM-DD HH:mm")
}

export function formatAddress(addr: string) {
  return addr.substring(0, 5) + "..." + addr.substr(-4)
}

export function formatPrice(price: number) {
  return price.toFixed(8)
}

export function formatPercent(val: string | number) {
  return (Number(val) * 100).toFixed(2) + "%"
}

export const getBrowserLocale = (): string => navigator.language || 'en-US';
export const formatNumber = (value: number | string, locale: string = getBrowserLocale(), options: Intl.NumberFormatOptions = { notation: 'compact' }): string => new Intl.NumberFormat(locale, options).format(Number(value));


export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
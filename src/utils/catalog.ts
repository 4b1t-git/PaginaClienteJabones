import type { Product, ProductStatus } from '../types'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  complete: boolean
}

export const getEffectiveStatus = (product: Product, now: number): ProductStatus => {
  if (product.status === 'coming-soon' && product.availableAt) {
    if (new Date(product.availableAt).getTime() <= now) {
      return product.stock > 0 ? 'available' : 'sold-out'
    }
  }

  if (product.status === 'available' && product.stock <= 0) {
    return 'sold-out'
  }

  return product.status
}

export const hasProductPrice = (value: number | null | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0

export const isProductPurchasable = (product: Product, now: number) =>
  getEffectiveStatus(product, now) === 'available' &&
  hasProductPrice(product.price) &&
  Boolean(product.weight?.trim())

export const getCountdown = (availableAt: string | undefined, now: number): CountdownParts => {
  const target = availableAt ? new Date(availableAt).getTime() : Number.NaN
  const remaining = Number.isFinite(target) ? Math.max(0, target - now) : 0
  const totalSeconds = Math.floor(remaining / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    complete: !Number.isFinite(target) || remaining <= 0,
  }
}

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('es-419', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)

export const formatPrice = (value: number | null | undefined, quantity = 1) =>
  hasProductPrice(value) ? formatMoney(value * quantity) : 'Precio por anunciar'

export const formatAvailability = (value: string | undefined) => {
  if (!value) return 'Fecha por anunciar'

  return new Intl.DateTimeFormat('es-419', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export const statusLabel: Record<ProductStatus, string> = {
  available: 'Disponible',
  'sold-out': 'Agotado',
  'coming-soon': 'Próximamente',
  preview: 'Vista previa',
}

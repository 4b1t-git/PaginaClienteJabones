export const getNextWednesdayISO = (reference = new Date()) => {
  const start = Date.UTC(
    reference.getUTCFullYear(),
    reference.getUTCMonth(),
    reference.getUTCDate(),
  )
  const weekday = new Date(start).getUTCDay()
  const offset = (3 - weekday + 7) % 7 || 7

  return new Date(start + offset * 86400000).toISOString().slice(0, 10)
}

export const formatDispatchDate = (isoDate: string) =>
  new Intl.DateTimeFormat('es-419', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T12:00:00Z`))

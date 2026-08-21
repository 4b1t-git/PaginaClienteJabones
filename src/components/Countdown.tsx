import { getCountdown } from '../utils/catalog'

interface CountdownProps {
  availableAt?: string
  now: number
  compact?: boolean
}

export const Countdown = ({ availableAt, now, compact = false }: CountdownProps) => {
  if (!availableAt) {
    return <p className="countdown-tba">Fecha de lanzamiento por anunciar</p>
  }

  const countdown = getCountdown(availableAt, now)
  if (countdown.complete) return null

  const units = [
    ['Días', countdown.days],
    ['Horas', countdown.hours],
    ['Min', countdown.minutes],
    ['Seg', countdown.seconds],
  ] as const

  return (
    <div className={`countdown ${compact ? 'countdown--compact' : ''}`} aria-label="Tiempo restante hasta que esté disponible">
      {units.map(([label, value]) => (
        <span className="countdown__unit" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <small>{label}</small>
        </span>
      ))}
    </div>
  )
}

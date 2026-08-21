import type { Product } from '../types'
import { formatAvailability, formatMoney, getEffectiveStatus, statusLabel } from '../utils/catalog'
import { ArrowIcon, PlusIcon } from './Icons'
import { Countdown } from './Countdown'

interface ProductCardProps {
  product: Product
  now: number
  added: boolean
  onQuickView: (product: Product) => void
  onAdd: (product: Product) => void
}

export const ProductCard = ({ product, now, added, onQuickView, onAdd }: ProductCardProps) => {
  const effectiveStatus = getEffectiveStatus(product, now)
  const canBuy = effectiveStatus === 'available'

  return (
    <article className="product-card" style={{ '--product-accent': product.accent } as React.CSSProperties}>
      <button
        className="product-card__image"
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`Ver detalles de ${product.name}`}
      >
        <img src={product.image} alt={product.imageAlt} />
        <span className="product-card__view">Vista rápida <ArrowIcon /></span>
      </button>
      <div className="product-card__body">
        <div className="product-card__heading">
          <div>
            <p className={`status-pill status-pill--${effectiveStatus}`}>{statusLabel[effectiveStatus]}</p>
            <h3>{product.name}</h3>
          </div>
          <p className="product-card__price">{formatMoney(product.price)}</p>
        </div>
        <p className="product-card__subtitle">{product.subtitle}</p>
        {effectiveStatus === 'coming-soon' && (
          <div className="product-card__countdown">
            <p>Disponible el {formatAvailability(product.availableAt)}</p>
            <Countdown availableAt={product.availableAt} now={now} compact />
          </div>
        )}
        <button
          className={`product-card__add ${added ? 'is-added' : ''}`}
          type="button"
          disabled={!canBuy}
          onClick={() => onAdd(product)}
        >
          {added ? 'Agregado al carrito' : canBuy ? 'Agregar al carrito' : statusLabel[effectiveStatus]}
          {canBuy && <PlusIcon />}
        </button>
      </div>
    </article>
  )
}

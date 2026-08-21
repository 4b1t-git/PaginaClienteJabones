import { useId } from 'react'
import { useOverlayFocus } from '../hooks/useOverlayFocus'
import type { Product } from '../types'
import { formatAvailability, formatMoney, getEffectiveStatus, statusLabel } from '../utils/catalog'
import { CloseIcon, PlusIcon } from './Icons'
import { Countdown } from './Countdown'

interface QuickViewModalProps {
  product: Product | null
  now: number
  onClose: () => void
  onAdd: (product: Product) => void
}

export const QuickViewModal = ({ product, now, onClose, onAdd }: QuickViewModalProps) => {
  const titleId = useId()
  const panelRef = useOverlayFocus(Boolean(product), onClose)

  if (!product) return null

  const effectiveStatus = getEffectiveStatus(product, now)
  const canBuy = effectiveStatus === 'available'

  return (
    <div className="overlay overlay--center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="quick-view" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <button className="icon-button overlay__close" type="button" onClick={onClose} aria-label="Cerrar detalles del producto">
          <CloseIcon />
        </button>
        <div className="quick-view__image">
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <div className="quick-view__content">
          <p className={`status-pill status-pill--${effectiveStatus}`}>{statusLabel[effectiveStatus]}</p>
          <h2 id={titleId}>{product.name}</h2>
          <p className="quick-view__subtitle">{product.subtitle}</p>
          <p className="quick-view__description">{product.description}</p>
          <blockquote>“{product.story}”</blockquote>
          <dl className="product-facts">
            <div><dt>Ingredientes</dt><dd>{product.ingredients}</dd></div>
            <div><dt>Peso al corte</dt><dd>{product.weight}</dd></div>
          </dl>
          {effectiveStatus === 'coming-soon' && (
            <div className="quick-view__release">
              <p>Disponible el {formatAvailability(product.availableAt)}</p>
              <Countdown availableAt={product.availableAt} now={now} />
            </div>
          )}
          <button className="button button--dark button--full" type="button" disabled={!canBuy} onClick={() => onAdd(product)}>
            {canBuy ? `Agregar al carrito · ${formatMoney(product.price)}` : statusLabel[effectiveStatus]}
            {canBuy && <PlusIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}

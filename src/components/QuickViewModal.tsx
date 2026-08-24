import { useEffect, useId, useState } from 'react'
import { useOverlayFocus } from '../hooks/useOverlayFocus'
import type { Product } from '../types'
import { formatAvailability, formatPrice, getEffectiveStatus, isProductPurchasable, statusLabel } from '../utils/catalog'
import { CloseIcon, PlusIcon } from './Icons'
import { Countdown } from './Countdown'

interface QuickViewModalProps {
  product: Product | null
  now: number
  onClose: () => void
  onAdd: (product: Product) => void
}

const galleryViewLabels = [
  'vista frontal',
  'primera vista lateral',
  'vista posterior',
  'segunda vista lateral',
]

export const QuickViewModal = ({ product, now, onClose, onAdd }: QuickViewModalProps) => {
  const titleId = useId()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const panelRef = useOverlayFocus(Boolean(product), onClose)
  const galleryImages = product?.images?.length ? product.images : product ? [product.image] : []

  useEffect(() => {
    setSelectedImageIndex(0)
  }, [product?.id])

  if (!product) return null

  const effectiveStatus = getEffectiveStatus(product, now)
  const canBuy = isProductPurchasable(product, now)
  const activeImageIndex = selectedImageIndex < galleryImages.length ? selectedImageIndex : 0
  const hasGallery = galleryImages.length > 1
  const selectedViewLabel = galleryViewLabels[activeImageIndex] ?? `foto ${activeImageIndex + 1}`

  return (
    <div className="overlay overlay--center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="quick-view" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <button className="icon-button overlay__close" type="button" onClick={onClose} aria-label="Cerrar detalles del producto">
          <CloseIcon />
        </button>
        <div className={`quick-view__media${hasGallery ? ' quick-view__media--gallery' : ''}`}>
          <div className="quick-view__image">
            <img
              src={galleryImages[activeImageIndex] ?? product.image}
              alt={hasGallery ? `${product.name}: ${selectedViewLabel}` : product.imageAlt}
            />
          </div>
          {hasGallery && (
            <div className="quick-view__thumbnails" role="group" aria-label={`Fotos de ${product.name}`}>
              {galleryImages.map((image, index) => {
                const viewLabel = galleryViewLabels[index] ?? `foto ${index + 1}`

                return (
                  <button
                    className={`quick-view__thumbnail${index === activeImageIndex ? ' is-active' : ''}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Mostrar ${viewLabel} de ${product.name}`}
                    aria-pressed={index === activeImageIndex}
                    key={image}
                  >
                    <img src={image} alt="" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="quick-view__content">
          <p className={`status-pill status-pill--${effectiveStatus}`}>{statusLabel[effectiveStatus]}</p>
          <h2 id={titleId}>{product.name}</h2>
          <p className="quick-view__subtitle">{product.subtitle}</p>
          <p className="quick-view__description">{product.description}</p>
          <blockquote>“{product.story}”</blockquote>
          <dl className="product-facts">
            <div><dt>Ingredientes</dt><dd>{product.ingredients}</dd></div>
            <div><dt>Peso al corte</dt><dd>{product.weight ?? 'Por anunciar'}</dd></div>
          </dl>
          {effectiveStatus === 'coming-soon' && (
            <div className="quick-view__release">
              <p>Disponible el {formatAvailability(product.availableAt)}</p>
              <Countdown availableAt={product.availableAt} now={now} />
            </div>
          )}
          <button className="button button--dark button--full" type="button" disabled={!canBuy} onClick={() => onAdd(product)}>
            {canBuy
              ? `Agregar al carrito · ${formatPrice(product.price)}`
              : effectiveStatus === 'available'
                ? 'Datos comerciales por anunciar'
                : statusLabel[effectiveStatus]}
            {canBuy && <PlusIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}

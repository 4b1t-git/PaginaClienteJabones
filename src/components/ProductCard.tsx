import { useEffect, useRef, useState } from 'react'
import type { Product } from '../types'
import { formatAvailability, formatPrice, getEffectiveStatus, isProductPurchasable, statusLabel } from '../utils/catalog'
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
  const canBuy = isProductPurchasable(product, now)
  const galleryImages = product.images?.length ? product.images : [product.image]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      if (mediaQuery.matches) {
        if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
        timerRef.current = undefined
        setActiveImageIndex(0)
      }
    }

    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (
      !hovered ||
      prefersReducedMotion ||
      galleryImages.length < 2 ||
      loadedImages.length < galleryImages.length
    ) return

    timerRef.current = window.setTimeout(() => {
      setActiveImageIndex((current) => (current + 1) % galleryImages.length)
    }, 2500)

    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [activeImageIndex, galleryImages.length, hovered, loadedImages.length, prefersReducedMotion])

  const resetGallery = () => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
    timerRef.current = undefined
    setHovered(false)
    setActiveImageIndex(0)
  }

  return (
    <article className="product-card" style={{ '--product-accent': product.accent } as React.CSSProperties}>
      <button
        className={`product-card__image${galleryImages.length > 1 ? ' product-card__image--photo-gallery' : ''}`}
        type="button"
        onClick={() => onQuickView(product)}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setHovered(true)
        }}
        onPointerLeave={resetGallery}
        aria-label={`Ver detalles de ${product.name}`}
      >
        <span className="product-card__gallery">
          {galleryImages.map((image, index) => (
            <img
              className={index === activeImageIndex ? 'is-active' : ''}
              src={image}
              alt={index === 0 ? product.imageAlt : ''}
              aria-hidden={index === 0 ? undefined : true}
              onLoad={() => {
                setLoadedImages((current) => current.includes(image) ? current : [...current, image])
              }}
              key={image}
            />
          ))}
        </span>
        <span className="product-card__view">Vista rápida <ArrowIcon /></span>
      </button>
      <div className="product-card__body">
        <div className="product-card__heading">
          <div>
            <p className={`status-pill status-pill--${effectiveStatus}`}>{statusLabel[effectiveStatus]}</p>
            <h3>{product.name}</h3>
          </div>
          <p className="product-card__price">{formatPrice(product.price)}</p>
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
          {added
            ? 'Agregado al carrito'
            : canBuy
              ? 'Agregar al carrito'
              : effectiveStatus === 'available'
                ? 'Datos comerciales por anunciar'
                : statusLabel[effectiveStatus]}
          {canBuy && <PlusIcon />}
        </button>
      </div>
    </article>
  )
}

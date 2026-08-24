import { useId } from 'react'
import { useOverlayFocus } from '../hooks/useOverlayFocus'
import type { CartLine } from '../types'
import {
  formatMoney,
  formatPrice,
  getEffectiveStatus,
  hasProductPrice,
  isProductPurchasable,
  statusLabel,
} from '../utils/catalog'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons'

interface CartDrawerProps {
  open: boolean
  lines: CartLine[]
  now: number
  dispatchDate: string
  onClose: () => void
  onRemove: (productId: string) => void
  onQuantityChange: (productId: string, quantity: number) => void
  onCheckout: () => void
}

export const CartDrawer = ({
  open,
  lines,
  now,
  dispatchDate,
  onClose,
  onRemove,
  onQuantityChange,
  onCheckout,
}: CartDrawerProps) => {
  const titleId = useId()
  const panelRef = useOverlayFocus(open, onClose)

  if (!open) return null

  const hasPendingPrice = lines.some(({ product }) => !hasProductPrice(product.price))
  const subtotal = lines.reduce(
    (total, line) => total + (hasProductPrice(line.product.price) ? line.product.price * line.quantity : 0),
    0,
  )
  const hasUnavailable = lines.some(
    ({ product, quantity }) => !isProductPurchasable(product, now) || quantity > product.stock,
  )

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="drawer drawer--cart" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <div className="drawer__header">
          <div>
            <p className="eyebrow"><BagIcon /> Tu selección</p>
            <h2 id={titleId}>Carrito</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="empty-cart">
            <span aria-hidden="true">○</span>
            <h3>Tu carrito está vacío.</h3>
            <p>Elige una barra del lote actual y la guardaremos aquí para ti.</p>
            <a className="button button--dark" href="#shop" onClick={onClose}>Ver el lote</a>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(({ product, quantity }) => {
                const status = getEffectiveStatus(product, now)
                const unavailable = !isProductPurchasable(product, now) || quantity > product.stock
                return (
                  <article className="cart-line" key={product.id}>
                    <img src={product.image} alt="" />
                    <div className="cart-line__content">
                      <div className="cart-line__heading">
                        <div>
                          <h3>{product.name}</h3>
                          <p>{product.weight ?? 'Peso por anunciar'}</p>
                        </div>
                        <strong>{formatPrice(product.price, quantity)}</strong>
                      </div>
                      {unavailable && (
                        <p className="cart-line__warning">
                          {status !== 'available'
                            ? `${statusLabel[status]}: elimínalo para continuar`
                            : !hasProductPrice(product.price) || !product.weight?.trim()
                              ? 'Datos comerciales por anunciar: elimínalo para continuar'
                              : `Solo quedan ${product.stock} unidades`}
                        </p>
                      )}
                      <div className="cart-line__actions">
                        <div className="quantity-control" aria-label={`Cantidad de ${product.name}`}>
                          <button type="button" onClick={() => onQuantityChange(product.id, quantity - 1)} aria-label={`Disminuir la cantidad de ${product.name}`}>
                            <MinusIcon />
                          </button>
                          <span aria-live="polite">{quantity}</span>
                          <button
                            type="button"
                            disabled={!isProductPurchasable(product, now) || quantity >= product.stock}
                            onClick={() => onQuantityChange(product.id, quantity + 1)}
                            aria-label={`Aumentar la cantidad de ${product.name}`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <button className="remove-button" type="button" onClick={() => onRemove(product.id)}>Eliminar</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="drawer__footer cart-footer">
              <div className="dispatch-note">
                <TruckIcon />
                <p><strong>Próximo envío</strong><span>{dispatchDate}</span></p>
              </div>
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>{hasPendingPrice ? 'Por calcular' : formatMoney(subtotal)}</strong>
              </div>
              <p className="cart-footer__fineprint">Los impuestos y las tarifas de envío no se calculan en este prototipo.</p>
              {hasUnavailable && <p className="form-error">Elimina o ajusta los artículos no disponibles antes de finalizar la compra.</p>}
              <button className="button button--dark button--full" type="button" disabled={hasUnavailable} onClick={onCheckout}>
                Finalizar compra de demostración
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

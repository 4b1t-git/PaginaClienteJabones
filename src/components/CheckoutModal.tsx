import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useOverlayFocus } from '../hooks/useOverlayFocus'
import type { CartLine } from '../types'
import { formatMoney, formatPrice, hasProductPrice } from '../utils/catalog'
import { CheckIcon, CloseIcon, TruckIcon } from './Icons'

interface CheckoutModalProps {
  open: boolean
  lines: CartLine[]
  dispatchDate: string
  onClose: () => void
  onOrderComplete: () => void
}

interface Confirmation {
  reference: string
  itemCount: number
  subtotal: number
}

export const CheckoutModal = ({ open, lines, dispatchDate, onClose, onOrderComplete }: CheckoutModalProps) => {
  const titleId = useId()
  const panelRef = useOverlayFocus(open, onClose)
  const confirmationTitleRef = useRef<HTMLHeadingElement>(null)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

  useEffect(() => {
    if (open) setConfirmation(null)
  }, [open])

  useEffect(() => {
    if (confirmation) confirmationTitleRef.current?.focus()
  }, [confirmation])

  if (!open) return null

  const hasPendingPrice = lines.some(({ product }) => !hasProductPrice(product.price))
  const subtotal = lines.reduce(
    (total, line) => total + (hasProductPrice(line.product.price) ? line.product.price * line.quantity : 0),
    0,
  )

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hasPendingPrice) return
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0)
    setConfirmation({
      reference: `LN-DEMO-${Date.now().toString().slice(-6)}`,
      itemCount,
      subtotal,
    })
    onOrderComplete()
  }

  return (
    <div className="overlay overlay--center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="checkout" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <button className="icon-button overlay__close" type="button" onClick={onClose} aria-label="Cerrar proceso de compra">
          <CloseIcon />
        </button>
        {confirmation ? (
          <div className="confirmation">
            <span className="confirmation__mark"><CheckIcon /></span>
            <p className="eyebrow">Pedido de demostración confirmado</p>
            <h2 id={titleId} ref={confirmationTitleRef} tabIndex={-1}>Tu ritual está en la lista.</h2>
            <p>
              Este prototipo registró correctamente un pedido de demostración con {confirmation.itemCount}{' '}
              {confirmation.itemCount === 1 ? 'artículo' : 'artículos'}. No se realizó ningún cobro ni se enviará ningún paquete.
            </p>
            <dl className="confirmation__details">
              <div><dt>Referencia</dt><dd>{confirmation.reference}</dd></div>
              <div><dt>Subtotal de demostración</dt><dd>{formatMoney(confirmation.subtotal)}</dd></div>
              <div><dt>Fecha de envío ilustrativa</dt><dd>{dispatchDate}</dd></div>
            </dl>
            <button className="button button--dark" type="button" onClick={onClose}>Volver a la tienda</button>
          </div>
        ) : (
          <>
            <div className="checkout__intro">
              <p className="eyebrow">Finalizar compra de demostración</p>
              <h2 id={titleId}>Completa un pedido de demostración</h2>
              <p>No se solicitan ni procesan datos de pago. El envío del formulario solo demuestra el flujo de confirmación.</p>
            </div>
            <div className="checkout__layout">
              <form className="checkout-form" onSubmit={submitOrder}>
                <fieldset>
                  <legend>Contacto</legend>
                  <label className="field">
                    <span>Correo electrónico</span>
                    <input type="email" name="email" autoComplete="email" required placeholder="nombre@ejemplo.com" />
                  </label>
                  <label className="field">
                    <span>Nombre completo</span>
                    <input name="name" autoComplete="name" required />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Dirección de entrega de demostración</legend>
                  <label className="field">
                    <span>Calle y número</span>
                    <input name="address" autoComplete="street-address" required />
                  </label>
                  <div className="form-grid">
                    <label className="field"><span>Ciudad</span><input name="city" autoComplete="address-level2" required /></label>
                    <label className="field"><span>Código postal</span><input name="postal" autoComplete="postal-code" required /></label>
                  </div>
                  <label className="field">
                    <span>País</span>
                    <select name="country" autoComplete="country-name" defaultValue="US">
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                      <option value="GB">Reino Unido</option>
                      <option value="OTHER">Otro (solo demostración)</option>
                    </select>
                  </label>
                </fieldset>
                <label className="checkbox-field">
                  <input type="checkbox" required />
                  <span>Entiendo que este es un prototipo y que no se creará ningún pedido ni pago real.</span>
                </label>
                <button className="button button--clay button--full" type="submit" disabled={hasPendingPrice}>Finalizar compra de demostración</button>
              </form>

              <aside className="order-summary" aria-label="Resumen del pedido">
                <h3>Resumen del pedido</h3>
                <div className="order-summary__lines">
                  {lines.map(({ product, quantity }) => (
                    <div className="summary-line" key={product.id}>
                      <img src={product.image} alt="" />
                      <p><strong>{product.name}</strong><span>Cantidad: {quantity}</span></p>
                      <span>{formatPrice(product.price, quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="dispatch-note">
                  <TruckIcon />
                  <p><strong>Envío del miércoles</strong><span>{dispatchDate}</span></p>
                </div>
                <div className="subtotal">
                  <span>Subtotal de demostración</span>
                  <strong>{hasPendingPrice ? 'Por calcular' : formatMoney(subtotal)}</strong>
                </div>
                <p className="order-summary__note">Las tarifas de envío, los impuestos y la fecha de entrega no se estiman intencionalmente.</p>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

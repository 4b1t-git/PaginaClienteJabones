import { useId } from 'react'
import { useOverlayFocus } from '../hooks/useOverlayFocus'
import type { Product, ProductStatus } from '../types'
import { getEffectiveStatus, statusLabel } from '../utils/catalog'
import { CloseIcon, SlidersIcon } from './Icons'

interface InventoryEditorProps {
  open: boolean
  products: Product[]
  now: number
  onClose: () => void
  onUpdate: (productId: string, patch: Partial<Product>) => void
  onReset: () => void
}

const toLocalDateTime = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

export const InventoryEditor = ({
  open,
  products,
  now,
  onClose,
  onUpdate,
  onReset,
}: InventoryEditorProps) => {
  const titleId = useId()
  const panelRef = useOverlayFocus(open, onClose)

  if (!open) return null

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="drawer drawer--editor" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <div className="drawer__header">
          <div>
            <p className="eyebrow"><SlidersIcon /> Prototipo en el navegador</p>
            <h2 id={titleId}>Editor de inventario</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar editor de inventario">
            <CloseIcon />
          </button>
        </div>
        <div className="editor-note">
          <strong>Controles de demostración</strong>
          <p>Los cambios se guardan automáticamente en este dispositivo. Esta no es un área administrativa autenticada.</p>
        </div>
        <div className="editor-products">
          {products.map((product) => {
            const effectiveStatus = getEffectiveStatus(product, now)
            return (
              <fieldset className="editor-card" key={product.id}>
                <legend>
                  <img src={product.image} alt="" />
                  <span>{product.name}<small>Estado actual en la tienda: {statusLabel[effectiveStatus]}</small></span>
                </legend>
                <div className="form-grid form-grid--editor">
                  <label className="field field--wide">
                    <span>Nombre del producto</span>
                    <input value={product.name} onChange={(event) => onUpdate(product.id, { name: event.target.value })} />
                  </label>
                  <label className="field">
                    <span>Precio (USD)</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.price ?? ''}
                      onChange={(event) => onUpdate(product.id, {
                        price: event.target.value === '' ? null : Math.max(0, Number(event.target.value)),
                      })}
                    />
                  </label>
                  <label className="field">
                    <span>Peso</span>
                    <input
                      value={product.weight ?? ''}
                      placeholder="Por anunciar"
                      onChange={(event) => onUpdate(product.id, { weight: event.target.value || null })}
                    />
                  </label>
                  <label className="field">
                    <span>Existencias</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={product.stock}
                      onChange={(event) => onUpdate(product.id, { stock: Math.max(0, Math.floor(Number(event.target.value))) })}
                    />
                  </label>
                  <label className="field">
                    <span>Estado</span>
                    <select
                      value={product.status}
                      onChange={(event) => onUpdate(product.id, { status: event.target.value as ProductStatus })}
                    >
                      <option value="available">Disponible</option>
                      <option value="sold-out">Agotado</option>
                      <option value="coming-soon">Próximamente</option>
                      <option value="preview">Vista previa</option>
                    </select>
                  </label>
                  <label className="field field--wide">
                    <span>Fecha y hora de disponibilidad</span>
                    <input
                      type="datetime-local"
                      value={toLocalDateTime(product.availableAt)}
                      onChange={(event) => {
                        const date = event.target.value ? new Date(event.target.value) : null
                        onUpdate(product.id, { availableAt: date ? date.toISOString() : undefined })
                      }}
                    />
                  </label>
                </div>
              </fieldset>
            )
          })}
        </div>
        <div className="drawer__footer editor-footer">
          <button
            className="button button--outline"
            type="button"
            onClick={() => {
              if (window.confirm('¿Restablecer todas las ediciones del catálogo con los datos actuales de demostración?')) onReset()
            }}
          >
            Restablecer datos de demostración
          </button>
          <button className="button button--dark" type="button" onClick={onClose}>Cerrar editor</button>
        </div>
      </div>
    </div>
  )
}

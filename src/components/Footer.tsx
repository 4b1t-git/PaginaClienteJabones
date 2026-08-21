import { useState, type FormEvent } from 'react'
import { ArrowIcon, SlidersIcon } from './Icons'

interface FooterProps {
  onOpenInventory: () => void
}

export const Footer = ({ onOpenInventory }: FooterProps) => {
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
    event.currentTarget.reset()
  }

  return (
    <footer className="site-footer" id="newsletter">
      <div className="newsletter section-shell">
        <div>
          <p className="eyebrow">Cartas desde la sala de curado</p>
          <h2>Nuevos lotes. Notas útiles. Sin ruido.</h2>
        </div>
        <form className="newsletter-form" onSubmit={subscribe}>
          <label htmlFor="newsletter-email">Correo electrónico</label>
          <div>
            <input id="newsletter-email" type="email" required placeholder="nombre@ejemplo.com" />
            <button type="submit" aria-label="Suscribirse al boletín"><ArrowIcon /></button>
          </div>
          <p aria-live="polite">{subscribed ? 'Estás en la lista de demostración. No se envió ningún correo.' : 'Solo notas ocasionales. Puedes cancelar la suscripción cuando quieras.'}</p>
        </form>
      </div>
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <span className="brand__mark" aria-hidden="true">F/F</span>
          <h2>Field &amp; Form</h2>
          <p>Jabón botánico para días comunes y hermosos.</p>
        </div>
        <div className="footer-links">
          <div><h3>Explora</h3><a href="#shop">Lote actual</a><a href="#method">Nuestro método</a><a href="#journal">Notas de campo</a></div>
          <div><h3>Información</h3><a href="#dispatch">Envío semanal</a><a href="#ingredients">Ingredientes y estándares</a><a href="#journal">Avances de notas de cuidado</a></div>
          <div><h3>Prototipo</h3><button type="button" onClick={onOpenInventory}><SlidersIcon /> Editor de inventario</button><span>Sin pedidos ni pagos reales</span></div>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <p>© {new Date().getUTCFullYear()} Prototipo de Field &amp; Form</p>
        <p>Creado como demostración de interfaz · No es una tienda activa</p>
      </div>
    </footer>
  )
}

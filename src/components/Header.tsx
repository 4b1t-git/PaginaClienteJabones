import { useEffect, useRef, useState } from 'react'
import { BagIcon, CloseIcon, MenuIcon, SlidersIcon } from './Icons'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  onOpenInventory: () => void
}

export const Header = ({ cartCount, onOpenCart, onOpenInventory }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setMenuOpen(false)
      menuToggleRef.current?.focus()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="announcement">
        <p>Lotes pequeños, empacados sin plástico · Envíos los miércoles</p>
        <a href="#dispatch">Conoce nuestro ritmo semanal</a>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Inicio de Field & Form" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">F/F</span>
          <span className="brand__name">Field &amp; Form</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#shop">Ver el lote</a>
          <a href="#method">Nuestro método</a>
          <a href="#dispatch">Envíos</a>
          <a href="#journal">Notas de campo</a>
        </nav>

        <div className="header-actions">
          <button className="header-action desktop-inventory" type="button" onClick={onOpenInventory}>
            <SlidersIcon />
            <span>Inventario de demostración</span>
          </button>
          <button className="header-action cart-button" type="button" onClick={onOpenCart}>
            <BagIcon />
            <span>Carrito</span>
            <span className="cart-count" aria-label={`${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'} en el carrito`}>{cartCount}</span>
          </button>
          <button
            className="icon-button menu-toggle"
            ref={menuToggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          <nav aria-label="Navegación móvil">
            <a href="#shop" onClick={closeMenu}>Ver el lote</a>
            <a href="#method" onClick={closeMenu}>Nuestro método</a>
            <a href="#dispatch" onClick={closeMenu}>Envíos</a>
            <a href="#journal" onClick={closeMenu}>Notas de campo</a>
          </nav>
          <button
            type="button"
            className="text-button mobile-editor-button"
            onClick={() => {
              closeMenu()
              onOpenInventory()
            }}
          >
            <SlidersIcon /> Abrir inventario de demostración
          </button>
        </div>
      </header>
    </>
  )
}

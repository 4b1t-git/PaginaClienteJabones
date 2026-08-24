import { useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutModal } from './components/CheckoutModal'
import {
  DispatchSection,
  FeaturedStory,
  JournalSection,
  MethodSection,
  ValuesSection,
} from './components/EditorialSections'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InventoryEditor } from './components/InventoryEditor'
import { ProductCard } from './components/ProductCard'
import { QuickViewModal } from './components/QuickViewModal'
import { Reveal } from './components/Reveal'
import {
  CART_STORAGE_KEY,
  CATALOG_STORAGE_KEY,
  getDemoProducts,
  localizeStoredProducts,
  restoreStoredCart,
} from './data/products'
import { useNow } from './hooks/useNow'
import { usePersistentState } from './hooks/usePersistentState'
import type { CartItem, Product } from './types'
import { isProductPurchasable } from './utils/catalog'
import { formatDispatchDate, getNextWednesdayISO } from './utils/dates'

export default function App() {
  const [products, setProducts] = usePersistentState<Product[]>(CATALOG_STORAGE_KEY, getDemoProducts, localizeStoredProducts)
  const [cart, setCart] = usePersistentState<CartItem[]>(CART_STORAGE_KEY, () => [], restoreStoredCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const now = useNow()

  const dispatchDate = formatDispatchDate(getNextWednesdayISO())
  const lines = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)
    return product ? [{ product, quantity: item.quantity }] : []
  })
  const cartCount = lines.reduce((total, line) => total + line.quantity, 0)

  const addToCart = (product: Product) => {
    if (!isProductPurchasable(product, now) || product.stock <= 0) return

    let added = false
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return current
        added = true
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      added = true
      return [...current, { productId: product.id, quantity: 1 }]
    })

    window.setTimeout(() => {
      if (added) {
        setAddedProductId(product.id)
        setNotice(`${product.name} se agregó al carrito.`)
        window.setTimeout(() => setAddedProductId(null), 1300)
      } else {
        setNotice(`Ya agregaste al carrito todas las barras disponibles de ${product.name}.`)
      }
    }, 0)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.productId !== productId))
      return
    }
    const product = products.find((candidate) => candidate.id === productId)
    if (!product) return
    const nextQuantity = Math.max(1, Math.min(quantity, Math.max(product.stock, 1)))
    setCart((current) =>
      current.map((item) => item.productId === productId ? { ...item, quantity: nextQuantity } : item),
    )
  }

  const updateProduct = (productId: string, patch: Partial<Product>) => {
    setProducts((current) =>
      current.map((product) => product.id === productId ? { ...product, ...patch } : product),
    )
  }

  const featuredProduct = products.find((product) => product.id === 'citrus-sun') ?? products[0]

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenInventory={() => setInventoryOpen(true)}
      />
      <main id="main-content">
        <Hero />
        <ValuesSection />

        <section className="catalog section-shell" id="shop" aria-labelledby="catalog-title">
          <Reveal className="catalog__heading">
            <div><p className="section-index">El lote actual / 02</p><h2 id="catalog-title">Jabones con sentido de pertenencia.</h2></div>
            <p>Barras cortadas a mano, con pequeñas variaciones de color, borde y detalles botánicos. Justo como deben ser.</p>
          </Reveal>
          <div className="product-grid">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 80}>
                <ProductCard
                  product={product}
                  now={now}
                  added={addedProductId === product.id}
                  onQuickView={setQuickView}
                  onAdd={addToCart}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {featuredProduct && <FeaturedStory product={featuredProduct} now={now} onView={setQuickView} />}
        <MethodSection />
        <DispatchSection dispatchDate={dispatchDate} />
        <JournalSection />
      </main>
      <Footer onOpenInventory={() => setInventoryOpen(true)} />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        now={now}
        dispatchDate={dispatchDate}
        onClose={() => setCartOpen(false)}
        onRemove={(productId) => setCart((current) => current.filter((item) => item.productId !== productId))}
        onQuantityChange={updateQuantity}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <InventoryEditor
        open={inventoryOpen}
        products={products}
        now={now}
        onClose={() => setInventoryOpen(false)}
        onUpdate={updateProduct}
        onReset={() => setProducts(getDemoProducts())}
      />
      <QuickViewModal product={quickView} now={now} onClose={() => setQuickView(null)} onAdd={addToCart} />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        dispatchDate={dispatchDate}
        onClose={() => setCheckoutOpen(false)}
        onOrderComplete={() => setCart([])}
      />
      <div className="sr-only" aria-live="polite" aria-atomic="true">{notice}</div>
    </>
  )
}

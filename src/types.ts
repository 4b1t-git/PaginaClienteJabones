export type ProductStatus = 'available' | 'sold-out' | 'coming-soon' | 'preview'

export interface Product {
  id: string
  name: string
  subtitle: string
  description: string
  story: string
  ingredients: string
  weight: string | null
  price: number | null
  stock: number
  status: ProductStatus
  availableAt?: string
  image: string
  images?: string[]
  imageAlt: string
  accent: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartLine {
  product: Product
  quantity: number
}

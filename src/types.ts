export type ProductStatus = 'available' | 'sold-out' | 'coming-soon'

export interface Product {
  id: string
  name: string
  subtitle: string
  description: string
  story: string
  ingredients: string
  weight: string
  price: number
  stock: number
  status: ProductStatus
  availableAt?: string
  image: string
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

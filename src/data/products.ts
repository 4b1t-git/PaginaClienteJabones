import type { CartItem, Product } from '../types'
import { migrateLegacyImageUrl, publicAssetUrl } from '../utils/assets'

export const CATALOG_STORAGE_KEY = 'field-and-form.catalog.v1'
export const CART_STORAGE_KEY = 'field-and-form.cart.v1'

const ROSA_CARMESI_ID = 'rosa-carmesi'
const FLOR_SERENA_ID = 'flor-serena'
const LEGACY_ROSA_CARMESI_ID = 'olive-leaf'

const futureDate = (days: number, hours = 0) =>
  new Date(Date.now() + ((days * 24 + hours) * 60 * 60 * 1000)).toISOString()

export const getDemoProducts = (): Product[] => [
  {
    id: ROSA_CARMESI_ID,
    name: 'Rosa Carmesí',
    subtitle: 'Sebo de res · aceite de coco · rosa roja',
    description:
      'Una barra floral de espuma cremosa, formulada para limpiar con suavidad y favorecer una sensación hidratada, tersa y confortable en la piel.',
    story:
      'La esencia de rosa roja aporta el carácter de la fórmula y un perfil antioxidante apreciado en el cuidado cosmético, sin perder la sencillez de sus tres ingredientes.',
    ingredients: 'Sebo de res, aceite de coco y esencia de rosa roja.',
    weight: null,
    price: null,
    stock: 7,
    status: 'preview',
    image: publicAssetUrl('images/rosa-carmesi/rosa-carmesi-front.png'),
    images: [
      publicAssetUrl('images/rosa-carmesi/rosa-carmesi-front.png'),
      publicAssetUrl('images/rosa-carmesi/rosa-carmesi-side-one.png'),
      publicAssetUrl('images/rosa-carmesi/rosa-carmesi-back.png'),
      publicAssetUrl('images/rosa-carmesi/rosa-carmesi-side-two.png'),
    ],
    imageAlt: 'Vista frontal del jabón artesanal Rosa Carmesí',
    accent: '#8f3449',
  },
  {
    id: FLOR_SERENA_ID,
    name: 'Flor Serena',
    subtitle: 'Sebo de res · aceite de coco · aceite de canola',
    description:
      'Una barra de limpieza suave, formulada para pieles delicadas y para dejar una sensación cómoda e hidratada después del uso.',
    story:
      'El sebo de res se combina con los aceites de coco y canola en una fórmula sencilla pensada para una rutina de cuidado gentil.',
    ingredients: 'Sebo de res, aceite de coco y aceite de canola.',
    weight: null,
    price: null,
    stock: 11,
    status: 'preview',
    image: publicAssetUrl('images/flor-serena/flor-serena-front.png'),
    images: [
      publicAssetUrl('images/flor-serena/flor-serena-front.png'),
      publicAssetUrl('images/flor-serena/flor-serena-side-one.png'),
      publicAssetUrl('images/flor-serena/flor-serena-back.png'),
      publicAssetUrl('images/flor-serena/flor-serena-side-two.png'),
    ],
    imageAlt: 'Vista frontal del jabón artesanal Flor Serena',
    accent: '#bc7a43',
  },
  {
    id: 'clay-calendula',
    name: 'Arcilla y caléndula',
    subtitle: 'Arcilla rosa · caléndula · geranio',
    description:
      'Una barra floral suave, con arcilla rosa y pétalos de caléndula esparcidos a mano para una limpieza delicada.',
    story:
      'Las flores de caléndula se infusionan en aceite de girasol durante tres semanas antes de verter el primer lote.',
    ingredients: 'Aceites saponificados de oliva, coco y girasol, arcilla rosa, caléndula y geranio.',
    weight: '110 g / 3,9 oz',
    price: 15,
    stock: 7,
    status: 'available',
    image: publicAssetUrl('images/clay-calendula.svg'),
    imageAlt: 'Escena vectorial de un jabón terracota con banda kraft, flores y pétalos secos de caléndula',
    accent: '#b96f57',
  },
  {
    id: 'oat-milk',
    name: 'Avena serena',
    subtitle: 'Leche de avena · manteca de cacao · manzanilla',
    description:
      'Sin fragancia y extra suave, con avena coloidal y manteca de cacao para una espuma delicada y cremosa.',
    story:
      'Creada para rutinas tranquilas: sin aceites esenciales, sin color añadido y con una fórmula deliberadamente breve.',
    ingredients: 'Aceites saponificados de oliva y coco, manteca de cacao, leche de avena, avena coloidal y manzanilla.',
    weight: '105 g / 3,7 oz',
    price: 13,
    stock: 5,
    status: 'available',
    image: publicAssetUrl('images/quiet-oat.svg'),
    imageAlt: 'Escena vectorial de un jabón marfil con banda kraft, espigas de avena y manzanilla seca',
    accent: '#b39158',
  },
  {
    id: 'charcoal-pine',
    name: 'Bosque nocturno',
    subtitle: 'Carbón activado · pino · pimienta negra',
    description:
      'Una barra oscura con aroma a bosque, carbón activado y un toque intenso de pimienta negra.',
    story:
      'Marmoleada a mano en moldes pequeños, para que cada corte tenga un patrón de cielo nocturno ligeramente distinto.',
    ingredients: 'Aceites saponificados de oliva y coco, carbón activado, pino, abeto y pimienta negra.',
    weight: '110 g / 3,9 oz',
    price: 15,
    stock: 0,
    status: 'sold-out',
    image: publicAssetUrl('images/night-grove.svg'),
    imageAlt: 'Escena vectorial de un jabón de carbón marmoleado con banda kraft, pino y pimienta negra',
    accent: '#343b33',
  },
  {
    id: 'citrus-sun',
    name: 'Sol cítrico',
    subtitle: 'Cúrcuma · naranja dulce · petitgrain',
    description:
      'Una barra dorada y luminosa con cúrcuma cálida y el frescor verde de las hojas cítricas.',
    story:
      'Una barra para la mañana inspirada en todo el huerto de cítricos: fruta, hoja y rama leñosa.',
    ingredients: 'Aceites saponificados de oliva y coco, cúrcuma, naranja dulce, petitgrain y litsea.',
    weight: '110 g / 3,9 oz',
    price: 14,
    stock: 18,
    status: 'coming-soon',
    availableAt: futureDate(2, 6),
    image: publicAssetUrl('images/citrus-sun.svg'),
    imageAlt: 'Escena vectorial de un jabón amarillo con banda kraft, naranja seca, cáscara y hojas cítricas',
    accent: '#d18a38',
  },
  {
    id: 'lavender-mist',
    name: 'Bruma de lavanda',
    subtitle: 'Lavanda · raíz de ancusa · caolín',
    description:
      'Una barra violeta de tono tenue, con espuma aterciopelada y un aroma limpio a lavanda, nunca dulce.',
    story:
      'Teñida únicamente con aceite infusionado con raíz de ancusa, que cambia de azul a violeta mientras la barra se cura.',
    ingredients: 'Aceites saponificados de oliva y coco, caolín, raíz de ancusa y lavanda.',
    weight: '110 g / 3,9 oz',
    price: 15,
    stock: 9,
    status: 'available',
    image: publicAssetUrl('images/lavender-mist.svg'),
    imageAlt: 'Escena vectorial de un jabón malva con banda kraft, vetas cremosas, lavanda y pétalos secos',
    accent: '#77718b',
  },
]

const legacyProductNames: Record<string, string> = {
  'clay-calendula': 'Clay & Calendula',
  'oat-milk': 'Quiet Oat',
  'charcoal-pine': 'Night Grove',
  'citrus-sun': 'Citrus Sun',
  'lavender-mist': 'Lavender Mist',
}

export const localizeStoredProducts = (products: Product[]) => {
  const localizedProducts = new Map(getDemoProducts().map((product) => [product.id, product]))
  const hasRosaCarmesi = products.some((product) => product.id === ROSA_CARMESI_ID)
  const hasFlorSerena = products.some((product) => product.id === FLOR_SERENA_ID)

  let localizedCatalog = products.flatMap((product) => {
    if (product.id === LEGACY_ROSA_CARMESI_ID) {
      return hasRosaCarmesi ? [] : [localizedProducts.get(ROSA_CARMESI_ID)!]
    }

    const localized = localizedProducts.get(product.id)
    const image = migrateLegacyImageUrl(product.image)
    const images = product.images?.map(migrateLegacyImageUrl)
    if (!localized) return [{ ...product, image, images }]

    const hasLegacyName = product.name === legacyProductNames[product.id]
    const isRosaCarmesi = product.id === ROSA_CARMESI_ID

    return [{
      ...product,
      image: isRosaCarmesi ? localized.image : image,
      images: isRosaCarmesi ? localized.images : images,
      name: hasLegacyName ? localized.name : product.name,
      subtitle: localized.subtitle,
      description: localized.description,
      story: localized.story,
      ingredients: localized.ingredients,
      weight: hasLegacyName || product.weight === undefined ? localized.weight : product.weight,
      price: product.price === undefined ? localized.price : product.price,
      imageAlt: localized.imageAlt,
    }]
  })

  if (!hasFlorSerena) {
    const florSerena = localizedProducts.get(FLOR_SERENA_ID)!
    const rosaCarmesiIndex = localizedCatalog.findIndex((product) => product.id === ROSA_CARMESI_ID)
    const insertionIndex = rosaCarmesiIndex === -1 ? localizedCatalog.length : rosaCarmesiIndex + 1

    localizedCatalog = [
      ...localizedCatalog.slice(0, insertionIndex),
      florSerena,
      ...localizedCatalog.slice(insertionIndex),
    ]
  }

  return localizedCatalog
}

export const restoreStoredCart = (items: CartItem[]) => {
  const productIds = new Set(getDemoProducts().map((product) => product.id))
  return items.filter(
    (item) => productIds.has(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0,
  )
}

# Prototipo de tienda LinaNaturals

Prototipo frontend de una tienda para un emprendimiento de jabones botánicos elaborados en lotes pequeños. El proyecto utiliza Vite, React y TypeScript, con ilustraciones SVG originales almacenadas localmente y sin recursos remotos.

## Instalación

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Abre la dirección local que muestra Vite en la terminal.

## Comandos

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run typecheck  # Ejecuta el compilador de TypeScript
npm run build      # Valida los tipos y crea la compilación de producción
npm run preview    # Sirve localmente la compilación de producción
```

## Funcionamiento del prototipo

- El catálogo muestra productos disponibles, agotados y próximos lanzamientos.
- Los próximos lanzamientos incluyen una cuenta regresiva en tiempo real. Cuando llega la fecha de lanzamiento, el producto puede comprarse si tiene existencias.
- **Inventario del prototipo**, disponible en el encabezado y el pie de página, abre un editor local para modificar el nombre, precio, existencias, estado y fecha de lanzamiento de cada producto.
- Los cambios del catálogo y el contenido del carrito se guardan en `localStorage`. **Restablecer datos de demostración** recupera el catálogo original y asigna una nueva fecha futura al producto Sol Cítrico.
- Los controles de cantidad del carrito respetan las existencias actuales. Los productos no disponibles deben eliminarse o ajustarse antes de finalizar la compra.
- El proceso de compra es una demostración: no solicita datos de pago, no procesa cobros y no crea pedidos reales.
- La página muestra el próximo miércoles de despacho mediante un cálculo de fecha UTC. Esta fecha representa una ventana de despacho, no una promesa de entrega.

## Datos y recursos

- Catálogo de demostración: `src/data/products.ts`
- Reglas de estado de los productos: `src/utils/catalog.ts`
- Cálculo del próximo miércoles: `src/utils/dates.ts`
- Ilustraciones SVG locales: `public/images/`
- Sistema visual y comportamiento adaptable: `src/styles.css`

Claves de almacenamiento local:

- `field-and-form.catalog.v1`
- `field-and-form.cart.v1`

Elimina estas claves desde las herramientas de desarrollo del navegador para borrar todos los datos guardados del prototipo.

## Requisitos pendientes para producción

Este proyecto todavía no es un sistema de comercio electrónico listo para producción. Una implementación real requiere un CMS o una base de datos, administración autenticada y autorizada, control transaccional del inventario, API de productos y pedidos, impuestos y reglas de envío regionales, un proveedor de pagos con webhooks verificados, correos transaccionales, integraciones de preparación y despacho, revisión de analítica y privacidad, validación de datos, protección contra abuso, gestión de secretos y una auditoría completa de seguridad, accesibilidad y calidad.

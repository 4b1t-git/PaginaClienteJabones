import type { Product } from '../types'
import { formatAvailability, formatMoney, getEffectiveStatus, statusLabel } from '../utils/catalog'
import { ArrowIcon, LeafIcon, TruckIcon } from './Icons'
import { Countdown } from './Countdown'
import { Reveal } from './Reveal'

export const ValuesSection = () => (
  <section className="values section-shell" id="ingredients" aria-labelledby="values-title">
    <Reveal className="values__intro">
      <p className="section-index">Nuestro estándar / 01</p>
      <h2 id="values-title">Menos, pero bien pensado.</h2>
      <p>Cada decisión empieza con la barra y se extiende hasta el papel que la envuelve.</p>
    </Reveal>
    <div className="values__grid">
      <Reveal delay={80} className="value-card">
        <span>01</span><h3>Fórmulas con plantas enteras</h3><p>Aceites, arcillas, hierbas y aceites esenciales reconocibles. Sin colorantes sintéticos ni aceite de palma.</p>
      </Reveal>
      <Reveal delay={150} className="value-card">
        <span>02</span><h3>El tiempo como ingrediente</h3><p>Cada lote reposa durante al menos seis semanas para crear una barra más firme y duradera.</p>
      </Reveal>
      <Reveal delay={220} className="value-card">
        <span>03</span><h3>Nada innecesario</h3><p>Papel reciclado, cinta activada con agua y paquetes preparados sin plástico.</p>
      </Reveal>
    </div>
  </section>
)

interface FeaturedStoryProps {
  product: Product
  now: number
  onView: (product: Product) => void
}

export const FeaturedStory = ({ product, now, onView }: FeaturedStoryProps) => {
  const status = getEffectiveStatus(product, now)

  return (
    <section className="featured-story section-shell" aria-labelledby="featured-title">
      <Reveal className="featured-story__visual">
        <div className="featured-story__halo" />
        <img src={product.image} alt={product.imageAlt} />
        <p>Raíz dorada<br />Hoja verde de cítrico</p>
      </Reveal>
      <Reveal className="featured-story__content" delay={120}>
        <p className="section-index">En la sala de curado / 03</p>
        <p className={`status-pill status-pill--${status}`}>{statusLabel[status]}</p>
        <h2 id="featured-title">Un poco de sol para el lavamanos.</h2>
        <p className="featured-story__lead">
          Sol cítrico combina la calidez terrosa de la cúrcuma con naranja dulce y petitgrain: fruta y hoja,
          luminosidad y carácter.
        </p>
        <p>
          El color proviene por completo de la cúrcuma molida. Mientras la barra se cura, su tono caléndula
          intenso se transforma en un dorado cálido y natural.
        </p>
        {status === 'coming-soon' && (
          <div className="featured-story__release">
            <span>Próximo corte disponible el {formatAvailability(product.availableAt)}</span>
            <Countdown availableAt={product.availableAt} now={now} />
          </div>
        )}
        <button className="text-link" type="button" onClick={() => onView(product)}>
          Conoce la barra · {formatMoney(product.price)} <ArrowIcon />
        </button>
      </Reveal>
    </section>
  )
}

export const MethodSection = () => (
  <section className="method" id="method" aria-labelledby="method-title">
    <div className="section-shell method__inner">
      <Reveal className="method__title">
        <p className="section-index">Del aceite a la barra / 04</p>
        <h2 id="method-title">Hacerlo sin prisa es la esencia.</h2>
      </Reveal>
      <div className="method__steps">
        <Reveal className="method-step" delay={70}>
          <span>01</span><div><h3>Infusionar</h3><p>Los ingredientes botánicos reposan en aceites hasta transmitirles su color y carácter.</p></div>
        </Reveal>
        <Reveal className="method-step" delay={140}>
          <span>02</span><div><h3>Verter</h3><p>Cada fórmula se mezcla, vierte y marmolea a mano en moldes pequeños.</p></div>
        </Reveal>
        <Reveal className="method-step" delay={210}>
          <span>03</span><div><h3>Cortar</h3><p>La pieza se corta a mano al día siguiente. Los bordes irregulares son parte de su historia.</p></div>
        </Reveal>
        <Reveal className="method-step" delay={280}>
          <span>04</span><div><h3>Curar</h3><p>Seis semanas de reposo permiten que el agua se evapore y que la espuma se vuelva suave y duradera.</p></div>
        </Reveal>
      </div>
    </div>
  </section>
)

interface DispatchSectionProps {
  dispatchDate: string
}

export const DispatchSection = ({ dispatchDate }: DispatchSectionProps) => (
  <section className="dispatch section-shell" id="dispatch" aria-labelledby="dispatch-title">
    <Reveal className="dispatch__card">
      <div className="dispatch__icon"><TruckIcon /></div>
      <div className="dispatch__copy">
        <p className="section-index">Un ritmo semanal / 05</p>
        <h2 id="dispatch-title">Un envío preparado con cuidado, cada miércoles.</h2>
        <p>
          Agrupamos los paquetes en un solo envío semanal para mantener un ritmo eficiente en el taller. Los
          pedidos se preparan para el siguiente miércoles; aquí no se garantizan la recolección ni la fecha de entrega.
        </p>
      </div>
      <div className="dispatch__date">
        <span>Próximo envío planificado</span>
        <strong>{dispatchDate}</strong>
        <small>Fecha calculada en UTC para mostrar un valor estable en el prototipo.</small>
      </div>
    </Reveal>
  </section>
)

export const JournalSection = () => (
  <section className="journal section-shell" id="journal" aria-labelledby="journal-title">
    <Reveal className="journal__heading">
      <div><p className="section-index">Notas de campo / 06</p><h2 id="journal-title">Para espacios más serenos.</h2></div>
      <p>Notas sobre ingredientes, cuidado y cómo generar menos residuos en el lavamanos.</p>
    </Reveal>
    <div className="journal__grid">
      <Reveal className="journal-card journal-card--large">
        <div className="journal-card__art journal-card__art--olive"><LeafIcon /></div>
        <p className="eyebrow">Estudio de materiales · 6 min</p>
        <h3>Aceite de oliva: por qué el ingrediente más discreto hace el trabajo más importante</h3>
        <a href="#newsletter">Únete para recibir próximas notas de campo <ArrowIcon /></a>
      </Reveal>
      <Reveal className="journal-card" delay={100}>
        <div className="journal-card__art journal-card__art--clay"><span>42</span></div>
        <p className="eyebrow">Práctica del taller · 4 min</p>
        <h3>Qué sucede realmente durante un curado de seis semanas</h3>
        <a href="#newsletter">Únete para recibir próximas notas de campo <ArrowIcon /></a>
      </Reveal>
      <Reveal className="journal-card" delay={180}>
        <div className="journal-card__art journal-card__art--charcoal"><span>∞</span></div>
        <p className="eyebrow">Guía de cuidado · 3 min</p>
        <h3>Una pequeña jabonera de madera puede hacer que una barra dure mucho más</h3>
        <a href="#newsletter">Únete para recibir próximas notas de campo <ArrowIcon /></a>
      </Reveal>
    </div>
  </section>
)

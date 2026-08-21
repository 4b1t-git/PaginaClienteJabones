import { ArrowIcon, LeafIcon } from './Icons'

export const Hero = () => (
  <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero__copy">
      <p className="eyebrow"><LeafIcon /> Jabón botánico, elaborado sin prisa</p>
      <h1 id="hero-title">
        Rituales cotidianos,
        <em> cultivados en el campo.</em>
      </h1>
      <p className="hero__lede">
        Jabones de proceso en frío inspirados en plantas enteras, un curado paciente y la convicción de
        que los objetos útiles también pueden sentirse extraordinarios.
      </p>
      <div className="hero__actions">
        <a className="button button--dark" href="#shop">Explora el lote <ArrowIcon /></a>
        <a className="text-link" href="#method">Por qué curamos durante seis semanas <ArrowIcon /></a>
      </div>
      <dl className="hero__notes" aria-label="Estándares del producto">
        <div><dt>01</dt><dd>Aceites vegetales primero</dd></div>
        <div><dt>02</dt><dd>Paquetes sin plástico</dd></div>
        <div><dt>03</dt><dd>Elaborados en lotes pequeños</dd></div>
      </dl>
    </div>

    <div className="hero__visual" aria-label="Bodegón del jabón Hoja de olivo">
      <div className="hero__shape hero__shape--clay" />
      <div className="hero__shape hero__shape--olive" />
      <img src="/images/olive-leaf.svg" alt="Composición vectorial cenital de jabones pastel con una barra de olivo en primer plano" />
      <p className="hero__caption"><span>Lote 04</span> Hoja de olivo / romero / cedro</p>
      <span className="hero__seal" aria-hidden="true">Corte manual<br />Seis semanas de curado</span>
    </div>
  </section>
)

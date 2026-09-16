export default function PageHero({image,eyebrow,title,description}) {
  return <section className="pageHero photoPageHero">
    <img className="pageHeroPhoto" src={image} alt="" aria-hidden="true" fetchPriority="high"/>
    <div className="pageHeroShade" aria-hidden="true"/>
    <div className="container pageHeroCopy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
  </section>;
}

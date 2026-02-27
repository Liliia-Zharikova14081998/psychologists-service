import css from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.heroWrapper}>
          
          <div className={css.heroContent}>
            <h1 className={css.title}>
              The road to the <span>depths</span> of the human soul
            </h1>
            <p className={css.subtitle}>
              We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
            </p>
            <Link className={`${css.btnHero} button`} href="/psychologists">
              Get started
              <svg width="14" height="16" className={css.icon}>
                <use href="/symbol-defs.svg#icon-Arrow-16"></use>
              </svg>
            </Link>
          </div>

          <div className={css.imageWrapper}>
            <img src="/image/hero/Hero.jpg" alt="Psychologist" className={css.mainImage} />
            
  <div className={css.statsCard}>
    <div className={css.checkIcon}>
      <svg className={css.checkIconSvg} width="30" height="30">
        <use href="/symbol-defs.svg#icon-feCheck1"></use>
      </svg>
    </div>
              <div className={css.statsTextContent}>
                 <p className={css.statsText}>Experienced psychologists</p>
      <p className={css.statsNumber}>15,000</p>
     
    </div>
  </div>

  <div className={css.decorIcon}>
    <svg className={css.iconQuestion} width="10" height="17">
      <use href="/symbol-defs.svg#icon-fa6-solid_question"></use>
    </svg>
  </div>

  <div className={css.userDecorIcon}>
    <svg className={css.iconUsers} width="20" height="20">
      <use href="/symbol-defs.svg#icon-mdi_users"></use>
    </svg>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
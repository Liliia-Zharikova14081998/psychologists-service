import css from "./Header.module.css";
import { HeaderClient } from "./HeaderClient/HeaderClient";
import Link from "next/link";

export default function Header() { 
  return (
      <header className={css.header}>
          <div className='container'>
              <div className={css.headerContainer}>
              <Link href="/" className={css.logo}>
          psychologists<span className={css.logoDot}>.</span><span className={css.logoServices}>services</span>
        </Link>
         <HeaderClient/>
  </div>
    </div>
    </header>
    );
}
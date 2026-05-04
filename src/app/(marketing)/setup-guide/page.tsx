import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CATEGORIES } from "./data";
import { CategoryExplorer } from "./CategoryExplorer";
import styles from "./setup-guide.module.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-setup-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-setup-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setup Guide",
  description:
    "The curated list of furnishings and supplies Forteca Estate uses to outfit new Pocono Mountain short-term rentals. 314 products, tested across 60+ properties.",
};

const STATS = [
  { value: "30", unit: "M", label: "Annual Visitors" },
  { value: "$7.2", unit: "B", label: "Traveler Spending (2024)" },
  { value: "Top 5", unit: "%", label: "STR Yield Nationally" },
  { value: "3", unit: "HR", label: "From 47M People" },
] as const;

export default function SetupGuidePage() {
  return (
    <div className={`${cormorant.variable} ${inter.variable} ${styles.root}`}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroCrest}>FORTECA ESTATE</div>
        <div className={styles.heroDiamond}>◆</div>
        <div className={styles.heroEyebrow}>The New Client</div>
        <h1 className={styles.heroTitle}>
          <span className="line">Setup</span>
          <span className="line italic">Guide</span>
        </h1>
        <div className={styles.heroRule} />
        <p className={styles.heroDescription}>
          The <strong>Pocono Mountains</strong> is one of the most popular
          short-term rental destinations in the country — ranked in the top 5%
          for STR yield nationally. This is the curated list Forteca Estate
          uses to outfit every new property we manage.
        </p>
        <div className={styles.heroMeta}>
          <span>314 Products</span>
          <span className={styles.heroMetaDot} />
          <span>29 Categories</span>
          <span className={styles.heroMetaDot} />
          <span>Pocono Tested</span>
        </div>
      </div>

      {/* Market stats */}
      <section className={styles.marketStats}>
        <div className={styles.statsHeader}>
          <div className={styles.statsEyebrow}>Why the Poconos</div>
          <h2 className={styles.statsHeading}>
            One of America&apos;s <em>leading</em>
            <br />
            short-term rental markets.
          </h2>
          <p className={styles.statsSub}>
            Four-season demand, proximity to 47 million people, and consistent
            year-over-year growth.
          </p>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCell}>
              <div className={styles.statValue}>
                {stat.value}
                <span className="unit">{stat.unit}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
        <p className={styles.statsSource}>
          Sources: Pocono Mountains Visitors Bureau · AirDNA · Airbtics
        </p>

        <div className={styles.disclosure}>
          As an Amazon Associate, Forteca Estate earns from qualifying purchases
          — at no additional cost to you. We only recommend products our team
          actively uses in the properties we manage.
        </div>
      </section>

      {/* Nav + selected category */}
      <CategoryExplorer categories={CATEGORIES} />

      {/* Closing */}
      <section className={styles.closingSection}>
        <div className={styles.closingDivider}>◆</div>
        <h2 className={styles.closingTitle}>
          Ready to <em>launch?</em>
        </h2>
        <p className={styles.closingText}>
          Forteca Estate handles photography, listing creation, and
          multi-platform setup across Airbnb, Vrbo, and direct booking. Your
          onboarding specialist coordinates delivery, installation, and
          first-stay preparation.
        </p>
        <a
          href="mailto:forteca@fortecaestate.com?subject=New%20Client%20Onboarding"
          className={styles.cta}
        >
          Schedule a Consultation
        </a>
      </section>
    </div>
  );
}

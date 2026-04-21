"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Category, Product } from "./data";
import styles from "./setup-guide.module.css";

type Props = {
  categories: Category[];
};

export function CategoryExplorer({ categories }: Props) {
  const [activeSlug, setActiveSlug] = useState<string>(
    categories[0]?.slug ?? "",
  );
  const sectionRef = useRef<HTMLElement | null>(null);

  const active = useMemo(
    () => categories.find((c) => c.slug === activeSlug) ?? categories[0],
    [activeSlug, categories],
  );

  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
    // Smooth-scroll the category panel into view.
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  if (!active) return null;

  return (
    <>
      <nav className={styles.navSection} aria-label="Browse by category">
        <div className={styles.navHeading}>Browse by Category</div>
        <div className={styles.navGrid} role="tablist">
          {categories.map((cat) => {
            const isActive = cat.slug === activeSlug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="setup-guide-active-category"
                onClick={() => handleSelect(cat.slug)}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
              >
                <span className={styles.navNumeral}>
                  {cat.numeral.replace(/\.$/, "")}
                </span>
                <span className={styles.navLabel}>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <section
        ref={sectionRef}
        id="setup-guide-active-category"
        role="tabpanel"
        aria-label={active.title}
        className={styles.categorySection}
      >
        <div className={styles.categoryHeader}>
          <div className={styles.categoryNumeral}>
            {active.numeral.replace(/\.$/, "")}
          </div>
          <div>
            <h2 className={styles.categoryTitle}>{active.title}</h2>
            <p className={styles.categoryIntro}>{active.intro}</p>
          </div>
        </div>

        {active.subsections.map((sub, idx) => (
          <div
            key={`${active.slug}-sub-${idx}`}
            className={styles.subsection}
          >
            {sub.title ? (
              <h4 className={styles.subsectionTitle}>{sub.title}</h4>
            ) : null}
            <div className={styles.productGrid}>
              {sub.products.map((p, pIdx) => (
                <ProductCard key={`${active.slug}-${idx}-${pIdx}`} product={p} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const priorityClass =
    product.priority === "essential"
      ? styles.productCardEssential
      : product.priority === "signature"
        ? styles.productCardSignature
        : "";

  const className = `${styles.productCard} ${priorityClass}`;

  const inner = (
    <>
      <div className={styles.productContent}>
        <div className={styles.productHeader}>
          <h3 className={styles.productName}>{product.name}</h3>
          {product.qty ? (
            <span className={styles.qtyBadge}>{product.qty}</span>
          ) : null}
        </div>
        {product.notes ? (
          <p className={styles.productNotes}>{product.notes}</p>
        ) : null}
      </div>
      <div className={styles.productFooter}>
        {product.price ? (
          <span className={styles.productPrice}>{product.price}</span>
        ) : (
          <span />
        )}
        {product.href ? (
          <span className={styles.shopArrow}>Shop on Amazon &rarr;</span>
        ) : null}
      </div>
    </>
  );

  if (product.href) {
    return (
      <a
        href={product.href}
        className={className}
        target="_blank"
        rel="nofollow sponsored noopener"
      >
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}

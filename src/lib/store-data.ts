export interface StoreProduct {
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  sizes: string[];
  images: { src: string; alt: string }[];
}

export const storeProducts: StoreProduct[] = [
  {
    slug: "forteca-estate-dad-hat",
    name: "Forteca Estate Dad Hat",
    price: 25.5,
    description:
      "Classic unstructured dad hat in black with embroidered Forteca Estate logo. Low-profile, adjustable strap, one size fits most.",
    details: [
      "100% chino cotton twill",
      "Unstructured, low-profile",
      "Pre-curved visor",
      "Adjustable metal buckle strap",
      "Embroidered Forteca Estate logo",
      "One size fits most",
    ],
    sizes: ["One Size"],
    images: [
      { src: "/images/store/hat/front.webp", alt: "Dad hat front view" },
      {
        src: "/images/store/hat/right-front.webp",
        alt: "Dad hat right front angle",
      },
      {
        src: "/images/store/hat/right-side.webp",
        alt: "Dad hat right side",
      },
      {
        src: "/images/store/hat/left-side.webp",
        alt: "Dad hat left side",
      },
      { src: "/images/store/hat/back.webp", alt: "Dad hat back view" },
    ],
  },
  {
    slug: "forteca-estate-champion-sweatshirt",
    name: "Champion Sweatshirt with Forteca Logo",
    price: 65.5,
    description:
      "Premium Champion Reverse Weave sweatshirt in black with embroidered Forteca Estate logo. Heavyweight fleece, ribbed cuffs and hem.",
    details: [
      "Champion Reverse Weave construction",
      "82% cotton, 18% polyester",
      "Heavyweight 12 oz fleece",
      "Reduced shrinkage and pilling",
      "Ribbed cuffs, collar, and waistband",
      "Embroidered Forteca Estate logo",
      "Champion 'C' logo on left sleeve",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      {
        src: "/images/store/sweatshirt/front.webp",
        alt: "Champion sweatshirt front view",
      },
      {
        src: "/images/store/sweatshirt/front-2.webp",
        alt: "Champion sweatshirt front detail",
      },
      {
        src: "/images/store/sweatshirt/back.webp",
        alt: "Champion sweatshirt back view",
      },
      {
        src: "/images/store/sweatshirt/back-2.webp",
        alt: "Champion sweatshirt back detail",
      },
      {
        src: "/images/store/sweatshirt/details.webp",
        alt: "Champion sweatshirt product details",
      },
    ],
  },
];

export function getProduct(slug: string): StoreProduct | undefined {
  return storeProducts.find((p) => p.slug === slug);
}

# Public Pages

## Layout Structure

All public pages (except admin) are wrapped with the `Header` and `Footer` components via route-specific layouts:

- `(marketing)/layout.tsx` — wraps pages under `/`, `/about`, `/blog`, `/contact`, `/services`, `/store`, `/cart`, `/testimonials`, `/terms`, `/privacy-policy`
- `properties/layout.tsx` — wraps `/properties` and `/properties/[slug]`
- `booking/layout.tsx` — wraps `/booking/[slug]`

## Header (`src/components/layout/Header.tsx`)

- Sticky, z-50, backdrop blur with semi-transparent navy background
- Logo (image + text) linking to `/`
- Desktop nav (7 links): Getaways, Services, About Us, Blog, Testimonials, Contact Us, Store
- Nav is absolutely centered (`left-1/2 -translate-x-1/2`) independent of logo/CTA widths
- **Context-aware CTA button**:
  - Default: gold "Book Now" button → `/properties`
  - On `/store` or `/cart` pages: gold "Cart" button with item count badge → `/cart`
- Mobile: hamburger menu triggers `MobileNav` slide-out drawer
- Mobile also shows cart icon with badge on store pages

## Homepage (`/`)

1. **Hero**: Full-viewport video background (`hero.mp4`), overlay, mountain SVG silhouette. "Your Getaway Starts Here" headline with "Pennsylvania · New York · Florida" badge.
2. **Stats strip**: 44 Properties / 3 States / 1000+ Happy Guests / Est. 2019
3. **Featured properties**: Grid of 4 `PropertyCard` components (feature variant). Data from `getFeaturedProperties()`.
4. **Amenity marquee**: Auto-scrolling horizontal strip (Hot Tubs, Lakefront Access, etc.)
5. **Services**: 4 cards (Vacation Rentals, Property Management, Home Staging, Hot Tubs)
6. **Testimonials**: Top 3 reviews from Supabase (featured first). Falls back to generic reviews if Supabase empty.
7. **Newsletter**: Inline signup form via `NewsletterForm` component.
8. **Final CTA**: "Your perfect stay is one click away."

## Properties Listing (`/properties`)

- Hero with property count
- `PropertyFilters` client component handles all filtering and display:
  - **Type filters**: All, Cabin, Villa/Estate, Waterfront, Hot Tub, Pool, Pet Friendly
  - **Location search**: Text input uses Nominatim geocoding (free, no API key) to convert zip/city to lat/lng
  - **Radius selector**: 10, 25, 50, 100, 250 miles
  - **Distance calculation**: Haversine formula for each property
  - **Sorting**: By distance when location filter active, by name otherwise
- Properties displayed as `PropertyCard` grid (grid variant)

## Property Detail (`/properties/[slug]`)

- `generateStaticParams()` pre-renders all property slugs at build time
- Back nav to `/properties`
- Hero image with gradient overlay, property name, location, review stats
- Photo gallery: thumbnail grid of up to 10 images
- Quick specs: bedrooms, bathrooms, max guests
- Description section
- Amenities list with check icons
- **Guest Reviews**: Fetched from Supabase `reviews` table where `property_id` matches and `is_approved = true`. Shows star rating + quote + author.
- **Booking sidebar** (sticky):
  - Price: "from $XXX / night"
  - "Book Direct" gold button → DirectStays URL (`https://fortecaestate.directstays.com/property/{slug}`)
  - "Book on Airbnb" button (with Airbnb SVG icon)
  - "Book on VRBO" button (with VRBO SVG icon)
  - "Min. N nights · Free cancellation"

## Blog Listing (`/blog`)

- Fetches published posts from Supabase `blog_posts` table ordered by `published_at` desc
- **Featured post** (first): Full-width card with thumbnail image or navy gradient fallback. Title overlaid on image.
- **Grid**: Remaining posts in 3-column grid. Each shows thumbnail or gradient, title, excerpt, date.
- Empty state: "Coming Soon" message

## Blog Post (`/blog/[slug]`)

- Dynamic metadata with OG image from first blog image
- Navy hero with title, author ("Forteca Estate"), publish date
- **Image gallery** (`BlogImageGallery` client component):
  - Single image: simple full-width display
  - Multiple images: slideshow with left/right arrows, counter badge, thumbnail strip below
- Content rendering: splits on `\n\n` (after normalizing `\r\n`), then handles:
  - Bullet lists (`- item`)
  - Bold headings (`**Title**` on own paragraph)
  - Section headers (`**Title** body text`)
  - Regular paragraphs with inline `**bold**`

## Store (`/store`)

- Hero section: "The Forteca Store"
- Product grid (2 columns): Dad Hat ($25.50), Champion Sweatshirt ($65.50)
- Each card: product image, name, description, price, size options
- Links to `/store/[slug]` detail pages

## Product Detail (`/store/[slug]`)

- `generateStaticParams()` pre-renders both product slugs
- Image gallery with thumbnail strip
- Size selector (radio-style buttons)
- "Add to Cart" button with green flash confirmation
- Product details list (material, construction, features)
- Data sourced from `src/lib/store-data.ts` (static, not Supabase)

## Cart (`/cart`)

- `CartView` client component using `useCart()` context
- Empty state: shopping bag icon + "Browse Store" link
- Cart items: image, name, size, quantity +/- controls, remove button, line total
- Summary: subtotal, shipping note
- "Checkout Coming Soon" disabled button (placeholder for Stripe)
- "Clear Cart" text button

## About (`/about`)

- Hero: "We Love What We Do."
- Stats strip: Founded 2019, 44 Properties, 1000+ Stays, 3 States
- Story section: founding narrative
- Values: 4 value cards (Genuine Hospitality, Uncompromising Standards, Curated Excellence, The Forteca Difference)
- Team section: group photo + 3 individual headshots (Justyna Rzeszuto, Lukasz Kownacki, Eryk Rachwal)
- CTA

## Services (`/services`)

- 3 service cards: Vacation Rentals, Property Management, Home Staging
- Each links to detail page
- Hot Tubs section with photo grid and feature checklist

## Contact (`/contact`)

- Two-column layout: form (left), contact info (right)
- `ContactForm` client component: name, email, phone, subject dropdown, message
- Validates with Zod, submits to `/api/contact`
- Contact details: email, phone, area (PA/NY/FL), response time
- Property owner callout card

## Testimonials (`/testimonials`)

- Fetches all approved reviews from Supabase (up to 100, featured first)
- Stats: average rating, review count, property count (dynamically calculated)
- Masonry-style grid (3 columns) with review cards
- Each card: source badge, star rating, quote, guest name, property link

## Footer

- 5-column grid: Brand + socials, Properties, Services, Company, Legal
- Newsletter signup form (footer variant)
- Copyright

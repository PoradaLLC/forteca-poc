# Admin Dashboard

## Access

- URL: `/admin` (redirects to `/admin/login` if not authenticated)
- Auth: Supabase email/password login
- Role check: `user.app_metadata.role === "admin"` or `user.user_metadata.role === "admin"`
- To create an admin user: set the role via Supabase dashboard or SQL: `UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}' WHERE email = 'user@example.com';`

## Layout

Admin pages live under `src/app/admin/(dashboard)/`. The `(dashboard)` route group layout:
1. Checks Supabase configuration — shows helpful message if env vars missing
2. Validates auth session — redirects to login if no user or not admin
3. Renders two-column layout: `AdminSidebar` (left, 240px) + main content (right, scrollable)
4. Background: `#0a1520` (darker than navy)

No Header or Footer renders on admin pages.

## Sidebar Navigation

| Tab | Route | Description |
|-----|-------|-------------|
| Dashboard | `/admin` | Stats overview + quick links |
| Properties | `/admin/properties` | Toggle property visibility |
| Blog | `/admin/blog` | Create, edit, publish, delete posts |
| Newsletter | `/admin/newsletter` | Subscriber list + broadcast emails |
| Reviews | `/admin/reviews` | Approve/reject/feature reviews |
| Settings | `/admin/settings` | General config + Hospitable info |

**External links** (bottom of sidebar):
- Hospitable Dashboard (gold button) → `https://my.hospitable.com/...`
- Stripe Dashboard (blue button) → `https://dashboard.stripe.com`

## Dashboard Page (`/admin`)

Shows 4 stat cards:
- Active Properties → links to `/admin/properties`
- Published Posts → links to `/admin/blog`
- Reviews → links to `/admin/reviews`
- Subscribers → links to `/admin/newsletter`

Alert bar if pending reviews exist.

Two quick-link cards: Hospitable Dashboard + Stripe Dashboard.

## Properties Management (`/admin/properties`)

- Table view of all properties with: name, tagline, beds/baths/guests, nightly rate, status, external links
- **Status dropdown**: `active` / `inactive` / `maintenance` — changes are immediate via server action
- **No delete button** — properties can only be hidden, not deleted
- External links: view on website, Airbnb URL (if set)
- "Add Property" button (placeholder, not yet functional — properties are added via Supabase directly)

## Blog Management (`/admin/blog`)

### Blog List
- Table with: title, excerpt, status badge (published/draft), date, actions
- New Post button → `/admin/blog/new`
- Actions per post: toggle publish/draft, delete (with confirmation)

### Blog Editor (`BlogPostForm`)
- Fields: title, slug (auto-generated if blank), photos, excerpt, content
- **Photo upload**: multi-file upload to `blog-images` Supabase bucket
  - Photos displayed in grid with preview
  - First photo tagged as "Thumbnail" (gold badge)
  - Reorder photos with left/right arrows
  - Delete removes from Supabase Storage immediately
  - Note shown: "The first photo will be used as the blog thumbnail on the index page"
- **Content**: textarea with markdown-like formatting support
  - `**bold text**` → bold
  - Double newline → paragraph break
  - `- item` → bullet list
  - `**Heading**` (bold on own line) → section heading
- Two submit buttons: "Save Draft" and "Publish"

### Blog Post Deletion
When a blog post is deleted, its images are also removed from the `blog-images` storage bucket.

## Newsletter Management (`/admin/newsletter`)

### Stats
- Total subscribers, active, unsubscribed — displayed in 3 stat cards

### Broadcast Email
- Compose form: subject + body
- Sends to ALL active subscribers via Resend
- Confirmation dialog shows subscriber count before sending
- Results shown: sent count, failed count
- Email template: branded Forteca HTML with "Browse Properties" CTA

### Subscriber Table
- Columns: email, name, status (active/inactive badge), subscribed date, actions
- Actions per subscriber: toggle active/inactive, delete (with confirmation)

## Review Moderation (`/admin/reviews`)

- Table with: guest name, property name, 5-star rating display, review text (truncated), source badge, featured toggle, approval status, date, actions
- Source badges: airbnb (pink), vrbo (indigo), google (green), direct (blue)
- **Featured toggle**: sparkle icon — featured reviews appear first on public pages
- **Approval**: approve button (green check), reject/delete button (red X with confirmation)
- Pending reviews highlighted with subtle gold background

## Settings (`/admin/settings`)

- Hospitable/DirectStays info card with "Open Hospitable" CTA
- General settings: check-in time, check-out time, minimum stay (form inputs, currently non-functional — display only)

## Hospitable Page (`/admin/hospitable`)

- Overview of Hospitable features: calendar, messaging, payments, analytics
- Primary CTA: "Open Hospitable Dashboard"
- Quick links to Hospitable dashboard and DirectStays booking page

## Stripe Page (`/admin/stripe`)

- Overview of Stripe features: payments, invoices, payouts, fraud protection
- Primary CTA: "Open Stripe Dashboard"
- Quick links to payments, payouts, customers sections

## Server Actions (`src/app/admin/actions.ts`)

All admin mutations are server actions with `requireAdmin()` guard:

| Action | What It Does |
|--------|-------------|
| `approveReview(id)` | Set `is_approved = true` |
| `rejectReview(id)` | Delete review from database |
| `toggleFeaturedReview(id, current)` | Toggle `is_featured` |
| `uploadBlogImage(formData)` | Upload file to `blog-images` bucket, return `{url, path}` |
| `deleteBlogImage(path)` | Remove file from `blog-images` bucket |
| `createBlogPost(formData)` | Insert blog post with images |
| `updateBlogPost(id, formData)` | Update blog post and images |
| `deleteBlogPost(id)` | Delete post + remove all its images from storage |
| `toggleBlogPostStatus(id, status)` | Toggle draft/published |
| `toggleSubscriberStatus(id, active)` | Toggle subscriber active/inactive |
| `deleteSubscriber(id)` | Remove subscriber |
| `sendBroadcastEmail(formData)` | Send HTML email to all active subscribers via Resend |
| `updatePropertyStatus(id, status)` | Change property to active/inactive/maintenance |
| `deleteProperty(id)` | Delete property (exists but button removed from UI) |

All actions call `revalidatePath()` to bust Next.js cache after mutations.

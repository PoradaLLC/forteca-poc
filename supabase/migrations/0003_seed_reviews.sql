-- ============================================================
-- Forteca Estate — Real Guest Reviews Seed
-- Sources: DirectStays (direct), Airbnb, VRBO
-- All imported from live listings and fortecaestate.com/testimonals
-- ============================================================

-- Clear any existing reviews to avoid duplicates on re-run
DELETE FROM reviews;

-- ─── BLVCK CABIN I ───────────────────────────────────────────
-- DirectStays: /property/blvck-cabin-i-w-wood-hot-tub-near-bushkill-falls
-- Airbnb: from fortecaestate.com/testimonals

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Isabella', 5,
  'Beautiful lodge! The interior looks exactly like the photos; clean on arrival, no smells, no issues with wifi or smart TV, comfortable beds, and fully stocked kitchen. The location is in the middle of the woods, very peaceful, and lovely to sit in the backyard. The hosts were friendly, responsive, and gave clear instructions.',
  'direct', true, true, '2026-01-20'
FROM properties WHERE slug = 'blvck-cabin-i';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Anisha', 5,
  'Me and my husband loved our stay, it was a very different vibe. While there was a small hiccup with the wifi, it was easily fixed because the owners were very responsive to us and kept in check if we needed anything else. Would come back here again!',
  'direct', true, false, '2026-02-10'
FROM properties WHERE slug = 'blvck-cabin-i';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Nikita', 5,
  'Peaceful and serene location. Perfect for those folks that want to escape the hustle and bustle of the city. Great to get away and unwind with nature. The road getting to the property is no joke, come prepared with an AWD vehicle! Over all great time!',
  'direct', true, false, '2026-02-18'
FROM properties WHERE slug = 'blvck-cabin-i';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Vanessa', 5,
  'A great place to stay especially for a large group! We all had our space when needed but the dining room and living room was a good place to hang out. The view is amazing! The deck on each floor was icing on the cake. Our dog loved staying out there. The bedrooms were great with their own bathrooms. The kitchen was a good bonus for us since we all cooked the entire stay. A clean place and is really true to its posting! We had a family of 13 with an infant child and a toddler and it was more than enough space. Lukasz was quick to answer my questions. Overall a great stay! We would definitely book again.',
  'airbnb', true, true, '2020-11-01'
FROM properties WHERE slug = 'blvck-cabin-i';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Patricia', 5,
  'This property is perfect for a large family/friends getaway with mixed ages and it is pet friendly. Each bedroom has its own private bathroom and each room/bathroom was provided with bedding, towels, soap, shampoo and conditioner. The location is close to town and the hosts were easy to work with as well as helpful with restaurant suggestions and things to do in the area. The views of the mountain from the house are spectacular. We will definitely stay here again!',
  'airbnb', true, false, '2020-12-01'
FROM properties WHERE slug = 'blvck-cabin-i';

-- ─── BLVCK CABIN II ──────────────────────────────────────────
-- DirectStays: /property/modern-blvck-cabin-2-near-bushkill-falls-hot-tub

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Yakov', 5,
  'We had a great time. Beautiful, secluded area, perfect for a mid-week getaway. Place is basically as described, very peaceful and nice. Very nice easy to communicate with hosts. Will definitely recommend this place to friends and family.',
  'direct', true, true, '2026-03-05'
FROM properties WHERE slug = 'blvck-cabin-ii';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Natacha', 5,
  'The house was so beautiful and relaxing, the area is just so peaceful — I made a great choice. Also a great experience on the mountains. The host was so helpful, responding was fast. I had a great birthday getaway, even though it was short I loved everything. I will definitely stay there again if I plan another trip.',
  'direct', true, false, '2026-03-12'
FROM properties WHERE slug = 'blvck-cabin-ii';

-- ─── BLVCK CABIN III ─────────────────────────────────────────
-- DirectStays: /property/modern-blvck-cabin-3-near-bushkill-fall-hot-tub

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Tamilya', 5,
  'Overall, we had a great stay. The place was very nice, clean, and comfortable, and everything was pretty much perfect for our visit. The only small issue we noticed was that the dining room table was very unstable, which made it a little difficult to use. Aside from that minor issue, we really enjoyed the space and had a great experience overall. Thank you for hosting us!',
  'direct', true, true, '2026-03-08'
FROM properties WHERE slug = 'blvck-cabin-iii';

-- ─── BLVE CABIN ──────────────────────────────────────────────
-- DirectStays: /property/blve-cabin-wood-hottub-near-bushkill-falls

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Meghan', 5,
  'We had an excellent stay! The house was spotless, beautifully maintained, and had amazing amenities that made it feel like a home away from home. The mattress was so comfortable along with the bedding. Everything was thoughtfully provided, and it was clear the hosts truly care about their guests'' experience. We couldn''t have asked for a better stay and would absolutely book again.',
  'direct', true, true, '2026-02-22'
FROM properties WHERE slug = 'blve-cabin';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Lis', 5,
  'My friends and I had a great stay. Truly enjoyed our time away from home. This house was very beautiful and cozy. I will probably book again in the summer to be able to enjoy the outdoor of the house better.',
  'direct', true, false, '2026-02-15'
FROM properties WHERE slug = 'blve-cabin';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Shlok', 5,
  'Great location in the mountains. Booked this place to come and stay after my ski trip at Camelback Resort. Hot tub was something fun and unique to warm up. Overall great experience would definitely recommend this place! 10/10!!',
  'direct', true, false, '2026-01-28'
FROM properties WHERE slug = 'blve-cabin';

-- ─── SCENIC GETAWAY ──────────────────────────────────────────
-- DirectStays: /property/scenic-cabin-by-bushkill-falls-shawnee-whot-tub

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Mohammed', 5,
  'Amazing and responsive hosts. Me and my wife were running late for checkout as we had to make our prayers and the host was very understanding and friendly. Would definitely recommend.',
  'direct', true, true, '2026-02-08'
FROM properties WHERE slug = 'scenic-getaway';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Andrii', 5,
  'We had a great stay here for two days. The place was clean, comfortable, and exactly as described in the listing. The location was convenient, and check-in/check-out was smooth. Would definitely consider staying here again.',
  'direct', true, false, '2026-01-15'
FROM properties WHERE slug = 'scenic-getaway';

-- ─── ARCTIC GETAWAY ──────────────────────────────────────────
-- DirectStays: /property/arctic-getaway-whot-tub-outdoor-tv-near-bushkill

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Danielle', 5,
  'A birthday getaway with my girls was exactly what my soul needed. Getting away from the city and stepping into a place that felt so peaceful and quiet was everything — it honestly felt like our own little spa retreat. The scenery was beautiful, the space was so clean and spacious, and just being surrounded by nature was refreshing. Even though it was a little chilly, we still made the most of the outdoors relaxing on the deck, lounging, enjoying the sauna, and just taking in the calm. Once we finally got the jacuzzi right, we jumped in and it was absolutely worth the wait. Overall, it was truly a 10/10 experience. Just being able to relax, laugh all night, and enjoy such a beautiful space with amazing friends meant everything. Will be coming back!',
  'direct', true, true, '2026-03-15'
FROM properties WHERE slug = 'arctic-getaway';

-- ─── MOUNTAIN LAKE GETAWAY ───────────────────────────────────
-- DirectStays: /property/mountain-lake-getaway-with-hot-tub

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Kevin', 5,
  'We had an amazing stay at this cozy mountain-lake getaway! The private hot tub was the absolute highlight — perfect for relaxing. The outdoor space with the fire pit, playground, and deck was super inviting. The location in the gated community is peaceful and close to everything in the Poconos. Highly recommend for a quick escape from the city.',
  'direct', true, true, '2026-03-10'
FROM properties WHERE slug = 'mountain-lake-getaway';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Eliza', 5,
  'This is our second time staying at this location — first time for our wedding anniversary and this time just to get away from the city with our son. He absolutely loved the toy chest and the variety it had in it. We absolutely love the area, it''s quiet, the deer come up to say hi. We have a family friend that lives in the area and she was able to come visit us for dinner. All in all, we love this location, it''s one of our favorites.',
  'direct', true, false, '2026-03-18'
FROM properties WHERE slug = 'mountain-lake-getaway';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Narolyn', 5,
  'Me encantó todo, todo fue como lo describía la imagen, todo estaba muy limpio y la estadía fue tan tranquila se sentía mucha paz, amé el jacuzzi y el área de fogata me sentí como en una película, sin duda volvería a este lugar a quitarme el estrés de la ciudad!!!',
  'direct', true, false, '2026-03-20'
FROM properties WHERE slug = 'mountain-lake-getaway';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Hector', 5,
  'Quería agradecerles por permitirnos hospedarnos en su hermosa cabaña. Desde el momento en que llegamos nos sentimos muy cómodos y bienvenidos. El lugar está muy bien cuidado, limpio y tiene un ambiente muy agradable y acogedor. Realmente se nota la dedicación y el cariño que le ponen al espacio. Sin duda fue una excelente experiencia y la recomendaríamos con gusto. Muchas gracias nuevamente por todo y esperamos volver en el futuro. 10/10',
  'direct', true, false, '2026-02-25'
FROM properties WHERE slug = 'mountain-lake-getaway';

-- ─── RUSTIC HEAVEN ───────────────────────────────────────────
-- DirectStays: /property/4bd-modern-rustic-heaven-whot-tubsauna-in-pocono

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Kalianna', 5,
  'We had an absolutely wonderful stay! The home is truly beautiful inside and out. Perfect location near the ski resorts we went to! The host was responsive, welcoming, and made everything easy from check in to check out. I would highly recommend this property and would gladly stay again!',
  'direct', true, true, '2026-03-02'
FROM properties WHERE slug = 'rustic-heaven';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Olena', 5,
  'Wonderful place with beautiful modern design and an amazing view from the window. Everything was clean, comfortable, and well thought out. We truly didn''t want to leave — highly recommend!',
  'direct', true, false, '2026-02-12'
FROM properties WHERE slug = 'rustic-heaven';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Maksim', 5,
  'Great experience at Forteca Estate''s home. We spent 4 nights and everything was great. House located 30 minutes away from Blue Mountain Ski Resort. Host was super polite and responsive. We enjoyed our stay. Sauna and hot tub is something else. We highly recommend this place. Thank you!',
  'direct', true, false, '2026-01-10'
FROM properties WHERE slug = 'rustic-heaven';

-- ─── MOUNTAIN OASIS ──────────────────────────────────────────
-- DirectStays: /property/pond-haven-retreat-wwood-burning-hottub-firepit

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Marcin', 5,
  'So happy to have stayed at Forteca''s home!! This was the perfect getaway from the city. The hot tub was great, clear instructions to get it started and had a great experience. We will definitely be back!!',
  'direct', true, true, '2026-02-05'
FROM properties WHERE slug = 'mountain-oasis';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Brianna', 5,
  'This was the perfect getaway to celebrate our engagement. Relaxing and peaceful with a beautiful scenery surrounding us! The host was very responsive and welcoming. I would definitely come again!',
  'direct', true, false, '2026-01-22'
FROM properties WHERE slug = 'mountain-oasis';

-- ─── RAMPERSAD POCONOS HOME ──────────────────────────────────
-- DirectStays: /property/gorgeous-4br-with-hot-tub-pool

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Wilmaris', 5,
  'Had a great time at the home! It was 6 of us staying and there were many amenities to keep us entertained, including a game room, hot tub, and sauna. The fenced yard was ideal for our dog, and we found the area very private and peaceful. Highly recommended.',
  'direct', true, true, '2026-03-22'
FROM properties WHERE slug = 'rampersad-poconos-home';

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Marc', 5,
  'Fun house in private development with pool table, hot tub and sauna. Really enjoyed the visit with coworkers and appreciated the proximity to skiing and tubing activities. Host''s communication and clear instructions made the whole experience smooth.',
  'direct', true, false, '2026-01-18'
FROM properties WHERE slug = 'rampersad-poconos-home';

-- ─── HAPPY TRAILS ────────────────────────────────────────────
-- DirectStays: /property/cozy-mountaingetaway-near-bushkill-whottubsauna

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Meesh', 5,
  'Let me start off by saying that this was one of the most beautiful and peaceful places I''ve been to in a while. It was so quiet, the house looks just like the pictures. The host was very responsive and welcoming. I''ll definitely be back.',
  'direct', true, true, '2026-01-30'
FROM properties WHERE slug = 'happy-trails';

-- ─── POCONO GETAWAY ──────────────────────────────────────────
-- DirectStays: /property/perfect-pocono-escape-hot-tub-sauna-outdoor-tv

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Laura', 5,
  'Amazing, quiet getaway for my husband and I. Clean and quiet space, very homey. Both the hot tub and sauna are heated by a fireplace — unique and worth the wait. The perfect escape from the city.',
  'direct', true, true, '2026-02-20'
FROM properties WHERE slug = 'pocono-getaway';

-- ─── POCONO VILLA ────────────────────────────────────────────
-- VRBO review from fortecaestate.com/testimonals

INSERT INTO reviews (property_id, guest_name, rating, content, source, is_approved, is_featured, created_at)
SELECT id, 'Larry', 5,
  'We just celebrated a Friendsgiving at Forteca''s place with 5 couples. The space was very clean, we all had our own rooms and private baths. The views are spectacular and the hosts were excellent to work with!',
  'vrbo', true, true, '2020-11-25'
FROM properties WHERE slug = 'pocono-villa';

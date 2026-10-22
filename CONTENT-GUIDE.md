# Sample-content and launch replacement guide

This is a **concept website**, not a representation of an operating venue. All current descriptions, prices, room details, events and testimonials are sample content. Sample images are marked in the interface and use `sample-` filenames.

## Before launch

- [ ] Replace the business name, phone, WhatsApp, email, address, social URLs and final domain in `site.config.js`.
- [ ] Confirm all venue opening hours and the `Africa/Lagos` timezone.
- [ ] Replace every sample photograph with owned or properly licensed venue photography.
- [ ] Update image alt text when a replacement shows something different.
- [ ] Replace all dishes, dietary tags, allergen wording and NGN prices.
- [ ] Confirm the weekly events, admission details and age/door policies.
- [ ] Confirm snooker table count, rates and last-table policy.
- [ ] Confirm room names, sizes, occupancy, beds, amenities and rates.
- [ ] Replace fictional testimonials with verified guest feedback, or remove the section.
- [ ] Replace the map placeholder with the verified Google Maps embed URL.
- [ ] Test all three Netlify forms and configure form notifications.
- [ ] Test the WhatsApp number on mobile and desktop.
- [ ] Update `siteUrl`, then verify canonical, Open Graph, schema, `robots.txt` and `sitemap.xml` on the final domain.

## Image map

Originals live in `image-source/`; responsive WebP derivatives are generated in `public/assets/images/`.

### Custom concept imagery

These are AI-generated sample images, not photographs of a real Mayfair venue:

- `sample-hero.jpg` — hero and general restaurant gallery
- `sample-restaurant-room.jpg` — restaurant interior
- `sample-restaurant-dish.jpg` — restaurant dish
- `sample-open-lounge.jpg` — open-air lounge
- `sample-lounge-cocktail.jpg` — cocktail detail
- `sample-vvip-suite.jpg` — VVIP main interior
- `sample-vvip-detail.jpg` — VVIP detail
- `sample-snooker-room.jpg` — snooker main interior
- `sample-snooker-detail.jpg` — snooker detail
- `sample-room-standard.jpg` — Standard Room main image

### Unsplash stock placeholders

The remaining images were downloaded from Unsplash as temporary stock content. Direct source URLs are recorded here for provenance. Review the current Unsplash licence and replace them with final property photography before launch.

- `sample-room-deluxe.jpg`  
  https://images.unsplash.com/photo-1590490360182-c33d57733427
- `sample-room-deluxe-detail.jpg`  
  https://images.unsplash.com/photo-1618773928121-c32242e63f39
- `sample-room-suite.jpg`  
  https://images.unsplash.com/photo-1578683010236-d716f9a3f461
- `sample-room-detail.jpg`  
  https://images.unsplash.com/photo-1566665797739-1674de7a421a
- `sample-room-standard-detail.jpg`  
  https://images.unsplash.com/photo-1582719478250-c89cae4dc85b
- `sample-bathroom.jpg`  
  https://images.unsplash.com/photo-1584622650111-993a426fbf0a

## Fonts

Cormorant Garamond and Manrope are served locally through Fontsource packages. Their open-font licences are copied to `public/assets/fonts/` during the asset build.

## Sample claims to verify

Nothing on the concept site should be treated as a confirmed business claim. In particular, verify the restaurant cuisine, private-host service, premium-spirit selection, parking, breakfast, turndown service, Wi-Fi, room sizes and hotel check-in/out times before publishing.

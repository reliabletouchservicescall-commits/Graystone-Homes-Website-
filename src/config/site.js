export const CONTACT = {
  email: 'info@graystonehomes.co.za',
  phone: '+27 63 956 8901',
  phoneHref: 'tel:+27639568901',
  whatsappHref: 'https://wa.me/27639568901',
  region: 'Gauteng & Western Cape, South Africa',
}

export const SOCIAL_HANDLE = 'thegraystonehomesza'

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: `https://www.instagram.com/${SOCIAL_HANDLE}` },
  { id: 'facebook', label: 'Facebook', href: `https://www.facebook.com/${SOCIAL_HANDLE}` },
  { id: 'tiktok', label: 'TikTok', href: `https://www.tiktok.com/@${SOCIAL_HANDLE}` },
]

export const RESPONSE_HOURS = 2
export const FOUNDED = 'January 2026'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Properties', to: '/properties' },
  { label: 'Tenants', to: '/tenants' },
  { label: 'Contact Us', to: '/contact' },
]

// Realistic for an agency that opened its doors in January 2026.
export const STATS = [
  { value: 140, suffix: '+', label: 'Units let since January 2026' },
  { value: 11, suffix: '', label: 'Average days to let' },
  { value: 98, suffix: '%', label: 'Landlord satisfaction' },
  { value: RESPONSE_HOURS, suffix: 'hr', label: 'Guaranteed response time' },
]

export const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  hero: unsplash('1600585154340-be6161a56a0c', 2200),
  aboutMain: unsplash('1600210492486-724fe5c67fb0', 1200),
  aboutDetail: unsplash('1600607687939-ce8a6c25118c', 800),
  promise: unsplash('1600573472550-8090b5e0745e', 1600),
  capeTown: unsplash('1580060839134-75a5edca2e99', 2200),
  portfolio: [
    { src: unsplash('1613490493576-7fde63acd811', 1200), title: 'Contemporary Villa', area: 'Constantia, Cape Town', type: '4 Bed · Pool' },
    { src: unsplash('1600047509807-ba8f99d2cdde', 1000), title: 'Family Residence', area: 'Midrand, Johannesburg', type: '3 Bed · Garden' },
    { src: unsplash('1600566753190-17f0baa2a6c3', 1000), title: 'Architectural Home', area: 'Bryanston, Sandton', type: '4 Bed · Study' },
    { src: unsplash('1600607687644-c7171b42498f', 1000), title: 'Modern Apartment', area: 'Rosebank, Johannesburg', type: '2 Bed · Secure' },
  ],
  people: {
    thabo: unsplash('1531384441138-2736e62e0919', 300),
    naledi: unsplash('1531123897727-8f129e1688ce', 300),
    sarah: unsplash('1573497019940-1c28c88b4f3e', 300),
  },
  properties: unsplash('1512917774080-9991f1c4c750', 2000),
  contact: unsplash('1600607687939-ce8a6c25118c', 2000),
  tenants: {
    hero: unsplash('1554995207-c18c203602cb', 2200),
    checklist: unsplash('1615874959474-d609969a20ed', 1200),
    freshStart: unsplash('1630699144867-37acec97df5a', 2000),
  },
  services: {
    hero: unsplash('1582268611958-ebfd161ef9cf', 2200),
    placement: unsplash('1626178793926-22b28830aa30', 1400),
    management: unsplash('1600585154526-990dced4db0d', 1400),
    sales: unsplash('1613977257363-707ba9348227', 1400),
    development: unsplash('1503387762-592deb58ef4e', 1400),
    investment: unsplash('1574362848149-11496d93a7c7', 1400),
    statement: unsplash('1486406146926-c627a92ad1ab', 2000),
  },
  about: {
    hero: unsplash('1600566753086-00f18fb6b3ea', 2200),
    team: unsplash('1600880292203-757bb62b4baf', 1200),
    interior: unsplash('1560448204-e02f11c3d0e2', 800),
    handshake: unsplash('1521791136064-7986c2920216', 2000),
    dreamHome: unsplash('1617806118233-18e1de247200', 1400),
    investment: unsplash('1600596542815-ffad4c1539a9', 1400),
  },
}

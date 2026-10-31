import { IMAGES } from '../config/site'

// Skeleton pages — the real content for each of these is still to be built.
export const PLACEHOLDER_PAGES = [
  {
    path: '/about',
    title: 'About Us',
    eyebrow: 'Our Story',
    intro: 'A young, relentless team building the most trusted real estate engine in Africa.',
    image: IMAGES.aboutMain,
    sections: ['Our story', 'Meet the team', 'Vision & mission', 'Our values'],
  },
  {
    path: '/services',
    title: 'Services',
    eyebrow: 'What We Do',
    intro: 'Tenant placement, full property management and everything in between, done properly and done fast.',
    image: IMAGES.services,
    sections: ['Tenant placement', 'Full management', 'Rental assessments', 'Tenant screening', 'Rent collection', 'Inspections'],
  },
  {
    path: '/properties',
    title: 'Properties',
    eyebrow: 'Available Homes',
    intro: 'Secure, sophisticated, lifestyle-driven homes for young professionals and families.',
    image: IMAGES.properties,
    sections: ['Featured listing', 'Listing', 'Listing', 'Listing', 'Listing', 'Listing'],
  },
  {
    path: '/tenants',
    title: 'Tenants',
    eyebrow: 'For Residents',
    intro: 'Apply for a home, log a maintenance request and find everything you need as a Graystone tenant.',
    image: IMAGES.tenants,
    sections: ['Apply for a home', 'Maintenance requests', 'Tenant FAQs', 'Moving-in guide'],
  },
  {
    path: '/contact',
    title: 'Contact Us',
    eyebrow: 'Get In Touch',
    intro: 'Tell us about your property and we will get back to you within 2 hours.',
    image: IMAGES.contact,
    sections: ['Rental assessment form', 'Office details'],
    showContact: true,
  },
]

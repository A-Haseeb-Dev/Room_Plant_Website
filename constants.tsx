
import { Plant, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  { id: 'small', name: 'Small Plants', description: 'Perfect for desks and shelves.', image: 'https://images.unsplash.com/photo-1512428813833-df521757fc51?auto=format&fit=crop&q=80&w=400' },
  { id: 'medium', name: 'Medium Plants', description: 'Great for coffee tables.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400' },
  { id: 'large', name: 'Large Plants', description: 'Floor standing statement pieces.', image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?auto=format&fit=crop&q=80&w=400' },
  { id: 'office', name: 'Office Friendly', description: 'Low light, high impact.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400' },
  { id: 'low-maintenance', name: 'Low Maintenance', description: 'Thrives on neglect.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=400' }
];

export const PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    price: 45.00,
    category: 'large',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600',
    description: 'Famous for its unique heart-shaped leaves with natural holes.',
    careLevel: 'Easy',
    rating: 4.8,
    reviewsCount: 124,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Snake Plant Laurentii',
    scientificName: 'Dracaena trifasciata',
    price: 29.00,
    category: 'low-maintenance',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf7?auto=format&fit=crop&q=80&w=600',
    description: 'The perfect air-purifying plant for beginners.',
    careLevel: 'Easy',
    rating: 4.9,
    reviewsCount: 312,
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    price: 75.00,
    category: 'large',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=600',
    description: 'A striking statement plant with large, violin-shaped leaves.',
    careLevel: 'Intermediate',
    rating: 4.5,
    reviewsCount: 88,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Pothos Golden',
    scientificName: 'Epipremnum aureum',
    price: 18.00,
    category: 'small',
    image: 'https://images.unsplash.com/photo-1596439147352-258079872e61?auto=format&fit=crop&q=80&w=600',
    description: 'A fast-growing vine that is incredibly easy to care for.',
    careLevel: 'Easy',
    rating: 4.7,
    reviewsCount: 205
  },
  {
    id: '5',
    name: 'Calathea Prayer Plant',
    scientificName: 'Goeppertia insignis',
    price: 34.00,
    category: 'medium',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=600',
    description: 'Beautiful patterned leaves that fold up at night.',
    careLevel: 'Advanced',
    rating: 4.2,
    reviewsCount: 45
  },
  {
    id: '6',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    price: 32.00,
    category: 'office',
    image: 'https://images.unsplash.com/photo-1632205301051-17d47d639b97?auto=format&fit=crop&q=80&w=600',
    description: 'Shiny waxy leaves and incredible drought tolerance.',
    careLevel: 'Easy',
    rating: 4.9,
    reviewsCount: 156,
    isBestSeller: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'London, UK',
    text: "The Monstera arrived in perfect condition. It's much bigger than I expected! Truly brought my living room to life.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5
  },
  {
    id: '2',
    name: 'Marc Dupond',
    location: 'Paris, France',
    text: 'Great international shipping. The packaging was eco-friendly and very secure. Will order more for my office.',
    avatar: 'https://i.pravatar.cc/150?u=marc',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Chen',
    location: 'Singapore',
    text: 'I love the care guides! As a first-time plant parent, the advice was invaluable.',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    rating: 4
  }
];

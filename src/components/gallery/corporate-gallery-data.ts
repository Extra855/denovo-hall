import type { GallerySpan } from "./gallery-data";

export type CorporateGalleryCategory =
   | "conferences"
   | "galas"
   | "productLaunch"
   | "celebrations"
   | "seminars"
   | "networking";

export interface CorporateGalleryImage {
   id: string;
   src: string;
   altKey: string;
   category: CorporateGalleryCategory;
   titleKey: string;
   span: GallerySpan;
}

export const corporateGalleryCategories: CorporateGalleryCategory[] = [
   "conferences",
   "galas",
   "productLaunch",
   "celebrations",
   "seminars",
   "networking",
];

export const corporateGalleryImages: CorporateGalleryImage[] = [
   // Conferences (3)
   {
      id: "corp-conf-1",
      src: "/gallery/featured-weddings/1/1.jpg",
      altKey: "CorporateEvents.gallery.items.0.alt",
      category: "conferences",
      titleKey: "CorporateEvents.gallery.items.0.title",
      span: "tall",
   },
   {
      id: "corp-conf-2",
      src: "/gallery/featured-weddings/1/2.jpg",
      altKey: "CorporateEvents.gallery.items.1.alt",
      category: "conferences",
      titleKey: "CorporateEvents.gallery.items.1.title",
      span: "wide",
   },
   {
      id: "corp-conf-3",
      src: "/gallery/featured-weddings/1/3.jpg",
      altKey: "CorporateEvents.gallery.items.2.alt",
      category: "conferences",
      titleKey: "CorporateEvents.gallery.items.2.title",
      span: "normal",
   },
   // Galas (3)
   {
      id: "corp-gala-1",
      src: "/gallery/featured-weddings/1/4.jpg",
      altKey: "CorporateEvents.gallery.items.3.alt",
      category: "galas",
      titleKey: "CorporateEvents.gallery.items.3.title",
      span: "large",
   },
   {
      id: "corp-gala-2",
      src: "/gallery/featured-weddings/1/5.jpg",
      altKey: "CorporateEvents.gallery.items.4.alt",
      category: "galas",
      titleKey: "CorporateEvents.gallery.items.4.title",
      span: "tall",
   },
   {
      id: "corp-gala-3",
      src: "/gallery/featured-weddings/1/6.jpg",
      altKey: "CorporateEvents.gallery.items.5.alt",
      category: "galas",
      titleKey: "CorporateEvents.gallery.items.5.title",
      span: "wide",
   },
   // Product Launch (3)
   {
      id: "corp-launch-1",
      src: "/gallery/featured-weddings/1/1.jpg",
      altKey: "CorporateEvents.gallery.items.6.alt",
      category: "productLaunch",
      titleKey: "CorporateEvents.gallery.items.6.title",
      span: "normal",
   },
   {
      id: "corp-launch-2",
      src: "/gallery/featured-weddings/1/2.jpg",
      altKey: "CorporateEvents.gallery.items.7.alt",
      category: "productLaunch",
      titleKey: "CorporateEvents.gallery.items.7.title",
      span: "wide",
   },
   {
      id: "corp-launch-3",
      src: "/gallery/featured-weddings/1/3.jpg",
      altKey: "CorporateEvents.gallery.items.8.alt",
      category: "productLaunch",
      titleKey: "CorporateEvents.gallery.items.8.title",
      span: "tall",
   },
   // Celebrations (3)
   {
      id: "corp-cele-1",
      src: "/gallery/featured-weddings/1/4.jpg",
      altKey: "CorporateEvents.gallery.items.9.alt",
      category: "celebrations",
      titleKey: "CorporateEvents.gallery.items.9.title",
      span: "wide",
   },
   {
      id: "corp-cele-2",
      src: "/gallery/featured-weddings/1/5.jpg",
      altKey: "CorporateEvents.gallery.items.10.alt",
      category: "celebrations",
      titleKey: "CorporateEvents.gallery.items.10.title",
      span: "normal",
   },
   {
      id: "corp-cele-3",
      src: "/gallery/featured-weddings/1/6.jpg",
      altKey: "CorporateEvents.gallery.items.11.alt",
      category: "celebrations",
      titleKey: "CorporateEvents.gallery.items.11.title",
      span: "large",
   },
   // Seminars (3)
   {
      id: "corp-sem-1",
      src: "/gallery/featured-weddings/1/1.jpg",
      altKey: "CorporateEvents.gallery.items.12.alt",
      category: "seminars",
      titleKey: "CorporateEvents.gallery.items.12.title",
      span: "normal",
   },
   {
      id: "corp-sem-2",
      src: "/gallery/featured-weddings/1/2.jpg",
      altKey: "CorporateEvents.gallery.items.13.alt",
      category: "seminars",
      titleKey: "CorporateEvents.gallery.items.13.title",
      span: "tall",
   },
   {
      id: "corp-sem-3",
      src: "/gallery/featured-weddings/1/3.jpg",
      altKey: "CorporateEvents.gallery.items.14.alt",
      category: "seminars",
      titleKey: "CorporateEvents.gallery.items.14.title",
      span: "wide",
   },
   // Networking (3)
   {
      id: "corp-net-1",
      src: "/gallery/featured-weddings/1/4.jpg",
      altKey: "CorporateEvents.gallery.items.15.alt",
      category: "networking",
      titleKey: "CorporateEvents.gallery.items.15.title",
      span: "large",
   },
   {
      id: "corp-net-2",
      src: "/gallery/featured-weddings/1/5.jpg",
      altKey: "CorporateEvents.gallery.items.16.alt",
      category: "networking",
      titleKey: "CorporateEvents.gallery.items.16.title",
      span: "normal",
   },
   {
      id: "corp-net-3",
      src: "/gallery/featured-weddings/1/6.jpg",
      altKey: "CorporateEvents.gallery.items.17.alt",
      category: "networking",
      titleKey: "CorporateEvents.gallery.items.17.title",
      span: "wide",
   },
];

# ShopEase - E-commerce Product Showcase

A modern, SEO-optimized e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS.

![ShopEase Screenshot](/screenshot.png) <!-- Add your screenshot if available -->

## Features

- **Product Catalog**: Browse products from FakeStoreAPI
- **Product Details**: Complete product information with ratings
- **Shopping Cart**: Add/remove items with Redux state management
- **Checkout Flow**: Form validation with Zod
- **Order History**: View past orders
- **SEO Optimized**: Dynamic meta tags, sitemap, and robots.txt

## Tech Stack

- **Framework**: Next.js (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Types**: TypeScript

## SEO Implementation

- Dynamic meta tags for each product page
- Generated sitemap.xml with product routes
- robots.txt configuration
- Semantic HTML structure
- Optimized image loading with Next.js Image
- Clean URL structure

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/shop-ease.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

## Project Structure
```bash
/app
  /components       # Reusable UI components
  /lib             # API and validation logic
  /slices          # Redux store slices
  /store           # Redux store configuration
  /type           # TypeScript type definitions
  /product/[id]    # Dynamic product pages
  /checkout        # Checkout page
  /orders          # Order history
```

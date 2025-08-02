import Link from 'next/link';
import React from 'react';
import { Product } from '../type/productType';
import Image from 'next/image';

export default function ProductCard({ id, title, price, image, description }: Product) {
  return (
    <article className="border border-[#C6DEC6] rounded-lg shadow-xl hover:shadow-2xl transition duration-200 flex flex-col p-4 h-full">
      <figure className="relative h-48 w-full mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
      </figure>
      <header>
        <h2 className="text-md font-semibold mb-1 line-clamp-2">{title}</h2>
      </header>
      <section aria-labelledby={`price-${id}`}>
        <p id={`price-${id}`} className="text-sm text-gray-700 font-medium mb-3">
          ${price.toFixed(2)}
        </p>
      </section>
      <section aria-labelledby={`desc-${id}`}>
        <p id={`desc-${id}`} className="text-xs text-gray-700 mb-4 line-clamp-2">
          {description}
        </p>
      </section>
      <footer>
        <Link
          href={`/product/${id}`}
          className="mt-auto inline-block text-center bg-[#1d3b1d] text-white px-4 py-2 text-sm rounded hover:bg-[#020402] transition"
          aria-label={`View details for ${title}`}
        >
          View Details
        </Link>
      </footer>
    </article>
  );
}
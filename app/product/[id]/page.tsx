import AddToCartButton from '@/app/Components/AddToCart';
import { productData } from '@/app/lib/api';
import { Product } from '@/app/type/productType';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    params: {
        id: string;
    };
};

export async function generateStaticParams() {
    const products: Product[] = await productData();
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await Promise.resolve(params);
    const products: Product[] = await productData();
    const product = products.find((p) => p.id.toString() === id);

    return {
        title: product ? `${product.title} | ShopEase` : 'Product Not Found',
        description: product ?
            `${product.description.substring(0, 160)}...` :
            'Product not available',
        openGraph: {
            images: product ? [{ url: product.image }] : [],
        },
    };
}

const ProductPage = async ({ params }: Props) => {
    const { id } = await Promise.resolve(params);
    const products: Product[] = await productData();
    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return <div className="text-center text-red-500">Product not found.</div>;
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <article className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
                <section className="grid md:grid-cols-2 gap-8 p-6">
                    <figure className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="object-contain h-96 w-full"
                            priority
                        />
                    </figure>

                    <section className="flex flex-col justify-between">
                        <header>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>

                            <div className="flex items-center mb-4" aria-label="Price and rating">
                                <span className="text-2xl font-semibold text-gray-800">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.rating && (
                                    <div className="ml-4 flex items-center bg-blue-100 px-2 py-1 rounded">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span className="text-sm font-medium">
                                            {product.rating.rate} ({product.rating.count})
                                        </span>
                                    </div>
                                )}
                            </div>
                        </header>

                        <section className="prose max-w-none text-gray-600 mb-6" aria-label="Product description">
                            <p>{product.description}</p>
                        </section>

                        <footer>
                            <div className="mb-6">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    {product.category}
                                </span>
                            </div>
                        </footer>
                    </section>
                </section>

                <nav className="border-t border-gray-200 p-6 bg-gray-50" aria-label="Product actions">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="w-full sm:w-auto">
                            <Link
                                href="/"
                                className="inline-flex w-60 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-100 bg-[#020402] hover:bg-[#212121] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                aria-label="Continue shopping"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>

                        <div className="w-full sm:w-auto">
                            <AddToCartButton product={product} />
                        </div>

                        <div className="w-full sm:w-auto">
                            <Link
                                href="/checkout"
                                className="inline-flex w-60 justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                aria-label="Proceed to checkout"
                            >
                                Proceed to Checkout →
                            </Link>
                        </div>
                    </div>
                </nav>
            </article>
        </main>
    );
};

export default ProductPage;
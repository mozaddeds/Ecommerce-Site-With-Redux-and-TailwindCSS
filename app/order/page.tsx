'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Link from 'next/link';

const OrdersPage = () => {
    const orders = useSelector((state: RootState) => state.cart.orders || []);

    return (
        <main className="max-w-4xl mx-auto p-6">
            {orders.length === 0 ? (
                <section className="text-center py-12" aria-label="No orders section">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link href="/" className="text-blue-600 hover:underline" aria-label="Continue shopping">
                        ← Continue Shopping
                    </Link>
                </section>
            ) : (
                <article className="space-y-6 mt-20 justify-center text-center">
                    <header>
                        <h1 className="text-2xl font-bold text-gray-800">All Your Orders</h1>
                    </header>

                    <section aria-labelledby="orders-table-caption">
                        <div className="overflow-x-auto rounded-xl shadow-lg mt-20 text-center">
                            <table className="min-w-full bg-gradient-to-br from-teal-700 via-emerald-600 to-teal-500">
                                <caption id="orders-table-caption" className="sr-only">List of your recent orders</caption>
                                <thead>
                                    <tr className="bg-teal-800/30 backdrop-blur-sm">
                                        <th scope="col" className="py-3 px-4 text-center text-teal-100 font-medium border-b border-teal-400">Order ID</th>
                                        <th scope="col" className="py-3 px-4 text-center text-teal-100 font-medium border-b border-teal-400">Customer</th>
                                        <th scope="col" className="py-3 px-4 text-center text-teal-100 font-medium border-b border-teal-400">Items</th>
                                        <th scope="col" className="py-3 px-4 text-center text-teal-100 font-medium border-b border-teal-400">Total</th>
                                        <th scope="col" className="py-3 px-4 text-center text-teal-100 font-medium border-b border-teal-400">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-teal-600/20 transition-colors duration-150 border-b border-teal-400 last:border-0"
                                        >
                                            <th scope="row" className="py-3 px-4 text-white font-medium">{order.id}</th>
                                            <td className="py-3 px-4 text-white">{order.customerName}</td>
                                            <td className="py-3 px-4 text-center text-white">{order.items.length}</td>
                                            <td className="py-3 px-4 text-center text-white font-medium">${order.totalAmount.toFixed(2)}</td>
                                            <td className="py-3 px-4 text-center text-white">
                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </article>
            )}
        </main>
    );
};

export default OrdersPage;
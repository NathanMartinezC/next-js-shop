import { db } from '@/database';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsOutOfStock: number;
    lowStockProducts: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    await db.connect();
    
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        lowStockProducts
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lt: 5 } }).count(),
    ]);

    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders: numberOfOrders - paidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        lowStockProducts
    })
}
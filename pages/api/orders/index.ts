import { db } from '@/database'
import { IOrder } from '@/interfaces'
import { Order, Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from '../auth/[...nextauth]'

type Data = 
| { message: string }
| IOrder;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res)
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder

    const session: any = await getServerSession(req, res, authOptions)
    //console.log(session)
    if (!session) {
        return res.status(401).json({ message: 'Not Authorized' })
    }

    const productIds = orderItems.map(item => item._id)
    await db.connect()
    const dbProducts = await Product.find({ _id: { $in: productIds } })

    try {
        const subTotal = orderItems.reduce( (prev, current) => {
            const currentPrice = dbProducts.find( product => product.id === current._id )?.price;
            if ( !currentPrice ) {
                throw new Error('Product not found')
            }
            return ( currentPrice * current.quantity ) + prev
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal + ( subTotal * taxRate );

        if ( total !== backendTotal ) {
            throw new Error('Total does not match')
        }
        console.log('user', session.user.id)
        const userId = session.user.id;
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        newOrder.total = Math.round( newOrder.total * 100 ) / 100;
        
        await newOrder.save()
        await db.disconnect();

        return res.status(201).json(newOrder)

    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.message || 'Something went wrong' })
    }

    return res.status(201).json(req.body)
}
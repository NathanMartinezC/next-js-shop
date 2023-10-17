import { db } from "@/database";
import { IPaypal } from "@/interfaces";
import { Order } from "@/models";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case 'POST':
            return payOrder(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getPayPalBearerToken = async ():Promise<string|null> => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials')

    try {
        const response = await fetch( process.env.PAYPAL_OAUTH_URL || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                Authorization: `Basic ${base64Token}`,
            },
            body: "grant_type=client_credentials"
        });

        const { access_token } = await response.json();
        return access_token;

    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }

}

const payOrder = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const payPalBearerToken = await getPayPalBearerToken();

    if ( !payPalBearerToken ) {
        return res.status(400).json({ message: 'PayPal Bearer Token not found' });
    }

    const { transactionId = '', orderId = '' } = req.body;
    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${ transactionId }`, {
        headers: {
            Authorization: `Bearer ${payPalBearerToken}`,
        }
    });

    if (data.status !== 'COMPLETED') {
        return res.status(400).json({ message: 'Order not completed' });
    }

    await db.connect();
    const dbOrder = await Order.findById(orderId);

    if ( !dbOrder ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Order not found' });
    }

    if ( dbOrder.total !== Number(data.purchase_units[0].amount.value) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Order amount does not match' });
    }

    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();
    await db.disconnect();

    return res.status(200).json({ message: payPalBearerToken });
}
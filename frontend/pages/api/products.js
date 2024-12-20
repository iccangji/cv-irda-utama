// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';


export default async function products(req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?limit=${limit}`);
        res.status(200).json(
            response.data.data
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

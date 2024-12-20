import axios from 'axios';


export default async function topProducts(req, res) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/top-products`);
        res.status(200).json(
            response.data.data
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

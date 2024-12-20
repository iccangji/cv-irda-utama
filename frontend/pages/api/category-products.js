import axios from 'axios';


export default async function ProductsByCategory(req, res) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
        res.status(200).json(
            response.data.data
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

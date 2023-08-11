import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const { SECRET_SALT: salt } = process.env;

export default (request: VercelRequest, response: VercelResponse) => {
    const method = request.method;
    if (method != 'POST') return response.status(405).send('Method Not Allowed').end();
    const secretKey = request.body?.secretKey || '';
    const payload = request.body?.payload || {};
    response.status(200).send({ data: sign(`${salt}.${secretKey}`, payload) });
}

function sign(secretKey: string, payload: any) {
    return jwt.sign(payload, secretKey, {
        expiresIn: '24h'
    });
}
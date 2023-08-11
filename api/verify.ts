import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';

const { SECRET_SALT: salt } = process.env;

export default (request: VercelRequest, response: VercelResponse) => {
    const method = request.method;
    if (method != 'POST') return response.status(405).send('Method Not Allowed').end();
    const secretKey = request.body?.secretKey || '';
    const token = request.body?.token || '';
    response.status(200).send({ data: verify(`${token}`,`${salt}.${secretKey}`) });
}

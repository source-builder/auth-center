import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { SECRET_KEY: secretKey, DATABASE_URL: databaseUrl } = process.env;

export default (request: VercelRequest, response: VercelResponse) => {
    let error = '';
    const constKey = request.query?.constKey || '';
    if (!constKey) error = 'parameter [constKey] is empty';
    const constValue = ENV[`${constKey}`];
    if (!constValue) error = `the value of parameter [${constKey}] is empty`;
    if (error) return response.status(400).send({ data: error }).end();
    response.status(200).send({ data: constValue })
}

const ENV = {
    'SECRET_KEY': secretKey, 'DATABASE_URL': databaseUrl
}
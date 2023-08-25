import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { SECRET_KEY: secretKey, DATABASE_URL: databaseUrl, AUTH_KEY: authKey } = process.env;

export default (request: VercelRequest, response: VercelResponse) => {
    const authToken = request.headers["auth-token"];
    if (!authToken || authKey != authToken)
        return response.status(401).send({ message: `please pass in the correct [auth-token]`, data: '' }).end();

    const constKey = request.query?.constKey || '';
    if (!constKey)
        return response.status(400).send({ message: `parameter [constKey] is empty`, data: '' }).end();

    const constValue = ENV[`${constKey}`];
    if (!constValue)
        return response.status(400).send({ message: `the value of parameter [${constKey}] is empty`, data: '' }).end();

    response.status(200).send({ message: 'query success', data: constValue })
}

const ENV = {
    'SECRET_KEY': secretKey, 'DATABASE_URL': databaseUrl
}
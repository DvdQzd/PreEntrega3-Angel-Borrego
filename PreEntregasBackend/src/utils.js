import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import env from './config.js'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

//configuracion JWT

export const PRIVATE_KEY = env.keyPrivate; //luego exportar desde .env

export const generateToken = (user) => {
    const token = jwt.sign({user}, `${PRIVATE_KEY}`, {expiresIn: '24h'})
    return token
}

export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['cookieToken'];
        return token
    }
    return token;
};

/* export const authToken = (req, res, next) => {
    const authHeader = req.authInfo;
    console.log(authHeader)
    if (!authHeader) return console.log({ status: "error", error: "Unauthorized" })
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        console.log(error);
        if (error) return console.log({ status: "error", error: "Unauthorized" })
        req.user = credentials.user;
        next();
    })
} */
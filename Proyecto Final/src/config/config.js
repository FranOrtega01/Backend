import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,

    mongoURI: process.env.MONGO_URI,
    mongoDBName: process.env.MONGO_DB_NAME,

    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtCookieName: process.env.JWT_COOKIE_NAME,

    googleAppKey: process.env.GOOGLE_APP_KEY,
    googleClientID: process.env.GOOGLE_CLIENT_ID,

    githubAppKey: process.env.GITHUB_APP_KEY,
    githubClientID: process.env.GITHUB_CLIENT_ID,

    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASSWORD

}
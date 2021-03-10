const redis = require('redis')
require('dotenv').config()

const redisClient = redis.createClient({
    host: process.env.RDHOST,
    port: process.env.RDPORT,
    password: process.env.RDPASSWORD
});

redisClient.on("error", function (error) {
    console.error(error);
});

const rateLimiter = (req, res, next) => {
    const ip = req.ip
    const EXP_TIME = 60 // expiry time, in seconds
    const MAX_REQ = 60 // maximum # of requests
    // the max rate is MAX_REQ requests per EXP_TIME seconds 

    // add ip to redis and keep track of # of requests
    redisClient.multi()
        .set([ip, 0, 'EX', EXP_TIME, 'NX'])
        .incr(ip) // requests++
        .exec((error, reply) => {
            if (error) return res.send('Internal Error')

            const requests = reply[1]

            if (requests > MAX_REQ) {
                return res.status(429).send('Error 429: Too many requests')
            }
            return next()
        })
}

module.exports = { rateLimiter }
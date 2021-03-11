const { rateLimiter } = require('./rateLimiter')
const express = require("express")
const pg = require('pg')
const path = require('path')
require('dotenv').config()

const app = express()
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
        return res.json(r.rows || [])
    }).catch(next)
}

// use the rateLimiter middleware for all http methods
app.use(rateLimiter)

//app.get('/', (req, res) => {
//    res.sendFile(path.resolve('src/index.html'))
//})

app.get('/endpoints.js', (req, res) => {
    res.sendFile(path.resolve('src/endpoints.js'))
})

app.get('/table.js', (req, res) => {
    res.sendFile(path.resolve('src/table.js'))
})

app.get('/events/hourly', (req, res, next) => {
    req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
    return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
    req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
    return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {
    req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
    return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {
    req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
    return next()
}, queryHandler)

app.get('/poi', (req, res, next) => {
    console.log('POI request recieved');
    req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
    return next()
}, queryHandler)

app.listen(process.env.PORT || 6000, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.log(`Running on ${process.env.PORT || 6000}`)
    }
})


// last resorts
process.on('uncaughtException', (err) => {
    console.log(`Caught exception: ${err}`)
    process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    process.exit(1)
})
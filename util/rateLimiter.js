import {Redis} from 'ioredis'

const client = new Redis();

export  const rateLimiter = async(req,res,next)=> {
    const key = `rate:${req.ip}`
    const limit = 5;
    const window = 60;

    const current = await client.incr(key)

    if(current === 1){
        await client.expire(key,window)
    }

    if( current > limit){
       return res.status(500).json('Too many requests')
    }

    next();
}


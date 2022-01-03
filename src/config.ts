const VC_KEY = process.env.VIRTUAL_CROSSING_KEY
if (!VC_KEY || VC_KEY === 'token')
    throw new Error('Invalid Virtual Crossing API Key')

export { VC_KEY }

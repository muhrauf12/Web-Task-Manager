const useMemory = process.env.USE_MEMORY === 'true' || !process.env.MONGO_URI;
module.exports = useMemory ? require('./memory') : require('./mongo');

// Core utility functions for the platform

const OBJECT_TYPES = {
    USER: 'user',
    JOB: 'job',
    APPLICATION: 'application',
    CONVERSATION: 'conversation',
    MESSAGE: 'message',
    NOTIFICATION: 'notification',
    PROFILE: 'profile',
    RESUME: 'resume',
    COMPANY: 'company'
};

// Cache management
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function setCacheItem(key, value) {
    cache.set(key, {
        value,
        timestamp: Date.now()
    });
}

function getCacheItem(key) {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > CACHE_DURATION) {
        cache.delete(key);
        return null;
    }
    
    return item.value;
}

// Data fetching with caching
async function fetchData(objectType, objectId = null, params = {}) {
    const cacheKey = `${objectType}:${objectId || 'list'}:${JSON.stringify(params)}`;
    const cachedData = getCacheItem(cacheKey);
    if (cachedData) return cachedData;

    try {
        let data;
        if (objectId) {
            data = await trickleGetObject(objectType, objectId);
        } else {
            const { limit = 100, descent = true, nextPageToken } = params;
            data = await trickleListObjects(objectType, limit, descent, nextPageToken);
        }
        
        setCacheItem(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`Error fetching ${objectType}:`, error);
        throw error;
    }
}

// Data creation with cache invalidation
async function createData(objectType, data) {
    try {
        const result = await trickleCreateObject(objectType, {
            ...data,
            createdAt: new Date().toISOString()
        });
        
        // Invalidate related cache entries
        for (const key of cache.keys()) {
            if (key.startsWith(objectType)) {
                cache.delete(key);
            }
        }
        
        return result;
    } catch (error) {
        console.error(`Error creating ${objectType}:`, error);
        throw error;
    }
}

// Data update with cache invalidation
async function updateData(objectType, objectId, data) {
    try {
        const result = await trickleUpdateObject(objectType, objectId, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        
        // Invalidate related cache entries
        for (const key of cache.keys()) {
            if (key.startsWith(objectType)) {
                cache.delete(key);
            }
        }
        
        return result;
    } catch (error) {
        console.error(`Error updating ${objectType}:`, error);
        throw error;
    }
}

// Data deletion with cache invalidation
async function deleteData(objectType, objectId) {
    try {
        await trickleDeleteObject(objectType, objectId);
        
        // Invalidate related cache entries
        for (const key of cache.keys()) {
            if (key.startsWith(objectType)) {
                cache.delete(key);
            }
        }
        
        return true;
    } catch (error) {
        console.error(`Error deleting ${objectType}:`, error);
        throw error;
    }
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Error handling
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

// Export utilities
const CoreUtils = {
    OBJECT_TYPES,
    fetchData,
    createData,
    updateData,
    deleteData,
    generateId,
    formatDate,
    validateEmail,
    AppError
};

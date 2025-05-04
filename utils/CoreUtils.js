const CoreUtils = {
    OBJECT_TYPES: {
        USER: 'users',
        PROFILE: 'profiles'
    },

    async fetchData(type) {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/${type}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        return await res.json();
    },

    async createData(type, data) {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create data');
        return await res.json();
    },

    async updateData(type, id, data) {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/${type}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update data');
        return await res.json();
    },

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    AppError(message, code) {
        const err = new Error(message);
        err.code = code;
        return err;
    }
};

export default CoreUtils;

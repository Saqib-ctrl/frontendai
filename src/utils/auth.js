// Enhanced authentication utilities

// Session management
const SESSION_KEY = 'currentUser';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getCurrentUser() {
    try {
        const sessionStr = localStorage.getItem(SESSION_KEY);
        if (!sessionStr) return null;

        const session = JSON.parse(sessionStr);
        if (Date.now() - new Date(session.timestamp).getTime() > SESSION_DURATION) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }

        return session.user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

async function login(credentials) {
    try {
        if (!credentials.email || !credentials.password) {
            throw new CoreUtils.AppError('Email and password are required', 'INVALID_INPUT');
        }

        // Find user
        const { items: users } = await CoreUtils.fetchData(CoreUtils.OBJECT_TYPES.USER);
        const user = users.find(u => u.objectData.email === credentials.email);

        if (!user) {
            throw new CoreUtils.AppError('User not found', 'USER_NOT_FOUND');
        }

        if (user.objectData.password !== credentials.password) {
            throw new CoreUtils.AppError('Invalid password', 'INVALID_PASSWORD');
        }

        // Create session
        const session = {
            user: {
                id: user.objectId,
                email: user.objectData.email,
                name: user.objectData.name,
                role: user.objectData.role
            },
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        // Update last login
        await CoreUtils.updateData(CoreUtils.OBJECT_TYPES.USER, user.objectId, {
            ...user.objectData,
            lastLogin: new Date().toISOString()
        });

        return session.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function register(userData) {
    try {
        if (!userData.email || !userData.password || !userData.name || !userData.role) {
            throw new CoreUtils.AppError('All fields are required', 'INVALID_INPUT');
        }

        if (!CoreUtils.validateEmail(userData.email)) {
            throw new CoreUtils.AppError('Invalid email format', 'INVALID_EMAIL');
        }

        // Check existing user
        const { items: users } = await CoreUtils.fetchData(CoreUtils.OBJECT_TYPES.USER);
        if (users.some(u => u.objectData.email === userData.email)) {
            throw new CoreUtils.AppError('Email already in use', 'EMAIL_EXISTS');
        }

        // Create user
        const user = await CoreUtils.createData(CoreUtils.OBJECT_TYPES.USER, {
            ...userData,
            status: 'active',
            createdAt: new Date().toISOString()
        });

        // Create profile
        await CoreUtils.createData(CoreUtils.OBJECT_TYPES.PROFILE, {
            userId: user.objectId,
            role: userData.role,
            completeness: 0,
            createdAt: new Date().toISOString()
        });

        return user;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

function logout() {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

async function resetPassword(email) {
    try {
        if (!email || !CoreUtils.validateEmail(email)) {
            throw new CoreUtils.AppError('Invalid email', 'INVALID_EMAIL');
        }

        // Find user
        const { items: users } = await CoreUtils.fetchData(CoreUtils.OBJECT_TYPES.USER);
        const user = users.find(u => u.objectData.email === email);

        if (!user) {
            throw new CoreUtils.AppError('User not found', 'USER_NOT_FOUND');
        }

        // Reset password to default
        await CoreUtils.updateData(CoreUtils.OBJECT_TYPES.USER, user.objectId, {
            ...user.objectData,
            password: '123456',
            passwordResetAt: new Date().toISOString()
        });

        return true;
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
}

async function changePassword(userId, oldPassword, newPassword) {
    try {
        const user = await CoreUtils.fetchData(CoreUtils.OBJECT_TYPES.USER, userId);

        if (user.objectData.password !== oldPassword) {
            throw new CoreUtils.AppError('Current password is incorrect', 'INVALID_PASSWORD');
        }

        await CoreUtils.updateData(CoreUtils.OBJECT_TYPES.USER, userId, {
            ...user.objectData,
            password: newPassword,
            passwordChangedAt: new Date().toISOString()
        });

        return true;
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
}

// Export auth utilities
const AuthUtils = {
    getCurrentUser,
    login,
    register,
    logout,
    resetPassword,
    changePassword
};
export {
    getCurrentUser,
    login,
    register,
    logout,
    resetPassword,
    changePassword
};

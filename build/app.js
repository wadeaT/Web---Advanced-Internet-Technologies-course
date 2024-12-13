// app.js

// Import required modules
import { showLogin } from './login.js';
import { showDashboard } from './dashboard.js';
import { renderCreateWallet } from './create-wallet.js';
import { renderRestoreWallet } from './restore-wallet.js';
import { renderConnectWallet } from './connect-wallet.js';

// Configuration
const CONFIG = {
    ROUTES: {
        PROTECTED: ['dashboard', 'send-receive', 'swap', 'history', 'settings'],
        AUTH: ['login', 'create-wallet', 'restore-wallet', 'connect-wallet']
    },
    STORAGE_KEYS: {
        AUTH: 'isLoggedIn',
        USER: 'username'
    }
};

// State management
const AppState = {
    isInitialized: false,
    currentRoute: null
};

// DOM Elements
const elements = {
    app: document.getElementById('app'),
    loading: document.getElementById('loadingOverlay')
};

// Auth utilities
const Auth = {
    check: () => localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH) === 'true',
    logout: () => {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    }
};

// Route handling
class RouteManager {
    static validate(route) {
        const isLoggedIn = Auth.check();

        if (CONFIG.ROUTES.PROTECTED.includes(route) && !isLoggedIn) {
            console.warn('Unauthorized access attempt. Redirecting to login.');
            return 'login';
        }

        if (CONFIG.ROUTES.AUTH.includes(route) && isLoggedIn) {
            console.warn('Already authenticated. Redirecting to dashboard.');
            return 'dashboard';
        }

        return route;
    }

    static async navigate(route) {
        const validatedRoute = this.validate(route);
        AppState.currentRoute = validatedRoute;

        try {
            await this.renderRoute(validatedRoute);
            this.updateHistory(validatedRoute);
        } catch (error) {
            console.error('Navigation error:', error);
            this.handleNavigationError();
        }
    }

    static async renderRoute(route) {
        showLoading(true);

        try {
            switch (route) {
                case 'dashboard':
                    await showDashboard(elements.app);
                    break;
                case 'login':
                    await showLogin(elements.app);
                    break;
                case 'create-wallet':
                    await renderCreateWallet(elements.app);
                    break;
                case 'restore-wallet':
                    await renderRestoreWallet(elements.app);
                    break;
                case 'connect-wallet':
                    await renderConnectWallet(elements.app);
                    break;
                // Add other routes as needed
                default:
                    throw new Error(`Unknown route: ${route}`);
            }
        } finally {
            showLoading(false);
        }
    }

    static updateHistory(route) {
        const state = { route };
        const url = `#${route}`;
        history.pushState(state, '', url);
    }

    static handleNavigationError() {
        const fallbackRoute = Auth.check() ? 'dashboard' : 'login';
        this.navigate(fallbackRoute);
    }
}

// UI utilities
function showLoading(show) {
    if (elements.loading) {
        elements.loading.style.display = show ? 'flex' : 'none';
    }
}

// Event handlers
function setupEventListeners() {
    // Navigation events
    window.addEventListener('navigate', (event) => {
        RouteManager.navigate(event.detail.route);
    });

    // Logout events
    window.addEventListener('logout', () => {
        Auth.logout();
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { route: 'login' }
        }));
    });

    // Browser navigation
    window.addEventListener('popstate', (event) => {
        const route = event.state?.route || (Auth.check() ? 'dashboard' : 'login');
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { route }
        }));
    });
}

// Application initialization
async function initializeApp() {
    if (AppState.isInitialized) return;

    try {
        showLoading(true);
        setupEventListeners();

        // Handle initial route
        const initialRoute = window.location.hash.slice(1) || (Auth.check() ? 'dashboard' : 'login');
        await RouteManager.navigate(initialRoute);

        AppState.isInitialized = true;
    } catch (error) {
        console.error('Initialization error:', error);
        RouteManager.handleNavigationError();
    } finally {
        showLoading(false);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Exports
export { RouteManager as default };
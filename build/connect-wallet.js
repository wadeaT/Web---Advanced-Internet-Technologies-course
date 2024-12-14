// connect-wallet.js

function renderConnectWallet(container) {
    if (!container) {
        console.error("Container element not found");
        return;
    }

    container.innerHTML = `
        <div class="min-h-screen flex flex-col w-full bg-slate-950">
            <!-- Header -->
            <header class="w-full bg-slate-900 border-b border-slate-800 px-8 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <img src="image/ethereum.png" alt="ETH Logo" class="w-8 h-8">
                        <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            ETH Wallet Manager
                        </span>
                    </div>
                    <button id="backBtn" 
                            class="text-slate-400 hover:text-white flex items-center px-4 py-2 rounded-lg
                                   transition-all duration-300 hover:bg-slate-800">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 w-full bg-slate-950 p-8">
                <div class="max-w-2xl mx-auto">
                    <!-- Title -->
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
                        Connect to Your Wallet
                    </h2>

                    <!-- Info Box -->
                    <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-8">
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-info-circle text-blue-400 mt-1"></i>
                            <p class="text-blue-300">
                                Access your ETH Wallet Hub account securely by entering your credentials below.
                            </p>
                        </div>
                    </div>

                    <!-- Login Form -->
                    <form id="connectWalletForm" class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700 shadow-lg">
                        <div class="space-y-6">
                            <!-- Username/Email Input -->
                            <div class="space-y-2">
                                <label for="username" class="block text-sm font-medium text-slate-300">
                                    Username or Email
                                </label>
                                <div class="relative">
                                    <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    <input type="text" 
                                           id="username" 
                                           class="w-full px-12 py-4 bg-slate-700 rounded-lg text-white
                                                  border-2 border-slate-600 focus:border-blue-500 
                                                  focus:outline-none"
                                           placeholder="Enter your username or email">
                                </div>
                            </div>

                            <!-- Password Input -->
                            <div class="space-y-2">
                                <label for="password" class="block text-sm font-medium text-slate-300">
                                    Password
                                </label>
                                <div class="relative">
                                    <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    <input type="password" 
                                           id="password" 
                                           class="w-full px-12 py-4 bg-slate-700 rounded-lg text-white
                                                  border-2 border-slate-600 focus:border-blue-500 
                                                  focus:outline-none"
                                           placeholder="Enter your password">
                                </div>
                            </div>

                            <!-- Captcha -->
                            <div class="relative p-4 bg-slate-700 rounded-lg border-2 border-slate-600">
                                <div class="flex items-center space-x-3">
                                    <input type="checkbox" 
                                           id="notRobot" 
                                           class="w-5 h-5 rounded border-slate-600 bg-slate-800
                                                  text-blue-500 focus:ring-blue-500 focus:ring-offset-0">
                                    <label for="notRobot" class="text-slate-300">
                                        I'm not a robot
                                    </label>
                                    <i class="fas fa-shield-alt text-slate-400 ml-auto"></i>
                                </div>
                            </div>

                            <!-- Connect Button -->
                            <button type="submit" 
                                    id="connectBtn"
                                    class="w-full flex items-center justify-center px-6 py-4 rounded-lg
                                           bg-blue-600 hover:bg-blue-700 text-white
                                           transition-colors duration-200">
                                <i class="fas fa-link mr-2"></i>
                                Connect Wallet
                            </button>

                            <!-- Help Links -->
                            <div class="flex items-center justify-between pt-4">
                                <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot Password?
                                </a>
                                <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">
                                    Need Help?
                                </a>
                            </div>
                        </div>
                    </form>

                    <!-- Warning Notice -->
                    <div class="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-red-400 font-medium text-lg mb-2">Security Notice</h4>
                                <p class="text-red-300">
                                    Always ensure you're on the correct website before entering your credentials. 
                                    We recommend using two-factor authentication and a secure password manager for 
                                    additional security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="w-full bg-slate-900 border-t border-slate-800 px-8 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="flex items-center space-x-4">
                        <img src="image/ethereum.png" alt="ETH Logo" class="w-6 h-6">
                        <span class="text-slate-400">ETH Wallet Manager © 2024</span>
                    </div>
                    <div class="flex items-center space-x-8">
                        <a href="#" class="text-slate-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    `;

    setupEventListeners(container);
}

function setupEventListeners(container) {
    // Back button navigation
    const backBtn = container.querySelector('#backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('navigate', { 
                detail: { route: 'login' }
            }));
        });
    }

    // Form submission handler
    const form = container.querySelector('#connectWalletForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleConnect(form);
        });
    }
}

function handleConnect(form) {
    const username = form.querySelector('#username').value.trim();
    const password = form.querySelector('#password').value.trim();
    const isRobotChecked = form.querySelector('#notRobot').checked;
    const connectBtn = form.querySelector('#connectBtn');

    // Validate form
    if (!username || !password) {
        showError(form, 'Please enter both username and password');
        return;
    }

    if (!isRobotChecked) {
        showError(form, 'Please complete the robot verification');
        return;
    }

    // Show loading state
    const originalContent = connectBtn.innerHTML;
    connectBtn.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Connecting...
        </div>
    `;
    connectBtn.disabled = true;

    // Simulate connection attempt
    setTimeout(() => {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Navigate to dashboard
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { route: 'dashboard' }
        }));
    }, 2000);
}

function showError(form, message) {
    // Remove any existing error messages
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-500/10 text-red-400 px-4 py-2 rounded-lg mt-4 text-sm';
    errorDiv.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Insert error before the connect button
    const connectBtn = form.querySelector('#connectBtn');
    connectBtn.parentNode.insertBefore(errorDiv, connectBtn);

    // Remove error after 3 sec
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

export { renderConnectWallet };
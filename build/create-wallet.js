// create-wallet.js

function renderCreateWallet(container) {
    container.innerHTML = `
        <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            <!-- Header with glass effect -->
            <header class="bg-slate-800/80 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
                <div class="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <img src="image/ethereum.png" alt="ETH Logo" class="w-8 h-8 animate-pulse">
                        <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Create ETH Wallet
                        </span>
                    </div>
                    <button id="backBtn" 
                            class="text-slate-400 hover:text-white flex items-center px-4 py-2 rounded-lg
                                   transition-all duration-300 hover:bg-slate-700/50">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
            </header>

            <main class="flex-1 container max-w-6xl mx-auto px-4 py-8">
                <!-- Steps Progress with animation -->
                <div class="mb-12">
                    <div class="flex justify-between relative">
                        <!-- Progress bar background -->
                        <div class="absolute top-5 left-0 w-full h-0.5 bg-slate-700"></div>
                        <!-- Active progress bar -->
                        <div class="absolute top-5 left-0 w-1/3 h-0.5 bg-blue-500 transition-all duration-500"></div>
                        
                        <!-- Step 1 -->
                        <div class="flex flex-col items-center relative z-10">
                            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 
                                      transform transition-all duration-500 scale-110 ring-4 ring-blue-500/20">
                                <i class="fas fa-lock text-white"></i>
                            </div>
                            <span class="text-sm font-medium text-blue-500">Account</span>
                        </div>

                        <!-- Step 2 -->
                        <div class="flex flex-col items-center relative z-10">
                            <div class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center mb-2
                                      transform transition-all duration-500">
                                <i class="fas fa-key text-slate-400"></i>
                            </div>
                            <span class="text-sm text-slate-400">Recovery Phrase</span>
                        </div>

                        <!-- Step 3 -->
                        <div class="flex flex-col items-center relative z-10">
                            <div class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center mb-2
                                      transform transition-all duration-500">
                                <i class="fas fa-check text-slate-400"></i>
                            </div>
                            <span class="text-sm text-slate-400">Confirm</span>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="space-y-6">
                    <!-- Main Form Container -->
                    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700/50
                              transform transition-all duration-500 hover:shadow-2xl hover:bg-slate-800/60">
                        <h2 class="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Create Your Wallet Account
                        </h2>
                        
                        <!-- Account Creation Form -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Left Column - Form Inputs -->
                            <div class="space-y-6">
                                <!-- Username Input -->
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Username</label>
                                    <div class="relative group">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-user text-slate-400 group-hover:text-blue-500 transition-colors duration-300"></i>
                                        </div>
                                        <input type="text" 
                                            id="username"
                                            class="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-lg text-white
                                                   border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                                                   transition-all duration-300"
                                            placeholder="Choose a username">
                                    </div>
                                    <p id="usernameError" class="hidden text-red-500 text-sm mt-1">
                                        <i class="fas fa-exclamation-circle mr-1"></i>
                                        <span></span>
                                    </p>
                                </div>

                                <!-- Email Input -->
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Email Address</label>
                                    <div class="relative group">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-envelope text-slate-400 group-hover:text-blue-500 transition-colors duration-300"></i>
                                        </div>
                                        <input type="email" 
                                            id="email"
                                            class="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-lg text-white
                                                   border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                                                   transition-all duration-300"
                                            placeholder="Enter your email">
                                    </div>
                                    <p id="emailError" class="hidden text-red-500 text-sm mt-1">
                                        <i class="fas fa-exclamation-circle mr-1"></i>
                                        <span></span>
                                    </p>
                                </div>

                                <!-- Password Input -->
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Password</label>
                                    <div class="relative group">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-lock text-slate-400 group-hover:text-blue-500 transition-colors duration-300"></i>
                                        </div>
                                        <input type="password" 
                                            id="password"
                                            class="w-full pl-10 pr-10 py-3 bg-slate-700/50 rounded-lg text-white
                                                   border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                                                   transition-all duration-300"
                                            placeholder="Create a strong password">
                                        <button id="togglePassword" 
                                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white
                                                       transition-colors duration-300">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Confirm Password Input -->
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-slate-300">Confirm Password</label>
                                    <div class="relative group">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-lock text-slate-400 group-hover:text-blue-500 transition-colors duration-300"></i>
                                        </div>
                                        <input type="password" 
                                            id="confirmPassword"
                                            class="w-full pl-10 pr-10 py-3 bg-slate-700/50 rounded-lg text-white
                                                   border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                                                   transition-all duration-300"
                                            placeholder="Confirm your password">
                                        <button id="toggleConfirmPassword"
                                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white
                                                       transition-colors duration-300">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column - Requirements -->
                            <div class="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50 h-full">
                                <h3 class="font-medium mb-6 text-slate-200 flex items-center">
                                    <i class="fas fa-shield-alt text-blue-500 mr-2"></i>
                                    Account Requirements
                                </h3>
                                <ul class="space-y-4" id="accountRequirements">
                                    <li class="flex items-center text-slate-300" data-requirement="username">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Username (3-20 characters, letters and numbers only)
                                    </li>
                                    <li class="flex items-center text-slate-300" data-requirement="email">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Valid email address
                                    </li>
                                    <li class="flex items-center text-slate-300" data-requirement="length">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Password: at least 8 characters
                                    </li>
                                    <li class="flex items-center text-slate-300" data-requirement="number">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Password: include numbers
                                    </li>
                                    <li class="flex items-center text-slate-300" data-requirement="special">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Password: include special characters
                                    </li>
                                    <li class="flex items-center text-slate-300" data-requirement="match">
                                        <i class="fas fa-circle text-xs text-slate-500 mr-2"></i>
                                        Passwords match
                                    </li>
                                </ul>
                            </div>

                            <!-- Full Width Button -->
                            <div class="lg:col-span-2">
                                <button id="nextBtn" 
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg
                                           transition-all duration-300 transform hover:scale-102 hover:shadow-lg
                                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                           text-lg font-medium"
                                    disabled>
                                    <span class="flex items-center justify-center">
                                        Continue
                                        <i class="fas fa-arrow-right ml-2"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Security Notice -->
                    <div class="bg-yellow-500/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10
                              transform transition-all duration-500 hover:shadow-xl">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                <i class="fas fa-shield-alt text-yellow-500 text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-yellow-500 font-medium mb-2">Security Notice</h4>
                                <p class="text-sm text-yellow-500/90">
                                    This password will be used to secure your wallet on this device. 
                                    Make sure to save it somewhere safe. We cannot recover it for you.
                                </p>
                                <div class="mt-4 flex items-center text-sm text-yellow-500/80">
                                    <i class="fas fa-info-circle mr-2"></i>
                                    Consider using a password manager for secure storage
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
}

function initializeCreateWallet() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const nextBtn = document.getElementById('nextBtn');
    const togglePasswordBtns = ['togglePassword', 'toggleConfirmPassword'];
    
    // Toggle password visibility
    togglePasswordBtns.forEach(btnId => {
        document.getElementById(btnId)?.addEventListener('click', (e) => {
            const input = e.target.closest('.relative').querySelector('input');
            const icon = e.target.closest('button').querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Validation functions
    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]{3,20}$/;
        return regex.test(username);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const requirements = {
            username: validateUsername(username),
            email: validateEmail(email),
            length: password.length >= 8,
            number: /\d/.test(password),
            special: /[!@#$%^&*]/.test(password),
            match: password === confirmPassword && password !== ''
        };

        // Update requirement icons
        Object.entries(requirements).forEach(([req, isMet]) => {
            const li = document.querySelector(`[data-requirement="${req}"]`);
            const icon = li.querySelector('i');
            
            icon.classList.remove('fa-circle', 'fa-check-circle', 'text-slate-500', 'text-green-500');
            icon.classList.add(isMet ? 'fa-check-circle' : 'fa-circle');
            icon.classList.add(isMet ? 'text-green-500' : 'text-slate-500');
            
            li.classList.remove('text-slate-300', 'text-green-500');
            li.classList.add(isMet ? 'text-green-500' : 'text-slate-300');
        });

        // Show/hideerror messages
        const usernameError = document.getElementById('usernameError');
        if (!requirements.username && username !== '') {
            usernameError.querySelector('span').textContent = 'Username must be 3-20 characters, letters and numbers only';
            usernameError.classList.remove('hidden');
        } else {
            usernameError.classList.add('hidden');
        }

        const emailError = document.getElementById('emailError');
        if (!requirements.email && email !== '') {
            emailError.querySelector('span').textContent = 'Please enter a valid email address';
            emailError.classList.remove('hidden');
        } else {
            emailError.classList.add('hidden');
        }

        // Enable/disable next button
        nextBtn.disabled = !Object.values(requirements).every(Boolean);
    };

    // Add input event listeners
    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', validateForm);
        
        // Add focus/blur effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('ring-1', 'ring-blue-500');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('ring-1', 'ring-blue-500');
        });
    });

    // Back button handler
    document.getElementById('backBtn').addEventListener('click', () => {
        gsap.to('main', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                window.dispatchEvent(new CustomEvent('navigate', { 
                    detail: { route: 'login' }
                }));
            }
        });
    });

    // Next button handler
    nextBtn.addEventListener('click', () => {
        if (!nextBtn.disabled) {
            const userData = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            // Store user data securely (temporary storage for demo)
            sessionStorage.setItem('tempUserData', JSON.stringify(userData));

            // Animate transition
            gsap.to('main', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    showRecoveryPhrase(document.querySelector('#app'));
                }
            });
        }
    });

    // Initialize GSAP animations
    initializeAnimations();
}

function initializeAnimations() {
    // Fade in main content
    gsap.from('main > div', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Animate progress steps
    gsap.from('.flex.justify-between > div', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out'
    });

    // Animate form fields
    gsap.from('input, button', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3
    });

    // Animate security notice
    gsap.from('.bg-yellow-500\\/5', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.8
    });
}

function showRecoveryPhrase(container) {
    // This function will be implemented separately for the recovery phrase step
    console.log('Showing recovery phrase...');
    // Here you would typically navigate to the recovery phrase page
    window.dispatchEvent(new CustomEvent('navigate', { 
        detail: { route: 'recovery-phrase' }
    }));
}

// Export necessary functions
export { renderCreateWallet };
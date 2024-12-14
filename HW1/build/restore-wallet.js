// restore-wallet.js

function renderRestoreWallet(container) {
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
                        Restore Your Wallet
                    </h2>

                    <!-- Info Box -->
                    <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-8">
                        <div class="flex items-start space-x-3">
                            <i class="fas fa-info-circle text-blue-400 mt-1"></i>
                            <p class="text-blue-300">
                                Enter your 12-word recovery phrase, with each word separated by a space.
                            </p>
                        </div>
                    </div>

                    <!-- Recovery Form -->
                    <div class="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700 shadow-lg">
                        <div class="space-y-6">
                            <!-- Recovery Phrase Input -->
                            <div class="relative mb-6">
                                <input
                                    type="text"
                                    id="phraseInput"
                                    name="phraseInput"
                                    spellcheck="false"
                                    autocomplete="off"
                                    class="w-full px-6 py-4 bg-slate-700 rounded-lg text-white text-lg
                                           border-2 border-slate-600 focus:border-blue-500 
                                           focus:outline-none h-32"
                                    placeholder="Enter your 12-word recovery phrase..."
                                />
                            </div>

                            <!-- Buttons Container -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <button
                                    id="pasteBtn"
                                    class="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg
                                           bg-slate-700 hover:bg-slate-600 text-white
                                           border border-slate-600 transition-colors duration-200">
                                    <i class="fas fa-paste mr-2"></i>
                                    Paste Phrase
                                </button>
                                
                                <button
                                    id="restoreBtn"
                                    class="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg
                                           bg-blue-600 hover:bg-blue-700 text-white
                                           transition-colors duration-200
                                           disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled>
                                    <i class="fas fa-key mr-2"></i>
                                    Restore Wallet
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Warning Notice -->
                    <div class="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-red-400 font-medium text-lg mb-2">Security Warning</h4>
                                <p class="text-red-300">
                                    Never share your recovery phrase with anyone. We will never ask for it through email, 
                                    phone calls, or social media. Only enter your recovery phrase in the official ETH Wallet app.
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

    initializeRestoreWallet();
}

function initializeRestoreWallet() {
    const backBtn = document.getElementById('backBtn');
    const phraseInput = document.getElementById('phraseInput');
    const pasteBtn = document.getElementById('pasteBtn');
    const restoreBtn = document.getElementById('restoreBtn');

    // Handle phrase input changes
    phraseInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toLowerCase();
        validatePhrase();
    });

    // Paste functionality
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            phraseInput.value = text.toLowerCase().trim();
            validatePhrase();
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    });

    // Validation function
    function validatePhrase() {
        const words = phraseInput.value.trim().split(/\s+/);
        const isValid = words.length === 12 && words.every(word => word.length > 0);
        restoreBtn.disabled = !isValid;
    }

    // Navigation
    backBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { 
            detail: { route: 'login' }
        }));
    });

    // Restore button handler
    restoreBtn.addEventListener('click', () => {
        const phrase = phraseInput.value.trim();
        console.log('Restoring wallet with phrase:', phrase);
        // add actual wallet restoration logic here
    });
}

export { renderRestoreWallet };
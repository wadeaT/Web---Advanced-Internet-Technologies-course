// wallet-setup.js

// Constants
const WALLET_STEPS = {
  CREATE: {
    PASSWORD: 1,
    SEED_PHRASE: 2,
    CONFIRM_SEED: 3,
  },
};

const REQUIRED_PASSWORD_LENGTH = 8;

// Mock BIP39 wordlist (in production, use actual BIP39 library)
const WORD_LIST = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
  "adapt",
  "add",
  "addict",
  "address",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "aerobic",
  "affair",
  "afford",
  "afraid",
  "again",
  "age",
  "agent",
  // ... (in production, this would be the complete BIP39 wordlist)
];

/**
 * Main entry point for wallet setup functionality
 * @param {HTMLElement} container - The container element where the wallet setup UI will be rendered
 * @param {string} setupMode - The mode of setup ('create', 'restore', or 'connect')
 */
export function showWalletSetup(container, setupMode) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  // Initialize state
  const state = {
    currentStep: WALLET_STEPS.CREATE.PASSWORD,
    password: "",
    seedPhrase: generateSeedPhrase(),
    setupMode: setupMode,
  };

  // Render and initialize
  renderWalletSetup(container, state);
  initializeEventListeners(container, state);
}

/**
 * Generates a 12-word seed phrase
 * @returns {string} Space-separated seed phrase
 */
function generateSeedPhrase() {
  const selectedWords = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    selectedWords.push(WORD_LIST[randomIndex]);
  }
  return selectedWords.join(" ");
}

/**
 * Validates password requirements
 * @param {string} password - The password to validate
 * @param {string} confirmPassword - The confirmation password
 * @returns {Object} Validation result and any error messages
 */
function validatePassword(password, confirmPassword) {
  if (password.length < REQUIRED_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
    };
  }

  if (!/\d/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number",
    };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one special character",
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Passwords do not match",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

/**
 * Updates the progress bar and step indicators
 * @param {number} currentStep - The current step number
 */
function updateProgressIndicators(currentStep) {
  const steps = ["passwordStep", "seedPhraseStep", "confirmStep"];
  steps.forEach((stepId, index) => {
    const stepElement = document.getElementById(stepId);
    if (!stepElement) return;

    if (index + 1 <= currentStep) {
      stepElement.classList.remove("bg-slate-700");
      stepElement.classList.add("bg-blue-600");
      const icon = stepElement.querySelector("i");
      if (icon) {
        icon.classList.remove("text-slate-400");
        icon.classList.add("text-white");
      }
    }
  });
}

/**
 * Shows a specific step and hides others
 * @param {string} stepToShow - The ID of the step to show
 */
function showStep(stepToShow) {
  const steps = ["createStep", "seedPhraseStep", "confirmStep"];
  steps.forEach((step) => {
    const element = document.getElementById(step);
    if (element) {
      if (step === stepToShow) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    }
  });
}

/**
 * Shows an error message to the user
 * @param {string} message - The error message to display
 */
function showError(message) {
  const errorContainer = document.getElementById("errorContainer");
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
    setTimeout(() => {
      errorContainer.classList.add("hidden");
    }, 3000);
  }
}

/**
 * Initializes all event listeners for the wallet setup process
 * @param {HTMLElement} container - The container element
 * @param {Object} state - The current state object
 */
function initializeEventListeners(container, state) {
  // Back button handler
  const backButton = document.getElementById("backToLogin");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("navigate", { detail: { route: "login" } })
      );
    });
  }

  // Password step handlers
  const nextToSeedButton = document.getElementById("nextToSeedPhrase");
  if (nextToSeedButton) {
    nextToSeedButton.addEventListener("click", () => {
      const password = document.getElementById("createPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const validation = validatePassword(password, confirmPassword);
      if (validation.isValid) {
        state.password = password;
        state.currentStep = WALLET_STEPS.CREATE.SEED_PHRASE;
        showStep("seedPhraseStep");
        updateProgressIndicators(state.currentStep);
      } else {
        showError(validation.error);
      }
    });
  }

  // Seed phrase step handlers
  const nextToConfirmButton = document.getElementById("nextToConfirm");
  if (nextToConfirmButton) {
    nextToConfirmButton.addEventListener("click", () => {
      state.currentStep = WALLET_STEPS.CREATE.CONFIRM_SEED;
      showStep("confirmStep");
      updateProgressIndicators(state.currentStep);
      setupConfirmationInputs(state.seedPhrase);
    });
  }

  // Wallet creation handler
  const createWalletButton = document.getElementById("createWallet");
  if (createWalletButton) {
    createWalletButton.addEventListener("click", () => {
      if (validateSeedPhraseConfirmation(state.seedPhrase)) {
        // Here you would normally:
        // 1. Create the wallet
        // 2. Encrypt the seed phrase with the password
        // 3. Store encrypted data
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(
          new CustomEvent("navigate", { detail: { route: "dashboard" } })
        );
      } else {
        showError(
          "Incorrect seed phrase confirmation. Please check your words and try again."
        );
      }
    });
  }
}

/**
 * Sets up the confirmation inputs for seed phrase verification
 * @param {string} seedPhrase - The generated seed phrase
 */
function setupConfirmationInputs(seedPhrase) {
    const words = seedPhrase.split(' ');
    const indicesToConfirm = [2, 5, 8, 11]; // Confirm words #3, 6, 9, and 12
    
    const confirmationHtml = indicesToConfirm.map(index => `
        <div>
            <label class="block text-base font-medium text-slate-300 mb-2">Word #${index + 1}</label>
            <input type="text" 
                class="word-confirmation w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                data-index="${index}"
                placeholder="Enter word #${index + 1}">
        </div>
    `).join('');
    
    const container = document.getElementById('confirmationInputs');
    if (container) {
        container.innerHTML = confirmationHtml;
    }
}

/**
 * Validates the seed phrase confirmation inputs
 * @param {string} originalSeedPhrase - The original generated seed phrase
 * @returns {boolean} Whether the confirmation is valid
 */
function validateSeedPhraseConfirmation(originalSeedPhrase) {
  const confirmationInputs = document.querySelectorAll(".word-confirmation");
  const words = originalSeedPhrase.split(" ");

  for (const input of confirmationInputs) {
    const index = parseInt(input.dataset.index);
    if (input.value.toLowerCase().trim() !== words[index]) {
      return false;
    }
  }

  return true;
}

/**
 * Renders the wallet setup interface
 * @param {HTMLElement} container - The container element
 * @param {Object} state - The current state object
 */
function renderWalletSetup(container, state) {
    container.innerHTML = `
        <div class="min-h-screen bg-slate-900 flex flex-col">
            <!-- Header - Full width with larger content -->
            <header class="bg-slate-800 border-b border-slate-700">
                <div class="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <img src="image/ethereum.png" alt="ETH Logo" class="w-8 h-8 md:w-10 md:h-10">
                            <span class="text-xl md:text-2xl lg:text-3xl font-bold">ETH Wallet</span>
                        </div>
                        <button id="backToLogin" class="text-slate-400 hover:text-white flex items-center text-base md:text-lg">
                            <i class="fas fa-arrow-left mr-2"></i>Back
                        </button>
                    </div>
                </div>
            </header>

            <main class="flex-1 w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
                <!-- Error Container -->
                <div id="errorContainer" class="hidden bg-red-500/10 text-red-500 p-4 rounded-lg mb-8 max-w-screen-xl mx-auto"></div>

                <!-- Progress Steps - Wider layout -->
                <div class="flex justify-between mb-8 md:mb-12 max-w-screen-xl mx-auto px-4">
                    <div class="flex flex-col items-center">
                        <div id="passwordStep" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                            <i class="fas fa-lock-open text-white text-sm md:text-base"></i>
                        </div>
                        <span class="text-sm md:text-base text-slate-400">Password</span>
                    </div>
                    <div class="flex-1 flex items-center px-4 md:px-8">
                        <div class="h-0.5 w-full bg-slate-700"></div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div id="seedPhraseStep" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center mb-2">
                            <i class="fas fa-key text-slate-400 text-sm md:text-base"></i>
                        </div>
                        <span class="text-sm md:text-base text-slate-400">Seed Phrase</span>
                    </div>
                    <div class="flex-1 flex items-center px-4 md:px-8">
                        <div class="h-0.5 w-full bg-slate-700"></div>
                    </div>
                    <div class="flex flex-col items-center">
                        <div id="confirmStep" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center mb-2">
                            <i class="fas fa-check text-slate-400 text-sm md:text-base"></i>
                        </div>
                        <span class="text-sm md:text-base text-slate-400">Confirm</span>
                    </div>
                </div>

                <!-- Content Sections with full-width layout -->
                <div class="max-w-screen-xl mx-auto">
                    <!-- Step 1: Create Password -->
                    <div id="createStep" class="bg-slate-800 rounded-xl p-6 md:p-8 lg:p-12">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Create Your Password</h2>
                        <div class="grid md:grid-cols-2 gap-8 max-w-4xl">
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-lg font-medium text-slate-300 mb-2">Password</label>
                                    <input type="password" id="createPassword" 
                                        class="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                        placeholder="Create a strong password">
                                    <p class="mt-2 text-sm text-slate-400">
                                        At least 8 characters with numbers and special characters (!@#$%^&*)
                                    </p>
                                </div>
                                <div>
                                    <label class="block text-lg font-medium text-slate-300 mb-2">Confirm Password</label>
                                    <input type="password" id="confirmPassword"
                                        class="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                        placeholder="Confirm your password">
                                </div>
                                <button id="nextToSeedPhrase" 
                                    class="w-full bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-medium transition-colors text-lg">
                                    Continue
                                </button>
                            </div>
                            <div class="hidden md:block">
                                <div class="bg-slate-700/50 rounded-xl p-6">
                                    <h3 class="text-xl font-semibold mb-4">Password Requirements</h3>
                                    <ul class="space-y-3">
                                        <li class="flex items-center text-slate-300">
                                            <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                            At least 8 characters long
                                        </li>
                                        <li class="flex items-center text-slate-300">
                                            <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                            Include numbers
                                        </li>
                                        <li class="flex items-center text-slate-300">
                                            <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                            Include special characters
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Seed Phrase -->
                    <div id="seedPhraseStep" class="hidden bg-slate-800 rounded-xl p-6 md:p-8 lg:p-12">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Save Your Seed Phrase</h2>
                        <div class="grid md:grid-cols-2 gap-8">
                            <div class="space-y-6">
                                <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                    <div class="flex items-start space-x-3">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
                                        <div class="space-y-2">
                                            <p class="text-sm md:text-base text-yellow-500">
                                                Write these words down in the exact order and store them safely. 
                                                They are the only way to recover your wallet if you lose access.
                                            </p>
                                            <p class="text-sm md:text-base text-yellow-500">
                                                Never share your recovery phrase with anyone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    ${state.seedPhrase.split(' ').map((word, index) => `
                                        <div class="bg-slate-700 p-4 rounded-lg flex items-center space-x-3">
                                            <span class="text-slate-400">${index + 1}.</span>
                                            <span class="font-mono text-lg">${word}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <button id="nextToConfirm" 
                                    class="w-full bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-medium transition-colors text-lg">
                                    I've Written It Down
                                </button>
                            </div>
                            <div class="hidden md:block">
                                <div class="bg-slate-700/50 rounded-xl p-6">
                                    <h3 class="text-xl font-semibold mb-4">Important Security Tips</h3>
                                    <ul class="space-y-4">
                                        <li class="flex items-start">
                                            <i class="fas fa-shield-alt text-blue-400 mt-1 mr-3"></i>
                                            <span class="text-slate-300">Store your seed phrase in a secure, offline location</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-user-secret text-blue-400 mt-1 mr-3"></i>
                                            <span class="text-slate-300">Never share these words with anyone</span>
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-camera-slash text-blue-400 mt-1 mr-3"></i>
                                            <span class="text-slate-300">Don't take screenshots or store digitally</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Confirm Seed Phrase -->
                    <div id="confirmStep" class="hidden bg-slate-800 rounded-xl p-6 md:p-8 lg:p-12">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Confirm Your Seed Phrase</h2>
                        <div class="grid md:grid-cols-2 gap-8">
                            <div class="space-y-6">
                                <p class="text-lg text-slate-400">Enter the following words from your seed phrase to confirm you've saved them:</p>
                                <div id="confirmationInputs" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <!-- Dynamically populated with word confirmation inputs -->
                                </div>
                                <button id="createWallet" 
                                    class="w-full bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-medium transition-colors text-lg">
                                    Create Wallet
                                </button>
                            </div>
                            <div class="hidden md:block">
                                <div class="bg-slate-700/50 rounded-xl p-6">
                                    <h3 class="text-xl font-semibold mb-4">Verification Process</h3>
                                    <p class="text-slate-300 mb-4">
                                        To ensure you've properly saved your seed phrase, please enter the requested words
                                        in their exact form. This verification is crucial for wallet recovery.
                                    </p>
                                    <div class="bg-slate-600/50 rounded-lg p-4">
                                        <p class="text-sm text-slate-400">
                                            Tip: Double-check each word before submitting. The order and spelling must match exactly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Security Notice -->
                    <div class="mt-8 p-6 bg-blue-900/20 rounded-lg">
                        <div class="flex items-start space-x-4">
                            <i class="fas fa-shield-alt text-blue-400 text-xl mt-1"></i>
                            <div>
                                <h3 class="text-lg font-medium text-blue-400">Security Notice</h3>
                                <p class="mt-2 text-base text-slate-300">
                                    Your password and seed phrase are never stored on our servers. 
                                    They're encrypted and stored locally on your device. Make sure to keep them safe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="bg-slate-800 border-t border-slate-700 py-6">
                <div class="w-full px-4 md:px-8 lg:px-12 text-center text-slate-400">
                    <p>&copy; 2024 ETH Wallet. All rights reserved.</p>
                </div>
            </footer>
        </div>
    `;
}

/**
 * Validates the recovery phrase format
 * @param {string} phrase - The recovery phrase to validate
 * @returns {boolean} Whether the phrase is valid
 */
function validateRecoveryPhrase(phrase) {
  const words = phrase.trim().split(/\s+/);
  return (
    words.length === 12 &&
    words.every((word) => WORD_LIST.includes(word.toLowerCase()))
  );
}

/**
 * Securely stores the wallet data
 * @param {Object} walletData - The wallet data to store
 */
function storeWalletData(walletData) {
  try {
    // In a real implementation, you would:
    // 1. Encrypt the seed phrase with the password
    // 2. Generate wallet address
    // 3. Store encrypted data securely
    // 4. Clear sensitive data from memory

    localStorage.setItem("walletInitialized", "true");
    return true;
  } catch (error) {
    console.error("Error storing wallet data:", error);
    return false;
  }
}

/**
 * Handles wallet restoration
 * @param {string} recoveryPhrase - The recovery phrase
 * @param {string} newPassword - The new password
 * @returns {Object} Result of the restoration attempt
 */
function handleWalletRestore(recoveryPhrase, newPassword) {
  try {
    if (!validateRecoveryPhrase(recoveryPhrase)) {
      return {
        success: false,
        error: "Invalid recovery phrase format",
      };
    }

    const passwordValidation = validatePassword(newPassword, newPassword);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: passwordValidation.error,
      };
    }

    // In a real implementation, you would:
    // 1. Verify the recovery phrase
    // 2. Reconstruct the wallet
    // 3. Encrypt and store the new wallet data

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to restore wallet",
    };
  }
}

/**
 * Cleans up sensitive data from memory
 * @param {Object} state - The state object containing sensitive data
 */
function cleanupSensitiveData(state) {
  if (state) {
    state.password = "";
    state.seedPhrase = "";
    // Force garbage collection where possible
    state = null;
  }
}

// Export all necessary functions
export {
  
  validatePassword,
  validateRecoveryPhrase,
  handleWalletRestore,
  cleanupSensitiveData,
};

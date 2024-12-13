// login.js
const THEME_KEY = "eth-wallet-theme";

// Enhanced features array with more detailed information and icons
const features = [
  {
    title: "Buy/Sell Tokens",
    description:
      "Easily buy and sell Ethereum and other tokens directly from your wallet with real-time market data.",
    icon: "fas fa-exchange-alt",
    image: "image/BuySell.png",
  },
  {
    title: "Store Your Tokens",
    description:
      "Securely store your Ethereum and ERC-20 tokens with industry-leading security measures.",
    icon: "fas fa-wallet",
    image: "image/StoreETH.png",
  },
  {
    title: "Swap Tokens",
    description:
      "Access decentralized exchanges to swap tokens with competitive rates and low fees.",
    icon: "fas fa-sync",
    image: "image/SwapETH.png",
  },
  {
    title: "Send Tokens",
    description:
      "Transfer Ethereum or any ERC-20 tokens globally with full transaction tracking.",
    icon: "fas fa-paper-plane",
    image: "image/TransferETH.png",
  },
];

// Popular tokens to display
const tokenIds = [
  "ethereum",
  "tether",
  "usd-coin",
  "binancecoin",
  "ripple",
  "cardano",
  "solana",
  "chainlink",
  "polygon",
  "avalanche-2",
  "polkadot",
  "dai",
  "shiba-inu",
  "wrapped-bitcoin",
  "uniswap",
  "okb",
  "arbitrum",
  "moonriver",
];

function showLogin(container) {
  if (!container) {
    console.error("Container element not found");
    return;
  }

  renderLoginPage(container);
  initializeTheme();
  setupEventListeners();
  initializeFeatureCarousel();
  initializeAnimations();
  fetchTokens();
}

function renderLoginPage(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col">
            <!-- Hero Section -->
            <section class="w-full bg-cover bg-center min-h-screen flex items-center relative overflow-hidden" 
                    id="heroSection"
                    style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('image/BackgroundETH.png');">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                <div class="w-full py-16 md:py-32 relative z-10">
                    <div class="container mx-auto text-center px-4">
                        <h1 class="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            ETH Wallet Hub
                        </h1>
                        <p class="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto">
                            Your secure gateway to the Ethereum ecosystem. Buy, sell, store, and manage your digital assets
                            with ease and confidence.
                        </p>
                        <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <button id="createWalletBtn" 
                                    class="group bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-lg text-white font-medium 
                                           transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                <i class="fas fa-plus mr-2 group-hover:rotate-90 transition-transform duration-300"></i>
                                Create New Wallet
                            </button>
                            <button id="restoreWalletBtn" 
                                    class="group bg-yellow-600 hover:bg-yellow-700 px-8 py-4 text-lg rounded-lg text-white font-medium 
                                           transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                <i class="fas fa-key mr-2 group-hover:rotate-12 transition-transform duration-300"></i>
                                Restore Using Recovery Phrase
                            </button>
                            <button id="connectWalletBtn" 
                                    class="group bg-green-600 hover:bg-green-700 px-8 py-4 text-lg rounded-lg text-white font-medium 
                                           transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                <i class="fas fa-link mr-2 group-hover:rotate-12 transition-transform duration-300"></i>
                                Connect Existing Wallet
                            </button>
                        </div>
                        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
                            <i class="fas fa-chevron-down text-2xl text-blue-500" id="scrollDownBtn"></i>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section id="featuresSection" class="w-full bg-slate-800 px-4 py-16">
                <div class="container mx-auto">
                    <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center">Buy, store, send, and swap tokens</h2>
                    <div class="bg-slate-900/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl border border-slate-700">
                        <div id="featureCarousel" class="bg-slate-700 rounded-xl overflow-hidden shadow-2xl">
                            <div class="flex flex-col md:flex-row">
                                <div class="md:w-1/3 p-8 flex flex-col justify-center">
                                    <h3 id="featureTitle" class="text-2xl font-bold mb-4">Buy/Sell Tokens</h3>
                                    <p id="featureDescription" class="text-lg text-slate-300"></p>
                                </div>
                                <div class="md:w-2/3">
                                    <div id="featureImage" class="bg-cover bg-center w-full h-[400px] transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center mt-8 space-x-4" id="featureCarouselDots"></div>
                    </div>
                </div>
            </section>

            <!-- Tokens Section -->
            <section class="w-full bg-slate-900 px-4 py-16" id="tokensSection">
                <div class="container mx-auto">
                    <h2 class="text-4xl font-bold mb-12 text-center">
                        ETH Mainnet wallet supports ETH and all ERC-20 tokens!
                    </h2>
                    <div class="bg-slate-800/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl border border-slate-700">
                        <div id="tokensContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <!-- Dynamic token list will be populated here -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- Knowledge Section -->
            <section class="w-full bg-slate-800 px-4 py-16" id="knowledgeSection">
                <div class="container mx-auto">
                    <h2 class="text-4xl font-bold mb-12 text-center">Arm Yourself with Knowledge</h2>
                    <div class="bg-slate-900/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl border border-slate-700">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <a href="#" class="knowledge-card bg-slate-700 hover:bg-slate-600 p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 group">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-graduation-cap text-2xl text-blue-500 group-hover:text-blue-400 transition-colors"></i>
                                    <h3 class="text-xl font-bold ml-4">New to Crypto?</h3>
                                </div>
                                <p class="text-slate-400 group-hover:text-slate-300">Explore our ETH Wallet Tutorial.</p>
                            </a>
                            <a href="#" class="knowledge-card bg-slate-700 hover:bg-slate-600 p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 group">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-question-circle text-2xl text-blue-500 group-hover:text-blue-400 transition-colors"></i>
                                    <h3 class="text-xl font-bold ml-4">Help Center</h3>
                                </div>
                                <p class="text-slate-400 group-hover:text-slate-300">Find answers to your questions.</p>
                            </a>
                            <a href="#" class="knowledge-card bg-slate-700 hover:bg-slate-600 p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 group">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-book text-2xl text-blue-500 group-hover:text-blue-400 transition-colors"></i>
                                    <h3 class="text-xl font-bold ml-4">FAQ</h3>
                                </div>
                                <p class="text-slate-400 group-hover:text-slate-300">Common queries, answered.</p>
                            </a>
                            <a href="#" class="knowledge-card bg-slate-700 hover:bg-slate-600 p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 group">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-headset text-2xl text-blue-500 group-hover:text-blue-400 transition-colors"></i>
                                    <h3 class="text-xl font-bold ml-4">Chat with Support</h3>
                                </div>
                                <p class="text-slate-400 group-hover:text-slate-300">Get help from our support team.</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer Section -->
            <footer class="w-full bg-slate-900 border-t border-slate-800 px-4 py-16">
                <div class="container mx-auto">
                    <div class="bg-slate-800/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl border border-slate-700">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <!-- Company Info -->
                            <div>
                                <h3 class="text-xl font-bold mb-4">ETH Wallet Hub</h3>
                                <p class="text-slate-400 mb-4">Your trusted gateway to the Ethereum ecosystem.</p>
                                <div class="flex space-x-4">
                                    <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">
                                        <i class="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">
                                        <i class="fab fa-discord text-xl"></i>
                                    </a>
                                    <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">
                                        <i class="fab fa-github text-xl"></i>
                                    </a>
                                    <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">
                                        <i class="fab fa-telegram text-xl"></i>
                                    </a>
                                </div>
                            </div>

                            <!-- Quick Links -->
                            <div>
                                <h3 class="text-xl font-bold mb-4">Quick Links</h3>
                                <ul class="space-y-2">
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">About Us</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Features</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Security</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Roadmap</a></li>
                                </ul>
                            </div>

                            <!-- Support -->
                            <div>
                                <h3 class="text-xl font-bold mb-4">Support</h3>
                                <ul class="space-y-2">
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Help Center</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Terms of Service</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                                    <li><a href="#" class="text-slate-400 hover:text-blue-500 transition-colors">Contact Us</a></li>
                                </ul>
                            </div>

                            <!-- Newsletter -->
                            <div>
                                <h3 class="text-xl font-bold mb-4">Stay Updated</h3>
                                <p class="text-slate-400 mb-4">Subscribe to our newsletter for updates and news.</p>
                                <div class="flex flex-col space-y-2">
                                    <input type="email" 
                                           placeholder="Enter your email" 
                                           class="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-white">
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="mt-12 pt-8 border-t border-slate-800">
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <p class="text-slate-400 text-sm mb-4 md:mb-0">
                                © 2024 ETH Wallet Hub. All rights reserved.
                            </p>
                            <div class="flex space-x-6">
                                <a href="#" class="text-slate-400 hover:text-blue-500 text-sm transition-colors">Terms</a>
                                <a href="#" class="text-slate-400 hover:text-blue-500 text-sm transition-colors">Privacy</a>
                                <a href="#" class="text-slate-400 hover:text-blue-500 text-sm transition-colors">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    `;
}


function initializeFeatureCarousel() {
  let currentFeature = 0;
  let carouselInterval;

  const dotsContainer = document.getElementById("featureCarouselDots");
  dotsContainer.innerHTML = features
    .map(
      (_, index) => `
        <button data-index="${index}"
            class="w-4 h-4 rounded-full transition-all duration-300 ${index === 0 ? "bg-blue-500" : "bg-slate-400"}"
        ></button>
    `
    )
    .join("");

  // Add click handlers to dots
  dotsContainer.querySelectorAll("button").forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      changeFeature(index);
      resetCarouselInterval();
    });
  });

  function changeFeature(index) {
    currentFeature = index;
    const feature = features[index];

    gsap.to("#featureTitle", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        document.getElementById("featureTitle").innerText = feature.title;
        gsap.to("#featureTitle", { opacity: 1, y: 0, duration: 0.4 });
      },
    });

    gsap.to("#featureDescription", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        document.getElementById("featureDescription").innerText =
          feature.description;
        gsap.to("#featureDescription", { opacity: 1, y: 0, duration: 0.4 });
      },
    });

    gsap.to("#featureImage", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        document.getElementById("featureImage").style.backgroundImage =
          `url('${feature.image}')`;
        gsap.to("#featureImage", { opacity: 1, duration: 0.4 });
      },
    });

    updateDots(index);
  }

  function updateDots(activeIndex) {
    dotsContainer.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("bg-blue-500", i === activeIndex);
      dot.classList.toggle("bg-slate-400", i !== activeIndex);
    });
  }

  function autoRotateFeatures() {
    currentFeature = (currentFeature + 1) % features.length;
    changeFeature(currentFeature);
  }

  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(autoRotateFeatures, 5000);
  }

  // Initialize carousel
  changeFeature(0);
  carouselInterval = setInterval(autoRotateFeatures, 5000);

  // Pause carousel on hover
  const carousel = document.getElementById("featureCarousel");
  carousel.addEventListener("mouseenter", () =>
    clearInterval(carouselInterval)
  );
  carousel.addEventListener("mouseleave", resetCarouselInterval);
}

function initializeAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section parallax
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        gsap.to('#heroSection', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '#heroSection',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Animate sections on scroll
    const sections = gsap.utils.toArray('section:not(:first-child)');
    if (sections.length) {
        sections.forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    // Animate tokens
    const tokenContainer = document.getElementById('tokensContainer');
    if (tokenContainer) {
        gsap.from('#tokensContainer > *', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '#tokensContainer',
                start: 'top center+=100'
            }
        });
    }

    // Separately animate knowledge cards with a simpler animation
    const knowledgeCards = document.querySelectorAll('.knowledge-card');
    if (knowledgeCards.length) {
        knowledgeCards.forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

function fetchTokens() {
  const tokensContainer = document.getElementById("tokensContainer");
  const tokenIdString = tokenIds.join(",");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIdString}&order=market_cap_desc&per_page=18&page=1&sparkline=false`;

  // Show loading state with animation
  tokensContainer.innerHTML = `
        <div class="col-span-full flex items-center justify-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-3 text-slate-400">Loading tokens...</span>
        </div>
    `;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      tokensContainer.innerHTML = "";
      data.forEach((token) => createTokenCard(token));
    })
    .catch((error) => {
      console.error("Error fetching tokens:", error);
      showErrorState(tokensContainer);
    });
}

function createTokenCard(token) {
  const tokenElement = document.createElement("div");
  tokenElement.classList.add(
    "token-card",
    "flex",
    "flex-col",
    "sm:flex-row",
    "items-start",
    "sm:items-center",
    "justify-between",
    "p-4",
    "sm:p-6",
    "bg-slate-800",
    "hover:bg-slate-700",
    "rounded-xl",
    "shadow-lg",
    "transition-all",
    "duration-300",
    "hover:scale-105",
    "w-full",
    "gap-3",
    "sm:gap-4"
  );

  const price = formatPrice(token.current_price);
  const priceChange = token.price_change_percentage_24h;
  const priceChangeColor = priceChange >= 0 ? "text-green-400" : "text-red-400";

  tokenElement.innerHTML = `
        <div class="flex items-center w-full sm:w-auto">
            <img src="${token.image}" alt="${token.name}" class="h-8 w-8 mr-3">
            <div class="flex flex-col">
                <span class="font-semibold text-white">${token.name}</span>
                                <span class="text-sm text-slate-400">${token.symbol.toUpperCase()}</span>
            </div>
        </div>
        <div class="flex flex-row sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto">
            <span class="font-medium text-white order-1 sm:order-none">${price}</span>
            <span class="text-sm ${priceChangeColor} order-2 sm:order-none">
                ${priceChange >= 0 ? "↑" : "↓"} ${Math.abs(priceChange).toFixed(2)}%
            </span>
        </div>
    `;

  // Add hover effect for token cards
  tokenElement.addEventListener("mouseenter", () => {
    gsap.to(tokenElement, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  tokenElement.addEventListener("mouseleave", () => {
    gsap.to(tokenElement, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  tokensContainer.appendChild(tokenElement);
}

function showErrorState(container) {
  container.innerHTML = `
        <div class="col-span-full text-center p-8 bg-red-500/10 rounded-xl">
            <div class="flex flex-col items-center">
                <i class="fas fa-exclamation-circle text-2xl text-red-500 mb-4"></i>
                <p class="text-lg mb-4">Unable to load tokens. Please try again later.</p>
                <button onclick="fetchTokens()" 
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center">
                    <i class="fas fa-sync-alt mr-2"></i>Retry
                </button>
            </div>
        </div>
    `;
}

function setupEventListeners() {
  // Navigation buttons
  document.getElementById("createWalletBtn").addEventListener("click", () => {
    animateButtonClick("createWalletBtn");
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { route: "create-wallet" },
      })
    );
  });

  document.getElementById("restoreWalletBtn").addEventListener("click", () => {
    animateButtonClick("restoreWalletBtn");
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { route: "restore-wallet" },
      })
    );
  });

  document.getElementById("connectWalletBtn").addEventListener("click", () => {
    animateButtonClick("connectWalletBtn");
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { route: "connect-wallet" },
      })
    );
  });

  // Smooth scroll functionality
  document.getElementById("scrollDownBtn").addEventListener("click", () => {
    const featuresSection = document.getElementById("featuresSection");
    featuresSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // Add scroll-based navbar transparency
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
      navbar?.classList.add("bg-opacity-90", "backdrop-blur-sm");
    } else {
      navbar?.classList.remove("bg-opacity-90", "backdrop-blur-sm");
    }
  });
}

function animateButtonClick(buttonId) {
  const button = document.getElementById(buttonId);
  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    onComplete: () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.1,
      });
    },
  });
}

function formatPrice(price) {
  if (typeof price !== "number") return "N/A";

  if (price >= 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else {
    // For prices less than $1, show more decimal places
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price);
  }
}

function initializeTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.classList.toggle("dark", currentTheme === "dark");

  // Add theme transition
  document.documentElement.classList.add("transition-colors", "duration-200");
}

// Utility function to debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export necessary functions
export { showLogin, initializeTheme, features, tokenIds };

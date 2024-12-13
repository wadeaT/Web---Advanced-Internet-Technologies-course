// dashboard.js

// Dashboard State Management
const DashboardState = {
  currentSection: 'overview',
  isMobileMenuOpen: false,
  isSearchActive: false,
  searchTerm: '',
  assets: [],
  transactions: []
};

// Dashboard UI Elements Cache
let UIElements = {};

async function showDashboard(container) {
  if (!container) {
      throw new Error('Container element not found');
  }

  try {
      // Render initial dashboard structure
      renderDashboardLayout(container);
      
      // Cache UI elements for better performance
      cacheUIElements();
      
      // Initialize dashboard features
      await initializeDashboard();
  } catch (error) {
      console.error('Error initializing dashboard:', error);
      handleDashboardError(container);
  }
}

function renderDashboardLayout(container) {
  container.innerHTML = `
      <div class="min-h-screen bg-slate-950 flex">
          <!-- Sidebar Navigation -->
          <aside id="sidebar" class="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col z-30 transition-transform duration-300">
              <!-- Logo Section -->
              <div class="p-4 border-b border-slate-800">
                  <div class="flex items-center space-x-3">
                      <img src="image/ethereum.png" alt="ETH Logo" class="w-8 h-8">
                      <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                          ETH Wallet Hub
                      </span>
                  </div>
              </div>
              
              <!-- Navigation Menu -->
              <nav class="flex-1 p-4">
                  <ul class="space-y-2" id="navMenu">
                      <li>
                          <button data-section="overview" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                              <i class="fas fa-home w-5"></i>
                              <span>Overview</span>
                          </button>
                      </li>
                      <li>
                          <button data-section="send" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                              <i class="fas fa-paper-plane w-5"></i>
                              <span>Send</span>
                          </button>
                      </li>
                      <li>
                          <button data-section="receive" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                              <i class="fas fa-qrcode w-5"></i>
                              <span>Receive</span>
                          </button>
                      </li>
                      <li>
                          <button data-section="swap" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                              <i class="fas fa-sync w-5"></i>
                              <span>Swap</span>
                          </button>
                      </li>
                      <li>
                          <button data-section="history" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                              <i class="fas fa-history w-5"></i>
                              <span>History</span>
                          </button>
                      </li>
                      <li>
                          <button data-section="settings" 
                             class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                              <i class="fas fa-cog w-5"></i>
                              <span>Settings</span>
                          </button>
                      </li>
                  </ul>
              </nav>

              <!-- User Section -->
              <div class="p-4 border-t border-slate-800">
                  <button id="logoutBtn" 
                          class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                      <i class="fas fa-sign-out-alt w-5"></i>
                      <span>Logout</span>
                  </button>
              </div>
          </aside>

          <!-- Main Content Area -->
          <div class="flex-1 md:ml-64">
              <!-- Top Header -->
              <header class="bg-slate-900 border-b border-slate-800 h-16 fixed right-0 left-0 md:left-64 top-0 z-20">
                  <div class="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
                      <!-- Mobile Menu Button -->
                      <button id="mobileSidebarToggle" 
                              class="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300">
                          <i class="fas fa-bars"></i>
                      </button>
                      
                      <!-- Header Actions -->
                      <div class="flex items-center space-x-4">
                          <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center text-white">
                              <i class="fas fa-plus mr-2"></i>
                              <span class="hidden sm:inline">Buy Crypto</span>
                          </button>
                          <div class="flex items-center space-x-3">
                              <button class="p-2 hover:bg-slate-800 rounded-lg text-slate-300">
                                  <i class="fas fa-bell"></i>
                              </button>
                              <button class="p-2 hover:bg-slate-800 rounded-lg text-slate-300">
                                  <i class="fas fa-user-circle"></i>
                              </button>
                          </div>
                      </div>
                  </div>
              </header>

              <!-- Main Content -->
              <main id="mainContent" class="pt-20 px-4 pb-20 md:pb-4 max-w-7xl mx-auto">
                  <!-- Dynamic content will be loaded here -->
              </main>
          </div>

          <!-- Mobile Navigation -->
          <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-20">
              <div class="grid grid-cols-5 gap-1 p-2">
                  <button data-section="overview" 
                     class="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-blue-500">
                      <i class="fas fa-home text-lg"></i>
                      <span class="text-xs mt-1">Home</span>
                  </button>
                  <button data-section="send" 
                     class="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                      <i class="fas fa-paper-plane text-lg"></i>
                      <span class="text-xs mt-1">Send</span>
                  </button>
                  <button data-section="receive" 
                     class="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                      <i class="fas fa-qrcode text-lg"></i>
                      <span class="text-xs mt-1">Receive</span>
                  </button>
                  <button data-section="swap" 
                     class="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                      <i class="fas fa-sync text-lg"></i>
                      <span class="text-xs mt-1">Swap</span>
                  </button>
                  <button data-section="settings" 
                     class="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                      <i class="fas fa-cog text-lg"></i>
                      <span class="text-xs mt-1">Settings</span>
                  </button>
              </div>
          </nav>
      </div>
  `;
}

function cacheUIElements() {
  UIElements = {
      sidebar: document.getElementById('sidebar'),
      mainContent: document.getElementById('mainContent'),
      mobileSidebarToggle: document.getElementById('mobileSidebarToggle'),
      logoutBtn: document.getElementById('logoutBtn'),
      navButtons: document.querySelectorAll('[data-section]')
  };
}

async function initializeDashboard() {
  setupEventListeners();
  await loadDashboardData();
  loadSection(DashboardState.currentSection);
}

function setupEventListeners() {
  // Mobile sidebar toggle
  UIElements.mobileSidebarToggle?.addEventListener('click', toggleMobileSidebar);

  // Navigation
  UIElements.navButtons.forEach(button => {
      button.addEventListener('click', handleNavigation);
  });

  // Logout handler
  UIElements.logoutBtn?.addEventListener('click', handleLogout);

  // Handle click outside sidebar on mobile
  document.addEventListener('click', handleClickOutside);
}

function toggleMobileSidebar() {
  DashboardState.isMobileMenuOpen = !DashboardState.isMobileMenuOpen;
  UIElements.sidebar.classList.toggle('hidden');
  UIElements.sidebar.classList.toggle('translate-x-0');
}

function handleNavigation(event) {
  const section = event.currentTarget.dataset.section;
  if (section) {
      loadSection(section);
      if (window.innerWidth < 768) {
          toggleMobileSidebar();
      }
  }
}

function handleClickOutside(event) {
  if (window.innerWidth < 768 && 
      DashboardState.isMobileMenuOpen && 
      !UIElements.sidebar.contains(event.target) && 
      !UIElements.mobileSidebarToggle.contains(event.target)) {
      toggleMobileSidebar();
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
      window.dispatchEvent(new CustomEvent('logout'));
  }
}

async function loadDashboardData() {
  try {
      // Simulate API calls
      DashboardState.assets = await fetchAssets();
      DashboardState.transactions = await fetchTransactions();
  } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Handle error appropriately
  }
}

function loadSection(section) {
  DashboardState.currentSection = section;
  updateActiveNavState();

  // Load section content
  switch(section) {
      case 'overview':
          renderOverviewSection();
          break;
      case 'send':
          renderSendSection();
          break;
      case 'receive':
          renderReceiveSection();
          break;
      case 'swap':
          renderSwapSection();
          break;
      case 'history':
          renderHistorySection();
          break;
      case 'settings':
          renderSettingsSection();
          break;
      default:
          renderOverviewSection();
  }
}

function updateActiveNavState() {
  UIElements.navButtons.forEach(button => {
      const section = button.dataset.section;
      
      if (button.closest('.md\\:hidden')) {
          // Mobile navigation
          button.className = `flex flex-col items-center justify-center py-2 px-1 rounded-lg 
                            ${section === DashboardState.currentSection 
                              ? 'text-blue-500' 
                              : 'text-slate-400 hover:text-blue-500'} transition-colors`;
      } else {
          // Desktop navigation
          button.className = `w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                            ${section === DashboardState.currentSection 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'text-slate-300 hover:bg-slate-800'} transition-colors`;
      }
  });
}

// Section Renderers
function renderOverviewSection() {
  UIElements.mainContent.innerHTML = `
      <!-- Portfolio Overview Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          ${renderPortfolioCards()}
      </div>

      <!-- Assets Table -->
      <div class="bg-slate-900 rounded-xl border border-slate-800 mb-6">
          ${renderAssetsTable()}
      </div>

      <!-- Recent Transactions -->
      <div class="bg-slate-900 rounded-xl border border-slate-800">
          ${renderTransactionsSection()}
      </div>
  `;
}

// More section renderers (send, receive, swap, etc.) would go here...

// Mock API calls
async function fetchAssets() {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve([
              {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  balance: '5.4321',
                  value: 9876.54,
                  price: 1789.23,
                  change: 2.5
              }
              // Add more assets as needed
          ]);
      }, 1000);
  });
}

async function fetchTransactions() {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve([
              {
                  type: 'received',
                  amount: '0.5',
                  from: '0x8765...4321',
                  timestamp: Date.now() - 7200000 // 2 hours ago
              }
              // Add more transactions as needed
          ]);
      }, 1000);
  });
}

function handleDashboardError(container) {
  container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-slate-950 px-4">
          <div class="text-center">
              <h2 class="text-2xl font-bold text-white mb-4">Something went wrong</h2>
              <p class="text-slate-400 mb-6">We're having trouble loading the dashboard</p>
              <button onclick="window.location.reload()" 
                      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Try Again
              </button>
          </div>
      </div>
  `;
}

// Helper function to format numbers
function formatNumber(num, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,maximumFractionDigits: decimals
    }).format(num);
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Helper function to format relative time
function formatRelativeTime(timestamp) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = timestamp - Date.now();
    const diffSeconds = Math.round(diff / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (Math.abs(diffDays) >= 1) return rtf.format(diffDays, 'day');
    if (Math.abs(diffHours) >= 1) return rtf.format(diffHours, 'hour');
    if (Math.abs(diffMinutes) >= 1) return rtf.format(diffMinutes, 'minute');
    return rtf.format(diffSeconds, 'second');
}

// Portfolio Cards Renderer
function renderPortfolioCards() {
    return `
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 class="text-slate-400 text-sm font-medium">Total Balance</h3>
            <div class="text-2xl font-bold text-white mt-2">${formatCurrency(12345.67)}</div>
            <div class="text-green-400 text-sm flex items-center mt-2">
                <i class="fas fa-arrow-up mr-1"></i>
                +2.5% (24h)
            </div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 class="text-slate-400 text-sm font-medium">ETH Balance</h3>
            <div class="text-2xl font-bold text-white mt-2">5.4321 ETH</div>
            <div class="text-slate-400 text-sm mt-2">${formatCurrency(9876.54)}</div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 class="text-slate-400 text-sm font-medium">Token Balance</h3>
            <div class="text-2xl font-bold text-white mt-2">12 Tokens</div>
            <div class="text-slate-400 text-sm mt-2">${formatCurrency(2469.13)}</div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 class="text-slate-400 text-sm font-medium">Gas Price</h3>
            <div class="text-2xl font-bold text-white mt-2">25 Gwei</div>
            <div class="text-slate-400 text-sm mt-2">≈ $2.50 / transfer</div>
        </div>
    `;
}

// Assets Table Renderer
function renderAssetsTable() {
    return `
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b border-slate-800">
            <h2 class="text-lg font-bold text-white">Your Assets</h2>
            <div class="flex items-center space-x-2 w-full sm:w-auto">
                <div class="relative flex-1 sm:flex-initial">
                    <input type="text" 
                           placeholder="Search assets..." 
                           class="w-full px-4 py-2 bg-slate-800 rounded-lg text-slate-300 
                                  border border-slate-700 focus:outline-none focus:border-blue-500
                                  transition-colors pl-10">
                    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
                <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
                    <i class="fas fa-filter"></i>
                </button>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="text-slate-400 text-sm">
                        <th class="text-left p-4 font-medium">Asset</th>
                        <th class="text-right p-4 font-medium">Balance</th>
                        <th class="text-right p-4 font-medium">Price</th>
                        <th class="text-right p-4 font-medium">Value</th>
                        <th class="text-right p-4 font-medium">24h</th>
                        <th class="text-right p-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${DashboardState.assets.map(asset => `
                        <tr class="border-t border-slate-800 hover:bg-slate-800/50 transition-colors">
                            <td class="p-4">
                                <div class="flex items-center space-x-3">
                                    <img src="image/ethereum.png" alt="${asset.symbol}" class="w-8 h-8">
                                    <div>
                                        <div class="font-medium text-white">${asset.name}</div>
                                        <div class="text-sm text-slate-400">${asset.symbol}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right p-4">
                                <div class="font-medium text-white">${asset.balance} ${asset.symbol}</div>
                                <div class="text-sm text-slate-400">${formatCurrency(asset.value)}</div>
                            </td>
                            <td class="text-right p-4 text-white">${formatCurrency(asset.price)}</td>
                            <td class="text-right p-4 text-white">${formatCurrency(asset.value)}</td>
                            <td class="text-right p-4">
                                <span class="text-green-400">
                                    <i class="fas fa-arrow-up mr-1"></i>${asset.change}%
                                </span>
                            </td>
                            <td class="text-right p-4">
                                <div class="flex items-center justify-end space-x-2">
                                    <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Send">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                    <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Receive">
                                        <i class="fas fa-qrcode"></i>
                                    </button>
                                    <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Swap">
                                        <i class="fas fa-sync"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Transactions Section Renderer
function renderTransactionsSection() {
    return `
        <div class="p-4 border-b border-slate-800">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-bold text-white">Recent Transactions</h2>
                <a href="#" class="text-blue-500 hover:text-blue-400 transition-colors">View All</a>
            </div>
        </div>
        <div class="p-4">
            <div class="space-y-4">
                ${DashboardState.transactions.map(tx => `
                    <div class="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-full bg-${tx.type === 'received' ? 'green' : 'red'}-500/10 flex items-center justify-center">
                                <i class="fas fa-arrow-${tx.type === 'received' ? 'down' : 'up'} text-${tx.type === 'received' ? 'green' : 'red'}-500"></i>
                            </div>
                            <div>
                                <div class="font-medium text-white">${tx.type === 'received' ? 'Received' : 'Sent'} ETH</div>
                                <div class="text-sm text-slate-400 flex items-center">
                                    ${tx.type === 'received' ? 'From' : 'To'}: ${tx.from}
                                    <button class="ml-2 text-blue-500 hover:text-blue-400">
                                        <i class="fas fa-external-link-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="font-medium text-${tx.type === 'received' ? 'green' : 'red'}-400">
                                ${tx.type === 'received' ? '+' : '-'}${tx.amount} ETH
                            </div>
                            <div class="text-sm text-slate-400">${formatRelativeTime(tx.timestamp)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Send Section Renderer
function renderSendSection() {
    UIElements.mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">Send Tokens</h1>
            <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <form class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-sm text-slate-400">Recipient Address</label>
                        <input type="text" 
                               placeholder="Enter ETH address (0x...)" 
                               class="w-full px-4 py-3 bg-slate-800 rounded-lg text-white border border-slate-700 focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm text-slate-400">Amount</label>
                        <div class="relative">
                            <input type="number" 
                                   placeholder="0.0" 
                                   class="w-full px-4 py-3 bg-slate-800 rounded-lg text-white border border-slate-700 focus:outline-none focus:border-blue-500">
                            <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-700 px-3 py-1 rounded text-sm text-slate-300">
                                MAX
                            </button>
                        </div>
                    </div>
                    <button type="submit" 
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                        Review Transaction
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Receive Section Renderer
function renderReceiveSection() {
    UIElements.mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">Receive Tokens</h1>
            <div class="bg-slate-900 rounded-xl border border-slate-800 p-6 text-center">
                <div class="mb-6">
                    <div class="bg-slate-800 w-64 h-64 mx-auto rounded-xl flex items-center justify-center">
                        <i class="fas fa-qrcode text-6xl text-slate-600"></i>
                    </div>
                </div>
                <div class="space-y-4">
                    <p class="text-slate-400">Your ETH Address</p>
                    <div class="flex items-center justify-center space-x-2">
                        <code class="bg-slate-800 px-4 py-2 rounded text-slate-300">0x1234...5678</code>
                        <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Swap Section Renderer
function renderSwapSection() {
    UIElements.mainContent.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">Swap Tokens</h1>
            <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div class="space-y-4">
                    <div class="bg-slate-800 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-slate-400">From</span>
                            <span class="text-sm text-slate-400">Balance: 5.4321 ETH</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <input type="number" 
                                   placeholder="0.0" 
                                   class="flex-1 bg-transparent text-2xl text-white outline-none">
                            <button class="flex items-center space-x-2 bg-slate-700 px-3 py-2 rounded-lg">
                                <img src="image/ethereum.png" alt="ETH" class="w-6 h-6">
                                <span class="text-white">ETH</span>
                                <i class="fas fa-chevron-down text-slate-400"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button class="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>

                    <div class="bg-slate-800 rounded-lg p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-slate-400">To</span>
                            <span class="text-sm text-slate-400">Balance: 0.00 USDC</span>
                        </div>
                        <div class<div class="flex items-center space-x-4">
                            <input type="number" 
                                   placeholder="0.0" 
                                   class="flex-1 bg-transparent text-2xl text-white outline-none">
                            <button class="flex items-center space-x-2 bg-slate-700 px-3 py-2 rounded-lg">
                                <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
                                <span class="text-white">USDC</span>
                                <i class="fas fa-chevron-down text-slate-400"></i>
                            </button>
                        </div>
                    </div>

                    <div class="bg-slate-800/50 rounded-lg p-4">
                        <div class="flex justify-between text-sm text-slate-400">
                            <span>Exchange Rate</span>
                            <span>1 ETH = 1,789.23 USDC</span>
                        </div>
                        <div class="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Network Fee</span>
                            <span>≈ $2.50</span>
                        </div>
                        <div class="flex justify-between text-sm text-slate-400 mt-2">
                            <span>Minimum Received</span>
                            <span>1,786.73 USDC</span>
                        </div>
                    </div>

                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                        Preview Swap
                    </button>
                </div>
            </div>
        </div>
    `;
}

// History Section Renderer
function renderHistorySection() {
    UIElements.mainContent.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-white">Transaction History</h1>
                <div class="flex items-center space-x-2">
                    <div class="relative">
                        <input type="text" 
                               placeholder="Search transactions..." 
                               class="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 
                                      border border-slate-700 focus:outline-none focus:border-blue-500
                                      transition-colors pl-10">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                    <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>
            </div>

            <div class="bg-slate-900 rounded-xl border border-slate-800">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-slate-400 text-sm">
                                <th class="text-left p-4 font-medium">Type</th>
                                <th class="text-left p-4 font-medium">Asset</th>
                                <th class="text-right p-4 font-medium">Amount</th>
                                <th class="text-right p-4 font-medium">Address</th>
                                <th class="text-right p-4 font-medium">Date</th>
                                <th class="text-right p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${DashboardState.transactions.map(tx => `
                                <tr class="border-t border-slate-800 hover:bg-slate-800/50 transition-colors">
                                    <td class="p-4">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 rounded-full bg-${tx.type === 'received' ? 'green' : 'red'}-500/10 flex items-center justify-center">
                                                <i class="fas fa-arrow-${tx.type === 'received' ? 'down' : 'up'} text-${tx.type === 'received' ? 'green' : 'red'}-500"></i>
                                            </div>
                                            <span class="text-white">${tx.type === 'received' ? 'Received' : 'Sent'}</span>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="flex items-center space-x-2">
                                            <img src="image/ethereum.png" alt="ETH" class="w-6 h-6">
                                            <span class="text-white">ETH</span>
                                        </div>
                                    </td>
                                    <td class="text-right p-4">
                                        <span class="text-${tx.type === 'received' ? 'green' : 'red'}-400">
                                            ${tx.type === 'received' ? '+' : '-'}${tx.amount} ETH
                                        </span>
                                    </td>
                                    <td class="text-right p-4">
                                        <div class="flex items-center justify-end space-x-2">
                                            <span class="text-slate-300">${tx.from}</span>
                                            <button class="text-blue-500 hover:text-blue-400">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="text-right p-4 text-slate-300">
                                        ${formatRelativeTime(tx.timestamp)}
                                    </td>
                                    <td class="text-right p-4">
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Settings Section Renderer
function renderSettingsSection() {
    UIElements.mainContent.innerHTML = `
        <div class="max-w-3xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">Settings</h1>
            
            <div class="space-y-6">
                <!-- Profile Settings -->
                <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Profile Settings</h2>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm text-slate-400">Display Name</label>
                            <input type="text" 
                                   value="User123" 
                                   class="w-full px-4 py-2 bg-slate-800 rounded-lg text-white 
                                          border border-slate-700 focus:outline-none focus:border-blue-500">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-slate-400">Email Address</label>
                            <input type="email" 
                                   value="user@example.com" 
                                   class="w-full px-4 py-2 bg-slate-800 rounded-lg text-white 
                                          border border-slate-700 focus:outline-none focus:border-blue-500">
                        </div>
                    </div>
                </div>

                <!-- Security Settings -->
                <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Security</h2>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-white font-medium">Two-Factor Authentication</h3>
                                <p class="text-sm text-slate-400">Add an extra layer of security to your account</p>
                            </div>
                            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Enable
                            </button>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-white font-medium">Backup Phrase</h3>
                                <p class="text-sm text-slate-400">View your wallet recovery phrase</p>
                            </div>
                            <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Preferences -->
                <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Preferences</h2>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-white font-medium">Currency</h3>
                                <p class="text-sm text-slate-400">Select your preferred currency</p>
                            </div>
                            <select class="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700">
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                                <option value="gbp">GBP</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-white font-medium">Theme</h3>
                                <p class="text-sm text-slate-400">Choose your preferred theme</p>
                            </div>
                            <select class="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700">
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Export the main function
export { showDashboard };
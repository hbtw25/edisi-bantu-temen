// ComputeAR Heritage - Data Loader (API optional)

const API_BASE_URL = '/api';

console.log('ComputeAR Heritage loaded!');

// Local Device Mapping (Fallback)

const DEVICE_SLUG_MAP = {
    'ENIAC': 'eniac',
    'IBM System/360': 'ibm360',
    'Apple II': 'appleii',
    'Commodore 64': 'c64',
    'IBM PC 5150': 'ibmpc',
    'MacBook': 'macbook',
    'MacBook (Intel)': 'macbook'
};

let allDevicesCache = [];

function getLocalDevices() {
    if (typeof deviceDatabase === 'undefined' || !deviceDatabase) return [];
    return Object.values(deviceDatabase);
}

function getYearRangeForFilter(selectedEra) {
    switch (selectedEra) {
        case '1940s':
            return { start: 1940, end: 1959 };
        case '1960s':
            return { start: 1960, end: 1979 };
        case '1980s':
            return { start: 1980, end: 1999 };
        case '2000s':
            return { start: 2000, end: Number.POSITIVE_INFINITY };
        default:
            return null;
    }
}

function applyFilter(selectedEra) {
    if (selectedEra === 'all') {
        displayDevices(allDevicesCache);
        return;
    }

    const range = getYearRangeForFilter(selectedEra);
    if (!range) {
        displayDevices(allDevicesCache);
        return;
    }

    const filtered = allDevicesCache.filter((device) => {
        const year = Number(device.year);
        return Number.isFinite(year) && year >= range.start && year <= range.end;
    });

    displayDevices(filtered);
}

// Fetch Devices from Backend (fallback to local device-data.js)

async function loadDevices() {
    try {
        const response = await fetch(`${API_BASE_URL}/devices`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
            console.log('Loaded devices from API:', result.data);
            allDevicesCache = result.data;
            displayDevices(allDevicesCache);
            return;
        }
        throw new Error('API returned empty data');
    } catch (error) {
        console.warn('Failed to load devices from API, using local data:', error);
        allDevicesCache = getLocalDevices();
        displayDevices(allDevicesCache);
    }
}

// Display Devices in Grid

function displayDevices(devices) {
    const deviceGrid = document.getElementById('deviceGrid');
    
    if (!deviceGrid) return;
    
    deviceGrid.innerHTML = '';
    
    if (devices.length === 0) {
        deviceGrid.innerHTML = '<p style="color: #6b7280; text-align: center; grid-column: 1/-1;">Belum ada data komputer. Sedang memuat...</p>';
        return;
    }
    
    devices.forEach(device => {
        const card = createDeviceCard(device);
        deviceGrid.appendChild(card);
    });
}

// Create Device Card HTML

function createDeviceCard(device) {
    const card = document.createElement('div');
    card.className = 'device-card';
    card.setAttribute('data-era', device.era || '1940s');
    
    // Get slug dari mapping
    const deviceSlug = (typeof device.id === 'string' && device.id)
        ? device.id
        : (DEVICE_SLUG_MAP[device.name] || getDeviceSlug(device));
    
    // Check if device has model (berdasarkan nama)
    const hasModel = Boolean(device.hasModel || device.model_url || device.modelPath) ||
        ['Apple II', 'Commodore 64', 'IBM PC 5150', 'MacBook (Intel)'].includes(device.name);
    
    card.innerHTML = `
        <div class="device-image">
            <img src="${device.image_url || 'https://via.placeholder.com/300x200/db2777/ffffff?text=' + encodeURIComponent(device.name)}" 
                 alt="${device.name}"
                 onerror="this.src='https://via.placeholder.com/300x200/db2777/ffffff?text=${encodeURIComponent(device.name)}'">
            <div class="device-badge">${device.year}</div>
        </div>
        <div class="device-info">
            <h3>${device.name}</h3>
            <p class="device-category">${device.category}</p>
            <p class="device-desc">${device.description ? device.description.substring(0, 80) + '...' : 'Komputer bersejarah'}</p>
            <div class="device-actions">
                <button class="btn-small btn-primary" onclick="viewDetail('${deviceSlug}')">
                    Detail
                </button>
                ${hasModel ? `
                <button class="btn-small btn-ar" onclick="viewAR('${deviceSlug}')">
                    View in AR
                </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Map Device to Slug

function getDeviceSlug(device) {
    const name = device.name.toLowerCase();
    
    if (name.includes('eniac')) return 'eniac';
    if (name.includes('ibm') && name.includes('360')) return 'ibm360';
    if (name.includes('apple ii') || name.includes('apple 2')) return 'appleii';
    if (name.includes('commodore')) return 'c64';
    if (name.includes('ibm') && (name.includes('pc') || name.includes('5150'))) return 'ibmpc';
    if (name.includes('macbook')) return 'macbook';
    
    // Fallback
    return name.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Navigation Functions

// Navigate to detail page (Langsung - ga pakai API)
function viewDetail(deviceSlug) {
    console.log('Navigating to detail:', deviceSlug);
    window.location.href = `detail.html?id=${deviceSlug}`;
}

// Navigate to AR viewer (Langsung - ga pakai API)
function viewAR(deviceSlug) {
    console.log('Navigating to AR:', deviceSlug);
    window.location.href = `ar-viewer.html?id=${deviceSlug}`;
}

// Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const selectedEra = tab.getAttribute('data-era');

            applyFilter(selectedEra);
        });
    });
});

// Navigation & Smooth Scroll

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        link.classList.add('active');
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Helper Functions
function scrollToCollection() {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
        collectionSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// AR Info Modal - FIXED dengan Tombol X

function showARInfo() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'arInfoModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.3s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    // Create modal content
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
            position: relative;
            margin: auto;
        ">
            <!-- Tombol X - LEBIH JELAS -->
            <button onclick="closeARInfoModal()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #fce7f3;
                border: 2px solid #ec4899;
                font-size: 1.5rem;
                color: #db2777;
                cursor: pointer;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                font-weight: bold;
                z-index: 10;
            " onmouseover="this.style.background='#ec4899'; this.style.color='white'" 
               onmouseout="this.style.background='#fce7f3'; this.style.color='#db2777'">
                ✕
            </button>

            <div style="text-align: center; margin-bottom: 1.5rem; padding-right: 2rem;">
                <h2 style="color: #db2777; margin: 0; font-size: 1.75rem;">Tentang Augmented Reality (AR)</h2>
            </div>
            
            <p style="color: #6b7280; line-height: 1.8; margin-bottom: 1.5rem; text-align: center;">
                AR memungkinkan Anda melihat model 3D komputer bersejarah di ruangan Anda sendiri!
            </p>
            
            <!-- SEMUA PINK SOFT -->
            <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
                <h3 style="color: #db2777; font-size: 1.1rem; margin: 0 0 1rem 0;">Fitur AR:</h3>
                <ul style="list-style: none; padding: 0; margin: 0; color: #6b7280;">
                    <li style="margin-bottom: 0.5rem;">✦ Lihat komputer dalam skala sebenarnya</li>
                    <li style="margin-bottom: 0.5rem;">✦ Putar dan zoom model 3D</li>
                    <li style="margin-bottom: 0.5rem;">✦ Jelajahi dari berbagai sudut</li>
                    <li style="margin-bottom: 0.5rem;">✦ Ambil foto dengan model AR</li>
                </ul>
            </div>
            
            <div style="background: #fce7f3; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
                <h3 style="color: #db2777; font-size: 1.1rem; margin: 0 0 1rem 0;">Persyaratan:</h3>
                <ul style="list-style: none; padding: 0; margin: 0; color: #6b7280;">
                    <li style="margin-bottom: 0.5rem;">✦ Smartphone/tablet dengan kamera</li>
                    <li style="margin-bottom: 0.5rem;">✦ Browser modern (Chrome/Safari)</li>
                    <li style="margin-bottom: 0.5rem;">✦ Koneksi internet stabil</li>
                </ul>
            </div>
            
            <div style="background: #fce7f3; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: center;">
                <p style="margin: 0; color: #db2777; font-weight: 600;">
                    Model tersedia: Apple II, Commodore 64, IBM PC, MacBook
                </p>
            </div>
            
            <button onclick="closeARInfoModal()" style="
                width: 100%;
                background: #ec4899;
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
            " onmouseover="this.style.background='#db2777'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(236, 72, 153, 0.4)'" 
               onmouseout="this.style.background='#ec4899'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(236, 72, 153, 0.3)'">
                Mengerti
            </button>
        </div>
    `;
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeARInfoModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeARInfoModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeARInfoModal() {
    const modal = document.getElementById('arInfoModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// PWA Installation

let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Install prompt available');
    e.preventDefault();
    deferredPrompt = e;
    
    setTimeout(() => {
        if (installPrompt) installPrompt.style.display = 'block';
    }, 3000);
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User response: ${outcome}`);
        if (installPrompt) installPrompt.style.display = 'none';
        deferredPrompt = null;
    });
}

if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        if (installPrompt) installPrompt.style.display = 'none';
    });
}

// Service Worker Registration

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Online/Offline Detection

window.addEventListener('online', () => {
    console.log('☑ Back online!');
});

window.addEventListener('offline', () => {
    console.log('☒ You are offline. Cached content will be served.');
});

// Initialize on Load

document.addEventListener('DOMContentLoaded', async () => {
    console.log('ComputeAR Heritage initialized!');
    
    // Load devices (API optional)
    await loadDevices();
    
    // Check if app is running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Running as PWA');
    }
});

console.log('All systems ready!');

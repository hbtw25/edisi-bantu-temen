// detail.js - Handle detail page functionality

// Get device ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const deviceId = urlParams.get('id');

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    if (!deviceId) {
        showError('Device ID tidak ditemukan');
        return;
    }

    try {
        await loadDeviceData(deviceId);
    } catch (error) {
        console.error('Error loading device:', error);
        showError('Gagal memuat data komputer');
    }
});

// Load device data
async function loadDeviceData(id) {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('mainContent');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get device from database
    const device = deviceDatabase[id];
    
    if (!device) {
        throw new Error('Device not found');
    }

    // Hide loading, show content
    loading.style.display = 'none';
    mainContent.style.display = 'block';

    // Populate all data
    populateDeviceInfo(device);
    loadModel(device);
    renderTimeline(device.timelinePosition, device.year);
}

// Populate device information
function populateDeviceInfo(device) {
    document.getElementById('deviceName').textContent = device.name;
    document.getElementById('deviceManufacturer').textContent = device.manufacturer;
    document.getElementById('deviceYear').textContent = device.year;
    document.getElementById('deviceEra').textContent = device.era;
    document.getElementById('deviceCategory').textContent = device.category;
    document.getElementById('deviceStatus').textContent = device.status;
    document.getElementById('deviceDescription').textContent = device.description;
    document.getElementById('deviceContext').textContent = device.context;
    document.getElementById('deviceImpact').textContent = device.impact;

    // Populate specifications
    const specsContainer = document.getElementById('specsContainer');
    specsContainer.innerHTML = '';
    
    for (const [label, value] of Object.entries(device.specs)) {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${label}</span>
            <span class="spec-value">${value}</span>
        `;
        specsContainer.appendChild(specItem);
    }

    // Update page title
    document.title = `${device.name} - ComputeAR Heritage`;

    // Hide AR button if no model
    const mainArButton = document.getElementById('mainArButton');
    if (!device.hasModel) {
        mainArButton.style.display = 'none';
    }
}

// Load 3D model or show placeholder
function loadModel(device) {
    const wrapper = document.getElementById('modelViewerWrapper');
    
    if (device.hasModel && device.modelPath) {
        // Create model-viewer element
        wrapper.innerHTML = `
            <model-viewer
                id="modelViewer"
                src="${device.modelPath}"
                camera-controls
                touch-action="pan-y"
                auto-rotate
                shadow-intensity="1"
                ar
                ar-modes="webxr scene-viewer quick-look"
                alt="${device.name} 3D Model"
                loading="eager">
            </model-viewer>
        `;
        
        // TAMBAH: Hide loading saat model selesai load
        const modelViewer = document.getElementById('modelViewer');
        
        modelViewer.addEventListener('load', () => {
            console.log('Model loaded successfully!');
            // Loading otomatis hilang, ga perlu action
        });
        
        modelViewer.addEventListener('error', (e) => {
            console.error('Error loading model:', e);
            wrapper.innerHTML = `
                <div class="no-model-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ec4899">
                        <circle cx="12" cy="12" r="10" stroke-width="2"/>
                        <line x1="15" y1="9" x2="9" y2="15" stroke-width="2"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke-width="2"/>
                    </svg>
                    <h3>Gagal Memuat Model</h3>
                    <p>File model tidak ditemukan atau corrupt</p>
                </div>
            `;
        });
        
        // Show AR button
        const arButton = document.getElementById('arButton');
        arButton.style.display = 'flex';
        
        // AR button click handler
        arButton.addEventListener('click', () => {
            if (modelViewer) {
                modelViewer.activateAR();
            }
        });
    } else {
        // Show no model state
        wrapper.innerHTML = `
            <div class="no-model-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                    <line x1="3" y1="9" x2="21" y2="9" stroke-width="2"/>
                    <line x1="9" y1="21" x2="9" y2="9" stroke-width="2"/>
                </svg>
                <h3>Model 3D Tidak Tersedia</h3>
            </div>
        `;
    }
}

// Render timeline
function renderTimeline(position, year) {
    const timelineVisual = document.getElementById('timelineVisual');
    
    timelineVisual.innerHTML = `
        <div class="timeline-bar">
            <div class="timeline-marker active" style="left: ${position}%;">
                <div class="timeline-label">${year}</div>
            </div>
            <div class="timeline-marker" style="left: 0%;">
                <div class="timeline-label">1940</div>
            </div>
            <div class="timeline-marker" style="left: 100%;">
                <div class="timeline-label">2020</div>
            </div>
        </div>
    `;
}

// Go back
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Share device
async function shareDevice() {
    const device = deviceDatabase[deviceId];
    if (!device) return;

    const shareData = {
        title: `${device.name} - ComputeAR Heritage`,
        text: `Lihat ${device.name} (${device.year}) di museum virtual!`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link berhasil disalin!');
        }
    } catch (error) {
        console.error('Error sharing:', error);
    }
}

// Open AR viewer
function openARViewer() {
    const device = deviceDatabase[deviceId];
    if (!device) return;
    
    if (!device.hasModel) {
        alert('Model 3D untuk komputer ini belum tersedia');
        return;
    }
    
    // Redirect ke AR viewer
    console.log('Opening AR viewer for:', deviceId);
    window.location.href = `ar-viewer.html?id=${deviceId}`;
}

// Show error
function showError(message) {
    const loading = document.getElementById('loading');
    loading.innerHTML = `
        <div style="text-align: center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ec4899" style="margin-bottom: 1rem;">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke-width="2" stroke-linecap="round"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h2 style="margin-bottom: 1rem; color: #111827;">${message}</h2>
            <button onclick="goBack()" class="btn btn-primary">
                Kembali ke Koleksi
            </button>
        </div>
    `;
}
// Camera Overlay Component - Exact React Replica
export class CameraOverlay {
    constructor() {
        this.isActive = false;
        this.stream = null;
        this.videoElement = null;
    }

    render() {
        if (!this.isActive) return '';

        return `
            <div id="cameraOverlay" class="fixed bottom-4 right-4 z-50">
                <div class="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border-2 border-purple-500/30 shadow-2xl overflow-hidden">
                    <!-- Header -->
                    <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3 flex items-center justify-between z-10">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span class="text-xs font-semibold text-white">Recording</span>
                        </div>
                        <button id="closeCameraButton" class="text-white/70 hover:text-white transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Video Feed -->
                    <video 
                        id="cameraVideo" 
                        autoplay 
                        playsinline 
                        muted
                        class="w-64 h-48 object-cover"
                    ></video>

                    <!-- Controls -->
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center justify-center gap-3">
                        <button id="toggleCameraButton" class="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-all">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button id="snapshotButton" class="px-4 py-2 bg-purple-500/80 hover:bg-purple-500 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-all">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <!-- AI Proctoring Indicator (Optional) -->
                    <div class="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-[10px] font-semibold text-white">AI Monitoring</span>
                    </div>
                </div>
            </div>
        `;
    }

    async activate() {
        this.isActive = true;
        
        // Request camera access
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                },
                audio: false 
            });

            // Wait for DOM to be ready
            setTimeout(() => {
                this.videoElement = document.getElementById('cameraVideo');
                if (this.videoElement && this.stream) {
                    this.videoElement.srcObject = this.stream;
                }
                this.attachEventListeners();
            }, 100);

            return true;
        } catch (error) {
            console.error('Camera access denied:', error);
            this.isActive = false;
            return false;
        }
    }

    deactivate() {
        this.isActive = false;
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        const overlay = document.getElementById('cameraOverlay');
        if (overlay) {
            overlay.remove();
        }
    }

    attachEventListeners() {
        const closeButton = document.getElementById('closeCameraButton');
        const snapshotButton = document.getElementById('snapshotButton');

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.deactivate();
            });
        }

        if (snapshotButton) {
            snapshotButton.addEventListener('click', () => {
                this.takeSnapshot();
            });
        }
    }

    takeSnapshot() {
        if (!this.videoElement) return;

        const canvas = document.createElement('canvas');
        canvas.width = this.videoElement.videoWidth;
        canvas.height = this.videoElement.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.videoElement, 0, 0);

        // Convert to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `codeverse-snapshot-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // Visual feedback
        if (window.anime) {
            anime({
                targets: '#cameraOverlay',
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
        }
    }

    toggle() {
        if (this.isActive) {
            this.deactivate();
        } else {
            this.activate();
        }
    }
}

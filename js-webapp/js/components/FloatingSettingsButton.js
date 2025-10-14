// Floating Settings Button Component
export class FloatingSettingsButton {
    constructor(onClickCallback) {
        this.onClickCallback = onClickCallback;
    }

    render() {
        return `
            <button 
                id="floatingSettingsButton" 
                class="fixed bottom-4 left-4 z-40 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group"
                title="Settings"
            >
                <svg class="w-6 h-6 transition-transform group-hover:rotate-90 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                
                <!-- Pulse effect -->
                <span class="absolute inset-0 rounded-full bg-purple-500 opacity-75 animate-ping"></span>
            </button>
        `;
    }

    attachEventListeners() {
        const button = document.getElementById('floatingSettingsButton');
        if (button && this.onClickCallback) {
            button.addEventListener('click', this.onClickCallback);
        }
    }

    mount(container) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.render();
        container.appendChild(wrapper.firstElementChild);
        this.attachEventListeners();
    }

    remove() {
        const button = document.getElementById('floatingSettingsButton');
        if (button) {
            button.remove();
        }
    }
}

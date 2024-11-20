class iPhoneEmulator {
    constructor() {
        this.screen = document.querySelector('.iphone-screen');
        if (!this.screen) return;

        this.apps = [
            { name: 'BullX', icon: '🐂', color: '#ff007a' },
            { name: 'ChatGPT', icon: '🤖', color: '#ff6b6b' },
            { name: 'Trading', icon: '📈', color: '#00ff9d' },
            { name: 'Settings', icon: '⚙️', color: '#ffffff' },
            { name: 'Music Player', icon: '🎵', color: '#6c54d8' },
            { name: 'Raydium', icon: '🌊', color: '#00c2ff' },
            { name: 'Jupiter', icon: '🚀', color: '#ff9900' },
            { name: 'Phantom', icon: '👻', color: '#ab9ff2' },
            { name: 'Birdeye', icon: '👁', color: '#00ff88' },
            { name: 'DexTools', icon: '📊', color: '#5cff9d' },
            { name: 'DexScreener', icon: '📱', color: '#00ffcc' },
            { name: 'NFT Gallery', icon: '🖼', color: '#ff66cc' },
            { name: 'Solscan', icon: '🔍', color: '#3399ff' },
            { name: 'Dexlab', icon: '🧪', color: '#ff3366' },
            { name: 'Orca', icon: '🐋', color: '#00ccff' },
            { name: 'Marinade', icon: '🌊', color: '#ff9933' },
            { name: 'Mango', icon: '🥭', color: '#ffcc00' },
            { name: 'Drift', icon: '🎯', color: '#ff66aa' },
            { name: 'Tensor', icon: '🎲', color: '#9966ff' },
            { name: 'Solend', icon: '💫', color: '#33cc33' }
        ];

        this.playlist = [
            { title: 'Simpsonwave X You Look Lonely', path: 'media/Simpsonwave X You Look Lonely.mp3' },
            { title: 'Nothing by Layt0n', path: 'media/Nothing by Layt0n.mp3' },
            { title: 'DARK BEACH', path: 'media/DARK BEACH.mp3' },
            { title: 'CLOUDS', path: 'media/CLOUDS.mp3' }
        ];
        this.currentTrackIndex = 0;

        this.currentApp = null;
        this.init();
    }

    init() {
        this.createHomeScreen();
        this.addInteractions();
        
        // Start all widget updates after the screen is created
        setTimeout(() => {
            this.startTimeWidget();
            this.updateAllPrices(); // Initial price update
            setInterval(() => this.updateAllPrices(), 30000); // Update every 30 seconds
        }, 100);
    }

    createHomeScreen() {
        const mainContainer = document.createElement('div');
        const customWallpaper = localStorage.getItem('custom-wallpaper');
        mainContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            background: url('${customWallpaper || 'iphonewallpaper.webp'}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
        `;

        // Create widgets container
        const widgetsContainer = document.createElement('div');
        widgetsContainer.style.cssText = `
            padding: 15px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            background: transparent;
            position: relative;
            z-index: 1;
        `;

        // Create and add widgets
        const widgets = [
            {
                name: 'time-widget',
                content: this.createTimeWidget()
            },
            {
                name: 'sol-widget',
                content: this.createSolanaWidget()
            },
            {
                name: 'eth-widget',
                content: this.createEthereumWidget()
            },
            {
                name: 'btc-widget',
                content: this.createBitcoinWidget()
            }
        ];

        widgets.forEach(widget => {
            widgetsContainer.appendChild(widget.content);
        });

        // Updated app grid styling
        const grid = document.createElement('div');
        grid.className = 'app-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            padding: 15px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
        `;

        // Add everything to the main container
        mainContainer.appendChild(widgetsContainer);
        mainContainer.appendChild(grid);
        this.screen.appendChild(mainContainer);

        // Add apps to grid
        this.apps.forEach(app => {
            grid.appendChild(this.createAppIcon(app));
        });
    }

    createWidget(title, icon, value) {
        const widget = document.createElement('div');
        widget.style.cssText = `
            background: rgba(128, 128, 128, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 15px 20px;
            border-radius: 24px;
            color: white;
            font-size: 1.1rem;
            min-width: 150px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        widget.innerHTML = `
            <div style="font-size: 1rem; opacity: 0.9;">${icon} ${title}</div>
            <div style="font-size: 1.4rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${value}</div>
        `;
        return widget;
    }

    createTimeWidget() {
        const widget = this.createWidget('Time', '🕐', '');
        widget.className = 'time-widget';
        return widget;
    }

    createSolanaWidget() {
        const widget = this.createWidget('Solana', '⚡', '$...');
        widget.className = 'sol-widget';
        return widget;
    }

    createEthereumWidget() {
        const widget = this.createWidget('Ethereum', '⟠', '$...');
        widget.className = 'eth-widget';
        return widget;
    }

    createBitcoinWidget() {
        const widget = this.createWidget('Bitcoin', '₿', '$...');
        widget.className = 'btc-widget';
        return widget;
    }

    createAppIcon(app) {
        const appIcon = document.createElement('div');
        appIcon.className = 'app-icon';
        appIcon.innerHTML = `
            <div class="icon" style="
                font-size: 1.5rem;
                margin-bottom: 3px;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                width: 48px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">${app.icon}</div>
            <div class="app-name" style="
                font-size: 0.65rem;
                color: white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 60px;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                line-height: 1.2;
            ">${app.name}</div>
        `;
        appIcon.style.cssText = `
            text-align: center;
            cursor: pointer;
            padding: 3px;
            transition: transform 0.2s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

        const icon = appIcon.querySelector('.icon');
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.1)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });

        return appIcon;
    }

    startTimeWidget() {
        const updateTime = () => {
            const timeWidget = this.screen.querySelector('.time-widget');
            if (timeWidget) {
                const now = new Date();
                const time = now.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                const date = now.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                });
                timeWidget.innerHTML = `
                    <div style="font-size: 1rem; opacity: 0.9;">🕐 Time</div>
                    <div style="font-size: 1.4rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${time}</div>
                `;
            }
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    async updateAllPrices() {
        try {
            // Using a CORS proxy and different endpoint
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd', {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    // Add your CoinGecko API key here if you have one
                    // 'x-cg-pro-api-key': 'YOUR_API_KEY'
                }
            });

            if (!response.ok) {
                // If API fails, use fallback static data
                const fallbackData = {
                    bitcoin: { usd: 65000 },
                    ethereum: { usd: 3200 },
                    solana: { usd: 110 }
                };
                this.updateWidgets(fallbackData);
                return;
            }

            const data = await response.json();
            this.updateWidgets(data);
        } catch (error) {
            console.error('Error fetching prices:', error);
            // Use fallback data if API fails
            const fallbackData = {
                bitcoin: { usd: 65000 },
                ethereum: { usd: 3200 },
                solana: { usd: 110 }
            };
            this.updateWidgets(fallbackData);
        }
    }

    updateWidgets(data) {
        const solWidget = this.screen.querySelector('.sol-widget');
        const ethWidget = this.screen.querySelector('.eth-widget');
        const btcWidget = this.screen.querySelector('.btc-widget');

        if (solWidget && data.solana) {
            solWidget.innerHTML = `
                <div style="font-size: 1rem; opacity: 0.9;">⚡ Solana</div>
                <div style="font-size: 1.4rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">$${data.solana.usd.toLocaleString()}</div>
            `;
        }

        if (ethWidget && data.ethereum) {
            ethWidget.innerHTML = `
                <div style="font-size: 1rem; opacity: 0.9;">⟠ Ethereum</div>
                <div style="font-size: 1.4rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">$${data.ethereum.usd.toLocaleString()}</div>
            `;
        }

        if (btcWidget && data.bitcoin) {
            btcWidget.innerHTML = `
                <div style="font-size: 1rem; opacity: 0.9;">₿ Bitcoin</div>
                <div style="font-size: 1.4rem; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">$${data.bitcoin.usd.toLocaleString()}</div>
            `;
        }
    }

    addInteractions() {
        const icons = this.screen.querySelectorAll('.app-icon');
        icons.forEach(icon => {
            // Only trigger on icon click, not the whole area
            const iconElement = icon.querySelector('.icon');
            iconElement.addEventListener('click', () => {
                const appName = icon.querySelector('.app-name').textContent;
                this.openApp(appName);
            });
        });
    }

    openApp(appName) {
        const app = this.apps.find(a => a.name === appName);
        if (!app) return;

        const appScreen = document.createElement('div');
        appScreen.className = 'app-screen';
        Object.assign(appScreen.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `url('${localStorage.getItem('custom-wallpaper') || 'iphonewallpaper.webp'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: '100',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            borderRadius: '35px',
            overflow: 'hidden'
        });

        const header = document.createElement('div');
        header.innerHTML = `
            <div style="
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(255,255,255,0.1);
            ">
                <span class="back-btn" style="
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 5px 15px;
                    color: #5cff9d;
                    background: rgba(255,255,255,0.1);
                    border-radius: 15px;
                ">←</span>
                <span style="
                    color: #5cff9d;
                    font-weight: bold;
                ">${appName}</span>
                <span style="width: 40px"></span>
            </div>
        `;

        const content = document.createElement('div');
        content.style.padding = '0';
        content.style.height = 'calc(100% - 60px)';
        content.style.overflow = 'hidden';
        
        if (appName === 'Settings') {
            content.innerHTML = `
                <div style="
                    padding: 20px;
                    color: white;
                    background: transparent;
                    height: 100%;
                    overflow-y: auto;
                ">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        padding: 20px;
                        border-radius: 15px;
                        margin-bottom: 20px;
                        border: 1px solid rgba(255,255,255,0.1);
                    ">
                        <h3 style="margin-bottom: 15px; color: #000000;">Wallpaper Settings</h3>
                        <p style="margin-bottom: 15px; opacity: 0.8;">Choose a new wallpaper for your iPhone</p>
                        <input type="file" 
                            accept="image/*" 
                            id="wallpaper-upload"
                            style="
                                display: none;
                            "
                        >
                        <label for="wallpaper-upload" style="
                            display: inline-block;
                            padding: 10px 20px;
                            background: #000000;
                            color: white;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: opacity 0.3s ease;
                        ">
                            Upload Image
                        </label>
                        <button id="reset-wallpaper" style="
                            display: inline-block;
                            padding: 10px 20px;
                            background: rgba(255,255,255,0.1);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            margin-left: 10px;
                            transition: opacity 0.3s ease;
                        ">
                            Reset to Default
                        </button>
                    </div>
                </div>
            `;

            // Add event listeners after content is added
            setTimeout(() => {
                const fileInput = content.querySelector('#wallpaper-upload');
                const resetButton = content.querySelector('#reset-wallpaper');

                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            // Store the wallpaper in localStorage
                            localStorage.setItem('custom-wallpaper', event.target.result);
                            // Update the wallpaper immediately
                            const mainContainer = document.querySelector('.iphone-screen > div');
                            if (mainContainer) {
                                mainContainer.style.backgroundImage = `url(${event.target.result})`;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                });

                resetButton.addEventListener('click', () => {
                    // Remove custom wallpaper from localStorage
                    localStorage.removeItem('custom-wallpaper');
                    // Reset to default wallpaper
                    const mainContainer = document.querySelector('.iphone-screen > div');
                    if (mainContainer) {
                        mainContainer.style.backgroundImage = 'url(\'iphonewallpaper.webp\')';
                    }
                });
            }, 0);

        } else if (appName === 'Music Player') {
            const audio = document.getElementById('backgroundMusic');
            content.innerHTML = `
                <div style="
                    padding: 20px;
                    color: white;
                    background: transparent;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                ">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        padding: 20px;
                        border-radius: 15px;
                        text-align: center;
                        border: 1px solid rgba(255,255,255,0.1);
                    ">
                        <h3 style="margin-bottom: 15px; color: #000000;">Now Playing</h3>
                        <p style="font-size: 1.2rem;">${this.playlist[this.currentTrackIndex].title}</p>
                    </div>

                    <div style="
                        background: rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        padding: 20px;
                        border-radius: 15px;
                        border: 1px solid rgba(255,255,255,0.1);
                    ">
                        <div style="margin-bottom: 20px;">
                            <p style="margin-bottom: 10px; color: ${app.color};">Progress</p>
                            <input type="range" 
                                id="progress-slider" 
                                min="0" 
                                max="100" 
                                value="0"
                                style="
                                    width: 100%;
                                    height: 5px;
                                    border-radius: 5px;
                                    -webkit-appearance: none;
                                    background: rgba(255,255,255,0.1);
                                    cursor: pointer;
                                "
                            >
                            <div id="time-display" style="
                                display: flex;
                                justify-content: space-between;
                                margin-top: 5px;
                                font-size: 0.8rem;
                                opacity: 0.8;
                            ">
                                <span id="current-time">0:00</span>
                                <span id="duration">0:00</span>
                            </div>
                        </div>

                        <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 30px;
                            margin: 30px 0;
                        ">
                            <button id="prev-btn" style="
                                background: rgba(255,255,255,0.1);
                                border: none;
                                color: white;
                                font-size: 28px;
                                cursor: pointer;
                                padding: 15px;
                                border-radius: 50%;
                                width: 60px;
                                height: 60px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                            ">⏮</button>
                            <button id="play-pause-btn" style="
                                background: ${app.color};
                                border: none;
                                color: white;
                                font-size: 32px;
                                cursor: pointer;
                                padding: 20px;
                                border-radius: 50%;
                                width: 70px;
                                height: 70px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                            ">⏸</button>
                            <button id="next-btn" style="
                                background: rgba(255,255,255,0.1);
                                border: none;
                                color: white;
                                font-size: 28px;
                                cursor: pointer;
                                padding: 15px;
                                border-radius: 50%;
                                width: 60px;
                                height: 60px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                            ">⏭</button>
                        </div>

                        <div>
                            <p style="margin-bottom: 10px; color: ${app.color};">Volume</p>
                            <input type="range" 
                                id="volume-slider" 
                                min="0" 
                                max="100" 
                                value="${audio ? audio.volume * 100 : 8}"
                                style="
                                    width: 100%;
                                    height: 5px;
                                    border-radius: 5px;
                                    -webkit-appearance: none;
                                    background: rgba(255,255,255,0.1);
                                    cursor: pointer;
                                "
                            >
                            <div style="text-align: right; margin-top: 5px; font-size: 0.8rem; opacity: 0.8;">
                                <span id="volume-display">${audio ? Math.round(audio.volume * 100) : 8}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners after content is added
            setTimeout(() => {
                const progressSlider = content.querySelector('#progress-slider');
                const volumeSlider = content.querySelector('#volume-slider');
                const currentTimeDisplay = content.querySelector('#current-time');
                const durationDisplay = content.querySelector('#duration');
                const volumeDisplay = content.querySelector('#volume-display');
                const playPauseBtn = content.querySelector('#play-pause-btn');
                const prevBtn = content.querySelector('#prev-btn');
                const nextBtn = content.querySelector('#next-btn');

                if (audio) {
                    // Update play/pause button based on current state
                    playPauseBtn.textContent = audio.paused ? '▶️' : '⏸️';

                    // Play/Pause button control
                    playPauseBtn.addEventListener('click', () => {
                        if (audio.paused) {
                            audio.play();
                            playPauseBtn.textContent = '⏸️';
                        } else {
                            audio.pause();
                            playPauseBtn.textContent = '▶️';
                        }
                    });

                    // Previous and Next buttons with playlist functionality
                    prevBtn.addEventListener('click', () => {
                        this.playPreviousTrack();
                        const songTitle = content.querySelector('p');
                        songTitle.textContent = this.playlist[this.currentTrackIndex].title;
                    });

                    nextBtn.addEventListener('click', () => {
                        this.playNextTrack();
                        const songTitle = content.querySelector('p');
                        songTitle.textContent = this.playlist[this.currentTrackIndex].title;
                    });

                    // Auto-play next song when current one ends
                    audio.addEventListener('ended', () => {
                        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
                        audio.src = this.playlist[this.currentTrackIndex].path;
                        audio.play();
                        const songTitle = content.querySelector('p');
                        songTitle.textContent = this.playlist[this.currentTrackIndex].title;
                    });

                    // Update progress slider and time display
                    audio.addEventListener('timeupdate', () => {
                        const progress = (audio.currentTime / audio.duration) * 100;
                        progressSlider.value = progress;
                        
                        const currentMinutes = Math.floor(audio.currentTime / 60);
                        const currentSeconds = Math.floor(audio.currentTime % 60);
                        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
                        
                        if (!isNaN(audio.duration)) {
                            const durationMinutes = Math.floor(audio.duration / 60);
                            const durationSeconds = Math.floor(audio.duration % 60);
                            durationDisplay.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
                        }
                    });

                    // Progress slider control
                    progressSlider.addEventListener('input', () => {
                        const time = (progressSlider.value / 100) * audio.duration;
                        audio.currentTime = time;
                    });

                    // Volume slider control
                    volumeSlider.addEventListener('input', () => {
                        const volume = volumeSlider.value / 100;
                        audio.volume = volume;
                        volumeDisplay.textContent = `${Math.round(volume * 100)}%`;
                    });
                }
            }, 0);
        } else if (appName === 'BullX') {
            content.innerHTML = `
                <iframe 
                    src="https://bullx.io/pump-vision" 
                    style="
                        width: 100%;
                        height: 100%;
                        border: none;
                        background: white;
                    "
                    allow="fullscreen"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
            `;
        } else if (appName === 'Trading') {
            const widgetContainer = document.createElement('div');
            widgetContainer.id = 'tradingview_widget';
            widgetContainer.style.cssText = 'height: 100%; background: #20124D;';
            content.appendChild(widgetContainer);

            // Load TradingView widget
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "autosize": true,
                "symbol": "COINBASE:SOLUSD",
                "interval": "60",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "backgroundColor": "rgba(32, 18, 77, 1)",
                "gridColor": "rgba(0, 255, 0, 0.06)",
                "allow_symbol_change": true,
                "calendar": false,
                "support_host": "https://www.tradingview.com"
            });
            widgetContainer.appendChild(script);
        } else {
            content.innerHTML = `
                <div style="
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${app.color};
                    background: #000000;
                ">
                    Coming Soon
                </div>
            `;
        }

        appScreen.appendChild(header);
        appScreen.appendChild(content);
        this.screen.appendChild(appScreen);

        appScreen.offsetHeight;
        appScreen.style.opacity = '1';

        header.querySelector('.back-btn').addEventListener('click', () => {
            appScreen.style.opacity = '0';
            setTimeout(() => appScreen.remove(), 300);
        });
    }

    playNextTrack() {
        const audio = document.getElementById('backgroundMusic');
        if (!audio) return;

        // Only play next if not at the end
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.currentTrackIndex++;
            audio.src = this.playlist[this.currentTrackIndex].path;
            audio.play();
        }
    }

    playPreviousTrack() {
        const audio = document.getElementById('backgroundMusic');
        if (!audio) return;

        // Only play previous if not at the start
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            audio.src = this.playlist[this.currentTrackIndex].path;
            audio.play();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new iPhoneEmulator();
}); 
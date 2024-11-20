document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading sequence first
    initLoader();
    
    // Initialize smooth scroll
    initSmoothScroll();
    // Initialize Phantom wallet button
    initPhantomButton();
    // Initialize background music
    initBackgroundMusic();

    // Check if already connected to Phantom
    checkPhantomConnection();
});

function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Show loader for 2.5 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start other animations after loader is hidden
            initFloatingElements();
            initBackground();
        }, 500);
    }, 2500);
}

function initFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;

    const elements = ['💎', '🚀', '💫', '⭐️'];
    elements.forEach((element, index) => {
        const div = document.createElement('div');
        div.textContent = element;
        div.style.position = 'relative';
        div.style.display = 'inline-block';
        div.style.fontSize = '2rem';
        div.style.animationDelay = `${index * 0.5}s`;
        floatingContainer.appendChild(div);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initBackground() {
    const canvas = document.querySelector('#background-animation');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create particles
    const particles = new THREE.Group();
    const particleCount = 200;
    const particleGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff9d });

    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
        );
        particle.userData = {
            originalPosition: particle.position.clone(),
            speed: Math.random() * 0.02 + 0.01
        };
        particles.add(particle);
    }
    scene.add(particles);

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particles.children.forEach(particle => {
            particle.position.y += particle.userData.speed;
            if (particle.position.y > 5) {
                particle.position.y = -5;
            }
        });

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();
}

function initPhantomButton() {
    const connectButton = document.querySelector('.connect-wallet');
    if (connectButton) {
        connectButton.addEventListener('click', connectPhantom);
    }
}

function initBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (!audio) return;

    // Set initial volume to 8%
    audio.volume = 0.08;

    // Try to play immediately
    const playAttempt = setInterval(() => {
        audio.play()
        .then(() => {
            clearInterval(playAttempt);
        })
        .catch(error => {
            console.log("Auto-play prevented. Will retry.");
        });
    }, 1000);

    // Also try to play on any user interaction
    const playOnInteraction = () => {
        audio.play()
        .then(() => {
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('scroll', playOnInteraction);
            window.removeEventListener('wheel', playOnInteraction);
            clearInterval(playAttempt);
        })
        .catch(error => {
            console.log("Playback failed:", error);
        });
    };

    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction);
    window.addEventListener('wheel', playOnInteraction);
}

// Check if already connected to Phantom
const checkPhantomConnection = async () => {
    try {
        const { solana } = window;
        if (solana && solana.isPhantom && solana.isConnected) {
            const publicKey = solana.publicKey.toString();
            const connectButton = document.querySelector('.connect-wallet');
            connectButton.innerHTML = publicKey.slice(0, 4) + '...' + publicKey.slice(-4);
            connectButton.onclick = disconnectPhantom;
            connectButton.style.background = '#00ff9d';
        }
    } catch (error) {
        console.error('Error checking Phantom connection:', error);
    }
};

// Add Phantom wallet connection functionality
async function connectPhantom() {
    try {
        // Check if Phantom is installed
        const { solana } = window;

        if (!solana || !solana.isPhantom) {
            alert('Phantom wallet is not installed. Please install it from https://phantom.app/');
            window.open('https://phantom.app/', '_blank');
            return;
        }

        // Connect to Phantom
        const response = await solana.connect();
        const publicKey = response.publicKey.toString();
        
        // Update button text
        const connectButton = document.querySelector('.connect-wallet');
        connectButton.innerHTML = publicKey.slice(0, 4) + '...' + publicKey.slice(-4);
        
        // Add disconnect functionality
        connectButton.onclick = disconnectPhantom;
        
        // Optional: Add a visual indicator that the wallet is connected
        connectButton.style.background = '#00ff9d';
        
        console.log('Connected with Public Key:', publicKey);
    } catch (error) {
        console.error(error);
        alert('Error connecting to Phantom wallet');
    }
}

async function disconnectPhantom() {
    try {
        const { solana } = window;
        
        if (solana) {
            await solana.disconnect();
            
            // Reset button
            const connectButton = document.querySelector('.connect-wallet');
            connectButton.innerHTML = 'Connect Phantom Wallet';
            connectButton.onclick = connectPhantom;
            connectButton.style.background = 'var(--primary-color)';
            
            console.log('Disconnected from Phantom wallet');
        }
    } catch (error) {
        console.error(error);
        alert('Error disconnecting from Phantom wallet');
    }
} 
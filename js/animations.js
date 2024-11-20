document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' }
    });

    // Only animate elements that exist
    const h1Element = document.querySelector('.hero-content h1');
    const buttons = document.querySelectorAll('.hero-cta button');
    const iphoneElement = document.querySelector('.iphone-emulator');

    if (h1Element) {
        heroTimeline.from(h1Element, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 2.5
        });
    }

    if (buttons.length) {
        heroTimeline.from(buttons, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.2
        });
    }

    // Initial iPhone animation only (no scroll trigger)
    if (iphoneElement) {
        heroTimeline.from(iphoneElement, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power2.out'
        }, "+=0.5");
    }

    // Scroll animations for sections (excluding iPhone)
    gsap.utils.toArray('section').forEach((section, i) => {
        if (section.id === 'home' || section.id === 'emulator') return; // Skip hero and iPhone sections

        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none', // Changed to prevent reversal
                markers: false
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Parallax effect for background
    const background = document.querySelector('#background-animation');
    if (background) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 50;

            gsap.to(background, {
                x: mouseX,
                y: mouseY,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // Roadmap animations
    gsap.utils.toArray('.roadmap-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power2.out'
        });

        // Add hover animation for the completion status
        const status = item.querySelector('.completion-status');
        item.addEventListener('mouseenter', () => {
            gsap.to(status, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(status, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });
}); 
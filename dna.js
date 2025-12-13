// --- 1. Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');
const triggers = document.querySelectorAll('.hover-trigger');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => cursor.classList.add('active'));
    trigger.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- 2. GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach(el => {
    gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        }
    );
});

// --- 3. Three.js Background (ELEGANT MERGE: FIBER + STARDUST) ---

let scene, camera, renderer, dnaGroup;

// Helper: Generate a Glow Texture on the fly
const createGlowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
};
const glowTexture = createGlowTexture();

const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    container.innerHTML = '';
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 14; 

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Add background stars (The deep space depth)
    addBackgroundStars();

    // GENERATE THE ELEGANT COMBO
    generateElegantDNA();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

const addBackgroundStars = () => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 70;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x666666,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
};

const generateElegantDNA = () => {
    dnaGroup.clear();
    const colors = [0xFF00FF, 0x00FFFF]; // Pink & Blue

    // === LAYER 1: NEON FIBERS (Structure) ===
    const fibersPerStrand = 12; // High count for richness
    const nucleotideCount = 100; // Smooth curves
    const radius = 3;
    const height = 25;
    const fiberSpread = 0.5;

    const createFiber = (offsetAngle, color, phaseOffset) => {
        const points = [];
        for(let i = 0; i <= nucleotideCount; i++) {
            const progress = i / nucleotideCount;
            const y = (progress * height) - (height / 2);
            const angle = (progress * Math.PI * 4) + offsetAngle;
            let x = Math.cos(angle) * radius;
            let z = Math.sin(angle) * radius;
            
            // Gentle Wiggle
            const wiggleAngle = (progress * Math.PI * 30) + phaseOffset;
            x += Math.cos(wiggleAngle) * fiberSpread;
            z += Math.sin(wiggleAngle) * fiberSpread;
            
            points.push(new THREE.Vector3(x, y, z));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: color, 
            opacity: 0.35, // Balanced opacity
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        return new THREE.Line(geometry, material);
    };

    for(let s = 0; s < 2; s++) {
        const baseAngle = s * Math.PI;
        for(let f = 0; f < fibersPerStrand; f++) {
            const phase = Math.random() * Math.PI * 2; 
            const fiber = createFiber(baseAngle, colors[s], phase);
            dnaGroup.add(fiber);
        }
    }

    // === LAYER 2: STARDUST (The Glowlu Aura) ===
    const particlesPerStrand = 1200; // Lots of stars
    const stardustRadius = 3.5; 
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colorsAttr = [];
    const colorObj = new THREE.Color();

    for(let s = 0; s < 2; s++) {
        const baseAngle = s * Math.PI;
        const strandColor = colors[s];
        
        for(let i = 0; i < particlesPerStrand; i++) {
            const progress = Math.random();
            const y = (progress * height) - (height / 2);
            const angle = (progress * Math.PI * 4) + baseAngle;
            
            let x = Math.cos(angle) * stardustRadius;
            let z = Math.sin(angle) * stardustRadius;
            
            // Cloud dispersion
            const randomSpread = (Math.random() - 0.5) * 2.0;
            x += randomSpread;
            z += randomSpread;
            const ySpread = (Math.random() - 0.5) * 0.5;
            
            positions.push(x, y + ySpread, z);
            
            colorObj.setHex(strandColor);
            colorsAttr.push(colorObj.r, colorObj.g, colorObj.b);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsAttr, 3));

    const stardustMaterial = new THREE.PointsMaterial({
        size: 0.18, 
        map: glowTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const stardustSystem = new THREE.Points(geometry, stardustMaterial);
    dnaGroup.add(stardustSystem);

    // Final tilt
    dnaGroup.rotation.z = 0.5;
    dnaGroup.rotation.x = 0.2;
}

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    if(dnaGroup) {
        dnaGroup.rotation.y += 0.005; // Gentle spin
        
        // Breathing Pulse
        const time = Date.now() * 0.0015;
        dnaGroup.scale.setScalar(1 + Math.sin(time) * 0.03);
    }
    renderer.render(scene, camera);
};

initThreeJS();
animate(); // Start loop
// Three.js Background Animation
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Stars
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 5000; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000), // x
            THREE.MathUtils.randFloatSpread(2000), // y
            THREE.MathUtils.randFloatSpread(2000)  // z
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Camera position
    camera.position.z = 1000;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        stars.rotation.y += 0.0005; // Auto rotation
        stars.rotation.x += 0.0002;

        // Interactive movement
        stars.rotation.y += 0.05 * (targetX - stars.rotation.y);
        stars.rotation.x += 0.05 * (targetY - stars.rotation.x);

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize Logic (Existing)
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

/* --- Company Details Data --- */
const companyData = {
    tesla: {
        title: "Tesla, Inc.",
        content: `
            <p><strong>Founded:</strong> 2003 (Musk joined 2004)</p>
            <p><strong>Mission:</strong> To accelerate the world's transition to sustainable energy.</p>
            <p>Tesla is not just an automaker, but a technology company with a focus on energy innovation. It designs and manufactures electric vehicles, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services.</p>
            <h3>Key Innovations</h3>
            <ul>
                <li><strong>Electric Vehicles:</strong> From the original Roadster to the mass-market Model 3 and Y, and future-forward Cybertruck.</li>
                <li><strong>Gigafactories:</strong> Tesla's vertically integrated factories that produce batteries and vehicles at massive scale.</li>
                <li><strong>Autopilot & FSD:</strong> Advanced driver-assistance systems paving the way for full autonomy.</li>
                <li><strong>Optimus:</strong> A general-purpose robotic humanoid under development.</li>
            </ul>
        `
    },
    spacex: {
        title: "SpaceX",
        content: `
            <p><strong>Founded:</strong> 2002</p>
            <p><strong>Mission:</strong> To make life multi-planetary.</p>
            <p>SpaceX designs, manufactures and launches advanced rockets and spacecraft. It has revolutionized space technology with the first reusable orbital class rockets.</p>
             <h3>Key Achievements</h3>
            <ul>
                <li><strong>Falcon 9:</strong> The workhorse rocket, capable of reliable reuse.</li>
                <li><strong>Starship:</strong> The largest and most powerful rocket ever flown, designed for Mars colonization.</li>
                <li><strong>Dragon:</strong> The only private spacecraft capable of returning significant amounts of cargo to Earth.</li>
                <li><strong>Starlink:</strong> A satellite constellation providing high-speed internet to remote locations globally.</li>
            </ul>
        `
    },
    neuralink: {
        title: "Neuralink",
        content: `
            <p><strong>Founded:</strong> 2016</p>
            <p><strong>Mission:</strong> To create a generalized brain interface to restore autonomy to those with unmet medical needs today and unlock human potential tomorrow.</p>
            <p>Neuralink is developing ultra-high bandwidth brain-machine interfaces (BMIs) to connect humans and computers.</p>
             <h3>Technology</h3>
            <ul>
                <li><strong>The Link:</strong> A fully implantable, cosmetically invisible brain-computer interface.</li>
                <li><strong>Surgical Robot:</strong> A precision robot designed to insert neural threads safely.</li>
            </ul>
        `
    },
    boring: {
        title: "The Boring Company",
        content: `
            <p><strong>Founded:</strong> 2016</p>
            <p><strong>Mission:</strong> To solve traffic, minimize usage of surface land, and enable rapid point-to-point transportation.</p>
            <p>Traffic is soul-destroying. The Boring Company is building safe, fast-to-dig, and low-cost transportation, utility, and freight tunnels to remove traffic from surface roads.</p>
             <h3>Projects</h3>
            <ul>
                <li><strong>Vegas Loop:</strong> An operational underground tunnel system in Las Vegas.</li>
                <li><strong>Prufrock:</strong> The next generation TBM designed to tunnel faster than conventional machines.</li>
            </ul>
        `
    },
    x: {
        title: "X (Ex-Twitter)",
        content: `
            <p><strong>Acquired:</strong> 2022</p>
            <p><strong>Mission:</strong> To ensure the freedom of speech and create the "Everything App".</p>
            <p>X is being transformed into a platform for everything: audio, video, messaging, payments/banking, and more, creating a global town square.</p>
            <h3>Features</h3>
            <ul>
                <li><strong>Grok:</strong> An AI modeled after the Hitchhiker's Guide to the Galaxy, designed to answer almost anything.</li>
                <li><strong>Premium:</strong> Enhanced features for power users and creators.</li>
            </ul>
        `
    }
};

/* --- Navigation Logic --- */
const setupNavigation = () => {
    // Check if we are on the details page
    if (window.location.pathname.includes('details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const companyKey = urlParams.get('company');

        if (companyKey && companyData[companyKey]) {
            const data = companyData[companyKey];
            document.getElementById('detail-title').textContent = data.title;
            document.getElementById('detail-body').innerHTML = data.content;
            document.title = `${data.title} - Elon Musk`;
        } else {
            document.getElementById('detail-title').textContent = "Not Found";
            document.getElementById('detail-body').innerHTML = "<p>Company details not found.</p>";
        }
    } else {
        // We are on the main page
        const cards = document.querySelectorAll('.company-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const companyKey = card.getAttribute('data-company');
                window.location.href = `details.html?company=${companyKey}`;
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    setupNavigation();


    // Scroll Reveal Animation (Simple version)
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s ease';
        observer.observe(section);
    });
});

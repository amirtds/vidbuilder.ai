const API_URL = 'http://localhost:3000';

// Available fonts
const availableFonts = [
    'Inter',
    'SF Pro',
    'Helvetica Neue',
    'Roboto',
    'Open Sans',
    'Montserrat',
    'Playfair Display',
    'Poppins',
    'Raleway',
    'Lato'
];

// Available music tracks
const availableMusic = [
    { id: 'corp-1', name: 'Corporate Success', genre: 'corporate', mood: 'professional' },
    { id: 'corp-2', name: 'Innovation Drive', genre: 'corporate', mood: 'motivational' },
    { id: 'upbeat-1', name: 'Happy Days', genre: 'upbeat', mood: 'happy' },
    { id: 'upbeat-2', name: 'Energy Burst', genre: 'electronic', mood: 'energetic' },
    { id: 'calm-1', name: 'Peaceful Moments', genre: 'ambient', mood: 'calm' },
    { id: 'calm-2', name: 'Zen Garden', genre: 'ambient', mood: 'peaceful' },
    { id: 'epic-1', name: 'Epic Journey', genre: 'cinematic', mood: 'dramatic' },
    { id: 'epic-2', name: 'Rising Action', genre: 'cinematic', mood: 'inspiring' },
    { id: 'tech-1', name: 'Digital Future', genre: 'electronic', mood: 'modern' },
    { id: 'tech-2', name: 'Innovation Lab', genre: 'electronic', mood: 'professional' }
];

// Scene type definitions with all new types
const sceneTypes = {
    promotional: [
        { id: 'minimal-title', name: 'Minimal Title (Apple Style)', icon: '✨' },
        { id: 'hero-title', name: 'Hero Title', icon: '🎯' },
        { id: 'split-screen', name: 'Split Screen', icon: '⚡' },
        { id: 'stats-dashboard', name: 'Stats Dashboard', icon: '📊' },
        { id: 'testimonial', name: 'Testimonial', icon: '💬' },
        { id: 'timeline', name: 'Timeline', icon: '📅' },
        { id: 'pricing-cards', name: 'Pricing Cards', icon: '💳' },
        { id: 'icon-grid', name: 'Icon Grid', icon: '🎨' },
        { id: 'product-showcase', name: 'Product Showcase', icon: '🖼️' },
        { id: 'product-matrix', name: 'Product Matrix', icon: '📦' },
        { id: 'feature-list', name: 'Feature List', icon: '📝' },
        { id: 'process-flow', name: 'Process Flow', icon: '🔄' },
        { id: 'countdown', name: 'Countdown Timer', icon: '⏱️' },
        { id: 'cta', name: 'Call to Action', icon: '🚀' }
    ],
    educational: [
        { id: 'chapter-intro', name: 'Chapter Introduction', icon: '📖' },
        { id: 'lesson-title', name: 'Lesson Title', icon: '🎓' },
        { id: 'learning-objectives', name: 'Learning Objectives', icon: '🎯' },
        { id: 'concept-explanation', name: 'Concept Explanation', icon: '💡' },
        { id: 'interactive-quiz', name: 'Interactive Quiz', icon: '❓' },
        { id: 'code-demo', name: 'Code Demo', icon: '💻' },
        { id: 'formula', name: 'Formula Display', icon: '🔢' },
        { id: 'vocabulary', name: 'Vocabulary Builder', icon: '📚' },
        { id: 'step-by-step', name: 'Step by Step', icon: '👣' },
        { id: 'comparison', name: 'Comparison', icon: '⚖️' },
        { id: 'interactive-timeline', name: 'Interactive Timeline', icon: '⏳' },
        { id: 'summary-points', name: 'Summary Points', icon: '✅' },
        { id: 'key-takeaways', name: 'Key Takeaways', icon: '🔑' },
        { id: 'achievement-badge', name: 'Achievement Badge', icon: '🏆' },
        { id: 'quiz', name: 'Quiz (Legacy)', icon: '📝' }
    ]
};

let currentConfig = {
    title: 'My Video',
    type: 'promotional',
    colorScheme: {
        primary: '#0071E3',
        secondary: '#000000',
        accent: '#FF3B30',
        text: '#1D1D1F',
        textLight: '#86868B',
        textMuted: '#D2D2D7',
        background: '#FBFBFD',
        backgroundGradient: 'linear-gradient(135deg, #FBFBFD 0%, #F5F5F7 100%)',
        borderRadius: 16,
        fontFamily: 'SF Pro'
    },
    music: {
        enabled: false,
        trackId: '',
        volume: 0.3,
        fadeIn: 2,
        fadeOut: 2
    },
    scenes: []
};

// Template configurations
const templates = {
    promotional: {
        title: "Product Promo Video",
        type: "promotional",
        scenes: [
            {
                type: "hero-title",
                duration: 3,
                content: {
                    title: "Amazing Product",
                    subtitle: "Transform Your Experience"
                }
            },
            {
                type: "product-showcase",
                duration: 6,
                content: {
                    title: "See It In Action",
                    images: [],
                    fitMode: "contain"
                }
            },
            {
                type: "feature-list",
                duration: 5,
                content: {
                    title: "Key Features",
                    features: [
                        { icon: "⚡", title: "Fast", text: "Lightning quick performance" },
                        { icon: "🔒", title: "Secure", text: "Bank-level security" },
                        { icon: "🌐", title: "Global", text: "Available worldwide" }
                    ]
                }
            },
            {
                type: "cta",
                duration: 3,
                content: {
                    title: "Get Started Today",
                    buttonText: "Try It Free",
                    urgency: "Limited time offer"
                }
            }
        ]
    },
    educational: {
        title: "Educational Video",
        type: "educational",
        scenes: [
            {
                type: "lesson-title",
                duration: 3,
                content: {
                    lessonNumber: "1",
                    title: "Introduction to Our Product"
                }
            },
            {
                type: "step-by-step",
                duration: 9,
                content: {
                    title: "Getting Started",
                    stepDuration: 3,
                    steps: [
                        { title: "Step 1: Unbox", description: "Check all components" },
                        { title: "Step 2: Setup", description: "Initial configuration" },
                        { title: "Step 3: Use", description: "Start using the product" }
                    ]
                }
            },
            {
                type: "comparison",
                duration: 5,
                content: {
                    title: "Before vs After",
                    left: { 
                        title: "Old Way", 
                        points: ["Time consuming", "Complex", "Error prone"] 
                    },
                    right: { 
                        title: "New Way", 
                        points: ["Fast", "Simple", "Accurate"] 
                    }
                }
            },
            {
                type: "key-takeaways",
                duration: 4,
                content: {
                    title: "What You've Learned",
                    takeaways: [
                        { icon: "🎯", text: "Core features" },
                        { icon: "💡", text: "Best practices" },
                        { icon: "🚀", text: "Quick start guide" },
                        { icon: "🔧", text: "Configuration tips" }
                    ]
                }
            },
            {
                type: "quiz",
                duration: 6,
                content: {
                    question: "What's the main benefit?",
                    options: [
                        { text: "It's free", correct: false },
                        { text: "10x productivity boost", correct: true },
                        { text: "Works offline only", correct: false },
                        { text: "No setup required", correct: false }
                    ],
                    explanation: "The main benefit is the dramatic productivity increase.",
                    revealDelay: 3
                }
            }
        ]
    },
    quick: {
        title: "Quick Promo",
        type: "promotional",
        scenes: [
            {
                type: "hero-title",
                duration: 2,
                content: {
                    title: "Special Offer",
                    subtitle: "50% Off Today Only"
                }
            },
            {
                type: "cta",
                duration: 3,
                content: {
                    title: "Don't Miss Out",
                    buttonText: "Buy Now",
                    urgency: "Sale Ends in 24 Hours"
                }
            }
        ]
    }
};

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

function loadTemplate(templateName) {
    if (templateName === 'custom') {
        currentConfig.scenes = [];
        switchTab('builder');
    } else {
        currentConfig = { 
            ...currentConfig, 
            ...templates[templateName],
            colorScheme: currentConfig.colorScheme // Keep color scheme
        };
        updatePreview();
        alert(`Loaded ${templateName} template! You can now customize colors and generate the video.`);
    }
    updateSceneList();
    updateJSONEditor();
}

function openSceneModal() {
    document.getElementById('scene-modal').classList.add('active');
    updateSceneFields();
}

function closeSceneModal() {
    document.getElementById('scene-modal').classList.remove('active');
}

// Music toggle handler
document.addEventListener('DOMContentLoaded', () => {
    const musicEnabled = document.getElementById('music-enabled');
    const musicOptions = document.getElementById('music-options');
    const musicVolume = document.getElementById('music-volume');
    const volumeDisplay = document.getElementById('volume-display');
    
    if (musicEnabled) {
        musicEnabled.addEventListener('change', (e) => {
            musicOptions.style.display = e.target.checked ? 'block' : 'none';
        });
    }
    
    if (musicVolume) {
        musicVolume.addEventListener('input', (e) => {
            volumeDisplay.textContent = e.target.value;
        });
    }
});

function updateSceneFields() {
    const type = document.getElementById('scene-type').value;
    const fieldsDiv = document.getElementById('scene-fields');
    
    let fields = '';
    
    switch(type) {
        // New Apple-style promotional scenes
        case 'minimal-title':
            fields = `
                <div class="form-group">
                    <label>Super Title (Optional)</label>
                    <input type="text" id="field-supertitle" placeholder="e.g., INTRODUCING">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Main title">
                </div>
                <div class="form-group">
                    <label>Subtitle (Optional)</label>
                    <input type="text" id="field-subtitle" placeholder="Subtitle">
                </div>
            `;
            break;
            
        case 'split-screen':
            fields = `
                <div class="form-group">
                    <label>Left Title</label>
                    <input type="text" id="field-left-title" placeholder="Left side title">
                </div>
                <div class="form-group">
                    <label>Left Text</label>
                    <input type="text" id="field-left-text" placeholder="Left side description">
                </div>
                <div class="form-group">
                    <label>Right Title</label>
                    <input type="text" id="field-right-title" placeholder="Right side title">
                </div>
                <div class="form-group">
                    <label>Right Text</label>
                    <input type="text" id="field-right-text" placeholder="Right side description">
                </div>
            `;
            break;
            
        case 'stats-dashboard':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Dashboard title">
                </div>
                <div class="form-group">
                    <label>Statistics (one per line: value|suffix|label)</label>
                    <textarea id="field-stats" rows="4" placeholder="500|%|Faster Performance
10000|+|Happy Customers
99.9|%|Uptime"></textarea>
                    <small style="color: #777;">Format: value|suffix|label</small>
                </div>
            `;
            break;
            
        case 'testimonial':
            fields = `
                <div class="form-group">
                    <label>Quote</label>
                    <textarea id="field-quote" rows="3" placeholder="Customer testimonial"></textarea>
                </div>
                <div class="form-group">
                    <label>Author Name</label>
                    <input type="text" id="field-author" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Role/Company (Optional)</label>
                    <input type="text" id="field-role" placeholder="CEO, Company Inc">
                </div>
                <div class="form-group">
                    <label>Rating (1-5)</label>
                    <input type="number" id="field-rating" min="1" max="5" value="5">
                </div>
            `;
            break;
            
        case 'pricing-cards':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Choose Your Plan">
                </div>
                <div class="form-group">
                    <label>Plans (JSON format)</label>
                    <textarea id="field-plans" rows="6" placeholder='[
  {"name": "Basic", "price": "$9", "period": "per month", "features": ["Feature 1", "Feature 2"]},
  {"name": "Pro", "price": "$29", "period": "per month", "features": ["All features"], "featured": true}
]'></textarea>
                </div>
            `;
            break;
            
        case 'icon-grid':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Features">
                </div>
                <div class="form-group">
                    <label>Items (one per line: icon|title|description)</label>
                    <textarea id="field-items" rows="4" placeholder="⚡|Fast|Lightning speed
🔒|Secure|Bank-level security
🌐|Global|Worldwide access"></textarea>
                </div>
            `;
            break;
            
        case 'countdown':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Launch Countdown">
                </div>
                <div class="form-group">
                    <label>Subtitle (Optional)</label>
                    <input type="text" id="field-subtitle" placeholder="Get Ready">
                </div>
            `;
            break;
            
        // Educational scenes
        case 'chapter-intro':
            fields = `
                <div class="form-group">
                    <label>Chapter Number</label>
                    <input type="text" id="field-chapter-number" placeholder="1">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Chapter title">
                </div>
                <div class="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" id="field-duration-min" placeholder="15">
                </div>
            `;
            break;
            
        case 'learning-objectives':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Learning Objectives">
                </div>
                <div class="form-group">
                    <label>Objectives (one per line)</label>
                    <textarea id="field-objectives" rows="4" placeholder="Understand core concepts
Apply knowledge practically
Master advanced techniques"></textarea>
                </div>
            `;
            break;
            
        case 'interactive-quiz':
            fields = `
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" id="field-question" placeholder="What is the answer?">
                </div>
                <div class="form-group">
                    <label>Options (JSON format)</label>
                    <textarea id="field-options" rows="4" placeholder='[
  {"text": "Option A", "correct": false},
  {"text": "Option B", "correct": true}
]'></textarea>
                </div>
                <div class="form-group">
                    <label>Explanation (Optional)</label>
                    <textarea id="field-explanation" rows="2" placeholder="Why this is correct..."></textarea>
                </div>
            `;
            break;
            
        case 'code-demo':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Code Example">
                </div>
                <div class="form-group">
                    <label>Code</label>
                    <textarea id="field-code" rows="6" placeholder="function example() {
  return 'Hello World';
}"></textarea>
                </div>
                <div class="form-group">
                    <label>Output (Optional)</label>
                    <input type="text" id="field-output" placeholder="Hello World">
                </div>
            `;
            break;
            
        case 'formula':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Key Formula">
                </div>
                <div class="form-group">
                    <label>Formula</label>
                    <input type="text" id="field-formula" placeholder="E = mc²">
                </div>
                <div class="form-group">
                    <label>Explanation</label>
                    <textarea id="field-explanation" rows="2" placeholder="What this formula means..."></textarea>
                </div>
            `;
            break;
            
        case 'achievement-badge':
            fields = `
                <div class="form-group">
                    <label>Icon</label>
                    <input type="text" id="field-icon" placeholder="🏆" value="🏆">
                </div>
                <div class="form-group">
                    <label>Achievement Text</label>
                    <input type="text" id="field-achievement" placeholder="Course Complete!">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <input type="text" id="field-message" placeholder="Congratulations!">
                </div>
            `;
            break;
            
        // Classic scenes
        case 'hero-title':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Enter main title">
                </div>
                <div class="form-group">
                    <label>Subtitle (Optional)</label>
                    <input type="text" id="field-subtitle" placeholder="Enter subtitle">
                </div>
            `;
            break;
            
        case 'product-showcase':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Section title">
                </div>
                <div class="form-group">
                    <label>Note</label>
                    <p style="color: #777;">Images will be automatically added from uploaded files</p>
                </div>
            `;
            break;
            
        case 'feature-list':
            fields = `
                <div class="form-group">
                    <label>Section Title</label>
                    <input type="text" id="field-title" placeholder="e.g., Key Features">
                </div>
                <div class="form-group">
                    <label>Features (one per line, start with emoji)</label>
                    <textarea id="field-features" rows="4" placeholder="⚡ Lightning Fast Performance
🔒 Enterprise Security
🌐 Global Availability"></textarea>
                </div>
            `;
            break;
            
        case 'cta':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Call to action title">
                </div>
                <div class="form-group">
                    <label>Button Text</label>
                    <input type="text" id="field-button" placeholder="e.g., Shop Now">
                </div>
                <div class="form-group">
                    <label>Urgency Text (Optional)</label>
                    <input type="text" id="field-urgency" placeholder="e.g., Limited Time Offer">
                </div>
            `;
            break;
            
        case 'lesson-title':
            fields = `
                <div class="form-group">
                    <label>Lesson Number (Optional)</label>
                    <input type="text" id="field-lesson-number" placeholder="e.g., 1">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="Lesson title">
                </div>
            `;
            break;
            
        case 'step-by-step':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="e.g., Setup Guide">
                </div>
                <div class="form-group">
                    <label>Steps (one per line)</label>
                    <textarea id="field-steps" rows="4" placeholder="Step 1: Do this first
Step 2: Then do this
Step 3: Finally do this"></textarea>
                </div>
            `;
            break;
            
        case 'comparison':
            fields = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="field-title" placeholder="e.g., Before vs After">
                </div>
                <div class="form-group">
                    <label>Left Side Title</label>
                    <input type="text" id="field-left-title" placeholder="e.g., Traditional Method">
                </div>
                <div class="form-group">
                    <label>Left Side Points (one per line)</label>
                    <textarea id="field-left-points" rows="3" placeholder="Slow
Complex
Expensive"></textarea>
                </div>
                <div class="form-group">
                    <label>Right Side Title</label>
                    <input type="text" id="field-right-title" placeholder="e.g., Our Solution">
                </div>
                <div class="form-group">
                    <label>Right Side Points (one per line)</label>
                    <textarea id="field-right-points" rows="3" placeholder="Fast
Simple
Affordable"></textarea>
                </div>
            `;
            break;
            
        default:
            fields = `
                <div class="form-group">
                    <label>Content (JSON format)</label>
                    <textarea id="field-content" rows="4" placeholder='{"title": "Scene Title"}'></textarea>
                </div>
            `;
    }
    
    fieldsDiv.innerHTML = fields;
}

function addScene() {
    const type = document.getElementById('scene-type').value;
    const duration = parseInt(document.getElementById('scene-duration').value);
    
    // Build content using helper function
    const content = buildSceneContent(type);
    
    const scene = { type, duration, content };
    currentConfig.scenes.push(scene);
    
    updateSceneList();
    closeSceneModal();
    updatePreview();
    updateJSONEditor();
}

// Keep old addScene logic for reference, but now using buildSceneContent
function addSceneOld() {
    const type = document.getElementById('scene-type').value;
    const duration = parseInt(document.getElementById('scene-duration').value);
    
    let content = {};
    
    // Build content based on scene type
    switch(type) {
        case 'hero-title':
            content = {
                title: document.getElementById('field-title')?.value || 'Title',
                subtitle: document.getElementById('field-subtitle')?.value || ''
            };
            break;
            
        case 'product-showcase':
            content = {
                title: document.getElementById('field-title')?.value || 'Product Showcase',
                images: [],
                fitMode: 'contain'
            };
            break;
            
        case 'feature-list':
            const featuresText = document.getElementById('field-features')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Features',
                features: featuresText.split('\n').filter(f => f.trim()).map(f => {
                    const firstSpace = f.indexOf(' ');
                    if (firstSpace > 0) {
                        const icon = f.substring(0, firstSpace);
                        const rest = f.substring(firstSpace + 1).split(':');
                        if (rest.length > 1) {
                            return {
                                icon: icon,
                                title: rest[0].trim(),
                                text: rest[1].trim()
                            };
                        }
                        return {
                            icon: icon,
                            text: rest[0].trim()
                        };
                    }
                    return { text: f };
                })
            };
            break;
            
        case 'cta':
            content = {
                title: document.getElementById('field-title')?.value || 'Get Started',
                buttonText: document.getElementById('field-button')?.value || 'Click Here',
                urgency: document.getElementById('field-urgency')?.value || ''
            };
            break;
            
        case 'lesson-title':
            content = {
                lessonNumber: document.getElementById('field-lesson-number')?.value || '',
                title: document.getElementById('field-title')?.value || 'Lesson Title'
            };
            break;
            
        case 'step-by-step':
            const stepsText = document.getElementById('field-steps')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Steps',
                stepDuration: 3,
                steps: stepsText.split('\n').filter(s => s.trim()).map(s => {
                    const parts = s.split(':');
                    return {
                        title: parts[0].trim(),
                        description: parts[1]?.trim() || ''
                    };
                })
            };
            break;
            
        case 'comparison':
            content = {
                title: document.getElementById('field-title')?.value || 'Comparison',
                left: {
                    title: document.getElementById('field-left-title')?.value || 'Option A',
                    points: (document.getElementById('field-left-points')?.value || '').split('\n').filter(p => p.trim())
                },
                right: {
                    title: document.getElementById('field-right-title')?.value || 'Option B',
                    points: (document.getElementById('field-right-points')?.value || '').split('\n').filter(p => p.trim())
                }
            };
            break;
            
        default:
            try {
                content = JSON.parse(document.getElementById('field-content')?.value || '{}');
            } catch (e) {
                content = { text: 'Scene content' };
            }
    }
    
    const scene = { type, duration, content };
    currentConfig.scenes.push(scene);
    
    updateSceneList();
    closeSceneModal();
    updatePreview();
    updateJSONEditor();
}

function removeScene(index) {
    currentConfig.scenes.splice(index, 1);
    updateSceneList();
    updatePreview();
    updateJSONEditor();
}

let editingSceneIndex = null;

function updateSceneList() {
    const listDiv = document.getElementById('scene-list');
    
    if (currentConfig.scenes.length === 0) {
        listDiv.innerHTML = '<p style="text-align: center; color: #999;">No scenes added yet. Click "Add Scene" to start building.</p>';
        return;
    }
    
    listDiv.innerHTML = currentConfig.scenes.map((scene, index) => `
        <div class="scene-item" draggable="true" data-index="${index}">
            <div class="drag-handle">⋮⋮</div>
            <div class="scene-item-info">
                <strong>${scene.type.replace(/-/g, ' ').toUpperCase()}</strong>
                <span class="duration-badge" style="margin-left: 10px;">${scene.duration}s</span>
                <div style="color: #777; font-size: 14px; margin-top: 5px;">
                    ${scene.content.title || scene.content.question || scene.content.achievement || JSON.stringify(scene.content).substring(0, 60) + '...'}
                </div>
            </div>
            <div class="scene-item-actions">
                <button class="btn btn-small btn-secondary" onclick="editScene(${index})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="removeScene(${index})">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Add drag and drop event listeners
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const sceneItems = document.querySelectorAll('.scene-item');
    
    sceneItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;
let draggedIndex = null;

function handleDragStart(e) {
    draggedElement = this;
    draggedIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const dropIndex = parseInt(this.dataset.index);
        
        // Reorder scenes array
        const draggedScene = currentConfig.scenes[draggedIndex];
        currentConfig.scenes.splice(draggedIndex, 1);
        currentConfig.scenes.splice(dropIndex, 0, draggedScene);
        
        // Update UI
        updateSceneList();
        updatePreview();
        updateJSONEditor();
    }
    
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.scene-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function editScene(index) {
    editingSceneIndex = index;
    const scene = currentConfig.scenes[index];
    
    // Open modal
    document.getElementById('scene-modal').classList.add('active');
    
    // Set scene type
    document.getElementById('scene-type').value = scene.type;
    document.getElementById('scene-duration').value = scene.duration;
    
    // Update fields
    updateSceneFields();
    
    // Populate fields with existing content
    setTimeout(() => {
        populateSceneFields(scene);
    }, 100);
    
    // Change button text
    const addButton = document.querySelector('#scene-modal .btn');
    addButton.textContent = 'Update Scene';
    addButton.onclick = updateScene;
}

function populateSceneFields(scene) {
    const content = scene.content;
    
    // Populate based on scene type
    switch(scene.type) {
        case 'minimal-title':
            if (document.getElementById('field-supertitle')) {
                document.getElementById('field-supertitle').value = content.superTitle || '';
            }
            if (document.getElementById('field-title')) {
                document.getElementById('field-title').value = content.title || '';
            }
            if (document.getElementById('field-subtitle')) {
                document.getElementById('field-subtitle').value = content.subtitle || '';
            }
            break;
            
        case 'testimonial':
            if (document.getElementById('field-quote')) {
                document.getElementById('field-quote').value = content.quote || '';
            }
            if (document.getElementById('field-author')) {
                document.getElementById('field-author').value = content.author || '';
            }
            if (document.getElementById('field-role')) {
                document.getElementById('field-role').value = content.role || '';
            }
            if (document.getElementById('field-rating')) {
                document.getElementById('field-rating').value = content.rating || 5;
            }
            break;
            
        case 'stats-dashboard':
            if (document.getElementById('field-title')) {
                document.getElementById('field-title').value = content.title || '';
            }
            if (document.getElementById('field-stats') && content.stats) {
                const statsText = content.stats.map(s => `${s.value}|${s.suffix || ''}|${s.label}`).join('\n');
                document.getElementById('field-stats').value = statsText;
            }
            break;
            
        case 'interactive-quiz':
            if (document.getElementById('field-question')) {
                document.getElementById('field-question').value = content.question || '';
            }
            if (document.getElementById('field-options') && content.options) {
                document.getElementById('field-options').value = JSON.stringify(content.options, null, 2);
            }
            if (document.getElementById('field-explanation')) {
                document.getElementById('field-explanation').value = content.explanation || '';
            }
            break;
            
        // Add more cases as needed
        default:
            // Try to populate common fields
            if (document.getElementById('field-title') && content.title) {
                document.getElementById('field-title').value = content.title;
            }
            if (document.getElementById('field-subtitle') && content.subtitle) {
                document.getElementById('field-subtitle').value = content.subtitle;
            }
    }
}

function updateScene() {
    const type = document.getElementById('scene-type').value;
    const duration = parseInt(document.getElementById('scene-duration').value);
    
    // Build content (reuse addScene logic)
    const content = buildSceneContent(type);
    
    // Update the scene
    currentConfig.scenes[editingSceneIndex] = { type, duration, content };
    
    // Reset editing state
    editingSceneIndex = null;
    
    // Update UI
    updateSceneList();
    closeSceneModal();
    updatePreview();
    updateJSONEditor();
    
    // Reset button
    const addButton = document.querySelector('#scene-modal .btn');
    addButton.textContent = 'Add Scene';
    addButton.onclick = addScene;
}

function buildSceneContent(type) {
    let content = {};
    
    switch(type) {
        case 'minimal-title':
            content = {
                superTitle: document.getElementById('field-supertitle')?.value || '',
                title: document.getElementById('field-title')?.value || 'Title',
                subtitle: document.getElementById('field-subtitle')?.value || ''
            };
            break;
            
        case 'split-screen':
            content = {
                leftTitle: document.getElementById('field-left-title')?.value || '',
                leftText: document.getElementById('field-left-text')?.value || '',
                rightTitle: document.getElementById('field-right-title')?.value || '',
                rightText: document.getElementById('field-right-text')?.value || ''
            };
            break;
            
        case 'stats-dashboard':
            const statsText = document.getElementById('field-stats')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Statistics',
                stats: statsText.split('\n').filter(s => s.trim()).map(s => {
                    const parts = s.split('|');
                    return {
                        value: parseFloat(parts[0]) || 0,
                        suffix: parts[1] || '',
                        label: parts[2] || ''
                    };
                })
            };
            break;
            
        case 'testimonial':
            content = {
                quote: document.getElementById('field-quote')?.value || '',
                author: document.getElementById('field-author')?.value || '',
                role: document.getElementById('field-role')?.value || '',
                rating: parseInt(document.getElementById('field-rating')?.value) || 5
            };
            break;
            
        case 'pricing-cards':
            try {
                content = {
                    title: document.getElementById('field-title')?.value || 'Pricing',
                    plans: JSON.parse(document.getElementById('field-plans')?.value || '[]')
                };
            } catch (e) {
                content = { title: 'Pricing', plans: [] };
            }
            break;
            
        case 'icon-grid':
            const itemsText = document.getElementById('field-items')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Features',
                items: itemsText.split('\n').filter(i => i.trim()).map(i => {
                    const parts = i.split('|');
                    return {
                        icon: parts[0] || '•',
                        title: parts[1] || '',
                        description: parts[2] || ''
                    };
                })
            };
            break;
            
        case 'countdown':
            content = {
                title: document.getElementById('field-title')?.value || 'Countdown',
                subtitle: document.getElementById('field-subtitle')?.value || ''
            };
            break;
            
        case 'chapter-intro':
            content = {
                chapterNumber: document.getElementById('field-chapter-number')?.value || '1',
                title: document.getElementById('field-title')?.value || 'Chapter',
                duration: document.getElementById('field-duration-min')?.value || '15'
            };
            break;
            
        case 'learning-objectives':
            const objectivesText = document.getElementById('field-objectives')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Learning Objectives',
                objectives: objectivesText.split('\n').filter(o => o.trim())
            };
            break;
            
        case 'interactive-quiz':
            try {
                content = {
                    question: document.getElementById('field-question')?.value || '',
                    options: JSON.parse(document.getElementById('field-options')?.value || '[]'),
                    explanation: document.getElementById('field-explanation')?.value || ''
                };
            } catch (e) {
                content = { question: '', options: [] };
            }
            break;
            
        case 'code-demo':
            content = {
                title: document.getElementById('field-title')?.value || 'Code',
                code: document.getElementById('field-code')?.value || '',
                output: document.getElementById('field-output')?.value || ''
            };
            break;
            
        case 'formula':
            content = {
                title: document.getElementById('field-title')?.value || 'Formula',
                formula: document.getElementById('field-formula')?.value || '',
                explanation: document.getElementById('field-explanation')?.value || ''
            };
            break;
            
        case 'achievement-badge':
            content = {
                icon: document.getElementById('field-icon')?.value || '🏆',
                achievement: document.getElementById('field-achievement')?.value || 'Achievement',
                message: document.getElementById('field-message')?.value || 'Congratulations!'
            };
            break;
            
        // Add other scene types from original addScene function
        case 'hero-title':
            content = {
                title: document.getElementById('field-title')?.value || 'Title',
                subtitle: document.getElementById('field-subtitle')?.value || ''
            };
            break;
            
        case 'product-showcase':
            content = {
                title: document.getElementById('field-title')?.value || 'Product Showcase',
                images: [],
                fitMode: 'contain'
            };
            break;
            
        case 'feature-list':
            const featuresText = document.getElementById('field-features')?.value || '';
            content = {
                title: document.getElementById('field-title')?.value || 'Features',
                features: featuresText.split('\n').filter(f => f.trim()).map(f => {
                    const firstSpace = f.indexOf(' ');
                    if (firstSpace > 0) {
                        const icon = f.substring(0, firstSpace);
                        const rest = f.substring(firstSpace + 1).split(':');
                        if (rest.length > 1) {
                            return {
                                icon: icon,
                                title: rest[0].trim(),
                                text: rest[1].trim()
                            };
                        }
                        return {
                            icon: icon,
                            text: rest[0].trim()
                        };
                    }
                    return { text: f };
                })
            };
            break;
            
        case 'cta':
            content = {
                title: document.getElementById('field-title')?.value || 'Get Started',
                buttonText: document.getElementById('field-button')?.value || 'Click Here',
                urgency: document.getElementById('field-urgency')?.value || ''
            };
            break;
            
        default:
            try {
                content = JSON.parse(document.getElementById('field-content')?.value || '{}');
            } catch (e) {
                content = { text: 'Scene content' };
            }
    }
    
    return content;
}

function updatePreview() {
    const totalDuration = currentConfig.scenes.reduce((sum, scene) => sum + scene.duration, 0);
    document.getElementById('total-duration').textContent = totalDuration;
    document.getElementById('scene-count').textContent = currentConfig.scenes.length;
}

function updateJSONEditor() {
    const editor = document.getElementById('json-editor');
    if (editor) {
        editor.value = JSON.stringify(currentConfig, null, 2);
    }
}

function validateJSON() {
    try {
        const json = document.getElementById('json-editor').value;
        JSON.parse(json);
        alert('✅ JSON is valid!');
    } catch (e) {
        alert('❌ Invalid JSON: ' + e.message);
    }
}

function loadFromJSON() {
    try {
        const json = document.getElementById('json-editor').value;
        currentConfig = JSON.parse(json);
        updateSceneList();
        updatePreview();
        alert('✅ Configuration loaded successfully!');
        switchTab('builder');
    } catch (e) {
        alert('❌ Failed to load JSON: ' + e.message);
    }
}

async function generateVideo() {
    const generateBtn = document.getElementById('generate-btn');
    const statusDiv = document.getElementById('status');
    
    // Update color scheme from inputs
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const accentColor = document.getElementById('accent-color').value;
    const textColor = document.getElementById('text-color').value;
    const borderRadius = parseInt(document.getElementById('border-radius').value);
    const fontFamily = document.getElementById('font-family').value;
    
    currentConfig.colorScheme = {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        text: textColor,
        textLight: '#86868B',
        textMuted: '#D2D2D7',
        background: '#FBFBFD',
        backgroundGradient: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        borderRadius: borderRadius,
        fontFamily: fontFamily
    };
    
    // Update music configuration
    const musicEnabled = document.getElementById('music-enabled').checked;
    if (musicEnabled) {
        const musicTrack = document.getElementById('music-track').value;
        const musicVolume = parseInt(document.getElementById('music-volume').value) / 100;
        
        currentConfig.music = {
            enabled: true,
            trackId: musicTrack,
            volume: musicVolume,
            fadeIn: 2,
            fadeOut: 2
        };
    } else {
        currentConfig.music = {
            enabled: false
        };
    }
    
    // Validate configuration
    if (currentConfig.scenes.length === 0) {
        alert('Please add at least one scene before generating the video.');
        return;
    }
    
    generateBtn.disabled = true;
    generateBtn.textContent = '⏳ Generating...';
    
    statusDiv.className = 'status show';
    statusDiv.innerHTML = '<h3>🎬 Generating Video...</h3><p>This may take a few moments. Please wait...</p>';
    
    const formData = new FormData();
    formData.append('config', JSON.stringify(currentConfig));
    
    // Add images if any
    const images = document.getElementById('images').files;
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    
    try {
        const response = await fetch(`${API_URL}/api/generate-flexible-video`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            statusDiv.className = 'status success show';
            statusDiv.innerHTML = `
                <h3>✅ Video Generated Successfully!</h3>
                <p><strong>Job ID:</strong> ${result.jobId}</p>
                <p><strong>Duration:</strong> ${result.duration} seconds</p>
                <p><strong>Type:</strong> ${result.type}</p>
                <p><strong>Scenes:</strong> ${result.scenes}</p>
                <a href="${API_URL}${result.videoUrl}" class="btn" download style="margin-top: 15px; display: inline-block;">
                    📥 Download Video
                </a>
            `;
        } else {
            throw new Error(result.error || 'Failed to generate video');
        }
    } catch (error) {
        statusDiv.className = 'status error show';
        statusDiv.innerHTML = `
            <h3>❌ Error</h3>
            <p>${error.message}</p>
            <p>Please check if the server is running on ${API_URL} and try again.</p>
        `;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = '🚀 Generate Video';
    }
}

// Initialize JSON editor with default config
window.addEventListener('DOMContentLoaded', () => {
    updateJSONEditor();
    updatePreview();
});

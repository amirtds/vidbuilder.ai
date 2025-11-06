const API_URL = 'http://localhost:3000';
let currentConfig = {
    title: 'My Video',
    type: 'promotional',
    colorScheme: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        text: '#ffffff',
        textLight: '#e0e0e0',
        background: '#000000',
        borderRadius: 20
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

function updateSceneFields() {
    const type = document.getElementById('scene-type').value;
    const fieldsDiv = document.getElementById('scene-fields');
    
    let fields = '';
    
    switch(type) {
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

function updateSceneList() {
    const listDiv = document.getElementById('scene-list');
    
    if (currentConfig.scenes.length === 0) {
        listDiv.innerHTML = '<p style="text-align: center; color: #999;">No scenes added yet. Click "Add Scene" to start building.</p>';
        return;
    }
    
    listDiv.innerHTML = currentConfig.scenes.map((scene, index) => `
        <div class="scene-item">
            <div class="scene-item-info">
                <strong>${scene.type.replace('-', ' ').toUpperCase()}</strong>
                <span class="duration-badge" style="margin-left: 10px;">${scene.duration}s</span>
                <div style="color: #777; font-size: 14px; margin-top: 5px;">
                    ${scene.content.title || JSON.stringify(scene.content).substring(0, 80) + '...'}
                </div>
            </div>
            <div class="scene-item-actions">
                <button class="btn btn-small btn-danger" onclick="removeScene(${index})">Remove</button>
            </div>
        </div>
    `).join('');
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
    currentConfig.colorScheme = {
        primary: document.getElementById('primary-color').value,
        secondary: document.getElementById('secondary-color').value,
        accent: document.getElementById('accent-color').value,
        text: document.getElementById('text-color').value,
        textLight: '#e0e0e0',
        background: '#000000',
        backgroundGradient: `linear-gradient(135deg, ${document.getElementById('primary-color').value} 0%, ${document.getElementById('secondary-color').value} 100%)`,
        borderRadius: parseInt(document.getElementById('border-radius').value)
    };
    
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

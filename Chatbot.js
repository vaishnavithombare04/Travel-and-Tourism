
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("userInput");

// knowledge to chatbot
const knowledgeBase = {

    taj: {
        keywords: ["taj", "mahal", "agra"],
        response: "The Taj Mahal is a UNESCO World Heritage Site in Agra, built by Emperor Shah Jahan. It's one of the Seven Wonders of the World and best visited from October to March."
    },
    jaipur: {
        keywords: ["jaipur", "pink city", "rajasthan", "amer", "hawa mahal"],
        response: "Jaipur, the Pink City, is famous for Amer Fort, City Palace, Hawa Mahal, and vibrant Rajasthani culture. Don't miss the traditional handicrafts and royal cuisine!"
    },
    varanasi: {
        keywords: ["varanasi", "banaras", "kashi", "ganga", "spiritual"],
        response: "Varanasi is one of the world's oldest cities, located on the River Ganga. Experience the mesmerizing Ganga Aarti, ancient temples, and spiritual atmosphere. "
    },
    hampi: {
        keywords: ["hampi", "vijayanagara", "ruins"],
        response: "Hampi is a UNESCO site with magnificent ruins of the Vijayanagara Empire. Explore ancient temples, stone architecture, and boulder landscapes. Best time: October to February. "
    },
    kerala: {
        keywords: ["kerala", "backwater", "houseboat", "kathakali", "ayurveda"],
        response: "Kerala, God's Own Country, offers serene backwaters, Kathakali dance, Ayurvedic treatments, and lush greenery. Experience houseboat cruises and temple festivals! "
    },
    delhi: {
        keywords: ["delhi", "capital", "red fort", "qutub", "india gate"],
        response: "Delhi, India's capital, blends ancient history with modernity. Visit Red Fort, Qutub Minar, Humayun's Tomb, India Gate, and enjoy diverse street food! "
    },
    
    festivals: {
        keywords: ["festival", "celebration", "event",],
        response: "India celebrates amazing festivals: Diwali (Festival of Lights), Holi (Colors), Durga Puja,  Pongal (Harvest), and many more throughout the year!"
    },
    diwali: {
        keywords: ["diwali", "deepavali", "lights"],
        response: "Diwali, the Festival of Lights, celebrates the victory of light over darkness. People decorate homes with diyas (oil lamps), burst fireworks, and exchange sweets. Usually celebrated in October-November. "
    },
    holi: {
        keywords: ["holi", "color", "colours"],
        response: "Holi, the Festival of Colors, welcomes spring with joy! People play with colored powders, dance, and celebrate together. It symbolizes the triumph of good over evil. Usually in March. "
    },
    
    durga_pooja: {
        keywords: ["durga pooja","puja","durga worship","durga"],
        response: "Durga Puja is a major Hindu festival, especially in West Bengal, celebrating Goddess Durga's victory over the demon Mahishasura, symbolizing the triumph of good over evil and the divine feminine (Shakti). "
    },
    pongal: {
        keywords: ["pongal", "harvest festival", "bhogi"],
        response: "Pongal is a vibrant, four-day South Indian harvest festival, primarily in Tamil Nadu, celebrating gratitude to nature for a bountiful harvest, especially honoring the Sun God (Surya) and farm animals, featuring the boiling over of a special rice, milk, and jaggery dish (also called Pongal) symbolizing abundance, and marked by traditions like kolams, new beginnings, and honoring cattle. "
    },
    unesco: {
        keywords: ["unesco", "heritage", "world heritage", "sites"],
        response: "India has 40+ UNESCO World Heritage Sites including Taj Mahal, Ajanta Caves, Ellora Caves, Konark Sun Temple, Khajuraho, Red Fort, and many more! "
    },
    
    best_time: {
        keywords: ["best time", "when to visit", "weather", "season"],
        response: "Best time to visit India: October to March (pleasant weather). North India: Oct-Mar, South India: Sep-Mar, Hill stations: Apr-Jun & Sep-Nov, Monsoon lovers: Jul-Sep. "
    },
    visa: {
        keywords: ["visa", "passport", "entry"],
        response: "Most visitors need a visa for India. E-visa is available for many countries for tourism purposes. Check the official Indian visa website for your country's requirements."
    },
    
    culture: {
        keywords: ["culture", "tradition", "custom"],
        response: "Indian culture is incredibly diverse with 28 states, 22 languages, and multiple religions living in harmony. Each region has unique traditions, art forms, cuisine, and festivals. "
    },
    food: {
        keywords: ["food", "cuisine", "eat", "dish", "spice"],
        response: "Indian cuisine varies by region: North (butter chicken, naan), South (dosa, idli), East (fish curry, rosogolla), West (dhokla, vada pav). Each state has unique flavors! "
    },
    art: {
        keywords: ["art", "dance", "music", "handicraft"],
        response: "India has rich art forms: Bharatanatyam & Kathak dances, Classical music, Madhubani paintings, Pashmina shawls, Pottery, and many traditional handicrafts. "
    },
    

    contact: {
        keywords: ["contact", "phone", "email", "help"],
        response: "You can reach us at:  abc@mail.com | +91 987XX XXXXX . We're available Mon-Sat, 9 AM - 6 PM IST."
    },
    language: {
        keywords: ["language", "speak", "hindi", "english"],
        response: "Hindi and English are widely spoken in tourist areas. India has 22 official languages. Learning basic phrases like 'Namaste' (Hello) and 'Dhanyavaad' (Thank you) helps! "
    }
};

const greetings = ["hi", "hello", "hey", "namaste", "namaskar"];
const thanks = ["thank", "thanks", "appreciate"];

if (chatBody && !chatBody.querySelector('.bot-message')) {
    addBotMessage("Namaste! I am your Cultural Tourism Guide. Ask me about destinations, festivals, or Indian heritage!");
}

// event listeners
if (userInput) {
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;
    
    addUserMessage(msg);
    userInput.value = "";
    
    //typing status
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const reply = getBotReply(msg.toLowerCase());
        addBotMessage(reply);
    }, 800);
}
//quick reply for options
function sendQuickReply(message) {
    addUserMessage(message);
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const reply = getBotReply(message.toLowerCase());
        addBotMessage(reply);
    }, 800);
}

function getBotReply(msg) {
    if (greetings.some(greeting => msg.includes(greeting))) {
        return "Hello!  How can I help you today? Ask me about Indian destinations, festivals, culture, or travel tips!";
    }
    
    if (thanks.some(thank => msg.includes(thank))) {
        return "You're welcome!  Feel free to ask if you have more questions about Indian culture and tourism. Have a great journey!";
    }
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(keyword => msg.includes(keyword))) {
            return data.response;
        }
    }
    //default message
    return "I'm not sure about that, but I can help you with:<br> Indian destinations (Taj Mahal, Jaipur, Varanasi, etc.),<br> Festivals (Diwali, Holi, etc.)<br> Travel tips & best time to visit ,<br> UNESCO heritage sites ,<br> Indian culture, food & art.<br><br>What would you like to know? ";
}

function addUserMessage(msg) {
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `<strong>You:</strong> ${escapeHtml(msg)}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(msg) {
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `<strong>Bot:</strong> ${msg}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    if (!chatBody) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<strong>Bot:</strong> Typing...';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const notification = document.querySelector('.chat-notification');
if (notification) {
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}
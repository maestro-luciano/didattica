let currentSection = 1;
const totalSections = 8;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let isSpeechStopped = false; // Flag per tracciare se l'utente ha fermato la lettura




// Mappatura delle lingue per la sintesi vocale
const voiceLanguages = {
    'it': 'it-IT',      // Italiano
    'en': 'en-US',      // Inglese
    'fr': 'fr-FR',      // Francese
    'de': 'de-DE',      // Tedesco
    'ar': 'ar-SA',      // Arabo
    'zh': 'zh-CN',      // Cinese semplificato
    'hi': 'hi-IN',      // Hindi
    'pa': 'pa-IN',      // Punjabi
    'es': 'es-ES',      // Spagnolo
    'pt': 'pt-PT',      // Portoghese
    'ur': 'ur-PK',      // Urdu
    'ru': 'ru-RU'       // Russo - AGGIUNTO
};




// Messaggi di feedback per le diverse lingue
const feedbackMessages = {
    'it': {
        correct: "Bravo cadetto spaziale! Il coding è con te!",
        incorrect: "Non ti preoccupare, inizia il viaggio nel mondo del coding, se lo vorrai, diventerai un esperto!",
        final: "Esatto! Qualunque sia la tua scelta, l'importante è continuare a esplorare e imparare. Il coding ti aspetta!",
        noContent: "Contenuto non disponibile per la lettura."
    },
    'en': {
        correct: "Great job space cadet! Coding is with you!",
        incorrect: "Don't worry, start the journey into the coding world, if you want, you'll become an expert!",
        final: "Exactly! Whatever your choice, the important thing is to keep exploring and learning. Coding awaits you!",
        noContent: "Content not available for reading."
    },
    'fr': {
        correct: "Bravo cadet spatial ! Le codage est avec toi !",
        incorrect: "Ne t'inquiète pas, commence le voyage dans le monde du codage, si tu le veux, tu deviendras un expert !",
        final: "Exact ! Quel que soit ton choix, l'important est de continuer à explorer et à apprendre. Le codage t'attend !",
        noContent: "Contenu non disponible pour la lecture."
    },
    'de': {
        correct: "Gut gemacht, Raumfahrtkadett! Das Programmieren ist mit dir!",
        incorrect: "Mach dir keine Sorgen, beginne die Reise in die Welt des Programmierens, wenn du willst, wirst du ein Experte!",
        final: "Genau! Was auch immer du wählst, das Wichtigste ist, weiter zu forschen und zu lernen. Das Programmieren erwartet dich!",
        noContent: "Inhalt nicht verfügbar zum Lesen."
    },
    'es': {
        correct: "¡Bien hecho, cadete espacial! ¡La programación está contigo!",
        incorrect: "No te preocupes, comienza el viaje en el mundo de la programación, si quieres, ¡te convertirás en un experto!",
        final: "¡Exacto! Cualquiera que sea tu elección, lo importante es seguir explorando y aprendiendo. ¡La programación te espera!",
        noContent: "Contenido no disponible para lectura."
    },
    'pt': {
        correct: "Muito bem, cadete espacial! A programação está com você!",
        incorrect: "Não se preocupe, comece a jornada no mundo da programação, se quiser, você se tornará um especialista!",
        final: "Exato! Qualquer que seja sua escolha, o importante é continuar explorando e aprendendo. A programação te espera!",
        noContent: "Conteúdo não disponível para leitura."
    },
    'ar': {
        correct: "أحسنت، كاديت الفضاء! البرمجة معك!",
        incorrect: "لا تقلق، ابدأ الرحلة في عالم البرمجة، إذا أردت، ستصبح خبيراً!",
        final: "بالضبط! مهما كان اختيارك، الأهم هو الاستمرار في الاستكشاف والتعلم. البرمجة تنتظرك!",
        noContent: "المحتوى غير متاح للقراءة."
    },
    'zh': {
        correct: "干得好，太空学员！编程与你同在！",
        incorrect: "别担心，开始进入编程世界的旅程，如果你愿意，你会成为专家！",
        final: "没错！无论你的选择是什么，重要的是继续探索和学习。编程在等着你！",
        noContent: "内容不可用于阅读。"
    },
    'zh-CN': {
        correct: "干得好，太空学员！编程与你同在！",
        incorrect: "别担心，开始进入编程世界的旅程，如果你愿意，你会成为专家！",
        final: "没错！无论你的选择是什么，重要的是继续探索和学习。编程在等着你！",
        noContent: "内容不可用于阅读。"
    },
    'zh-TW': {
        correct: "幹得好，太空學員！編程與你同在！",
        incorrect: "別擔心，開始進入編程世界的旅程，如果你願意，你會成為專家！",
        final: "沒錯！無論你的選擇是什麼，重要的是繼續探索和學習。編程在等著你！",
        noContent: "內容不可用於閱讀。"
    },
    'hi': {
        correct: "शाबाश, अंतरिक्ष कैडेट! कोडिंग आपके साथ है!",
        incorrect: "चिंता मत करो, कोडिंग की दुनिया में यात्रा शुरू करें, यदि आप चाहें, तो आप एक विशेषज्ञ बन जाएंगे!",
        final: "बिल्कुल सही! आपका चुनाव जो भी हो, सबसे महत्वपूर्ण बात यह है कि खोज और सीखते रहें। कोडिंग आपका इंतजार कर रही है!",
        noContent: "पढ़ने के लिए सामग्री उपलब्ध नहीं है।"
    },
    'pa': {
        correct: "ਵਧਾਈਆਂ, ਸਪੇਸ ਕੈਡੇਟ! ਕੋਡਿੰਗ ਤੁਹਾਡੇ ਨਾਲ ਹੈ!",
        incorrect: "ਫਿਕਰ ਨਾ ਕਰੋ, ਕੋਡਿੰਗ ਦੀ ਦੁਨੀਆ ਵਿੱਚ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ, ਜੇਕਰ ਤੁਸੀਂ ਚਾਹੋਗੇ, ਤਾਂ ਤੁਸੀਂ ਇੱਕ ਮਾਹਰ ਬਣ ਜਾਓਗੇ!",
        final: "ਬਿਲਕੁਲ ਸਹੀ! ਤੁਹਾਡੀ ਚੋਣ ਭਾਵੇਂ ਜੋ ਵੀ ਹੋਵੇ, ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਗੱਲ ਇਹ ਹੈ ਕਿ ਖੋਜ ਅਤੇ ਸਿੱਖਦੇ ਛੋ. ਕੋਡਿੰਗ ਤੁਹਾਡਾ ਇੰਤਜ਼ਾਰ ਕਰ ਰਹੀ ਹੈ!",
        noContent: "ਪੜ੍ਹਨ ਲਈ ਸਮੱਗ੍ਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।"
    },
    'ur': {
        correct: "بہت اچھا، خلائی کیڈٹ! کوڈنگ آپ کے ساتھ ہے!",
        incorrect: "فکر نہ کریں، کوڈنگ کی دنیا میں سفر شروع کریں، اگر آپ چاہیں گے، تو آپ ایک ماہر بن جائیں گے!",
        final: "بالکل ٹھیک! آپ کا انتخاب جو بھی ہو، سب سے اہم بات یہ ہے کہ تلاش اور سیکھتے رہیں۔ کوڈنگ آپ کا انتظار کر رہی ہے!",
        noContent: "مواد پڑھنے کے لیے دستیاب نہیں ہے۔"
    },
    'ru': {  // AGGIUNTO - Russo
        correct: "Отлично, космический кадет! Кодинг с тобой!",
        incorrect: "Не волнуйся, начни путешествие в мир кодинга, и если захочешь, станешь экспертом!",
        final: "Именно! Какой бы ты ни сделал выбор, важно продолжать исследовать и учиться. Кодинг ждет тебя!",
        noContent: "Содержимое недоступно для чтения."
    }
};




// Funzione per ottenere la lingua base (senza varianti regionali)
function getBaseLang(langCode) {
    if (!langCode) return 'it';
    return langCode.split('-')[0];
}




function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}




function changeSection(direction) {
    stopSpeech();
    
    document.getElementById(`section${currentSection}`).classList.remove('active');
    
    currentSection += direction;
    
    if (currentSection < 1) currentSection = 1;
    if (currentSection > totalSections) currentSection = totalSections;
    
    document.getElementById(`section${currentSection}`).classList.add('active');
    
    updateProgress();
    
    window.scrollTo(0, 0);
}




function checkAnswer(element, isCorrect) {
    stopSpeech();
    
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    const currentLang = document.documentElement.lang || 'it';
    const baseLang = getBaseLang(currentLang);
    
    // Cerca prima la lingua specifica (es: zh-CN), poi la lingua base (es: zh), poi inglese
    let messages = feedbackMessages[currentLang] || 
                   feedbackMessages[baseLang] || 
                   feedbackMessages['en'];
    
    if (isCorrect) {
        element.classList.add('correct');
        speakText(messages.correct, false); // false = non è una lettura di sezione
    } else {
        element.classList.add('incorrect');
        speakText(messages.incorrect, false);
        
        options.forEach(opt => {
            if (opt.onclick && opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });
    }
}




function checkAnswerFinal(element, isCorrect) {
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    element.classList.add('correct');
    
    const currentLang = document.documentElement.lang || 'it';
    const baseLang = getBaseLang(currentLang);
    
    // Cerca prima la lingua specifica (es: zh-CN), poi la lingua base (es: zh), poi inglese
    let messages = feedbackMessages[currentLang] || 
                   feedbackMessages[baseLang] || 
                   feedbackMessages['en'];
    
    speakText(messages.final, false);
}




function restartJourney() {
    changeSection(-currentSection + 1);
}




function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}




function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}




window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
}




function readCurrentSection() {
    const section = document.getElementById(`section${currentSection}`);
    
    const sectionClone = section.cloneNode(true);
    
    const elementsToRemove = sectionClone.querySelectorAll(
        '.speech-controls, .nav-buttons, .interactive-element, .explore-options, .explore-card, .quiz-option, .mission-badge'
    );
    
    elementsToRemove.forEach(element => {
        element.remove();
    });
    
    const textToRead = sectionClone.textContent
        .replace(/\s+/g, ' ')
        .replace(/\.\s*\./g, '.')
        .trim();
    
    if (textToRead) {
        speakText(textToRead, true); // true = è una lettura di sezione
    } else {
        const currentLang = document.documentElement.lang || 'it';
        const baseLang = getBaseLang(currentLang);
        
        // Cerca prima la lingua specifica (es: zh-CN), poi la lingua base (es: zh), poi inglese
        let messages = feedbackMessages[currentLang] || 
                       feedbackMessages[baseLang] || 
                       feedbackMessages['en'];
        
        speakText(messages.noContent, false);
    }
}




function speakText(text, isSectionReading = false) {
    // Se l'utente ha appena fermato la lettura, non avviarne una nuova
    if (isSpeechStopped && isSectionReading) {
        isSpeechStopped = false; // Resetta il flag per le prossime letture
        return;
    }
    
    stopSpeech();
    
    // Resetta il flag quando avviamo una nuova lettura
    isSpeechStopped = false;
    
    currentUtterance = new SpeechSynthesisUtterance();
    currentUtterance.text = text;
    
    const currentLang = document.documentElement.lang || 'it';
    const baseLang = getBaseLang(currentLang);
    const voiceLangCode = voiceLanguages[baseLang] || currentLang;
    
    currentUtterance.lang = voiceLangCode;
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    
    // Gestore per quando la lettura finisce naturalmente
    currentUtterance.onend = function() {
        isSpeechStopped = false;
        currentUtterance = null;
    };
    
    // Gestore per errori - SENZA RITENTARE AUTOMATICAMENTE
    currentUtterance.onerror = function(event) {
        console.error('Errore sintesi vocale:', event.error);
        isSpeechStopped = false;
        currentUtterance = null;
        
        // Solo log dell'errore, non ritentare con altre lingue
        // Questo evita la doppia lettura quando l'utente preme Stop
    };
    
    speechSynthesis.speak(currentUtterance);
}




function stopSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
        // Imposta il flag per indicare che l'utente ha fermato manualmente la lettura
        isSpeechStopped = true;
    }
    currentUtterance = null;
}




updateProgress();




document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        block.addEventListener('mouseup', function(e) {
            this.style.transform = 'scale(1)';
        });
        
        block.addEventListener('mouseleave', function(e) {
            this.style.transform = 'scale(1)';
        });
    });
});




function highlightStep(stepNumber) {
    const stepElement = document.getElementById(`step${stepNumber}`);
    if (stepElement) {
        stepElement.classList.add('highlight');
    }
}




function unhighlightStep(stepNumber) {
    const stepElement = document.getElementById(`step${stepNumber}`);
    if (stepElement) {
        stepElement.classList.remove('highlight');
    }
}




function highlightStepFinal(stepNumber) {
    const stepElement = document.getElementById(`stepFinal${stepNumber}`);
    if (stepElement) {
        stepElement.classList.add('highlight');
    }
}




function unhighlightStepFinal(stepNumber) {
    const stepElement = document.getElementById(`stepFinal${stepNumber}`);
    if (stepElement) {
        stepElement.classList.remove('highlight');
    }
}




function setupLanguageMenu() {
    const currentLang = document.documentElement.lang;
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('current');
        } else {
            option.classList.remove('current');
        }
    });
}




document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupLanguageMenu();
    
    if (!speechSynthesis) {
        console.warn('Il browser non supporta la sintesi vocale');
        
        const speechButtons = document.querySelectorAll('.speech-button');
        speechButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
});
let currentSection = 1;
const totalSections = 8;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;


function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}


function changeSection(direction) {
    // Ferma la sintesi vocale se è in riproduzione
    stopSpeech();
    
    // Nasconde la sezione corrente
    document.getElementById(`section${currentSection}`).classList.remove('active');
    
    // Calcola la nuova sezione
    currentSection += direction;
    
    // Assicurati che la sezione sia nell'intervallo valido
    if (currentSection < 1) currentSection = 1;
    if (currentSection > totalSections) currentSection = totalSections;
    
    // Mostra la nuova sezione
    document.getElementById(`section${currentSection}`).classList.add('active');
    
    // Aggiorna la barra di progresso
    updateProgress();
    
    // Scorri verso l'alto
    window.scrollTo(0, 0);
}


function checkAnswer(element, isCorrect) {
    // Ferma qualsiasi sintesi vocale in corso
    stopSpeech();
    
    // Rimuovi tutte le classi di risposta precedenti
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Aggiungi la classe corretta
    if (isCorrect) {
        element.classList.add('correct');
        // Sintesi vocale per risposta corretta
        speakText("Bravo cadetto spaziale! Il coding è con te!");
    } else {
        element.classList.add('incorrect');
        // Sintesi vocale per risposta errata
        speakText("Non ti preoccupare, inizia il viaggio nel mondo del coding, se lo vorrai, diventerai un esperto!!");
        
        // Trova la risposta corretta e evidenziala
        options.forEach(opt => {
            if (opt.onclick && opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });
    }
}


function checkAnswerFinal(element, isCorrect) {
    // In questa missione tutte le risposte sono giuste!
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    element.classList.add('correct');
    speakText("Esatto! Qualunque sia la tua scelta, l'importante è continuare a esplorare e imparare. Il coding ti aspetta!");
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


// Chiudi il modal cliccando fuori dal contenuto
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
}


// Sintesi vocale - Versione migliorata che esclude i pulsanti
function readCurrentSection() {
    const section = document.getElementById(`section${currentSection}`);
    
    // Crea un clone della sezione per non modificare l'originale
    const sectionClone = section.cloneNode(true);
    
    // Rimuove tutti gli elementi che non devono essere letti
    const elementsToRemove = sectionClone.querySelectorAll(
        '.speech-controls, .nav-buttons, .interactive-element, .explore-options, .explore-card, .quiz-option, .mission-badge'
    );
    
    elementsToRemove.forEach(element => {
        element.remove();
    });
    
    // Ottiene il testo pulito
    const textToRead = sectionClone.textContent
        .replace(/\s+/g, ' ') // Sostituisce spazi multipli con uno solo
        .replace(/\.\s*\./g, '.') // Rimuove punti doppi
        .trim(); // Rimuove spazi all'inizio e alla fine
    
    if (textToRead) {
        speakText(textToRead);
    } else {
        speakText("Contenuto non disponibile per la lettura.");
    }
}


function speakText(text) {
    // Ferma qualsiasi sintesi vocale in corso
    stopSpeech();
    
    currentUtterance = new SpeechSynthesisUtterance();
    currentUtterance.text = text;
    currentUtterance.lang = 'it-IT';
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    
    speechSynthesis.speak(currentUtterance);
}


function stopSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
}


// Inizializza la barra di progresso
updateProgress();


// Aggiungi interattività ai blocchi
document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('mousedown', function(e) {
            // Crea un effetto di trascinamento semplice
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


// Funzioni per evidenziare i passaggi dell'algoritmo della cioccolata
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


// Funzioni per evidenziare i passaggi dell'algoritmo finale
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


// Nuova funzione per gestire il cambio lingua
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


// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupLanguageMenu();
});
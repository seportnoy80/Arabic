document.addEventListener("DOMContentLoaded", async () => {
    const hebrewSentenceEl = document.getElementById("hebrewSentence");
    const transcriptionEl = document.getElementById("transcription");
    const arabicTranslationEl = document.getElementById("arabicTranslation");
    const newSentenceBtn = document.getElementById("newSentenceBtn");
    const showTranslationBtn = document.getElementById("showTranslationBtn");
    const playAudioBtn = document.getElementById("playAudioBtn");

    let sentences = [];
    let sentenceIndex = 0;

    // Load sentences from the JSON file
    async function loadSentences() {
        try {
            const response = await fetch("sentences.json");
            sentences = await response.json();
            sentenceIndex = 0;
            displaySentence();
        } catch (error) {
            console.error("Error loading sentences:", error);
            hebrewSentenceEl.textContent = "⚠️ Failed to load sentences.";
        }
    }

    // Display the current sentence
    function displaySentence() {
        if (sentences.length === 0) return;

        const currentSentence = sentences[sentenceIndex];
        hebrewSentenceEl.textContent = currentSentence.hebrew;
        transcriptionEl.textContent = currentSentence.transcription;
        arabicTranslationEl.textContent = currentSentence.arabic;
        transcriptionEl.classList.add("hidden");
        arabicTranslationEl.classList.add("hidden");
    }

    // Show translation
    showTranslationBtn.addEventListener("click", () => {
        transcriptionEl.classList.remove("hidden");
        arabicTranslationEl.classList.remove("hidden");
    });

    // Load next sentence
    newSentenceBtn.addEventListener("click", () => {
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        displaySentence();
    });

    // Play Arabic pronunciation
    playAudioBtn.addEventListener("click", () => {
        if (sentences.length === 0) return;

        const arabicText = sentences[sentenceIndex].arabic;
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = "ar-SA"; // Arabic voice
        speechSynthesis.speak(utterance);
    });

    // Load sentences on start
    loadSentences();
});

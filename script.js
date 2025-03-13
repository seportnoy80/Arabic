document.addEventListener("DOMContentLoaded", async () => {
    const hebrewSentenceEl = document.getElementById("hebrewSentence");
    const transcriptionEl = document.getElementById("transcription");
    const arabicTranslationEl = document.getElementById("arabicTranslation");
    const prevSentenceBtn = document.getElementById("prevSentenceBtn");
    const nextSentenceBtn = document.getElementById("nextSentenceBtn");
    const sentenceNumberEl = document.getElementById("sentenceNumber");

    let sentences = [];
    let sentenceIndex = 0;

    async function loadSentences() {
        try {
            const response = await fetch("updated_sentences.json");
            sentences = await response.json();
            sentenceIndex = 0;
            displaySentence();
        } catch (error) {
            console.error("Error loading sentences:", error);
            hebrewSentenceEl.textContent = "⚠️ Failed to load sentences.";
        }
    }

    function displaySentence() {
        if (sentences.length === 0) return;

        const currentSentence = sentences[sentenceIndex];
        hebrewSentenceEl.textContent = currentSentence.hebrew;
        transcriptionEl.textContent = currentSentence.transcription;
        arabicTranslationEl.textContent = currentSentence.arabic;

        sentenceNumberEl.textContent = `משפט ${sentenceIndex + 1} מתוך ${sentences.length}`;
    }

    nextSentenceBtn.addEventListener("click", () => {
        if (sentenceIndex < sentences.length - 1) {
            sentenceIndex++;
            displaySentence();
        }
    });

    prevSentenceBtn.addEventListener("click", () => {
        if (sentenceIndex > 0) {
            sentenceIndex--;
            displaySentence();
        }
    });

    transcriptionEl.addEventListener("click", () => {
        saveToFlashcards(sentences[sentenceIndex]);
    });

    function saveToFlashcards(sentence) {
        let savedFlashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
        savedFlashcards.push(sentence);
        localStorage.setItem("flashcards", JSON.stringify(savedFlashcards));
        alert(`📌 המילה '${sentence.transcription}' נוספה לכרטיסיות!`);
    }

    loadSentences();
});

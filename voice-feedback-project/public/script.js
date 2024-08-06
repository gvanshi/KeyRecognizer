document.addEventListener('DOMContentLoaded', () => {
    let selectedVoice = null;
  
    function populateVoiceList() {
      if (typeof speechSynthesis === 'undefined') {
        return;
      }
  
      const voices = speechSynthesis.getVoices();
  
      // Select the first non-default voice
      selectedVoice = voices.find(voice => voice.default === false) || voices[0];
  
      // Log available voices (optional)
      console.log('Available voices:', voices);
    }
  
    populateVoiceList();
  
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  
    // Add event listener for key presses
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      speak(keyName);
    });
  
    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      speechSynthesis.speak(utterance);
    }
  });
  

export const cancel = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speak = (text: string, lang: 'en' | 'es', rate: number = 1, shouldCancel: boolean = true): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Browser does not support text-to-speech");
      resolve();
      return;
    }

    if (shouldCancel) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language code
    utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
    
    // Adjust rate (speed)
    utterance.rate = rate;
    
    // Try to find a specific voice for better quality if available
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang === 'es' ? 'es' : 'en'));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // Resolve on error to keep sequence moving

    window.speechSynthesis.speak(utterance);
  });
};

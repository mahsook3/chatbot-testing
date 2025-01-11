(function() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chatbot-toggle" id="chatbotToggle">
          &#x1F310;
        </button>
        <div class="chat-window" id="chatWindow">
          <div class="chat-header">
            <button id="closeChat">&#x2715;</button>
          </div>
          <div class="chat-content" id="chatContent">
            <div id="translatedText" style="display:none; background:#f3f4f6; padding:0.75rem; border-radius:0.5rem; margin-bottom:1rem;">
              <p id="translatedTextContent"></p>
            </div>
          </div>
          <div class="chat-footer">
            <select id="languageSelector">
              <option value="">Select Language</option>
              <!-- Languages will be populated dynamically -->
            </select>
            <button id="translateButton">Translate</button>
          </div>
        </div>
      </div>
    `;
  
    const chatbotStyles = `
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .chatbot-container {
          position: fixed;
          bottom: 4rem;
          right: 1rem;
          z-index: 50;
        }
        .chatbot-toggle {
          background-color: #34d399;
          color: white;
          padding: 1rem;
          border-radius: 50%;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chatbot-toggle:hover {
          background-color: #22c55e;
        }
        .chat-window {
          position: fixed;
          bottom: 5rem;
          right: 1rem;
          width: 22rem;
          max-height: 32rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: none;
          flex-direction: column;
          z-index: 50;
        }
        .chat-header {
          background: linear-gradient(to right, #34d399, #22c55e);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .chat-header button {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .chat-content {
          padding: 1rem;
          flex-grow: 1;
          overflow-y: auto;
        }
        .chat-footer {
          padding: 1rem;
        }
        .chat-footer select,
        .chat-footer button {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 0.5rem;
          font-size: 1rem;
        }
        .chat-footer button {
          background: #34d399;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chat-footer button:hover {
          background: #22c55e;
        }
      </style>
    `;
  
    document.head.insertAdjacentHTML('beforeend', chatbotStyles);
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  
    const indianLanguages = [
      { code: 'en', name: 'English' },
      { code: 'as', name: 'Assamese (অসমীয়া)' },
      { code: 'bn', name: 'Bengali (বাংলা)' },
      { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
      { code: 'hi', name: 'Hindi (हिन्दी)' },
      { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
      { code: 'ml', name: 'Malayalam (മലയാളം)' },
      { code: 'mr', name: 'Marathi (मराठी)' },
      { code: 'ne', name: 'Nepali (नेपाली)' },
      { code: 'or', name: 'Odia (ଓଡ଼ିଆ)' },
      { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
      { code: 'sa', name: 'Sanskrit (संस्कृतम्)' },
      { code: 'ta', name: 'Tamil (தமிழ்)' },
      { code: 'te', name: 'Telugu (తెలుగు)' },
      { code: 'ur', name: 'Urdu (اردو)' },
      { code: 'kok', name: 'Konkani (कोंकणी)' },
      { code: 'mai', name: 'Maithili (मैथिली)' },
      { code: 'ks', name: 'Kashmiri (कश्मीरी)' },
      { code: 'mni', name: 'Manipuri (मणिपुरी)' },
      { code: 'sat', name: 'Santali (संथाली)' },
      { code: 'dog', name: 'Dogri (डोगरी)' },
      { code: 'gom', name: 'Goan Konkani (गोवा कोंकणी)' },
      { code: 'brx', name: 'Bodo (बोडो)' },
      { code: 'sd', name: 'Sindhi (सिंधी)' }
    ];
  
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const languageSelector = document.getElementById('languageSelector');
    const translateButton = document.getElementById('translateButton');
    const translatedText = document.getElementById('translatedText');
    const translatedTextContent = document.getElementById('translatedTextContent');
  
    indianLanguages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.name;
      languageSelector.appendChild(option);
    });
  
    chatbotToggle.addEventListener('click', () => {
      chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });
  
    closeChat.addEventListener('click', () => {
      chatWindow.style.display = 'none';
    });
  
    translateButton.addEventListener('click', async () => {
      const selectedLanguage = languageSelector.value;
      const selectedText = window.getSelection().toString();
  
      if (!selectedText) {
        alert('Please select some text to translate.');
        return;
      }
  
      if (!selectedLanguage) {
        alert('Please select a language.');
        return;
      }
  
      try {
        const response = { data: { query: `Translated text for: ${selectedText}` } };
        translatedTextContent.textContent = response.data.query;
        translatedText.style.display = 'block';
      } catch (error) {
        console.error('Error translating text:', error);
      }
    });
  })();
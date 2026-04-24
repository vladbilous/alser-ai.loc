document.addEventListener('DOMContentLoaded', () => {
  const chatbotHTML = `
    <div class="chatbot-widget">
      <button class="chatbot-toggle" id="chatbot-toggle">
        <i class="fa-solid fa-message"></i>
      </button>
      <div class="chatbot-popup" id="chatbot-popup">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <i class="fa-solid fa-robot"></i> AI Assistant
          </div>
          <button class="chatbot-close" id="chatbot-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="chatbot-body" id="chatbot-body">
          <div class="chat-msg bot">Привіт! Я AI асистент. Чим можу допомогти у виборі штор або жалюзі?</div>
        </div>
        <div class="chatbot-footer">
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Напишіть повідомлення...">
          <button class="chatbot-send" id="chatbot-send">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const toggleBtn = document.getElementById('chatbot-toggle');
  const popup = document.getElementById('chatbot-popup');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const input = document.getElementById('chatbot-input');
  const chatBody = document.getElementById('chatbot-body');

  toggleBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  const sendMessage = () => {
    const text = input.value.trim();
    if (text === '') return;

    // Add user msg
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    input.value = '';

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';
      botMsg.textContent = 'Дякую за запитання. Зв\\'язуюсь із базою даних...';
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});

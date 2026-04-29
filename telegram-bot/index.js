require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

if (!TELEGRAM_TOKEN || !OPENROUTER_KEY) {
  console.error('ПОМИЛКА: Не вказані змінні оточення TELEGRAM_TOKEN або OPENROUTER_KEY в .env файлі!');
  process.exit(1);
}

// Зчитуємо базу знань
const kbPath = path.join(__dirname, 'knowledge_base.txt');
let knowledgeBase = '';
try {
  knowledgeBase = fs.readFileSync(kbPath, 'utf-8');
} catch (error) {
  console.error('Попередження: Файл knowledge_base.txt не знайдено.');
}

// Ініціалізація бота з використанням polling
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Системний промпт для AI
const SYSTEM_PROMPT = `Ти консультант компанії Alser. Відповідай коротко, по суті, українською мовою. Допомагай обрати товар, пояснюй різницю, пропонуй залишити заявку або зв’язатись з менеджером. Не вигадуй інформацію, якщо не знаєш — скажи чесно.

Ось інформація про компанію, послуги та ціни, на яку ти повинен спиратися при відповідях (твоя База Знань):
-----------------
${knowledgeBase}
-----------------`;

console.log('Бот успішно запущений і готовий до роботи...');

// Обробка вхідних повідомлень
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ігноруємо повідомлення без тексту (наприклад, фото, стікери) або пусті
  if (!text || text.trim() === '') {
    return;
  }

  // Логування вхідного повідомлення
  console.log(`[${new Date().toISOString()}] Отримано повідомлення від користувача ${msg.from.username || msg.from.first_name || chatId}: "${text}"`);

  try {
    // Відправляємо статус "друкує", щоб користувач бачив активність бота
    bot.sendChatAction(chatId, 'typing');

    // Запит до OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-001', // Зазначена модель
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://alser.ua', // Рекомендовано OpenRouter
          'X-Title': 'Alser Telegram Bot' // Рекомендовано OpenRouter
        }
      }
    );

    const aiReply = response.data?.choices?.[0]?.message?.content;

    if (aiReply) {
      // Відправляємо відповідь користувачу
      bot.sendMessage(chatId, aiReply);
      console.log(`[${new Date().toISOString()}] Відповідь відправлена користувачу ${chatId}`);
    } else {
      throw new Error('Не отримано контент відповіді від OpenRouter API');
    }

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ПОМИЛКА під час обробки запиту:`, error.message);
    if (error.response) {
      console.error('Деталі помилки API:', error.response.data);
    }
    
    // Повідомлення користувачу про помилку (згідно вимог)
    bot.sendMessage(chatId, "Сервіс тимчасово недоступний");
  }
});

// Обробка помилок polling
bot.on('polling_error', (error) => {
  console.error(`[${new Date().toISOString()}] Помилка polling:`, error.code, error.message);
});

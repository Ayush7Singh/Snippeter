import React, { useEffect, useState } from 'react';

const MedAi = () => {
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  useEffect(() => {
    if (!chatbotLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      script.async = true;

      script.onload = () => {
        setChatbotLoaded(true);
        window.botpressWebChat.init({
          "composerPlaceholder": "Chat with bot",
          "botConversationDescription": "This chatbot helps to create snippits",
          "botId": "1ee9767d-2198-414e-adf2-3f85d4a3c154",
          "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
          "messagingUrl": "https://messaging.botpress.cloud",
          "clientId": "1ee9767d-2198-414e-adf2-3f85d4a3c154",
          "webhookId": "e7739a9e-bb5d-470b-b2a8-5b7a1290751c",
          "lazySocket": true,
          "themeName": "prism",
          "frontendVersion": "v1",
          "showPoweredBy": true,
          "theme": "prism",
          "themeColor": "#2563eb"
        });
      };

      document.body.appendChild(script);

      return () => {
        // Remove the script only if the chatbot is loaded
        if (chatbotLoaded) {
          document.body.removeChild(script);
        }
      };
    }
  }, [chatbotLoaded]);

  return (
    <div id="botpress-webchat"></div>
  );
};

export default MedAi;

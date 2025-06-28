import React, { useState, useEffect, useRef } from 'react';

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  messageRow: {
    marginBottom: '15px',
    display: 'flex',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  assistantMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '18px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  userBubble: {
    backgroundColor: '#4a6cf7',
    color: 'white',
    borderBottomRightRadius: '5px',
  },
  assistantBubble: {
    backgroundColor: 'white',
    color: '#333',
    borderBottomLeftRadius: '5px',
    border: '1px solid #e0e0e0',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: 'white',
  },
  textarea: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    resize: 'none',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '0 20px',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  controlPanel: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    minWidth: '200px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  modelInfo: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    color: '#666',
    fontStyle: 'italic',
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '18px',
    backgroundColor: '#f0f0f0',
    color: '#666',
    width: 'fit-content',
    marginBottom: '15px',
  },
  dot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#888',
    marginRight: '3px',
    animation: 'typingAnimation 1.4s infinite ease-in-out',
  },
  '@keyframes typingAnimation': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-5px)',
    },
  },
  errorMessage: {
    color: '#e53935',
    fontSize: '14px',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    borderLeft: '4px solid #e53935',
  },
  conversationInfo: {
    fontSize: '12px',
    color: '#888',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  clearButton: {
    padding: '5px 10px',
    backgroundColor: '#f5f5f5',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

// Available models
const availableModels = [
  { id: 'mistralai/mistral-small-24b-instruct-2501:free', name: 'Mistral Small (Free)', description: 'Free model with good quality' },
  { id: 'meta/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Free)', description: 'Free model with excellent quality' },
  { id: 'qwen/qwen2.5-72b-instruct:free', name: 'Qwen 72B (Free)', description: 'Free model with good quality' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash ($)', description: 'Affordable paid model with excellent quality' },
  { id: 'anthropic/claude-haiku-3.5', name: 'Claude Haiku 3.5 ($)', description: 'Affordable paid model with excellent quality' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet ($$)', description: 'Premium model with excellent quality' },
];

const ChatWithAIComponent = () => {
  // State
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('mistralai/mistral-small-24b-instruct-2501:free');
  const [backendUrl, setBackendUrl] = useState('https://minatoz997-backend66.hf.space/chat/message');
  const [conversationId, setConversationId] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  
  // Refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Send message to backend
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content: userMessage }
    ]);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          model: selectedModel,
          api_key: apiKey || undefined,
          conversation_id: conversationId || undefined
        })
      });
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      // Add assistant message to chat
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: data.response }
      ]);
      
      // Update conversation info
      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }
      
      if (data.message_count) {
        setMessageCount(data.message_count);
      }
      
      if (data.total_tokens) {
        setTotalTokens(data.total_tokens);
      } else if (data.usage && data.usage.total_tokens) {
        setTotalTokens(prevTokens => prevTokens + data.usage.total_tokens);
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle input key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
    setConversationId(null);
    setMessageCount(0);
    setTotalTokens(0);
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Chat with AI</h1>
      </div>
      
      <div style={styles.controlPanel}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Backend URL</label>
          <input
            type="text"
            style={styles.input}
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder="https://your-backend-url.com/chat/message"
            disabled={isLoading}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>OpenRouter API Key</label>
          <input
            type="password"
            style={styles.input}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-or-v1-..."
            disabled={isLoading}
          />
          <small style={styles.modelInfo}>
            Optional: Only needed if your backend requires it
          </small>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>AI Model</label>
          <select 
            style={styles.select}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isLoading}
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <small style={styles.modelInfo}>
            {availableModels.find(m => m.id === selectedModel)?.description}
          </small>
        </div>
      </div>
      
      <div style={styles.chatContainer}>
        <div style={styles.messagesContainer} ref={messagesContainerRef}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
              Send a message to start chatting with AI
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index} 
              style={{
                ...styles.messageRow,
                ...(message.role === 'user' ? styles.userMessageRow : styles.assistantMessageRow)
              }}
            >
              <div 
                style={{
                  ...styles.messageBubble,
                  ...(message.role === 'user' ? styles.userBubble : styles.assistantBubble)
                }}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={styles.messageRow}>
              <div style={styles.typingIndicator}>
                <span style={{...styles.dot, animationDelay: '0s'}}></span>
                <span style={{...styles.dot, animationDelay: '0.2s'}}></span>
                <span style={{...styles.dot, animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          
          {error && (
            <div style={styles.errorMessage}>
              Error: {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div style={styles.inputContainer}>
          <textarea
            style={styles.textarea}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            rows={1}
            disabled={isLoading}
          />
          <button
            style={{
              ...styles.sendButton,
              ...(isLoading ? styles.disabledButton : {})
            }}
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
      
      {(conversationId || messages.length > 0) && (
        <div style={styles.conversationInfo}>
          <div>
            {conversationId && `Conversation ID: ${conversationId} • `}
            {`Messages: ${messageCount || messages.length} • `}
            {`Tokens: ${totalTokens}`}
          </div>
          <button 
            style={styles.clearButton}
            onClick={clearConversation}
            disabled={isLoading}
          >
            Clear Conversation
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWithAIComponent;
import React, { useState } from 'react';
import NovelWriterComponent from './index';
import ChatWithAIComponent from './ChatWithAI';

// Styles
const styles = {
  container: {
    width: '100%',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
  },
  tab: {
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#666',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s',
  },
  activeTab: {
    color: '#4a6cf7',
    borderBottom: '3px solid #4a6cf7',
  },
  contentContainer: {
    minHeight: '600px',
  },
};

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState('chat'); // Default to chat tab
  
  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatWithAIComponent />;
      case 'novel':
        return <NovelWriterComponent />;
      default:
        return <ChatWithAIComponent />;
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>KugySouL AI Assistant</h1>
        <p style={styles.subtitle}>Chat with AI or generate novel chapters with our advanced AI tools</p>
      </div>
      
      <div style={styles.tabsContainer}>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'chat' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('chat')}
        >
          Chat with AI
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'novel' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('novel')}
        >
          Novel Writer
        </div>
      </div>
      
      <div style={styles.contentContainer}>
        {renderContent()}
      </div>
    </div>
  );
};

export default TabsContainer;
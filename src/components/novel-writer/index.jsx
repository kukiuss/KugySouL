import React, { useState, useEffect, useRef } from 'react';
import { OpenRouterService } from './openrouter-service';

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
  editor: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  textareaContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    width: '100%',
    height: '500px',
    padding: '15px',
    fontSize: '16px',
    lineHeight: '1.6',
    border: '1px solid #ddd',
    borderRadius: '5px',
    resize: 'none',
    fontFamily: 'Georgia, serif',
  },
  controlPanel: {
    width: '300px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
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
  button: {
    padding: '10px 15px',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  progressContainer: {
    marginTop: '10px',
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a6cf7',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '12px',
    color: '#666',
  },
  wordCount: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
  },
  statusMessage: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
    fontStyle: 'italic',
  },
  apiKeyInput: {
    marginBottom: '15px',
  },
  modelInfo: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  },
};

// Available models
const availableModels = [
  { id: 'mistralai/mistral-small-24b-instruct-2501:free', name: 'Mistral Small (Free)', description: 'Free model with good quality' },
  { id: 'meta/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Free)', description: 'Free model with excellent quality' },
  { id: 'qwen/qwen2.5-72b-instruct:free', name: 'Qwen 72B (Free)', description: 'Free model with good quality' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash ($)', description: 'Affordable paid model with excellent quality' },
  { id: 'anthropic/claude-haiku-3.5', name: 'Claude Haiku 3.5 ($)', description: 'Affordable paid model with excellent quality' },
  { id: 'featherless/eva-unit-01:32k-q', name: 'EVA Unit-01 ($$)', description: 'Premium model optimized for novel writing' },
];

const NovelWriterComponent = () => {
  // State
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('mistralai/mistral-small-24b-instruct-2501:free');
  const [targetWordCount, setTargetWordCount] = useState(2000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [useBackend, setUseBackend] = useState(true);
  const [backendUrl, setBackendUrl] = useState('https://minatoz997-backend66.hf.space/chat/message');
  
  // Refs
  const openRouterServiceRef = useRef(null);
  const contentRef = useRef(null);
  
  // Initialize OpenRouter service when API key changes
  useEffect(() => {
    if (apiKey && !useBackend) {
      openRouterServiceRef.current = new OpenRouterService(apiKey);
    }
  }, [apiKey, useBackend]);
  
  // Update word count when content changes
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);
  
  // Handle progress updates during generation
  const handleProgress = (progressData) => {
    setProgress(progressData.progress * 100);
    setStatusMessage(progressData.message);
  };
  
  // Generate content using OpenRouter directly
  const generateWithOpenRouter = async () => {
    if (!openRouterServiceRef.current) {
      setStatusMessage('Please enter your OpenRouter API key first');
      return;
    }
    
    try {
      setIsGenerating(true);
      setStatusMessage('Starting generation...');
      
      const result = await openRouterServiceRef.current.generateNovelWithAutopilot(
        selectedModel,
        prompt,
        targetWordCount,
        5, // Max iterations
        handleProgress
      );
      
      setContent(result.content);
      setStatusMessage(`Completed with ${result.totalWordCount} words in ${result.iterations} iterations`);
    } catch (error) {
      console.error('Error generating content:', error);
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };
  
  // Generate content using backend
  const generateWithBackend = async () => {
    try {
      setIsGenerating(true);
      setStatusMessage('Starting generation with backend...');
      setProgress(10);
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: prompt,
          model: selectedModel,
          api_key: apiKey, // Pass API key to backend
          max_tokens: 4000,
          temperature: 0.7,
          system_message: "You are a professional novelist. Generate detailed, descriptive content with at least 800-1000 words per response. Be thorough and elaborate in your writing. Focus on vivid descriptions, character development, and engaging dialogue."
        })
      });
      
      setProgress(50);
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }
      
      const data = await response.json();
      setProgress(100);
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      setContent(data.response);
      
      // Count words in response
      const responseWordCount = data.response.trim().split(/\s+/).filter(Boolean).length;
      setStatusMessage(`Generated ${responseWordCount} words with ${selectedModel}`);
      
      // If we're far from target, try autopilot mode
      if (responseWordCount < targetWordCount * 0.7) {
        setStatusMessage(`First generation: ${responseWordCount} words. Starting autopilot to reach ${targetWordCount} words...`);
        await continueWithBackend(data.response, responseWordCount);
      }
      
    } catch (error) {
      console.error('Error generating content:', error);
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };
  
  // Continue generation with backend to reach target word count
  const continueWithBackend = async (currentText, currentWordCount) => {
    try {
      let totalWordCount = currentWordCount;
      let fullContent = currentText;
      let iteration = 1;
      
      while (totalWordCount < targetWordCount && iteration < 4) {
        setStatusMessage(`Autopilot iteration ${iteration + 1}: ${totalWordCount}/${targetWordCount} words...`);
        setProgress((totalWordCount / targetWordCount) * 100);
        
        // Get the last part of the current content for context
        const contextLength = Math.min(1000, fullContent.length);
        const lastSection = fullContent.slice(-contextLength);
        
        // Create continuation prompt
        const continuationPrompt = `
CURRENT PROGRESS: ${totalWordCount}/${targetWordCount} words

LAST PART OF THE STORY:
"${lastSection}"

TASK: Continue the story from exactly where it left off. Write the NEXT 500-800 words that naturally follow from the ending point above.

IMPORTANT: 
- Continue from the exact point where the story ended
- DO NOT repeat or rewrite any existing content
- Maintain the same style, tone, and character voice
- Write AT LEAST 500-800 new words
- Be detailed and descriptive
`;
        
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: continuationPrompt,
            model: selectedModel,
            api_key: apiKey,
            max_tokens: 4000,
            temperature: 0.7,
            system_message: "You are a creative writing assistant specialized in novel writing. Your task is to CONTINUE the story from exactly where it left off. DO NOT rewrite or repeat any existing content. Generate at least 500-800 new words that continue the narrative. Be detailed and descriptive."
          })
        });
        
        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        
        const continuationContent = data.response;
        const continuationWordCount = continuationContent.trim().split(/\s+/).filter(Boolean).length;
        
        // Append to current content
        fullContent += '\n\n' + continuationContent;
        totalWordCount += continuationWordCount;
        
        setContent(fullContent);
        setStatusMessage(`Autopilot iteration ${iteration + 1}: Added ${continuationWordCount} words (Total: ${totalWordCount}/${targetWordCount})`);
        
        iteration++;
      }
      
      setStatusMessage(`Completed with ${totalWordCount} words in ${iteration} iterations`);
      
    } catch (error) {
      console.error('Error in autopilot:', error);
      setStatusMessage(`Autopilot error: ${error.message}`);
    }
  };
  
  // Handle generate button click
  const handleGenerate = async () => {
    if (!prompt) {
      setStatusMessage('Please enter a prompt first');
      return;
    }
    
    if (useBackend) {
      await generateWithBackend();
    } else {
      if (!apiKey) {
        setStatusMessage('Please enter your OpenRouter API key first');
        return;
      }
      await generateWithOpenRouter();
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Novel Writer</h1>
      </div>
      
      <div style={styles.editor}>
        <div style={styles.textareaContainer}>
          <textarea
            style={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your novel content will appear here..."
            disabled={isGenerating}
            ref={contentRef}
          />
          <div style={styles.wordCount}>
            Word count: {wordCount} / {targetWordCount}
          </div>
        </div>
        
        <div style={styles.controlPanel}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Generation Method</label>
            <select 
              style={styles.select}
              value={useBackend ? 'backend' : 'direct'}
              onChange={(e) => setUseBackend(e.target.value === 'backend')}
              disabled={isGenerating}
            >
              <option value="backend">Use Backend API</option>
              <option value="direct">Direct to OpenRouter</option>
            </select>
          </div>
          
          {useBackend && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Backend URL</label>
              <input
                type="text"
                style={styles.input}
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="https://your-backend-url.com/chat/message"
                disabled={isGenerating}
              />
            </div>
          )}
          
          <div style={styles.formGroup}>
            <label style={styles.label}>OpenRouter API Key</label>
            <input
              type="password"
              style={{...styles.input, ...styles.apiKeyInput}}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              disabled={isGenerating}
            />
            <small style={styles.modelInfo}>
              {useBackend ? 'Optional: Only needed if your backend requires it' : 'Required for direct OpenRouter access'}
            </small>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>AI Model</label>
            <select 
              style={styles.select}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isGenerating}
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
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Target Word Count</label>
            <input
              type="number"
              style={styles.input}
              value={targetWordCount}
              onChange={(e) => setTargetWordCount(parseInt(e.target.value))}
              min="500"
              max="5000"
              step="100"
              disabled={isGenerating}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Prompt</label>
            <textarea
              style={{...styles.input, height: '100px'}}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a chapter about a young mage named Elara who discovers she can communicate with ancient spirits..."
              disabled={isGenerating}
            />
          </div>
          
          <button
            style={{
              ...styles.button,
              ...(isGenerating ? styles.disabledButton : {})
            }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Chapter'}
          </button>
          
          {isGenerating && (
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${progress}%`}} />
              </div>
              <div style={styles.progressText}>
                {Math.round(progress)}% complete
              </div>
            </div>
          )}
          
          <div style={styles.statusMessage}>
            {statusMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelWriterComponent;
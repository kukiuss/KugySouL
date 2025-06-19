#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Simple Vercel Deployment...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this from the project root.');
  process.exit(1);
}

// Create a simple vercel.json for guaranteed deployment
const simpleVercelConfig = {
  "version": 2,
  "framework": "nextjs",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "https://minatoz997-backend66.hf.space",
    "NEXT_PUBLIC_WS_URL": "wss://minatoz997-backend66.hf.space",
    "NEXT_PUBLIC_APP_NAME": "KugySouL"
  }
};

fs.writeFileSync('vercel.json', JSON.stringify(simpleVercelConfig, null, 2));
console.log('✅ Created simple vercel.json configuration');

// Create .env.production for build
const envProduction = `NEXT_PUBLIC_API_BASE_URL=https://minatoz997-backend66.hf.space
NEXT_PUBLIC_WS_URL=wss://minatoz997-backend66.hf.space
NEXT_PUBLIC_APP_NAME=KugySouL
NODE_ENV=production`;

fs.writeFileSync('.env.production', envProduction);
console.log('✅ Created .env.production');

try {
  // Test build first
  console.log('🔨 Testing build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!\n');

  // Install Vercel CLI if not present
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    console.log('✅ Vercel CLI found');
  } catch {
    console.log('📦 Installing Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }

  // Deploy
  console.log('🚀 Deploying to Vercel...');
  console.log('Please follow the prompts to login and deploy.\n');
  
  execSync('vercel --prod --yes', { stdio: 'inherit' });
  
  console.log('\n🎉 Deployment completed!');
  console.log('🌐 Your KugySouL frontend should now be live!');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Make sure you have a Vercel account');
  console.log('2. Run "vercel login" first');
  console.log('3. Check your internet connection');
  console.log('4. Try manual deployment at vercel.com');
}
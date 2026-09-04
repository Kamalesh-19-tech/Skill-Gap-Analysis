#  API Key Setup Instructions

## OpenAI Integration Setup

To enable AI-powered question generation and personalized roadmaps, you need to add your OpenAI API key.

### Steps:

1. **Get OpenAI API Key:**
   - Visit https://platform.openai.com/account/api-keys
   - Create an account or sign in
   - Generate a new API key

2. **Add API Key to the Project:**
   
   **Option 1: Direct Integration**
   - In `src/utils/aiService.js`, change `hasApiKey = false` to `hasApiKey = true`
   - Replace `YOUR_OPENAI_API_KEY_HERE` with your actual API key
   - Do the same in `src/utils/aiRoadmapGenerator.js`

   **Option 2: Environment Variable (Recommended)**
   - Create a `.env` file in the project root
   - Add: `VITE_OPENAI_API_KEY=your_actual_api_key_here`
   - Update the code to use `import.meta.env.VITE_OPENAI_API_KEY`

3. **Test the Integration:**
   - Try generating questions in the Assessment page
   - Check if personalized roadmaps are generated in Dashboard

### Current Status:
- ✅ Fallback questions work without API key
- ✅ Fallback roadmaps work without API key  
- ⚠️ AI-powered features require API key setup

### Security Notes:
- Never commit API keys to version control
- Use environment variables for production
- Monitor your API usage and costs

Please add your API key using the integration section at the right top corner of the UI.
 
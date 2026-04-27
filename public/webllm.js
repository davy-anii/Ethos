import * as webllm from "https://esm.run/@mlc-ai/web-llm";

window.localAIEngine = null;

document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-ai-btn');
  const statusEl = document.getElementById('download-ai-status');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      downloadBtn.disabled = true;
      statusEl.style.display = 'block';
      statusEl.textContent = "Initializing... (Make sure you are on Wi-Fi)";
      
      const initProgressCallback = (report) => {
        statusEl.textContent = report.text;
      };
      
      // We use Phi-3 as it's highly capable and relatively small (approx ~2GB)
      const selectedModel = "Phi-3-mini-4k-instruct-q4f16_1-MLC";
      
      try {
        const engine = new webllm.MLCEngine();
        engine.setInitProgressCallback(initProgressCallback);
        
        await engine.reload(selectedModel);
        statusEl.textContent = "✅ Ready! You can now use AI completely offline.";
        statusEl.style.color = "#4caf50";
        window.localAIEngine = engine;
      } catch (error) {
        statusEl.textContent = "❌ Error: " + error.message;
        statusEl.style.color = "#f44336";
        downloadBtn.disabled = false;
        console.error("WebLLM Error:", error);
      }
    });
  }
});

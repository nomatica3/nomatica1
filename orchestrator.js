const { fork } = require('child_process');
const path = require('path');

const models = [
  { route: "gemma", name: "Gemma 7B", sourcePort: 5001, proxyPort: 6001, subdomain: "gemma.colorfulmoves.com" },
  { route: "llama", name: "LLaMA 2 13B", sourcePort: 5002, proxyPort: 6002, subdomain: "llama.colorfulmoves.com" },
  { route: "mistral", name: "Mistral 7B", sourcePort: 5003, proxyPort: 6003, subdomain: "mistral.colorfulmoves.com" },
  { route: "phi4", name: "Phi-4", sourcePort: 5004, proxyPort: 6004, subdomain: "phi4.colorfulmoves.com" },
  { route: "gpt35", name: "GPT-3.5 Turbo", sourcePort: 5005, proxyPort: 6005, subdomain: "gpt35.colorfulmoves.com" },
  { route: "openchat", name: "OpenChat", sourcePort: 5006, proxyPort: 6006, subdomain: "openchat.colorfulmoves.com" },
  { route: "gemini", name: "Gemini", sourcePort: 5007, proxyPort: 6007, subdomain: "gemini.colorfulmoves.com" },
  { route: "bard", name: "Bard", sourcePort: 5008, proxyPort: 6008, subdomain: "bard.colorfulmoves.com" },
  { route: "claude", name: "Claude", sourcePort: 5009, proxyPort: 6009, subdomain: "claude.colorfulmoves.com" },
  { route: "deepseek", name: "DeepSeek", sourcePort: 5010, proxyPort: 6010, subdomain: "deepseek.colorfulmoves.com" },
  { route: "grok", name: "Grok", sourcePort: 5011, proxyPort: 6011, subdomain: "grok.colorfulmoves.com" },
  { route: "gpt4", name: "GPT-4", sourcePort: 5012, proxyPort: 6012, subdomain: "gpt4.colorfulmoves.com" },
  { route: "claude2", name: "Claude 2", sourcePort: 5013, proxyPort: 6013, subdomain: "claude2.colorfulmoves.com" },
  { route: "openassistant", name: "OpenAssistant", sourcePort: 5014, proxyPort: 6014, subdomain: "openassistant.colorfulmoves.com" },
  { route: "llama3", name: "LLaMA 3", sourcePort: 5015, proxyPort: 6015, subdomain: "llama3.colorfulmoves.com" },
  { route: "mistral2", name: "Mistral 2", sourcePort: 5016, proxyPort: 6016, subdomain: "mistral2.colorfulmoves.com" },
  { route: "gptneox", name: "GPT-NeoX", sourcePort: 5017, proxyPort: 6017, subdomain: "gptneox.colorfulmoves.com" },
  { route: "falcon", name: "Falcon", sourcePort: 5018, proxyPort: 6018, subdomain: "falcon.colorfulmoves.com" },
  { route: "vicuna", name: "Vicuna", sourcePort: 5019, proxyPort: 6019, subdomain: "vicuna.colorfulmoves.com" },
  { route: "chatglm", name: "ChatGLM", sourcePort: 5020, proxyPort: 6020, subdomain: "chatglm.colorfulmoves.com" },
  { route: "cerebras", name: "Cerebras", sourcePort: 5021, proxyPort: 6021, subdomain: "cerebras.colorfulmoves.com" },
  { route: "starcoder", name: "StarCoder", sourcePort: 5022, proxyPort: 6022, subdomain: "starcoder.colorfulmoves.com" },
  { route: "baichuan", name: "Baichuan", sourcePort: 5023, proxyPort: 6023, subdomain: "baichuan.colorfulmoves.com" },
  { route: "rwkv", name: "RWKV", sourcePort: 5024, proxyPort: 6024, subdomain: "rwkv.colorfulmoves.com" },
  { route: "instructgpt", name: "InstructGPT", sourcePort: 5025, proxyPort: 6025, subdomain: "instructgpt.colorfulmoves.com" },
  { route: "replit", name: "Replit", sourcePort: 5026, proxyPort: 6026, subdomain: "replit.colorfulmoves.com" },
  { route: "bloom", name: "Bloom", sourcePort: 5027, proxyPort: 6027, subdomain: "bloom.colorfulmoves.com" },
  { route: "evolvemedium", name: "EvolveMedium", sourcePort: 5028, proxyPort: 6028, subdomain: "evolvemedium.colorfulmoves.com" },
  { route: "optimum", name: "Optimum", sourcePort: 5029, proxyPort: 6029, subdomain: "optimum.colorfulmoves.com" },
  { route: "t5", name: "T5", sourcePort: 5030, proxyPort: 6030, subdomain: "t5.colorfulmoves.com" },
  { route: "codellama", name: "CodeLLaMA", sourcePort: 5031, proxyPort: 6031, subdomain: "codellama.colorfulmoves.com" },
  { route: "chatcode", name: "ChatCode", sourcePort: 5032, proxyPort: 6032, subdomain: "chatcode.colorfulmoves.com" },
  { route: "rex", name: "Rex", sourcePort: 5033, proxyPort: 6033, subdomain: "rex.colorfulmoves.com" },
  { route: "mpt", name: "MPT", sourcePort: 5034, proxyPort: 6034, subdomain: "mpt.colorfulmoves.com" },
  { route: "ultralm", name: "UltraLM", sourcePort: 5035, proxyPort: 6035, subdomain: "ultralm.colorfulmoves.com" },
  { route: "gptj", name: "GPT-J", sourcePort: 5036, proxyPort: 6036, subdomain: "gptj.colorfulmoves.com" },
  { route: "openllama", name: "OpenLLaMA", sourcePort: 5037, proxyPort: 6037, subdomain: "openllama.colorfulmoves.com" },
  { route: "polyglot", name: "Polyglot", sourcePort: 5038, proxyPort: 6038, subdomain: "polyglot.colorfulmoves.com" },
  { route: "wizardlm", name: "WizardLM", sourcePort: 5039, proxyPort: 6039, subdomain: "wizardlm.colorfulmoves.com" },
  { route: "future1", name: "Future1", sourcePort: 5040, proxyPort: 6040, subdomain: "future1.colorfulmoves.com" },
  { route: "model21", name: "Model 21", sourcePort: 5041, proxyPort: 6041, subdomain: "model21.colorfulmoves.com" },
  { route: "model22", name: "Model 22", sourcePort: 5042, proxyPort: 6042, subdomain: "model22.colorfulmoves.com" },
  { route: "model23", name: "Model 23", sourcePort: 5043, proxyPort: 6043, subdomain: "model23.colorfulmoves.com" },
  { route: "model24", name: "Model 24", sourcePort: 5044, proxyPort: 6044, subdomain: "model24.colorfulmoves.com" },
  { route: "model25", name: "Model 25", sourcePort: 5045, proxyPort: 6045, subdomain: "model25.colorfulmoves.com" },
  { route: "model26", name: "Model 26", sourcePort: 5046, proxyPort: 6046, subdomain: "model26.colorfulmoves.com" },
  { route: "model27", name: "Model 27", sourcePort: 5047, proxyPort: 6047, subdomain: "model27.colorfulmoves.com" },
  { route: "model28", name: "Model 28", sourcePort: 5048, proxyPort: 6048, subdomain: "model28.colorfulmoves.com" },
  { route: "model29", name: "Model 29", sourcePort: 5049, proxyPort: 6049, subdomain: "model29.colorfulmoves.com" },
  { route: "model30", name: "Model 30", sourcePort: 5050, proxyPort: 6050, subdomain: "model30.colorfulmoves.com" },
  { route: "model31", name: "Model 31", sourcePort: 5051, proxyPort: 6051, subdomain: "model31.colorfulmoves.com" },
  { route: "model32", name: "Model 32", sourcePort: 5052, proxyPort: 6052, subdomain: "model32.colorfulmoves.com" },
  { route: "model33", name: "Model 33", sourcePort: 5053, proxyPort: 6053, subdomain: "model33.colorfulmoves.com" },
  { route: "model34", name: "Model 34", sourcePort: 5054, proxyPort: 6054, subdomain: "model34.colorfulmoves.com" },
  { route: "model35", name: "Model 35", sourcePort: 5055, proxyPort: 6055, subdomain: "model35.colorfulmoves.com" },
  { route: "model36", name: "Model 36", sourcePort: 5056, proxyPort: 6056, subdomain: "model36.colorfulmoves.com" },
  { route: "model37", name: "Model 37", sourcePort: 5057, proxyPort: 6057, subdomain: "model37.colorfulmoves.com" },
  { route: "model38", name: "Model 38", sourcePort: 5058, proxyPort: 6058, subdomain: "model38.colorfulmoves.com" },
  { route: "model39", name: "Model 39", sourcePort: 5059, proxyPort: 6059, subdomain: "model39.colorfulmoves.com" },
  { route: "model40", name: "Model 40", sourcePort: 5060, proxyPort: 6060, subdomain: "model40.colorfulmoves.com" },
];

// Helper to spawn child processes
function runScript(scriptPath, args = [], name) {
  const proc = fork(scriptPath, args, { stdio: 'inherit' });
  proc.on('exit', (code) => {
    console.log(`⚠️ ${name} exited with code ${code}`);
  });
}

models.forEach((model) => {
  runScript(path.join(__dirname, 'model-server-template.js'),
    [model.sourcePort, model.name, model.subdomain],
    `${model.name} Server`);

  runScript(path.join(__dirname, 'proxy-server-template.js'),
    [model.proxyPort, model.sourcePort, model.name, model.subdomain],
    `${model.name} Proxy`);
});
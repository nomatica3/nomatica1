#!/bin/bash
set -e

# Models list (name=image/model)
MODELS=(
"gemma:gemma:7b"
"llama:llama2:13b"
"mistral:mistral:7b"
"phi4:phi"
"gpt4:gpt-4"
"gpt35:gpt-3.5-turbo"
"openchat:openchat:7b"
"gemini:gemma:7b"
"bard:llama2:13b"
"claude:claude2:13b"
"deepseek:deepseek-coder:7b"
"grok:llama2:13b"
"claude2:claude2:13b"
"openassistant:openhermes:7b"
"llama3:llama3:8b"
"mistral2:mistral:7b-v0.2"
"gptneox:gpt-neox:20b"
"falcon:falcon:7b"
"vicuna:vicuna:13b"
"chatglm:chatglm:6b"
"cerebras:cerebras-gpt:7b"
"starcoder:starcoder2:15b"
"baichuan:baichuan2:7b"
"rwkv:rwkv:7b"
"instructgpt:gpt-3.5-turbo-instruct"
"replit:replit-code:3b"
"bloom:bloom:7b"
"evolvemedium:evolvemedium:7b"
"optimum:optimum:7b"
"t5:flan-t5:xl"
"codellama:codellama:7b"
"chatcode:deepseek-coder:7b"
"rex:rex:7b"
"mpt:mpt:7b"
"ultralm:ultralm:13b"
"gptj:gpt4all-j:13b"
"openllama:openllama:7b"
"polyglot:polyglot:13b"
"wizardlm:wizardlm:7b"
"futuremodel1:llama3:8b"
"cloud:cloud-orchestrator:latest"
"llm:llm:latest"
)

BASE_PORT=5001
PORT=$BASE_PORT

for entry in "${MODELS[@]}"; do
name="${entry%%:*}" # before first colon → container name
model="${entry#*:}" # after first colon
container_name="ollama_$name"

if docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"; then
echo "⏭️Skipping $name (already exists at port $PORT)"
else
echo "🚀 Starting $name on port $PORT (model=$model)..."
docker run -d \
--name "$container_name" \
-p "$PORT:11434" \
ollama/ollama:latest serve "$model"
fi

PORT=$((PORT+1))
done

echo "✅ All models processed (starting at port $BASE_PORT)"
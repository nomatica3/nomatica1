const modelMap = {
    "gpt-3.5-turbo": 5000,
    "gemma": 5001,
    "llama": 5002,
    "openchat": 5003,
    "mistral": 5004,
    "claude": 5005,
    "bard": 5006,
    "deepseek": 5007,
    "deepseek-2": 5008,
    "gpt-4": 5010,
    "gpt-4-32k": 5011,
    "gpt-4o": 5012,
    "gpt-4o-mini": 5013,
    "gpt-4-turbo": 5014,
    "gpt-4-turbo-32k": 5015,
};

async function updateModel(model, update) {
    const res = await fetch(`http://localhost:${modelMap[model]}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    });
    return res.json();
}
    async function updateAll(update) {
        for (const model in modelMap) {
            await updateModel(model, update);
        }

   }

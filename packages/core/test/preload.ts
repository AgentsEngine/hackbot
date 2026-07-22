import path from "path"

process.env.HACKBOT_DB = ":memory:"
process.env.HACKBOT_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.HACKBOT_DISABLE_MODELS_FETCH = "true"

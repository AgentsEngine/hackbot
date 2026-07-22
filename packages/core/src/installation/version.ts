declare global {
  const HACKBOT_VERSION: string
  const HACKBOT_CHANNEL: string
}

export const InstallationVersion = typeof HACKBOT_VERSION === "string" ? HACKBOT_VERSION : "local"
export const InstallationChannel = typeof HACKBOT_CHANNEL === "string" ? HACKBOT_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"

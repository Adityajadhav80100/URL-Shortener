export const baseUrl = import.meta.env.VITE_APP_URL || ''

export const getShortLinkUrl = (shortPath) =>
  `${baseUrl.replace(/\/$/, '')}/${shortPath}`

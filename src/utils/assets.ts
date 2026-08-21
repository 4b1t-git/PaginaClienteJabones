export const publicAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const migrateLegacyImageUrl = (url: string) =>
  url.startsWith('/images/') ? publicAssetUrl(url) : url

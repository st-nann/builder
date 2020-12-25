export const ENV: { [key: string]: string } = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  TITLE: process.env.VUE_APP_TITLE || 'Builder',
  TOKEN_IMAGE_STORAG: process.env.VUE_APP_TOKEN_IMAGE_STORAGE || '',
  BASE_URL_STORAGE: process.env.VUE_APP_BASE_URL || '',
  ECOM_CMS_API_URL_STORAGE: process.env.VUE_APP_ECOM_CMS_API || 'https://stg-ecom.pams.ai/api/backend',
  ADMIN_USERNAME_STORAGE: process.env.VUE_APP_ADMIN_USERNAME || 'admin@admin.com',
  ADMIN_PASSWORD_STORAGE: process.env.VUE_APP_ADMIN_PASSWORD || '12345678'
}

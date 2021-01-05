export const ENV: { [key: string]: string } = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  TITLE: process.env.VUE_APP_TITLE || 'Builder',
  BASE_URL_PERSONALIZE: process.env.VUE_APP_BASE_URL_PERSONALIZE || 'https://stg-cms.pams.ai/api',
  BASE_URL_STORAGE: process.env.VUE_APP_BASE_URL_STORAGE || 'https://stg-ecom.pams.ai/api/backend',
  ADMIN_USERNAME_STORAGE: process.env.VUE_APP_ADMIN_USERNAME || 'admin@admin.com',
  ADMIN_PASSWORD_STORAGE: process.env.VUE_APP_ADMIN_PASSWORD || '12345678'
}

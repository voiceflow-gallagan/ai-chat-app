module.exports = {
  apps: [
    {
      name: 'chat-gpt',
      script: 'yarn next start',
      env_production: {
        PORT: 3219,
        NODE_ENV: 'production',
      },
      watch: false,
    },
  ],
}

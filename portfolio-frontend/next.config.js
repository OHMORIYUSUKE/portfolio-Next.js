const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  env: {
    baseUrl: dev
      ? 'http://localhost:3000'
      : 'https://portfolio-puce-beta.vercel.app',
    MKEY: process.env.MKEY,
  },
};

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  env: {
    baseUrl: dev
      ? 'http://localhost:3000'
      : 'https://portfolio-8vm20n8w5-ohmoriyusuke.vercel.app',
    MKEY: process.env.MKEY,
  },
};

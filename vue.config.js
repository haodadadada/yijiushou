module.exports = {
  chainWebpack: (config) => {
    // 排除 /pages/bind 文件夹
    config.module.rule('exclude')
      .test(/\/pages\/bind\//)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end();
  }
};

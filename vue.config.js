// @ 表示src目录
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@':path.resolve('src'),
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store'
      }
    }
  }
}

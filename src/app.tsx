import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import { server, port, protocol } from './static-name/server'
import promiseApi from './utils/promiseApi'
import './app.scss'
import {addSumMessageNum} from './actions/chatListMessageNum'
import './custom-variables.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  componentWillMount(){
    promiseApi(Taro.login)().then(loginResult => {
      if (loginResult.code) {
          Taro.connectSocket({
              url: `wss://${server}:${port}`
          }).then(task => {
              task.onOpen(function () {
                  task.send({
                      data: loginResult.code
                  })
              })
              task.onMessage((msg) => {
                  const res = JSON.parse(msg.data)
                  if (res.status === 'success') {
                       const id = res.chatInfo[0].id
                       let pages=Taro.getCurrentPages()
                       let currentPage:Taro.Page
                       if(pages.length){
                          currentPage = pages[pages.length-1]
                          const pagePath=currentPage.route
                          if(pagePath !== 'pages/chat-info/chat-info'){
                            store.dispatch(addSumMessageNum(id))
                          }
                       }
                  }
              })
              task.onError(function () {
                  console.log('onError')
              })
              task.onClose(function (e) {
                  console.log('chatListWebSocketClose')
              })
          })
      }
  })
  }
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/sort/sort',
      'pages/release-goods/release-goods',
      'pages/chat/chat',
      'pages/person/person',
      'pages/confirm-order/confirm-order',
      'pages/trading/trading',
      'pages/search/search',
      'pages/not-found/not-found',
      'pages/goods-info/goods-info',
      'pages/trade-success/trade-success',
      'pages/chat-info/chat-info',
    ],
    subPackages:[
      {
        root:'packageA',
        name:'packageA',
        pages:[
          'pages/order-status/order-status',
          'pages/recharge/recharge',
          'pages/register/register',
          'pages/show_user_info/show_user_info',
          'pages/care-people/care-people',
          'pages/collect-goods/collect-goods'
        ]
      }
    ],
    preloadRule:{
      'pages/person/person':{
        network:'all',
        packages:['packageA']
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    tabBar: {
      list: [
        { pagePath: 'pages/index/index', text: '首页' },
        { pagePath: 'pages/sort/sort', text: '分类' },
        { pagePath: 'pages/release-goods/release-goods', text: '发布商品' },
        { pagePath: 'pages/chat/chat', text: "聊天" },
        { pagePath: 'pages/person/person', text: "个人中心" },
      ],
      custom: true
    },
    permission:{
      'scope.userLocation': {
        desc: '校园换需要获取您的位置信息用于小程序位置接口的效果展示。'
      }
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'
// function Balance(props) {
//     let [loading, setLoading] = useState(true)
//     let [balance, setBalance] = useState(1888.8)
//     console.log('balance',props.isSessionEffective)
//     console.log('balance',configStore().getState().checkIsAuthorized.isAuthorized)
//     useEffect(() => {
//         setLoading(false)
//         // promiseApi(Taro.checkSession) ().then(()=>{
//         //     this.setState({isSessionEffective:true})
//         // }).catch(()=>{
//         //   this.setState({isSessionEffective:false})
//         // })
//         // promiseApi(Taro.login)().then(loginResult=>{
//         //     if(loginResult.code){
//         //         promiseApi(Taro.request)({
//         //             url: `http://${server}:${port}/getmoney`,
//         //             method: 'GET',
//         //             data: {
//         //               code: loginResult.code
//         //             }
//         //         }).then(res=>{
//         //             console.log(res)
//         //         })
//         //     }
//         // })
//     }, [])
//     return (
//         <Skeleton
//             row={1}
//             rowHeight={60}
//             animate
//             loading={loading}
//         >
//             <View className='balance-container'>
//                 <View className='balance-content-container'>
//                     <Image src={`${CDNWebSite}/icon/user-info/balance.png`} className='balance-image'></Image>
//                     <Text className='balance'>余额:{balance}元</Text>
//                 </View>
//             </View>
//         </Skeleton>
//     )
// }

// export default Taro.memo(Balance)

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
    checkIsAuthorized: {
        isAuthorized: boolean;
    }
}

type PageDispatchProps = {

}

type PageOwnProps = {
    isSessionEffective: boolean;
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Balance {
    props: IProps;
}

@connect(({ checkIsAuthorized }) => ({
    checkIsAuthorized
}), (dispatch) => ({

}))
class Balance extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        balance:0
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.isSessionEffective && this.props.checkIsAuthorized.isAuthorized) {
            promiseApi(Taro.login)().then(loginResult => {
                if (loginResult.code) {
                    promiseApi(Taro.request)({
                        url: `http://${server}:${port}/getmoney`,
                        method: 'GET',
                        data: {
                            code: loginResult.code
                        }
                    }).then(res => {
                        if(res.statusCode===200&&res.data.status==='success'){
                            this.setState({balance:res.data.balance})
                        }   
                    })
                }
            })
        }
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const isLogin = this.props.isSessionEffective && this.props.checkIsAuthorized.isAuthorized
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='balance-container'>
                    <View className='balance-content-container'>
                        <Image src={`${CDNWebSite}/icon/user-info/balance.png`} className='balance-image'></Image>
                        <Text className='balance'>余额:{isLogin ? this.state.balance : '???'}元</Text>
                    </View>
                </View>
            </Skeleton>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Balance as ComponentClass<PageOwnProps, PageState>
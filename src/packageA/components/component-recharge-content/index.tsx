import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { CDNWebSite } from '../../../static-name/web-site'
import { server, port, protocol } from '../../../static-name/server'
import { AtCard,AtInput,AtToast  } from "taro-ui"
import promiseApi from '../../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'

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

}

type PageDispatchProps = {

}

type PageOwnProps = {
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RechargeContent {
    props: IProps;
}

class RechargeContent extends Component {

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
        balance:0,
        loading: true,
        current: -1,
        value: 0,
        isOpened:false
    }
    componentDidMount() {
        promiseApi( Taro.getStorage)({key:'balance'}).then(res=>{
            if(res.data){
                this.setState({ 
                    loading: false,
                    balance:res.data
                 })
            }else{
                this.setState({
                    loading:false
                })
            }
        })
    }
    onClick(current, value) {
        this.setState({
            current: current,
            value: value
        })
    }
    handleChange (value) {
        this.setState({
          value
        })
    }
    confirmPay(){
        promiseApi(Taro.login)().then((loginResult)=>{
            const code=loginResult.code
            if(code){
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/recharge`,
                    method: 'POST',
                    data: {
                        code: loginResult.code,
                        value:this.state.value
                    }
                }).then(res=>{
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        this.setState({isOpened:true},()=>{
                            setTimeout(() => {
                                promiseApi(Taro.navigateBack)()
                            },1200);
                        })
                    }else{
                        this.setState({isOpened:false})
                    }
                })
            }
        })
    }
    render() {
        const current = this.state.current
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='recharge-container'>
                    <View className='balance'>
                        <Image src={`${CDNWebSite}/icon/user-info/balance.png`} className='balance-icon'></Image>
                        <View>当前余额：</View>
                        <View className='balance-content'>{this.state.balance} 元</View>
                    </View>
                    <AtCard
                        note='Tips:请您理性充值,合理消费！'
                        title='请选择充值金额：'
                        isFull
                    >
                        <View className='reacharge-bar-container'>
                            <View className='recharge-bar' onClick={() => { this.onClick(0, 10) }} style={{ backgroundColor: current === 0 ? '#C41A16' : '', color: current === 0 ? '#fff' : '' }}>10元</View>
                            <View className='recharge-bar' onClick={() => { this.onClick(1, 20) }} style={{ backgroundColor: current === 1 ? '#C41A16' : '', color: current === 1 ? '#fff' : '' }}>20元</View>
                            <View className='recharge-bar' onClick={() => { this.onClick(2, 50) }} style={{ backgroundColor: current === 2 ? '#C41A16' : '', color: current === 2 ? '#fff' : '' }}>50元</View>
                            <View className='recharge-bar' onClick={() => { this.onClick(3, 100) }} style={{ backgroundColor: current === 3 ? '#C41A16' : '', color: current === 3 ? '#fff' : '' }}>100元</View>
                            <View className='recharge-bar' onClick={() => { this.onClick(4, 500) }} style={{ backgroundColor: current === 4 ? '#C41A16' : '', color: current === 4 ? '#fff' : '' }}>500元</View>
                            <View className='recharge-bar' onClick={() => { this.onClick(5, '') }} style={{ backgroundColor: current === 5 ? '#C41A16' : '', color: current === 5 ? '#fff' : '' }}>其他金额</View>
                            {this.state.current === 5 ? <AtInput
                                name='value'
                                type='text'
                                title='充值:'
                                placeholder='请输入充值金额'
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                            />:null}
                        </View>
                    </AtCard>

                    <Button className='button' hoverClass='hover' 	hoverStayTime={200} onClick={()=>{this.confirmPay()}}>确认充值({this.state.value})元</Button>
                    <AtToast isOpened={this.state.isOpened} text="充值成功！" icon="check"></AtToast>
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

export default RechargeContent as ComponentClass<PageOwnProps, PageState>
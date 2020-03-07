import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import promiseApi from '../../utils/promiseApi'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
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

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TradeSuccessContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class TradeSuccessContent extends Component {
    constructor(props) {
        super(props)

    }
    onClick(){
        const currentPage = Taro.getCurrentPages().length
        promiseApi(Taro.navigateBack)({
            delta:currentPage
        })
    }
    render() {
        return (
            <View className='trade-success-content'>
                <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/trade-success/wechatpay.png'  className='icon'/>
                <View className='title'>交易完成！</View>
                <View className='btn' onClick={()=>{this.onClick()}} hoverClass='hover'>确认返回</View>
            </View>
        )
    }
}
export default TradeSuccessContent as ComponentClass<PageOwnProps, PageState>
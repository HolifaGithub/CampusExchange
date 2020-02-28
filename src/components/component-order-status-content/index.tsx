import Taro, { PureComponent } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import './index.scss'
import { View,Image } from '@tarojs/components'
import Tag from '../component-tag'

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

interface OrderStatusContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class OrderStatusContent extends PureComponent {

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
        value: '',
    }
    onActionClick() {
        promiseApi(Taro.navigateTo)({
            url: `/pages/search/search?value=${this.state.value}`
        })
    }
    onChange(val) {
        this.setState({ value: val })
    }



    componentWillUnmount() { }

    componentDidShow() {

    }

    componentDidHide() { }

    render() {
        return (
            <View>
                <View className='goods-introduction'>
                    <View className='order-id'>
                        订单编号：3243240324343294
                    </View>
                    <View className='goods-introduction-content'>
                        <Image src={'https://www.xiaoyuanhuan.xyz:3002/img/banner1.png'} className='img'></Image>
                        <View className='introduction'>
                            <View className='title'>dwqldlwq</View>
                            <View className='degree-and-count'>
                                <Tag title={95 + '新'} fontSize={'12px'} />
                                <View className='count'>X {1}</View>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default OrderStatusContent as ComponentClass<PageOwnProps, PageState>
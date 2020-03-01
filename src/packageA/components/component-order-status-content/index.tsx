import Taro, { PureComponent } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import promiseApi from '../../../utils/promiseApi'
import './index.scss'
import { View, Image } from '@tarojs/components'
import Tag from '../../../components/component-tag'

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

interface OrderListReturnDatas {
    orderId: string;
    nameInput: string;
    newAndOldDegree: string;
    topPicSrc: string;
    typeOne: string;
    typeTwo: string;
    typeThree: string;
    goodsNumber: string;
}
type PageOwnProps = {
    datas: OrderListReturnDatas[]
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

    }
    defaultProps = {
        datas: [
            {
                orderId: '',
                nameInput: '',
                newAndOldDegree: '',
                topPicSrc: '',
                typeOne: '',
                typeTwo: '',
                typeThree: '',
                goodsNumber: '',
            }
        ]
    }
    componentWillUnmount() { }

    componentDidShow() {

    }

    componentDidHide() { }
    onClick(orderId) {
        promiseApi(Taro.navigateTo)({
            url: `/pages/goods-info/goods-info?orderId=${orderId}`
        })
    }
    render() {
        return (
            <View>
                {this.props.datas ? (this.props.datas.map((data, index) => {
                    return (
                        <View className='goods-introduction' key={new Date().toString() + index} onClick={() => { this.onClick(data.orderId) }}>
                            <View className='order-id'>
                                订单编号：{data.orderId}
                            </View>
                            <View className='goods-introduction-content'>
                                <Image src={data.topPicSrc.length > 0 ? data.topPicSrc : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'} className='img'></Image>
                                <View className='introduction'>
                                    <View className='title'>{data.nameInput}</View>
                                    <View className='sort'>{data.typeOne}/{data.typeTwo}/{data.typeThree}</View>
                                    <View className='degree-and-count'>
                                        <Tag title={data.newAndOldDegree + '新'} fontSize={'12px'} />
                                        <View className='count'>数量： {data.goodsNumber}</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })) : null}

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
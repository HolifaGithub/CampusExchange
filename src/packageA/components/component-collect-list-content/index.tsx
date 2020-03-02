import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { CDNWebSite } from '../../../static-name/web-site'
import { server, port, protocol } from '../../../static-name/server'
import { AtAvatar, AtCard, AtInput, AtToast } from "taro-ui"
import Tag from '../../../components/component-tag'
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
interface CollectListDatas {
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
    data: CollectListDatas
}

type PageState = {
    loading: boolean;
    isCollect: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CollectListContent {
    props: IProps;
}

class CollectListContent extends Component {

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
        isCollect: true
    }
    static defaultProps = {
        data: {
            orderId: '',
            nameInput: '',
            newAndOldDegree: '',
            topPicSrc: '',
            typeOne: '',
            typeTwo: '',
            typeThree: '',
            goodsNumber: '',
        }
    }
    componentDidMount() {
        this.setState({
            loading: false
        })
    }
    render() {
        const { orderId,
            nameInput,
            newAndOldDegree,
            topPicSrc,
            typeOne,
            typeTwo,
            typeThree,
            goodsNumber } = this.props.data
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='goods-introduction' onClick={() => {
                    promiseApi(Taro.navigateTo)(
                        { url: `/pages/goods-info/goods-info?orderId=${orderId}` }
                    )
                }}>
                    <View className='order-id'>
                        订单编号：{orderId}
                    </View>
                    <View className='goods-introduction-content'>
                        <Image src={topPicSrc.length > 0 ? topPicSrc : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'} className='img'></Image>
                        <View className='introduction'>
                            <View className='title'>{nameInput}</View>
                            <View className='sort'>{typeOne}/{typeTwo}/{typeThree}</View>
                            <View className='degree-and-count'>
                                <Tag title={newAndOldDegree + '新'} fontSize={'12px'} />
                                <View className='count'>数量： {goodsNumber}</View>
                            </View>
                        </View>
                        <View onClick={(e) => {
                            e.stopPropagation()
                            promiseApi(Taro.login)().then(loginResult => {
                                if (loginResult.code) {
                                    promiseApi(Taro.request)({
                                        url: `${protocol}://${server}:${port}/collect`,
                                        method: 'POST',
                                        data: {
                                            code: loginResult.code,
                                            orderId: orderId
                                        }
                                    }).then(res => {
                                        console.log(res)
                                        if (res.statusCode === 200 && res.data.status === 'success') {
                                            this.setState((prevState: PageState) => {
                                                return {
                                                    isCollect: !prevState.isCollect
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }} hoverClass='hover'>
                            {this.state.isCollect ? (<View className='cared'>
                                <Image src={`${CDNWebSite}/icon/care-people/cared.png`} className='icon'></Image>
                                <View>已收藏</View>
                            </View>) :
                                (<View className='care'>
                                    <Image src={`${CDNWebSite}/icon/care-people/care.png`} className='icon'></Image>
                                    <View>收藏</View>
                                </View>)}
                        </View>
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

export default CollectListContent as ComponentClass<PageOwnProps, PageState>
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
    timer
    componentWillMount() {
        this.timer = setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500);

    }
    componentWillUnmount() {
        clearTimeout(this.timer)
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

            <View className='goods-introduction' onClick={() => {
                promiseApi(Taro.navigateTo)(
                    { url: `/pages/goods-info/goods-info?orderId=${orderId}` }
                )
            }}>
                <Skeleton
                row={1}
                rowHeight={40}
                animate
                loading={this.state.loading}
                >
                <View className='order-id'>
                    订单编号：{orderId}
                </View>
                </Skeleton>

                <Skeleton
                    avatar
                    avatarSize={120}
                    action
                    row={3}
                    rowHeight={30}
                    animate
                    loading={this.state.loading}
                >
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
                </Skeleton>
            </View>
        )
    }
}

export default CollectListContent as ComponentClass<PageOwnProps, PageState>
import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { CDNWebSite } from '../../../static-name/web-site'
import { server, port, protocol } from '../../../static-name/server'
import { AtAvatar, AtCard, AtInput, AtToast } from "taro-ui"
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

interface CarePeopleContent {
    props: IProps;
}

class CarePeopleContent extends Component {

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
    }
    componentDidMount() {
        this.setState({
            loading: false
        })
    }
    render() {
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='care-people-content'>
                    <AtAvatar circle image='https://www.xiaoyuanhuan.xyz:3002/img/banner1.png' size='large'></AtAvatar>
                    <View className='content'>
                        <View className='nick-name'>Holifa</View>
                        <View>计算机科学与网络工程学院</View>
                        <View>网络161班</View>
                    </View> 
                    {/* <View className='cared'>
                        <Image src={`${CDNWebSite}/icon/care-people/cared.png`} className='icon'></Image>
                        <View>已关注</View>
                    </View> */}
                    <View className='care'>
                        <Image src={`${CDNWebSite}/icon/care-people/care.png`} className='icon'></Image>
                        <View>关注</View>
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

export default CarePeopleContent as ComponentClass<PageOwnProps, PageState>
import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {
    checkIsNeedRelogin: {
        isNeedRelogin: boolean;
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

@connect(({ checkIsNeedRelogin }) => ({
    checkIsNeedRelogin
}), (dispatch) => ({

}))
class Balance extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        balance: 0
    }
    fetchBalanceInfo() {
        promiseApi(Taro.login)().then(loginResult => {
            if (loginResult.code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/getmoney`,
                    method: 'GET',
                    data: {
                        code: loginResult.code
                    }
                }).then(res => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        promiseApi(Taro.setStorage)({
                            key:'balance',
                            data:res.data.balance
                        })
                        this.setState({ balance: res.data.balance })
                    }
                })
            }
        })
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin) {
            this.fetchBalanceInfo()
        }
    }

    componentWillUnmount() { }

    componentDidShow() {
        if (this.props.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin) {
            this.fetchBalanceInfo()
          }
     }

    componentDidHide() { }

    render() {
        const isLogin = this.props.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin
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
export default Balance as ComponentClass<PageOwnProps, PageState>
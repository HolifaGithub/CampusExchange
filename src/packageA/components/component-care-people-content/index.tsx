import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { CDNWebSite } from '../../../static-name/web-site'
import { server, port, protocol } from '../../../static-name/server'
import { AtAvatar, AtCard, AtInput, AtToast } from "taro-ui"
import promiseApi from '../../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}
interface CareListDatas {
    nickName: string;
    avatarUrl: string;
    collage: string;
    userClass: string;
    concernedOrderId: string;
}
type PageOwnProps = {
    data: CareListDatas
}

type PageState = {
    loading: boolean;
    isCare: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CarePeopleContent {
    props: IProps;
}

class CarePeopleContent extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        isCare: true
    }
    static defaultProps = {
        data: {
            nickName: '',
            avatarUrl: '',
            collage: '',
            userClass: '',
            concernedOrderId: ''
        }
    }
    onClick(concernedOrderId) {
        promiseApi(Taro.login)().then(loginResult => {
            if (loginResult.code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/care`,
                    method: 'POST',
                    data: {
                        code: loginResult.code,
                        orderId: concernedOrderId
                    }
                }).then(res => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        this.setState((prevState: PageState) => {
                            return {
                                isCare: !prevState.isCare
                            }
                        })
                    }
                })
            }
        })
    }
    timer
    componentWillMount() {
        this.timer = setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 500)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        const { nickName, avatarUrl, collage, userClass, concernedOrderId } = this.props.data
        return (

            <View className='care-people-content-container'>
                <Skeleton
                    row={3}
                    avatar
                    avatarSize={120}
                    rowHeight={20}
                    action
                    animate
                    loading={this.state.loading}
                >
                    <View className='care-people-content'>
                        <AtAvatar circle image={avatarUrl} size='large'></AtAvatar>
                        <View className='content'>
                            <View className='nick-name'>{nickName}</View>
                            <View>{collage}</View>
                            <View>{userClass}</View>
                        </View>
                        <View onClick={() => { this.onClick(concernedOrderId) }} hoverClass='hover'>
                            {this.state.isCare ? (<View className='cared'>
                                <Image src={`${CDNWebSite}/icon/care-people/cared.png`} className='icon'></Image>
                                <View>已关注</View>
                            </View>) :
                                (<View className='care'>
                                    <Image src={`${CDNWebSite}/icon/care-people/care.png`} className='icon'></Image>
                                    <View>关注</View>
                                </View>)}
                        </View>
                    </View>
                </Skeleton>
            </View >
        )
    }
}

export default CarePeopleContent as ComponentClass<PageOwnProps, PageState>
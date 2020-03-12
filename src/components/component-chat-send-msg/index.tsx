import Taro, { PureComponent } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import { View, Input} from '@tarojs/components'
import { server, port, protocol } from '../../static-name/server'
import promiseApi from '../../utils/promiseApi'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}


type PageOwnProps = {
    orderId:string;
    otherOpenId:string;
}

type PageState = {
    value: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatSendMsg {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ChatSendMsg extends PureComponent {
    constructor(props) {
        super(props)
    }
    state = {
        value: '',
    }
    static defaultProps={
        orderId:'',
        otherOpenId:''
    }
    onClick(orderId,otherOpenId) {
        promiseApi(Taro.login)().then((loginResult) => {
            const code = loginResult.code
            if (code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/sendchatinfo`,
                    method: 'POST',
                    data: {
                        code: code,
                        orderId: orderId,
                        value: this.state.value,
                        otherOpenId:otherOpenId
                    }
                }).then((res) => {
                    if (res.statusCode !== 200 || res.data.status !== 'success') {         
                        promiseApi(Taro.showToast)({ title: '发送失败！' })
                    }
                    this.setState({value:''})
                })
            }
        })
    }
  render() {
      const {orderId,otherOpenId}= this.props
        return (
            <View className='send'>
            <Input placeholder='想跟TA说点什么呢' className='input' placeholderClass='placeholder' value={this.state.value} onInput={(event) => {
                this.setState({ value: event.detail.value })
            }}></Input>
            <View className='send-btn' hoverClass='hover' onClick={() => { this.onClick(orderId,otherOpenId) }}>发送</View>
        </View>
        )
    }
}
export default ChatSendMsg as ComponentClass<PageOwnProps, PageState>
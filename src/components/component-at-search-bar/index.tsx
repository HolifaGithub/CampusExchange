import Taro, { PureComponent } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { AtSearchBar } from 'taro-ui'
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
    value: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface AtSearchBarComponent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class AtSearchBarComponent extends PureComponent {
    constructor(props) {
        super(props)
    }
    state = {
        value: '',
    }
    onActionClick() {
        const searchStart = 'nameInput'
        promiseApi(Taro.navigateTo)({
            url: `/pages/search/search?value=${this.state.value}&&searchStart=${searchStart}`
        })
    }
    onChange(val) {
        this.setState({ value: val })
    }
  render() {
        return (
            <AtSearchBar
                actionName='搜索'
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
            />
        )
    }
}
export default AtSearchBarComponent as ComponentClass<PageOwnProps, PageState>
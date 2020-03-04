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
        const searchStart='nameInput'
        promiseApi(Taro.navigateTo)({
            url:`/pages/search/search?value=${this.state.value}&&searchStart=${searchStart}`
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
                    <AtSearchBar
                        actionName='搜索'
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default AtSearchBarComponent as ComponentClass<PageOwnProps, PageState>
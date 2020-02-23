import Taro from '@tarojs/taro'
function getSystemInfo(){
    let systemInfo = Taro.getSystemInfoSync()
    // 状态栏的高度
    let statusHeight = systemInfo.statusBarHeight
    // 导航栏的高度
    let navigationHeight = 44
    // window的宽度
    let windowWidth = systemInfo.windowWidth 
    // window的高度
    let windowHeight = systemInfo.windowHeight
    // 屏幕的高度
    let screentHeight = systemInfo.screenHeight 
    // 底部tabBar的高度
    let tabBarHeight = screentHeight - windowHeight-statusHeight
    return {
        statusHeight,
        navigationHeight,
        windowWidth,
        windowHeight,
        screentHeight,
        tabBarHeight
    }
}

export default getSystemInfo
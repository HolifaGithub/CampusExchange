import Taro from '@tarojs/taro'
import QQMapWX from './qqmap-wx-jssdk.min.js'

function getLocation() {
    return Taro.getLocation({
        type: 'gcj02'
    }).then((res) => {
        return new Promise((resolve, reject) => {
            const latitude = res.latitude
            const longitude = res.longitude
            if (latitude && longitude) {
                let qqmapsdk = new QQMapWX({
                    key: 'RGWBZ-M7OLF-YKNJW-NAKSL-35SBS-JRFED' // 必填
                })
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude,
                        longitude
                    },
                    success(res) {
                        if (res.status === 0 && res.message === 'query ok') {
                            resolve(res)
                        } else {
                            reject('获取用户位置失败')
                        }
                    }
                })
            }
        })
    })
}

export default getLocation
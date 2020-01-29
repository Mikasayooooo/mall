import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { getSetting, openSetting, chooseAddress, showModal, showToast, login } from '../../utils/asyncWX.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 获取用户信息
    async handleGetUserInfo(e) {
        try {
            console.log(e);
            // 1 获取用户信息
            const { encryptedData, rawData, signature, iv } = e.detail;
            // 2 获取小程序登录成功后的code
            const { code } = await login();

            const { loginParams } = { encryptedData, rawData, signature, iv };
            //  3 发送请求 获取用户的token
            const token = await request({ url: '/users/wxlogin', data: loginParams, methods: "post" });
            console.log(token);
            // 4 把token存入缓存中 同时跳转回上一个页面
            wx.setStorageSync("token", token);
            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error);

        }




    }

})
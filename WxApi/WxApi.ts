import { Task } from "../Utils/Utils";

export class WxApi {
    public static Login(): Task<string> {
        let task = new Task<string>((task) => {
            wx.login({
                success: (res) => {
                    task.Continue(res.code);
                }
            })
        }, true);
        return task;
    }

    public static GetCity() {
        const key = 'KCLBZ-7OHWW-KK7RT-R4O7E-5NSBH-ASBV7'; // 使用在腾讯位置服务申请的key
        const referer = '儿童早期发展评测'; // 调用插件的app的名称
        const hotCitys = ''; // 用户自定义的的热门城市
        wx.navigateTo({
            url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
        })
        let citySelector = requirePlugin('citySelector');
        console.log(citySelector);
        let a = citySelector.getCity();
        console.log(a);
        return a;
    }
}
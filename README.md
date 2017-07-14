# passInput

>密码  验证码输入插件

## Build Setup

``` bash
# 使用方法
var passInput = new PassInput({
    selector: '.passInput_modal',   //挂载位置
    phone: 15711998462,             //发送验证码的手机号
    password: false,                //input类型
    maxLength: 4,                   //最大位数
    title: '提示文本',                //标题文本
    timing: 60,                       //倒计时时间  单位为秒
    sendCodeCallback:function () {  //发送验证码回调函数
        console.log('发送验证码')
    },
    OKCallback:function (code) {    //验证码输入完毕回掉
        console.log('验证码输入完毕:',code);
        console.log('real_str:',passInput.real_str)
    }
});
passInput.real_str; //获取input值
passInput.close();  //关闭
passInput.hideErr();  //关闭错误信息方法
passInput.setTime();    //发送验证码倒计时方法
passInput.showErr('同一个微信号只能注册一个账号')  //打开错误信息方法
```


(function (win) {
    function PassInput(ops){
        this.ops = {
            selector: ops.selector || 'passInput',
            maxLength: ops.maxLength || 4,
            password: ops.password || true,
            title: ops.title || "提示",
            phone: ops.phone || false,
            timing: ops.timing || 60,
            sendCodeCallback: ops.sendCodeCallback || false,
            OKCallback: ops.OKCallback || false
        };
        this.init();
    }
    PassInput.prototype = {
        constructor: PassInput,
        real_str: '',
        init: function () {
            this.template();
            this.getEl();
            this.setText();
            this.setInputHeight();
            this.bindEvent();
        },
        getEl:function () {
            this.timing = this.ops.timing;
            this.$inputBoxContainer = $(this.ops.selector).find('.inputBoxContainer');
            this.$title = $(this.ops.selector).find('.title');
            this.$realInput = $(this.ops.selector).find('.realInput');
            this.bogusInputArr =  $(this.ops.selector).find('.bogusInput input');
            this.$phoneBox = $(this.ops.selector).find('.phoneBox');
            this.$phone = $(this.ops.selector).find('.phone');
            this.$codeBtn = $(this.ops.selector).find('.codeBtn');
            this.$err = $(this.ops.selector).find('.err');
            this.$close = $(this.ops.selector).find('.close');
        },
        template: function () {
            var inputType = this.ops.password == true ? 'password' : 'number';
            var input = '<input type='+ inputType +' disabled/>';
            var inputHtml = '';
            for (var i = 0; i < this.ops.maxLength; i++){
                inputHtml += input
            }
            var html = '<div class="passInput_modal"> <div class="wrap"> <span class="close">×</span> <div class="title"></div> <div class="phoneBox clearFix"> <div class="phone">__</div> <div class="codeBtn">发送验证码</div> </div> <div class="inputBoxContainer" id="inputBoxContainer"> <input type="text" class="realInput"/> <div class="bogusInput"> '+ inputHtml +' </div> </div> <div class="err">验证码错误，请重新输入</div> </div> </div>'
            $('body').append(html);
        },
        setText: function () {
            this.$title.html(this.ops.title);
            if(this.ops.phone){
                this.$phone.html(this.ops.phone);
                this.$phoneBox.show();
            }
        },
        close:function () {
            $(this.ops.selector).remove();
        },
        hideErr:function () {
            this.$err.hide();
        },
        showErr: function (msg) {
            if(msg){
                this.$err.html(msg);
            }
            this.$err.show();
        },
        setTime:function () {
            //this.hideErr();
            if(this.timing === this.ops.timing){
                this.ops.sendCodeCallback();
            }
            if (this.timing === 0) {
                this.$codeBtn.text('重发');
                this.timing = this.ops.timing;
                return;
            } else {
                this.$codeBtn.text(this.timing + 's');
                this.timing--;
            }
            setTimeout(function () {
                this.setTime()
            }.bind(this),100);
        },
        setInputHeight: function () {
            var height = this.$inputBoxContainer.find('.bogusInput input').width() + 'px';
            this.$inputBoxContainer.height(height)
        },
        setValue:function(){
            var value = this.$realInput.val().replace(/\D/g,"");
            this.real_str = value;
            for(var i = 0 ; i < this.ops.maxLength ; i++){
                this.bogusInputArr.eq(i).val(this.real_str[i]?this.real_str[i]:"");
            }
            if(this.real_str.length >= this.ops.maxLength){
                this.real_str = this.real_str.substring(0,this.ops.maxLength);
                this.$realInput.val(this.real_str);
                this.ops.OKCallback(this.real_str);
            }
        },
        bindEvent:function () {
            var self = this;
            self.$realInput.keyup(function () {
                self.setValue();
            });
            self.$codeBtn.click(function () {
                if(self.timing === self.ops.timing){
                    self.setTime();
                }
            });
            self.$close.click(function () {
                self.close();
            })
        }
    };
    win.PassInput = PassInput;
})(window);
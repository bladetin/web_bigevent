$(function(){
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui获取form对象
    var form = layui.form
    // 从layui获取layer对象
    var layer = layui.layer

    // 验证密码，验证注册确认密码
    form.verify({
        'pwd':[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   value值是形参，其值就是再次确认密码框input的值
        'repwd': function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if(pwd != value){
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()

        // POST 请求
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}

        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('注册成功！')
            layer.msg('注册成功！')

            // 模拟点击登录
            $('#link_login').click()
            
        })
    })


    // 监听登录提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()

        
       
        // POST 请求
        // 手动拼接
        // var data = {username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()}
        var data = $('#form_login').serialize()

        $.post('/api/login',data,function(res){
            if(res.status !== 0){
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('注册成功！')
            layer.msg('登录成功！')

            // token是登录成功后返回的东西
            localStorage.setItem('token',res.token)
            
            // 跳转
            location.href='/index.html'
        })
    })

})






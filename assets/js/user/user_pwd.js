$(function(){

    var form = layui.form
    var layer = layui.layer

    // 验证密码
    form.verify({
        'pwd':[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   value值是形参，其值就是再次确认密码框input的值
        'repwd': function (value) {
            var pwd = $('.layui-input-block [name=newPwd]').val()
            if(pwd != value){
                return '两次密码不一致！'
            }
        }
    })

    

    // 提交按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        var mydata = $('.layui-form').serialize()
        // console.log(data)
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:mydata,
            success:function(res){
                
                if(res.status!==0){
                    return layer.msg('密码修改失败！')
                }
                
                layer.msg('密码修改成功！请重新登录~')

                $('.layui-form')[0].reset()
                // localStorage.removeItem('token')
                // location.href = '/login.html'
            }
        })

    })

    // 重置按钮
    $('#resetBtn').on('click',function(e){
        e.preventDefault()
        
        $('.layui-input-block input').val('')
    })
    

    
    
    

})



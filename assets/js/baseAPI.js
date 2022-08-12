// 调用$.get()、$.post()和$.ajax()函数的时候
// 首先调用一下 $.ajaxPrefilter()这个函数
// 我们在这个函数中，可以拿到ajax提供的配置对象

$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})
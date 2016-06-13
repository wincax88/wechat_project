/**
 * Created by michael on 6/13/16.
 */

var historyScoreData = {
    310104 : {
        "score2015":529.5,
    },
    310105 : {
        "score2015":503,
    },
    310106 : {
        "score2015":480,
    },
    310107 : {
        "score2015":496,
    },
    310108 : {
        "score2015":520.5,
    },
    310109 : {
        "score2015":521.5,
    },
    310110 : {
        "score2015":526,
    },
    310112 : {
        "score2015":542,
    },
    310113 : {
        "score2015":536.5,
    },
    310114 : {
        "score2015":516,
    },
    310115 : {
        "score2015":548,
    },
    310116 : {
        "score2015":521.5,
    },
    310117 : {
        "score2015":520.5,
    },
    310118 : {
        "score2015":517.5,
    },
    310120 : {
        "score2015":515.5,
    },
    310121 : {
        "score2015":503.5,
    }
};

var fourSchool = {
    1:"上海中学",
    2:"交大附中",
    3:"华师大二附中",
    4:"复旦附中",
};
$(function() {
    $("img.lazy").lazyload({
        threshold : 200,
        effect : "fadeIn"
    });

    var $toastlast;
    // type : success, info, warning, error
    $.showtoast = function(type, title, message) {

        toastr.options.closeButton = true;
        toastr.options.newestOnTop = false;
        toastr.options.progressBar = true;
        toastr.options.positionClass = "toast-top-center";
        toastr.options.preventDuplicates = false;
        toastr.options.showDuration = 300;
        toastr.options.hideDuration = 1000;
        toastr.options.timeOut = 5000;
        toastr.options.extendedTimeOut = 1000;
        toastr.options.showEasing = 'swing';
        toastr.options.hideEasing = 'linear';
        toastr.options.showMethod = "fadeIn";
        toastr.options.hideMethod = "fadeOut";


        var shortCutFunction = type;

        // type : Success, Info, Warning, Error
        var $toast;
        if (shortCutFunction == 'success') {
            $toast = toastr.success(message, title);
        }
        else if (shortCutFunction == 'info') {
            $toast = toastr.info(message, title);
        }
        else if (shortCutFunction == 'warning') {
            $toast = toastr.warning(message, title);
        }
        else if (shortCutFunction == 'error') {
            $toast = toastr.error(message, title);
        }
        $toastlast = $toast;

        if(typeof $toast === 'undefined'){
            return;
        }
        if ($toast.find('#okBtn').length) {
            $toast.delegate('#okBtn', 'click', function () {
                alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                $toast.remove();
            });
        }
        if ($toast.find('#surpriseBtn').length) {
            $toast.delegate('#surpriseBtn', 'click', function () {
                alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
            });
        }
        if ($toast.find('.clear').length) {
            $toast.delegate('.clear', 'click', function () {
                toastr.clear($toast, { force: true });
            });
        }

    };
});

window.gfrom = '2016zhongkaoyuce';
window.onload = function() {
    var from = window.location.search.substr(1);
    //console.log('from : ' + from);
    if (from.length > 0) {
        window.gfrom = from;
    }

    $('.progress .progress-bar').progressbar({display_text: 'fill', use_percentage: false});

    /*
     $('#start-button').bind('click', function () {
     window.open("score.html","replace");
     });
     */

    $('#submit-button').bind('click', function () {
        var distinct = $('select[name="distinct"]').val();
        var score1 = $('input[name="score1"]').val();
        var score2 = $('input[name="score2"]').val();

        // check
        if (distinct == -1) {
            $.showtoast('warning', "提示", '请选择所在区域');
            return false;
        }
        else if (!score1) {
            $.showtoast('warning', "提示", '请输入一模考试成绩');
            return false;
        }
        else if (parseInt(score1) > 600) {
            $.showtoast('warning', "提示", '请输入正确的一模考试成绩');
            return false;
        }
        else if (!score2) {
            $.showtoast('warning', "提示", '请输入二模考试成绩');
            return false;
        }
        else if (parseInt(score2) > 600) {
            $.showtoast('warning', "提示", '请输入正确的二模考试成绩');
            return false;
        }

        var result = (parseInt(score1) + parseInt(score2) + 30) / 2;
        var score2015 = historyScoreData[distinct].score2015;
        var school = 0;
        if (result >= 590) {
            var rand = Math.random() * 10;
            if (distinct == 310110) { // 杨浦区
                var schools = [1, 1, 2, 2, 2, 3, 3, 4, 4, 4];
                school = schools[rand];
            }
            else if (distinct == 310115) { // 浦东新区
                var schools = [1, 2, 3, 3, 3, 3, 3, 3, 3, 4];
                school = schools[rand];
            }
            else if (distinct == 310104) { // 徐汇区
                var schools = [1, 1, 1, 1, 1, 1, 1, 2, 3, 4];
                school = schools[rand];
            }
            else { // 其他区
                rand = Math.random() * 4;
                var schools = [1, 2, 3, 4];
                school = schools[rand];
            }
        }
        else if (result >= score2015) {

        }
        else {

        }
    });
    $('#share-button').bind('click', function () {
        $("#share").removeClass('hidden');
    });
    $('#share').bind('click', function () {
        $("#share").addClass('hidden');
    });

    var shareTitle = '你的同学 Erick 中考成绩击败了90%的学生，敢不敢比一比？';
    var shareDesc = '你的同学 Erick 中考成绩击败了90%的学生，敢不敢比一比？';
    var shareLink = 'www.leo1v1.com';
    var shareImgUrl = 'image/share_icon.jpg';

    var timestamp = $.now();
    var wechat_configure = 'jsapi_ticket='+'' +
        'VMRKASNdQ0JygoLjFV241UMBDE4SlN6__nh2jL4GYkFEWTdz5R1gQeEkZWlNfBsPu1gkAj8GxJYyTMuR2CRAwZLAYK2mbFfIOd5jdWD44OAAQYiAIAEUC'+
        '&noncestr=Wm3WZYTPz0wzccnW&timestamp='+
        timestamp+'&url=localhost:9000/result';
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(wechat_configure);
    var hash = shaObj.getHash("HEX");
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx466da66554d41eef', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
        signature: hash,// 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            console.log("success");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log("cancel");
        }
    });

    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: null, // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            console.log("success");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log("cancel");
        }
    });

    // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQZone({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });



};
//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = "399bf3705cb05e12eb926c15075eb53763253149";
Countly.url = "http://countly.yb1v1.com/"; //or none for default countly cloud

//start pushing function calls to queue
//track sessions automatically
Countly.q.push(['track_sessions']);

//track sessions automatically
Countly.q.push(['track_pageview']);

// countly
(function () {
    var cly = document.createElement('script');
    cly.type = 'text/javascript';
    cly.async = true;
    //enter url of script here
    cly.src = '//cdn.bootcss.com/countly-sdk-web/16.2.0/countly.min.js';
    cly.onload = function () {
        Countly.init();
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(cly, s);
})();

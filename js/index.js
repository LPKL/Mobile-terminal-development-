/**
 * Created by Administrator on 2018/8/30.
 */
// 第一个模块：loading
    let bell=$('#bell')[0],
    say=$('#say')[0],
    bgm=$('#bg_music')[0];
let loading = function () {
    // 进度条加载完毕后，要让loadingBox消失
    let $progressBar = $('.progress .progressBar'),
        $loadingBox = $('.loadingBox');
    //进度条的进度是由项目中图片的加载来决定的
    let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;//记录加载完成的图片个数
    ary.forEach((item)=> {
        let img = new Image();
        //让临时的img去请求图片
        img.src = `images/` + item;
        img.onload = load;

    })
    function load() {
        n++;
        if (n === ary.length) {
            //所有图片加载
            let timer1 = setTimeout(function () {
                $progressBar.css({
                    width: '100%'
                })
                $loadingBox.css({
                    opacity: 0,
                });
            }, 1000)
            let timer2 = setTimeout(function () {
                $loadingBox.hide();
                //第一个块隐藏，执行第二个块相关的内容
                phoneFn();
            }, 2000)

        } else {
            $progressBar.css({
                width: n / ary.length * 100 + '%'
            })
        }
    }
};
loading();
//第二个模块
function phoneFn() {
    let $phoneBox = $('.phoneBox'),//整个第二个块
        $listenBox = $('.listenBox'),//接听的盒子
        $listenBtn = $('.listenBtn'),//接听的按钮
        $noListenBox = $('.no-listenBox'),//挂机对应的盒子
        $noListenBtn = $('.no-listenBtn'),//挂机键
        $timeBox = $('.phoneBox header h4');//语音的时间
        bell.play();//让手机播放
    $listenBtn.tap(function () {
        //点击接听按钮让接听的盒子隐藏：让挂机的盒子升上来
        bell.pause();//让音乐暂停
        say.play();//让语音播放
        // 计时
        let timer3=setInterval(function () {
            var n=Math.ceil(say.currentTime);//获取当前播放时间
            if(n<10){
                n='00:0'+n;
            }else{
                n='00:'+n;
            }
            if(say.ended){//若果播放完成
                clearInterval(timer3);
                phoneEnd();//音乐播放完，让点击挂机键进行的操作执行
            }
            $timeBox.html(n);
        },1000);
        $listenBox.hide();
        $timeBox.show();
        $noListenBox.css({
            transform: 'translateY(0)'
        });
        //给挂机按钮绑定事件
        $noListenBtn.on('touchend', function () {
            say.pause();//点击挂机键让语音暂停
            bgm.play();
            //获取到的h的单位为px
           phoneEnd();
        })
        // 点击挂机键进行的操作
        function phoneEnd() {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            //让phoneBox移下去
            $phoneBox.css({
                transform: `translateY(${h}px)`
            })
            //设置定时器，等待0.8秒触发第三个个模块函数
            setTimeout(function () {
                msgFn();
            }, 1000)
        }
    })
}

//第三个模块msgFn
function msgFn() {
    //让每一个li先都透明，并且下移
    //循环这些li，让这些li轮着升上去，并且显示出来
    let $msgBox = $('.msgBox'),//最外层盒子
        $ul = $msgBox.children('ul'),//ul标签
        $lis = $ul.children('li'),
        $keyboard = $msgBox.find('.keyboard'),
        $textBox = $keyboard.find('.testBox'),//键盘上的文字
        $btn = $keyboard.find('.btn');
    let moveTimer=null;
    let h = 0,
        n = 0;//存储当前要显示的那个元素li的索引
    function move() {
         moveTimer = setInterval(function () {
            if (n == $lis.length) {
                clearInterval(moveTimer);
                return;
            }
            $lis.eq(n).css({
                transform: 'translateY(0)',
                opacity: 1
            });
            //ul向上移动 根据索引，索引大于3  就让ul向上移动
            if (n >= 3) {
                h += $lis[n].clientHeight;
                $ul.css({
                    transform: `translateY(-${h}px)`
                })
            }
            if(n==2){
                $keyboard.css({
                    transform:'translateY(0)'
                })
                clearInterval(moveTimer);
                // 让键盘上的字一个个的跳出来
                setTimeout(function () {
                    inputWord();
                },1600);//此时是异步的
                // inputWord();//此时里面的n就是2
            }
            n++;
        }, 2000);
    };
    move();
    // 麻烦版
    /* $lis.each(function (index, item) {
     setTimeout(function () {
     $(item).css({
     opacity: 1,
     transform: 'translateY(0)'
     })
     if (index >= 3) {
     h += item.clientHeight;
     $ul.css({
     transform: `translateY(-${h}px))`
     })
     }
     if(index==2){
     $keyboard.css({
     transform:'translateY(0)'
     })
     }
     }, index * 2000)
     })*/
    function inputWord() {
        // let str=$lis[n+1].innerText;//要显示的全部内容
        let str=$lis[n].innerText;//要显示的全部内容
        let str2='';//当前要显示的字体内容
        let timer2=null;
        let index=0;//控制当前要出来的那个字
        //现在 我们让字体出现完成之后，在然发送按钮出现
        timer2=setInterval(function () {
            if(index===str.length-1){//说明字已经全部加载完了
                clearInterval(timer2);
                $btn.show();
                $btn.tap(function () {
                    $textBox.html('');
                    h += $lis[n].clientHeight;
                    $ul.css({
                        transform: `translateY(-${h}px)`
                    });
                    $lis.eq(n).css({
                        opacity:1,
                        transform:'translateY(0)'
                    });//让打出来的字直接发送
                    n++;
                    $keyboard.css({
                        transform:'translateY(7rem)'
                    })
                    move();
                });//点击按钮要做的事情 1：清空textBox，2：让键盘下去，3：对话框接着弹
                return;
            }
            str2+=str[index];
            $textBox.html(str2);//将str2的内容放到页面上
            index++
        },500)

    }
}








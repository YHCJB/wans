$(function () { 
    var $imgBox = $('.imgBox')
    var $imgs = $('.imgBox>img')
    var imgWidth = $imgs.eq(0).width()
    // 定义一个变量用于判断图片切换动画是否正在执行
    var set = false
    // 图片轮播的圆点导航
    var lis = $('.minBox>ul>li')
    // 定义一个索引用于更新li圆点样式
    var index = 0
    // li圆点点击事件
    lis.click(function () { 
        lis.removeClass('itmens')
        $(this).addClass('itmens') 
        lunbo($(this).index())
    })
    // 左右箭头点击事件
    $('#zuojiantou').click(function () { 
        lunbo(false)
    })
    $('#yuojiantou').click(function () { 
        lunbo(true)
    })
    // 开启图片轮播定时器
    var timeKey = setInterval(function () { 
        lunbo(true)
    },32000)
    // 鼠标移入和移出显示图片的盒子时关闭与开启定时器
    $('.minBox').hover(function () {
        clearInterval(timeKey)
    }, function () { 
        timeKey = setInterval(function () {
            lunbo(true)
        }, 4000)
    })

    // 滚动条移动事件
    $('#scroll').scroll(function () { 
        var top = $('#scroll').scrollTop()
        console.log(top)
        if (top > 300) {
            $('.leftNav').css({
                position: 'fixed',
                top: 200
            })
            $('.rightNav>li:last').show()
        } else { 
            $('.leftNav').css({
                position: '',
                top: ''
            })
            $('.rightNav>li:last').hide()
        }


        if (top >= 400 && top <= 600) {
            $('.leftNav>li:eq(0)').css({ color: '#3073F4' })
        } else { 
            $('.leftNav>li:eq(0)').css({ color: '' })
        }
        if (top >= 700 && top < 1000) {
            $('.leftNav>li:eq(1)').css({ color: '#3073F4' })
        } else {
            $('.leftNav>li:eq(1)').css({ color: '' })
        }
        if (top >= 1000 && top < 1300) {
            $('.leftNav>li:eq(2)').css({ color: '#3073F4' })
        } else {
            $('.leftNav>li:eq(2)').css({ color: '' })
        }
        if (top >= 1300 && top < 1800) {
            $('.leftNav>li:eq(3)').css({ color: '#3073F4' })
        } else {
            $('.leftNav>li:eq(3)').css({ color: '' })
        }
        if (top >= 1800 && top < 2100) {
            $('.leftNav>li:eq(4)').css({ color: '#3073F4' })
        } else {
            $('.leftNav>li:eq(4)').css({ color: '' })
        }
        if (top >= 2100 && top <= 2400) {
            $('.leftNav>li:eq(5)').css({ color: '#3073F4' })
        } else {
            $('.leftNav>li:eq(5)').css({ color: '' })
        }
    })

    // 左边导航单击事件
    $('.leftNav>li').click(function () { 
        if ($(this).index === 3) {
            $('#scroll').scrollTop(400 + 500 * $(this).index())
        } else { 
            $('#scroll').scrollTop(400 + 400 * $(this).index())
        }
    })
    // 单击回顶部事件
    $('.rightNav>li:last').click(function () { 
        $('#scroll').scrollTop(0)
    })
    
    // 轮播图模块函数
    function lunbo(ind) { 
        // 判断图片切换动画是否正在执行
        if (set) { 
            return
        }
        set = true

        // 获取当前偏移量
        var left = $imgBox.position().left

        // 如果传入的参数为布尔值，则进入下一步判断，否则执行else
        if (typeof ind === 'boolean') {
            // 如果为true则图片往右切换，否则则往左切换
            if (ind) {
                $imgBox.animate({ left: left - imgWidth }, 600, function () {
                    // 动画执行完毕更新全局变量，并判断当前偏移量
                    set = false
                    index++
                    // 调用函数更新li圆点的样式
                    liNav()
                    // 当前偏移量如果等于图片宽度 * 图片列表长度 - 2（因为是10张）
                    // 则代表当前图片为最后一张，则将其改为第二张（因为有2张图片是用来做障眼法的）
                    if ($imgBox.position().left === -imgWidth * ($imgs.length - 2)) {
                        $imgBox.css({ left: 0 })
                    }
                })
            } else {
                $imgBox.animate({ left: left + imgWidth }, 600, function () {
                    set = false
                    index--
                    liNav()
                    // 当前偏移量如果等于0
                    // 则代表当前图片为第一张，则将其改为倒数第二张（因为有2张图片是用来做障眼法的）
                    if ($imgBox.position().left === 0) {
                        $imgBox.css({ left: -imgWidth * ($imgs.length - 2) })
                    }
                })
            }
        } else { 
            // 如果参数 == index，则什么都不做
            if (ind === index) {
                return
            } else {
                // 偏移量 == 图片宽度 * li圆点的索引 + 1（因为有个0）
                $imgBox.animate({ left: -imgWidth * (ind+1) }, 600, function () {
                    // 因为点击li圆点切换的图片不会切换到第一张与最后一张
                    // 所以只需更新变量就可以了
                    set = false
                    index = ind
                })
            }
        }
    }

    // 定义更新li圆点样式的函数
    function liNav() {
        if (index > lis.length - 1) {
            index = 0
        } else if (index < 0) { 
            index = 7
        }
        $(lis).removeClass('itmens')
        $(lis[index]).addClass('itmens')
    }
})
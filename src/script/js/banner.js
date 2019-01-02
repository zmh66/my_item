;
(function(window, $) {
    $.fn.extend({
        banner: function(data) {
            var that = this,
                main = null,
                start = null,
                stop = null,
                init = null,
                prev = null,
                next = null,
                timer = null,
                check = null,
                check_index = 0,
                elms = {},
                data_def = {
                    img_w: 600,
                    img_h: 300,
                    img_cound: 8,
                    speed: 600,
                    delay: 3000,
                    dir: 'left'
                };
            data = $.extend(data_def, data);
            init = function() {
                elms._index = 0;
                elms.imgsDiv = that.find('.img');
                elms.dirSpan = that.find('.dir>span');
                elms.roundsSpan = that.find('.rounds>span');
                elms.imgsDiv.append(that.find('.img>img').eq(0).clone());
                that.css({ 'width': data_def.img_w + 'px', 'height': data_def.img_h + 'px' });
                elms.imgsDiv.children().css({ 'width': data_def.img_w + 'px', 'height': data_def.img_h + 'px' });
                if (data.dir == 'top') {
                    elms.rounds = that.find('.rounds');
                    elms.imgsDiv.css({ 'width': '100%', 'height': '999999px' });
                    elms.rounds.css({
                        'transform': 'translateY(-50%)',
                        'width': '20px',
                        'top': '50%',
                        'right': '5%',
                        'left': 'auto',
                        'bottom': 'auto'
                    });
                    elms.dirSpan.css({ 'left': 0, 'right': 0, 'transform': 'rotateZ(90deg)' });
                    $(elms.dirSpan[0]).css({ 'top': '5%', 'bottom': 'auto' });
                    $(elms.dirSpan[1]).css({ 'bottom': '5%', 'top': 'auto' });
                }
                that.hover(stop, function() {
                    timer = setInterval(start.bind(null, 'next'), data.delay + data.speed);
                });
                elms.dirSpan.on('click', function() {
                    if (elms.dirSpan.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
                elms.roundsSpan.hover(function() {
                    check_index = elms.roundsSpan.index($(this));
                    $(this).addClass('checked').siblings().removeClass('checked');
                    cleck();
                });
            }
            start = function(ope) {
                switch (ope) {
                    case 'next':
                        if (data.dir == 'left') {
                            elms.imgsDiv.animate({
                                left: "-=" + data.img_w + 'px'
                            }, data.speed, function() {
                                elms._index++;
                                if (elms._index == data.img_cound) {
                                    elms._index = 0;
                                    elms.imgsDiv.css(data.dir, 0);
                                }
                                elms.roundsSpan.eq(elms._index).addClass('checked').siblings().removeClass('checked');
                            });
                        } else if (data.dir == 'top') {
                            elms.imgsDiv.animate({
                                top: "-=" + data.img_h + 'px'
                            }, data.speed, function() {
                                elms._index++;
                                if (elms._index == data.img_cound) {
                                    elms._index = 0;
                                    elms.imgsDiv.css(data.dir, 0);
                                }
                                elms.roundsSpan.eq(elms._index).addClass('checked').siblings().removeClass('checked');
                            });
                        }
                        break;
                    case 'prev':
                        if (data.dir == 'left') {
                            if (elms._index == 0) {
                                elms._index = data.img_cound;
                                elms.imgsDiv.css(data.dir, '-' + data.img_w * data.img_cound + 'px');
                            }
                            elms.imgsDiv.animate({
                                left: "+=" + data.img_w
                            }, data.speed, function() {
                                elms._index--;
                                elms.roundsSpan.eq(elms._index).addClass('checked').siblings().removeClass('checked');
                            });
                        } else if (data.dir == 'top') {
                            if (elms._index == 0) {
                                elms._index = data.img_cound;
                                elms.imgsDiv.css(data.dir, '-' + data.img_h * data.img_cound + 'px');
                            }
                            elms.imgsDiv.animate({
                                top: "+=" + data.img_h
                            }, data.speed, function() {
                                elms._index--;
                                elms.roundsSpan.eq(elms._index).addClass('checked').siblings().removeClass('checked');
                            });
                        }
                        break;
                    default:
                        if (data.dir == 'left') {
                            elms.imgsDiv.animate({
                                left: -data.img_w * ope
                            }, data.speed, function() {
                                elms._index = ope;
                            });
                        } else if (data.dir == 'top') {
                            elms.imgsDiv.animate({
                                top: -data.img_h * ope
                            }, data.speed, function() {
                                elms._index = ope;
                            });
                        }
                        break;
                }
            }
            stop = function() {
                elms.imgsDiv.stop(true, true);
                clearInterval(timer);
            }
            prev = function() {
                stop();
                start('prev');
            }
            next = function() {
                stop();
                start('next');
            }
            cleck = function() {
                stop();
                start(check_index);
            }
            main = function() {
                init();
                timer = setInterval(start.bind(null, 'next'), data.delay + data.speed);
            }
            main();
        }
    });
})(window, jQuery);

$('.banner').banner({
    img_w: 1200, //banner图的宽度
    img_h: 537, //banner图的高度
    img_cound: 6, //banner图的数量
    speed: 1000, //执行banner图切换动画的速度
    delay: 4000, //执行banner图切换动画的间隔时间
    dir: 'left' //banner图的切换方向（left为水平切换，默认往右切换||top为垂直向下切换，默认往下切换）
});
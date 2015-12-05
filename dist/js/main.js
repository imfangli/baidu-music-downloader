(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 *  音乐详细信息相关逻辑
 */

module.exports = function () {

    // 搜索项添加点击事件
    $("#search-items").on("click", "li", function () {
        var songid = $(this).data("songid");
        analysis(songid);
    });

    var analysis = function(songid){
        $.ajax({
            type: "get",
            url: "http://music.baidu.com/data/music/fmlink",
            dataType: "jsonp",
            data: {
                songIds: songid,
                type: "flac"
            },
            success: function(data) {

                var songData = data.data.songList[0] || {};

                var $musicDetail = $("#music-detail");

                $musicDetail.empty();

                // 构造音乐详情 HTML 结构
                var $itemDetail = $('<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object" src="' + songData.songPicSmall + '">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + songData.songName + ' - ' + songData.artistName + '</h4>' +
                    '<p>文件格式： ' + songData.format + '</p>' +
                    '<p><a class="btn btn-success" href="' + songData.songLink + '"><i class="glyphicon glyphicon-cloud-download"></i> 下载</a></p>' +
                    '</div>' +
                    '</div>');

                // 如果没有链接则在下载按钮上添加 disabled 类
                if (!songData.songLink) {
                    $itemDetail.find(".btn").addClass("disabled");
                }

                $musicDetail.append($itemDetail);

                // 显示 JSON 信息
                $musicDetail.append($('<pre>' + JSON.stringify(songData) + '</pre>'));
            }
        });
    };

};

},{}],2:[function(require,module,exports){
/*
 *  百度无损音乐下载器入口文件
 *  By Felix - imfangli@126.com
 */

require("./search.js")();  // 搜索音乐相关
require("./analysis.js")();  // 分析音乐详情相关
},{"./analysis.js":1,"./search.js":3}],3:[function(require,module,exports){
/*
 *  音乐搜索相关逻辑
 */

module.exports = function () {

    var $searchInput = $("#search-input");

    // 搜索框添加 keyup 时间，实时刷新搜索数据
    $searchInput.on("keyup", function () {
        var $this = $(this),
            keyword = $this.val();
        $.ajax({
            type: "get",
            url: "http://sug.music.baidu.com/info/suggestion",
            dataType: "jsonp",
            data: {
                word: keyword,
                version: 2,
                from: 0
            },
            success: function(data) {
                var arrSong = data.data.song || [];
                var $musicList = $("#search-items");

                $musicList.empty();

                // 搜索到结果后，输出 名称－艺术家
                if (arrSong.length) {
                    for (var i = 0; i < arrSong.length; i++) {
                        var $musicItem = $('<li class="list-group-item">' + arrSong[i].songname + ' - ' + arrSong[i].artistname + '</li>');
                        $musicItem.attr("data-songid", arrSong[i].songid);  // 为搜索列表项添加音乐 ID
                        $musicList.append($musicItem);
                    }
                } else {  // 没有搜索到结果
                    var $musicItem = $('<li class="list-group-item">暂无结果</li>');
                    $musicList.append($musicItem);
                }
            }
        });
    });
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9GZWxpeC9Qcm9qZWN0L2Zyb250RW5kL2JhaWR1LW11c2ljLWRvd25sb2FkZXIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL0ZlbGl4L1Byb2plY3QvZnJvbnRFbmQvYmFpZHUtbXVzaWMtZG93bmxvYWRlci9zcmMvanMvYW5hbHlzaXMuanMiLCIvVXNlcnMvRmVsaXgvUHJvamVjdC9mcm9udEVuZC9iYWlkdS1tdXNpYy1kb3dubG9hZGVyL3NyYy9qcy9mYWtlXzhjZGM3MGM2LmpzIiwiL1VzZXJzL0ZlbGl4L1Byb2plY3QvZnJvbnRFbmQvYmFpZHUtbXVzaWMtZG93bmxvYWRlci9zcmMvanMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiAg6Z+z5LmQ6K+m57uG5L+h5oGv55u45YWz6YC76L6RXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyDmkJzntKLpobnmt7vliqDngrnlh7vkuovku7ZcbiAgICAkKFwiI3NlYXJjaC1pdGVtc1wiKS5vbihcImNsaWNrXCIsIFwibGlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc29uZ2lkID0gJCh0aGlzKS5kYXRhKFwic29uZ2lkXCIpO1xuICAgICAgICBhbmFseXNpcyhzb25naWQpO1xuICAgIH0pO1xuXG4gICAgdmFyIGFuYWx5c2lzID0gZnVuY3Rpb24oc29uZ2lkKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL211c2ljLmJhaWR1LmNvbS9kYXRhL211c2ljL2ZtbGlua1wiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvbnBcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBzb25nSWRzOiBzb25naWQsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmbGFjXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc29uZ0RhdGEgPSBkYXRhLmRhdGEuc29uZ0xpc3RbMF0gfHwge307XG5cbiAgICAgICAgICAgICAgICB2YXIgJG11c2ljRGV0YWlsID0gJChcIiNtdXNpYy1kZXRhaWxcIik7XG5cbiAgICAgICAgICAgICAgICAkbXVzaWNEZXRhaWwuZW1wdHkoKTtcblxuICAgICAgICAgICAgICAgIC8vIOaehOmAoOmfs+S5kOivpuaDhSBIVE1MIOe7k+aehFxuICAgICAgICAgICAgICAgIHZhciAkaXRlbURldGFpbCA9ICQoJzxkaXYgY2xhc3M9XCJtZWRpYVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1lZGlhLWxlZnRcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwibWVkaWEtb2JqZWN0XCIgc3JjPVwiJyArIHNvbmdEYXRhLnNvbmdQaWNTbWFsbCArICdcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvYT4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cIm1lZGlhLWhlYWRpbmdcIj4nICsgc29uZ0RhdGEuc29uZ05hbWUgKyAnIC0gJyArIHNvbmdEYXRhLmFydGlzdE5hbWUgKyAnPC9oND4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxwPuaWh+S7tuagvOW8j++8miAnICsgc29uZ0RhdGEuZm9ybWF0ICsgJzwvcD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxwPjxhIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgaHJlZj1cIicgKyBzb25nRGF0YS5zb25nTGluayArICdcIj48aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IOS4i+i9vTwvYT48L3A+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicpO1xuXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5rKh5pyJ6ZO+5o6l5YiZ5Zyo5LiL6L295oyJ6ZKu5LiK5re75YqgIGRpc2FibGVkIOexu1xuICAgICAgICAgICAgICAgIGlmICghc29uZ0RhdGEuc29uZ0xpbmspIHtcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1EZXRhaWwuZmluZChcIi5idG5cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkbXVzaWNEZXRhaWwuYXBwZW5kKCRpdGVtRGV0YWlsKTtcblxuICAgICAgICAgICAgICAgIC8vIOaYvuekuiBKU09OIOS/oeaBr1xuICAgICAgICAgICAgICAgICRtdXNpY0RldGFpbC5hcHBlbmQoJCgnPHByZT4nICsgSlNPTi5zdHJpbmdpZnkoc29uZ0RhdGEpICsgJzwvcHJlPicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxufTtcbiIsIi8qXG4gKiAg55m+5bqm5peg5o2f6Z+z5LmQ5LiL6L295Zmo5YWl5Y+j5paH5Lu2XG4gKiAgQnkgRmVsaXggLSBpbWZhbmdsaUAxMjYuY29tXG4gKi9cblxucmVxdWlyZShcIi4vc2VhcmNoLmpzXCIpKCk7ICAvLyDmkJzntKLpn7PkuZDnm7jlhbNcbnJlcXVpcmUoXCIuL2FuYWx5c2lzLmpzXCIpKCk7ICAvLyDliIbmnpDpn7PkuZDor6bmg4Xnm7jlhbMiLCIvKlxuICogIOmfs+S5kOaQnOe0ouebuOWFs+mAu+i+kVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyICRzZWFyY2hJbnB1dCA9ICQoXCIjc2VhcmNoLWlucHV0XCIpO1xuXG4gICAgLy8g5pCc57Si5qGG5re75YqgIGtleXVwIOaXtumXtO+8jOWunuaXtuWIt+aWsOaQnOe0ouaVsOaNrlxuICAgICRzZWFyY2hJbnB1dC5vbihcImtleXVwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGtleXdvcmQgPSAkdGhpcy52YWwoKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL3N1Zy5tdXNpYy5iYWlkdS5jb20vaW5mby9zdWdnZXN0aW9uXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHdvcmQ6IGtleXdvcmQsXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICAgICAgICBmcm9tOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJTb25nID0gZGF0YS5kYXRhLnNvbmcgfHwgW107XG4gICAgICAgICAgICAgICAgdmFyICRtdXNpY0xpc3QgPSAkKFwiI3NlYXJjaC1pdGVtc1wiKTtcblxuICAgICAgICAgICAgICAgICRtdXNpY0xpc3QuZW1wdHkoKTtcblxuICAgICAgICAgICAgICAgIC8vIOaQnOe0ouWIsOe7k+aenOWQju+8jOi+k+WHuiDlkI3np7DvvI3oibrmnK/lrrZcbiAgICAgICAgICAgICAgICBpZiAoYXJyU29uZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTb25nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJG11c2ljSXRlbSA9ICQoJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPicgKyBhcnJTb25nW2ldLnNvbmduYW1lICsgJyAtICcgKyBhcnJTb25nW2ldLmFydGlzdG5hbWUgKyAnPC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRtdXNpY0l0ZW0uYXR0cihcImRhdGEtc29uZ2lkXCIsIGFyclNvbmdbaV0uc29uZ2lkKTsgIC8vIOS4uuaQnOe0ouWIl+ihqOmhuea3u+WKoOmfs+S5kCBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgJG11c2ljTGlzdC5hcHBlbmQoJG11c2ljSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgLy8g5rKh5pyJ5pCc57Si5Yiw57uT5p6cXG4gICAgICAgICAgICAgICAgICAgIHZhciAkbXVzaWNJdGVtID0gJCgnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+5pqC5peg57uT5p6cPC9saT4nKTtcbiAgICAgICAgICAgICAgICAgICAgJG11c2ljTGlzdC5hcHBlbmQoJG11c2ljSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iXX0=

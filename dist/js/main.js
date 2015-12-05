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
        var $this = $(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9GZWxpeC9Qcm9qZWN0L2Zyb250RW5kL0RlbW8vMjAxNTEyMDUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL0ZlbGl4L1Byb2plY3QvZnJvbnRFbmQvRGVtby8yMDE1MTIwNS9zcmMvanMvYW5hbHlzaXMuanMiLCIvVXNlcnMvRmVsaXgvUHJvamVjdC9mcm9udEVuZC9EZW1vLzIwMTUxMjA1L3NyYy9qcy9mYWtlXzkyYTNhYTEuanMiLCIvVXNlcnMvRmVsaXgvUHJvamVjdC9mcm9udEVuZC9EZW1vLzIwMTUxMjA1L3NyYy9qcy9zZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqICDpn7PkuZDor6bnu4bkv6Hmga/nm7jlhbPpgLvovpFcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIOaQnOe0oumhuea3u+WKoOeCueWHu+S6i+S7tlxuICAgICQoXCIjc2VhcmNoLWl0ZW1zXCIpLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzb25naWQgPSAkKHRoaXMpLmRhdGEoXCJzb25naWRcIik7XG4gICAgICAgIGFuYWx5c2lzKHNvbmdpZCk7XG4gICAgfSk7XG5cbiAgICB2YXIgYW5hbHlzaXMgPSBmdW5jdGlvbihzb25naWQpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vbXVzaWMuYmFpZHUuY29tL2RhdGEvbXVzaWMvZm1saW5rXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29ucFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbmdJZHM6IHNvbmdpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZsYWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzb25nRGF0YSA9IGRhdGEuZGF0YS5zb25nTGlzdFswXSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIHZhciAkbXVzaWNEZXRhaWwgPSAkKFwiI211c2ljLWRldGFpbFwiKTtcblxuICAgICAgICAgICAgICAgICRtdXNpY0RldGFpbC5lbXB0eSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g5p6E6YCg6Z+z5LmQ6K+m5oOFIEhUTUwg57uT5p6EXG4gICAgICAgICAgICAgICAgdmFyICRpdGVtRGV0YWlsID0gJCgnPGRpdiBjbGFzcz1cIm1lZGlhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWVkaWEtbGVmdFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIiNcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJtZWRpYS1vYmplY3RcIiBzcmM9XCInICsgc29uZ0RhdGEuc29uZ1BpY1NtYWxsICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9hPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWVkaWEtYm9keVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwibWVkaWEtaGVhZGluZ1wiPicgKyBzb25nRGF0YS5zb25nTmFtZSArICcgLSAnICsgc29uZ0RhdGEuYXJ0aXN0TmFtZSArICc8L2g0PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHA+5paH5Lu25qC85byP77yaICcgKyBzb25nRGF0YS5mb3JtYXQgKyAnPC9wPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHA+PGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiBocmVmPVwiJyArIHNvbmdEYXRhLnNvbmdMaW5rICsgJ1wiPjxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4g5LiL6L29PC9hPjwvcD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzmsqHmnInpk77mjqXliJnlnKjkuIvovb3mjInpkq7kuIrmt7vliqAgZGlzYWJsZWQg57G7XG4gICAgICAgICAgICAgICAgaWYgKCFzb25nRGF0YS5zb25nTGluaykge1xuICAgICAgICAgICAgICAgICAgICAkaXRlbURldGFpbC5maW5kKFwiLmJ0blwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRtdXNpY0RldGFpbC5hcHBlbmQoJGl0ZW1EZXRhaWwpO1xuXG4gICAgICAgICAgICAgICAgLy8g5pi+56S6IEpTT04g5L+h5oGvXG4gICAgICAgICAgICAgICAgJG11c2ljRGV0YWlsLmFwcGVuZCgkKCc8cHJlPicgKyBKU09OLnN0cmluZ2lmeShzb25nRGF0YSkgKyAnPC9wcmU+JykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG59O1xuIiwiLypcbiAqICDnmb7luqbml6DmjZ/pn7PkuZDkuIvovb3lmajlhaXlj6Pmlofku7ZcbiAqICBCeSBGZWxpeCAtIGltZmFuZ2xpQDEyNi5jb21cbiAqL1xuXG5yZXF1aXJlKFwiLi9zZWFyY2guanNcIikoKTsgIC8vIOaQnOe0oumfs+S5kOebuOWFs1xucmVxdWlyZShcIi4vYW5hbHlzaXMuanNcIikoKTsgIC8vIOWIhuaekOmfs+S5kOivpuaDheebuOWFsyIsIi8qXG4gKiAg6Z+z5LmQ5pCc57Si55u45YWz6YC76L6RXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgJHNlYXJjaElucHV0ID0gJChcIiNzZWFyY2gtaW5wdXRcIik7XG5cbiAgICAvLyDmkJzntKLmoYbmt7vliqAga2V5dXAg5pe26Ze077yM5a6e5pe25Yi35paw5pCc57Si5pWw5o2uXG4gICAgJHNlYXJjaElucHV0Lm9uKFwia2V5dXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAga2V5d29yZCA9ICR0aGlzLnZhbCgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vc3VnLm11c2ljLmJhaWR1LmNvbS9pbmZvL3N1Z2dlc3Rpb25cIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25wXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgd29yZDoga2V5d29yZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICAgICAgICAgIGZyb206IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyclNvbmcgPSBkYXRhLmRhdGEuc29uZyB8fCBbXTtcbiAgICAgICAgICAgICAgICB2YXIgJG11c2ljTGlzdCA9ICQoXCIjc2VhcmNoLWl0ZW1zXCIpO1xuXG4gICAgICAgICAgICAgICAgJG11c2ljTGlzdC5lbXB0eSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g5pCc57Si5Yiw57uT5p6c5ZCO77yM6L6T5Ye6IOWQjeensO+8jeiJuuacr+WutlxuICAgICAgICAgICAgICAgIGlmIChhcnJTb25nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyclNvbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkbXVzaWNJdGVtID0gJCgnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+JyArIGFyclNvbmdbaV0uc29uZ25hbWUgKyAnIC0gJyArIGFyclNvbmdbaV0uYXJ0aXN0bmFtZSArICc8L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJG11c2ljSXRlbS5hdHRyKFwiZGF0YS1zb25naWRcIiwgYXJyU29uZ1tpXS5zb25naWQpOyAgLy8g5Li65pCc57Si5YiX6KGo6aG55re75Yqg6Z+z5LmQIElEXG4gICAgICAgICAgICAgICAgICAgICAgICAkbXVzaWNMaXN0LmFwcGVuZCgkbXVzaWNJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLyDmsqHmnInmkJzntKLliLDnu5PmnpxcbiAgICAgICAgICAgICAgICAgICAgdmFyICRtdXNpY0l0ZW0gPSAkKCc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj7mmoLml6Dnu5Pmnpw8L2xpPicpO1xuICAgICAgICAgICAgICAgICAgICAkbXVzaWNMaXN0LmFwcGVuZCgkbXVzaWNJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbiJdfQ==

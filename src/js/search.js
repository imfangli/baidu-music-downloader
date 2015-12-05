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

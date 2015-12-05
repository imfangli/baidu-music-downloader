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

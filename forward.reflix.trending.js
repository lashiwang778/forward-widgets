// =============UserScript=============
// @name Reflix 热门剧集
// @version 1.0.0
// @description 使用 Reflix API 获取今日最受欢迎的剧集
// @author 糙大叔
// =============UserScript=============

WidgetMetadata = {
  id: "forward.reflix",
  title: "Reflix 热门剧集",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "展示 Reflix 来源的 TMDB 热榜电视剧（无模块分类）",
  author: "糙大叔"
};

async function widget(params = {}) {
  const page = parseInt(params.page) || 1;
  const url = `https://api.reflix.top/lookup?language=zh-CN&path=/trending/tv/day?page=${page}&sort_by=popularity.desc`;

  try {
    const response = await Widget.http.get(url);
    const data = response?.data?.results || [];

    return data.map(item => ({
      id: String(item.id),
      type: "tmdb",
      title: item.name || item.title || "未知标题",
      description: item.overview || "暂无简介",
      releaseDate: item.first_air_date || "",
      rating: item.vote_average || 0,
      genreTitle: getGenreText(item.genre_ids),
      coverUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/300x450?text=暂无封面",
      url: `https://www.themoviedb.org/tv/${item.id}`
    }));

  } catch (error) {
    console.error("加载 Reflix 数据失败：", error);
    return [{
      id: "error",
      type: "error",
      title: "加载失败",
      description: `错误信息：${error.message || "未知"}`
    }];
  }
}

function getGenreText(ids = []) {
  const genres = {
    10759: "动作冒险", 16: "动画", 35: "喜剧", 80: "犯罪", 99: "纪录片",
    18: "剧情", 10751: "家庭", 10762: "儿童", 9648: "悬疑", 10764: "真人秀",
    10765: "科幻奇幻", 10766: "肥皂剧", 10767: "脱口秀", 10768: "战争政治",
    28: "动作", 12: "冒险", 14: "奇幻", 36: "历史", 27: "恐怖",
    10402: "音乐", 10749: "爱情", 878: "科幻", 10770: "电视电影",
    53: "惊悚", 10752: "战争", 37: "西部"
  };
  return ids.slice(0, 2).map(id => genres[id]).filter(Boolean).join(", ");
}

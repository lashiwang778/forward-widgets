// =============UserScript=============
// @name Reflix 热门剧集组件
// @version 1.0.0
// @description 从 Reflix API 获取今日热门剧集
// @author 糙大叔
// =============UserScript=============

WidgetMetadata = {
  id: "forward.reflix.tv.trending",
  title: "Reflix 热门剧集",
  description: "展示来自 Reflix 的热门电视榜单（今日）",
  author: "糙大叔",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "Reflix 热榜 TV",
      description: "Reflix 今日热门电视剧（按人气降序）",
      cacheDuration: 1800,
      functionName: "loadReflixTrendingTV",
      params: [
        { name: "page", title: "页码", type: "page" }
      ]
    }
  ]
};

async function loadReflixTrendingTV(params = {}) {
  try {
    const page = parseInt(params.page) || 1;
    const url = `https://api.reflix.top/lookup?language=zh-CN&path=/trending/tv/day?page=${page}&sort_by=popularity.desc`;
    const res = await Widget.http.get(url);

    const data = res.data?.results || [];

    return data.map(item => ({
      id: String(item.id),
      type: "tmdb",
      title: item.name || item.title || "未知标题",
      coverUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/300x450?text=暂无封面",
      description: `⭐️评分：${item.vote_average || "?"} ｜ 📝${item.overview?.slice(0, 60) || "暂无简介"}`,
      rating: item.vote_average,
      releaseDate: item.first_air_date || undefined,
      url: `https://www.themoviedb.org/tv/${item.id}`
    }));

  } catch (error) {
    return [{
      id: "error-reflix",
      type: "error",
      title: "加载失败",
      description: `错误信息：${error.message || "未知错误"}`
    }];
  }
}

// =============UserScript=============
// @name Reflix 热门剧集组件
// @version 1.0.0
// @description 获取 Reflix API 中今日热门剧集
// @author 糙大叔
// =============UserScript=============

WidgetMetadata = {
  id: "forward.reflix.tv.trending",
  title: "Reflix 热门剧集",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "展示 Reflix 提供的 TMDB 热门电视剧榜单",
  author: "糙大叔",
  modules: [
    {
      id: "trendingTV",
      title: "热门电视剧",
      functionName: "loadReflixTrendingTV",
      description: "获取 Reflix 今日人气最高的剧集",
      cacheDuration: 1800,
      params: [
        { name: "page", title: "页码", type: "page", value: 1 }
      ]
    }
  ]
};

async function loadReflixTrendingTV(params = {}) {
  try {
    const page = parseInt(params.page || 1);
    const url = `https://api.reflix.top/lookup?language=zh-CN&path=/trending/tv/day?page=${page}&sort_by=popularity.desc`;
    const res = await Widget.http.get(url);

    const data = res?.data?.results || [];

    return data.map(item => ({
      id: String(item.id),
      type: "tmdb",
      title: item.name || item.title || "未知标题",
      description: `⭐️ ${item.vote_average || "?"}分 · ${item.first_air_date || "暂无日期"}`,
      releaseDate: item.first_air_date || undefined,
      rating: item.vote_average,
      genreTitle: item.genre_ids?.join(", ") || "",
      posterPath: item.poster_path || "",
      coverUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://via.placeholder.com/300x450?text=暂无封面",
      url: `https://www.themoviedb.org/tv/${item.id}`
    }));
  } catch (error) {
    console.error("Reflix 数据加载失败：", error);
    return [{
      id: "error",
      type: "error",
      title: "加载失败",
      description: `错误信息：${error.message || "未知错误"}`
    }];
  }
}

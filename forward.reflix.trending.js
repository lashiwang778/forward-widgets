const widget = async () => {
  const response = await fetch("https://api.reflix.top/lookup?language=zh-CN&path=/trending/tv/day?page=1&sort_by=popularity.desc");
  const resJson = await response.json();

  const results = resJson.results || [];

  return {
    title: "Reflix 热门剧集",
    items: results.map(item => ({
      title: item.name || item.title || "未知标题",
      description: item.overview || "暂无简介",
      image: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "",
      url: `https://www.themoviedb.org/tv/${item.id}` // 根据 TMDB ID 构建跳转链接
    }))
  };
};

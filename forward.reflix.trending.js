WidgetMetadata = {
  id: "forward.reflix",
  title: "Reflix Trending",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "获取 Reflix 的热播剧集数据",
  author: "糙大叔",
  site: "https://api.reflix.top",
  modules: [
    {
      id: "reflixTrendingTv",
      title: "趋势剧集",
      functionName: "reflixTrendingTv",
      params: [
        {
          name: "page",
          title: "页码",
          type: "page",
          value: 1,
        },
        {
          name: "language",
          title: "语言",
          type: "language",
          value: "zh-CN",
        
        },
      ],
    },
  ],
};

// 请求数据函数
async function fetchReflixTrendingTv(api, params) {
  try {
    const response = await Widget.http.get(api);

    if (!response || !response.data || !response.data.items) {
      throw new Error("Reflix 数据格式错误");
    }

    return response.data.items.map((item) => ({
      id: item.id,
      type: "tv",
      title: item.name ?? item.original_name,
      description: item.overview,
      year: item.year,
      rating: item.vote_average,
      poster: item.poster_image_url,
      backdrop: item.backdrop_image_url,
    }));
  } catch (error) {
    console.error("调用 Reflix API 失败:", error);
    throw error;
  }
}

// 模块处理函数
async function reflixTrendingTv(params) {
  const page = params.page ?? 1;
  const language = params.language ?? "zh-CN";
  const rawPath = `/trending/tv/day?page=${page}&sort_by=popularity.desc`;
  const encodedPath = encodeURIComponent(rawPath);
  const api = `https://api.reflix.top/lookup?language=${language}&path=${encodedPath}`;

  return await fetchReflixTrendingTv(api, params);
}


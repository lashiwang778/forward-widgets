WidgetMetadata = {
  id: "forward.reflix.trending",
  title: "Reflix 热播剧集",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "展示 Reflix 当前趋势剧集",
  author: "糙大叔",
  site: "https://api.reflix.top",
  modules: [
    {
      id: "trendingTv",
      title: "热门剧集榜单",
      functionName: "trendingTv",
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

async function trendingTv(params) {
  const page = params.page ?? 1;
  const language = params.language ?? "zh-CN";

  const rawPath = `/trending/tv/day?page=${page}&sort_by=popularity.desc`;
  const encodedPath = encodeURIComponent(rawPath);
  const url = `https://api.reflix.top/lookup?language=${language}&path=${encodedPath}`;

  const response = await Widget.http.get(url);
  const items = response?.data?.items ?? [];

  return items.map((item) => ({
    id: item.id?.toString(),
    type: item.media_type ?? "tv",
    title: item.name ?? item.original_name ?? "未命名",
    description: item.overview ?? "",
    posterPath: item.poster_image_url ?? "",
    backdropPath: item.backdrop_image_url ?? "",
    rating: item.vote_average ?? 0,
    year: item.year ?? "",
  }));
}

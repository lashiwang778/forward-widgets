WidgetMetadata = {
  id: "forward.reflix",
  title: "Reflix 快测",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "测试模块加载",
  author: "糙大叔",
  site: "https://api.reflix.top",
  modules: [
    {
      id: "testPing",
      title: "快速测试",
      functionName: "testPing",
      params: [],
    },
  ],
};

async function testPing() {
  return [ { title: "成功！🎉", description: "框架加载正常" } ];
}

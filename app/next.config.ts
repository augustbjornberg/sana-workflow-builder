const nextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  { name: 'removeAttrs', params: { attrs: '(fill|stroke|opacity)' } },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;



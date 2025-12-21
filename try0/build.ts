await Bun.build({
    entrypoints: ['./src/index.tsx'],
    outdir: './public/js',
    minify: true,
    naming: "app.js",
});
console.log("Build complete!");

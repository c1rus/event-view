# Getting Started

Angular 2 app with a little of everything 

## Get the Code
```
git clone https://github.com/johnpapa/event-view.git ev
cd ev
npm i
```

### Just in Time (JiT) Compilation

Runs the TypeScript compiler and launches the app

```
npm start
```

### Ahead of Time (AoT) Compilation 

Runs the Angular AoT compiler, rollup, uglify for an optimized bundle, then launches the app

```
npm run build
```

### AoT + gzip 

Runs AoT plus gzips and launches the app 

```
npm run build-gzip
```

Notes:
- Use your favorite server in place of `http-server`
- This could be scripted, obviously
- `lite-server` does not launch gzipped files by default.



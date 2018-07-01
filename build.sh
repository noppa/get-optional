tsc --target es5 --module umd --outDir . index.ts
tsc --target es6 --module es6 --outDir es index.ts
cp es/index.js es/index.mjs
tsc -d index.ts
cp index.d.ts es/
cp index.js.flow es/
cp index.js.flow es/index.mjs.flow
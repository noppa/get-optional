tsc --target es5 --module umd --outDir .
tsc --outDir es
cp es/index.js es/index.mjs
tsc -d
cp index.d.ts es/
cp index.js.flow es/
cp index.js.flow es/index.mjs.flow

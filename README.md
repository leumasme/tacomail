# npm package typescript template
Want to make a npm package with typescript?
Here's a basic template to do it. Just click "Use this Template" to create a repo based on it!
It outputs CommonJS and ESM bundles using the `tsup` bundler.
## Your TODOs:
- [ ] Update package.json `name`, `description`, `keywords`, `author`, `repository` and `license`
- [ ] Add your project code
- [ ] Add usage examples to `example/index.ts`
- [ ] Update this `README.md` :>
- [ ] Publish your package with `npm publish`
### If you are creating a package for NodeJS
- [ ] Add info about which NodeJS version your package needs with the `package.json->engines->node` property (ex: `>=16.0.0`)
- [ ] Install the @types/node package for your Node version
- [ ] Exclude browser types by adding `lib: ["ES2015"]` to your `tsconfig.json->compilerOptions`

### If you are creating a package for the browser
- ... ? (I do not know much about browser packages)
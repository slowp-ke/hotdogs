# `hotdogs`

<sup>Simple, zero-dependency acorn sized (~3kB) `package.json` dependency updater with the power of [`bun`](https://bun.sh)</sup>

Keep your dogs bunned and steamy with the `hotdogs` CLI.

```sh
# In your shell
# Print the latest dependencies 👀
npx hotdogs
pnpm dlx hotdogs
yarn dlx hotdogs
bunx hotdogs

# or write them to package.json 📝
npx hotdogs -w
pnpm dlx hotdogs -w
yarn dlx hotdogs -w
bunx hotdogs -w

# or if you install globally 🌐
npm i -g hotdogs
hotdogs

# or save a few keystrokes ⌨️
bun i -g hotdogs

# or if it is a package.json dependency and `./node_modules/.bin` is in your $PATH 😵‍💫
npm i -D hotdogs # or without -D
hotdogs
```

```json
// or as a script in your package json 📦
{
  "scripts": {
    "some-name-check-deps": "bunx hotdogs",
    "some-name-update-deps": "bunx hotdogs -w"
  }
}
```

## 📄 About

### Usage

`hotdogs` is a CLI tool made to quickly update your `package.json` dependencies to their latest versions.

- Updates package versions to the `latest` tag
- Retains version specifiers such as `~` `^`
- _(Planned)_ specify the `dist-tag` targets you wish to update to with `--tag` i.e. `hotdogs -w --tag="canary,next"`

Personally, I find this pairs well if you use _exact_ versions (no `^` `~`) in your `package.json`.

### Limitations

`hotdogs` _only_ updates `package.json` dependencies to their latest version, as specified by their `latest` tag on the [NPM registry](https://www.npmjs.com) _(or the tags and fallbacks you specify)_.

_For now_, the tool was designed explicitly for this purpose. If this does not suit your use case, I'd highly recommend some [other tools](#Alternatives) which can handle updating to scopes you desire, such as `major` / `minor` / `patch` etc.

## 🔧 Options

Options (denoted by `{opt}`) can be specified by passing:

- Most options:
  - `-{opt}` or `--{opt}`
  - `-{opt} -{opt}` or `--{opt} --{opt}`
  - `-{opt}{opt}` or `--{opt}{opt}`
- `-i` and `-x`:

  - These options must be delimited in the args on their own, for example:

    `-i=package1 -{otheropts}` or `--i=package1`

    `-x=package1 -{otheropts}` or `--x=package1`

  - Also, they can have quotes `'` `"` or none at all:

    `-i=package1` or `-i='package1'` or `-i="package1"`

    `-x=package1` or `-x='package1'` or `-x="package1"`

  - Finally, they use `,` (no space!) to delimit which package names to pass:

    `-i=package1,package2,package3`

    `-x=package1,package2,package3`

### Usage

```sh
### -d, -v: Show more detailed messaging
hotdogs -d
hotdogs -v

### -F: Disable color formatting
hotdogs -F

### -h: Show help message.
hotdogs -h

### -i: Specify comma `,` delimited list of dependencies to include. Each string is matched against the entire dependency's name. Can include `'` or `"` around the list if you want.
hotdogs -i=solid # Would include 'solid-js', '@solidjs/meta', 'eslint-plugin-solid' etc.
hotdogs -i=solid,unocss # Would include 'solid-js', '@solid...', 'unocss', '@unocss/reset', etc.
# Different command formatting, if desired:
hotdogs -i="solid,unocss"
hotdogs -i='solid,unocss'


### -w: Write found updates to `package.json`. By default, `hotdogs` does not do anything to it.
hotdogs -w

### -x: Specify comma `,` delimited list of dependencies to exclude. Each string is matched against the entire depenency's name. Can include `'` or `"` around the list if you want.
hotdogs -x=eslint # Would exclude 'eslint', '@typescript-eslint/...', 'prettier-eslint` etc.
hotdogs -x=eslint,@fortawesome # Would exclude 'eslint', '@typescript-eslint/...', '@fortawesome/fontawesome-...' etc.
# Different command formatting, if desired:
hotdogs -x="eslint"
hotdogs -x='eslint,@fortawesome'
```

## ✨ Alternatives

`hotdogs` was inspired by these other excellent package update managers:

- [`taze`](https://github.com/antfu/taze)
- [`npm-check-updates`](https://github.com/raineorshine/npm-check-updates)

Please check them out! Especially if `hotdogs` doesn't fit your use case! 😁

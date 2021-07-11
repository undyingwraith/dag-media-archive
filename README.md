# Dag media archive

[![license](https://img.shields.io/badge/license-MIT-brightgreen)](https://choosealicense.com/licenses/mit/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/undyingwraith/dag-media-archive/issues)
![dependencies](https://img.shields.io/david/undyingwraith/dag-media-archive)
[![fork](https://img.shields.io/github/forks/undyingwraith/dag-media-archive?style=social)](https://github.com/undyingwraith/dag-media-archive/network/members)
[![stars](https://img.shields.io/github/stars/undyingwraith/dag-media-archive?style=social)](https://github.com/undyingwraith/dag-media-archive/stargazers)

## Getting started

Add the following line to your `.npmrc` file (create it if it doesnt exist):

```text
@undyingwraith:registry=https://npm.pkg.github.com
```

And add it to your package.

```bash
yarn add @undyingwraith/dag-media-archive
```

## Usage

### Typescript

```typescript
import {DmaStore} from '@undyingwraith/dag-media-archive'
import {create} from 'ipfs-core'

const store = await DmaStore.create(await create())

//TODO
```

### Javascript

```javascript
//TODO
```

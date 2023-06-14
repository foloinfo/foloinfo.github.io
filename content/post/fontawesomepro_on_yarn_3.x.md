---
title: Using FontawesomePro with yarn 3.x
date: '2023-06-14T15:00:00.000Z'
---

I used to set `.npmrc` with the following setting to use FontawesomePro.

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

However, it was not working on yarn 3.x environment.

```
➤ YN0035: │ @fortawesome/fontawesome-pro@npm:^6.2.0: The remote server failed to provide the requested resource
➤ YN0035: │   Response Code: 404 (Not Found)
➤ YN0035: │   Request Method: GET
➤ YN0035: │   Request URL: https://registry.yarnpkg.com/@fortawesome%2ffontawesome-pro
➤ YN0000: └ Completed in 16s 312ms
➤ YN0000: Failed with errors in 16s 314ms
```

It looks like the npmrc is ignored on yarn 3.x, so I needed to migrate the config to `yarnrc.yml`

```
nodeLinker: node-modules

yarnPath: .yarn/releases/yarn-3.6.0.cjs

npmScopes:
  fortawesome:
    npmRegistryServer: https://npm.fontawesome.com/
    npmAlwaysAuth: true
    npmAuthToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

ref: https://yarnpkg.com/configuration/yarnrc/#npmScopes

Now I can use pro icons for my client.

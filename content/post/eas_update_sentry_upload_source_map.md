---
title: Uploading source map after updating with EAS (Expo)
date: '2023-04-11T15:00:00.000Z'
---

`sentry-expo` used to automatically upload the sourcemap to sentry, but the upload function (postPublish hook) has stopped.

Looks like there is a bug: [https://github.com/expo/sentry-expo/issues/320](https://github.com/expo/sentry-expo/issues/320 "https://github.com/expo/sentry-expo/issues/320")

I needed to upload the sourcemap, otherwise Sentry will not show the correct location of the bug.

This is the shell script to update with eas and upload the sourcemap to sentry.\
I use several channels depending on the environment (production, staging).\
You will need to change the details to suit your project and needs, but it will give you an idea of how to upload.

```shell
#!/bin/bash +x

ENV=$1
CHANNEL=$2
sentry_org=your-orgname

# eas update
result=$(APP_ENV=$ENV eas update --branch $CHANNEL --non-interactive --auto --json)

echo $result

# get build ids
ios_id=$(echo $result | jq -r '.[] | select(.platform == "ios") | .id')
android_id=$(echo $result | jq -r '.[] | select(.platform == "android") | .id')

# move source files
cd ./dist/bundles/
mv -v android-*.js index.android.bundle.js
mv -v android-*.map index.android.bundle.map
mv -v ios-*.js main.jsbundle
mv -v ios-*.map main.jsbundle.map

cd -

# bundleIdentifier for your app
if [ $ENV == "production" ]; then
  bundleIdentifier="yourapp.production"
  androidPackage="com.yourapp"
else
  bundleIdentifier="yourapp.staging"
  androidPackage="com.staging.yourapp"
fi

# read file and get version, I use app.config.js so it's kind of complicated. It could be simple if you use app.config.json
version=$(grep -Po "(?<=version = )[^;]+" app.config.js | sed -e "s/'//g")
# read file and get buildNumber.production
buildNumberProduction=$(grep -Po "(?<=production: )[^,]+" app.config.js | awk 'NR==1' | sed -e "s/'//g" | tr -d "',")
# read file and get buildNumber.staging
buildNumberStaging=$(grep -Po "(?<=staging: )[^}]+" app.config.js | awk 'NR==1' | sed -e "s/'//g" | tr -d "',")
# read file and get versionCode.production
versionCodeProduction=$(grep -Po "(?<=production: )[^,]+" app.config.js | awk 'NR==2' | sed -e "s/'//g" | tr -d "',")
# read file and get versionCode.staging
versionCodeStaging=$(grep -Po "(?<=staging: )[^}]+" app.config.js | awk 'NR==2' | sed -e "s/'//g" | tr -d "',")

echo "Version: $version"
echo "BuildNumber.Production: $buildNumberProduction"
echo "BuildNumber.Staging: $buildNumberStaging"
echo "VersionCode.Production: $versionCodeProduction"
echo "VersionCode.Staging: $versionCodeStaging"

if [ $ENV == "production" ]; then
  buildNumber=$buildNumberProduction
  versionCode=$versionCodeProduction
  project="your-sentry-production-project"
else
  buildNumber=$buildNumberStaging
  versionCode=$versionCodeStaging
  project="your-sentry-staging-project"
fi

ios_release_name=${bundleIdentifier}@${version}+${buildNumber}
android_release_name=${androidPackage}@${version}+${versionCode}

echo "iOS Release Name: $ios_release_name"
echo "Android Release Name: $android_release_name"

echo "iOS ID: $ios_id"
echo "Android ID: $android_id"

node_modules/@sentry/cli/bin/sentry-cli releases --org $sentry_org --project $project \
  files ${ios_release_name} \
  upload-sourcemaps \
  --dist ${ios_id} \
  --rewrite \
  dist/bundles/main.jsbundle dist/bundles/main.jsbundle.map

node_modules/@sentry/cli/bin/sentry-cli releases --org $sentry_org --project $project \
  files ${android_release_name} \
  upload-sourcemaps \
  --dist ${android_id} \
  --rewrite \
  dist/bundles/index.android.bundle.js dist/bundles/index.android.bundle.map
```

Running this script will

1. Upload the source using eas-update
2. Upload sourcemap to sentry

It is annoying to have this kind of script just to use Sentry, so I hope they fix it soon.

You could also use this method if you don't use Expo's EAS update and host your own source.

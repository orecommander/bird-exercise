# bird-exercise

Monitoring bird exercise.

## instal

```
$ git clone https://github.com/orecommander/bird-exercise.git
$ cd bird-exercise
$ yarn install
```

## env setting

Get and set the Twitter API key.

```
export CONSUMER_KEY={YOUR_CONSUMER_KEY}
export CONSUMER_SECRET={YOUR_CONSUMER_SECRET}
export ACCESS_TOKEN_KEY={YOUR_ACCESS_TOKEN_KEY}
export ACCESS_TOKEN_SECRET={YOUR_ACCESS_TOKEN_SECRET}
export BIRD=barkhorn0331 <- watch!!!
export MY_RECIPIENT_ID=67034514 <- Get id from users/show API, get('users/show', {screen_name: 'YOUR_SCREEN_NAME'})
```

## install node modules

```
$ yarn install
```

## build & run

```
$ yarn start
```

## development

edit `src/index.tx` and auto watching build:

```
$ yarn dev:watch
```

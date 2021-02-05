
In this post I will talk about different topics that come from the same idea, like the project's deployment architecture, the twitch impact and the first **alpha-preview** release.

## Dashboard and Services
A couple of weeks ago I decided to launch a new build that could be tested on the web, just like the **indev** version. The difference is that the indev version lacked of any kind of security in terms of access or basic security failures.
This time I wanted to emphasize the project's security and work on making it safer with the knowledge I have.

### Architecture

![](https://cdn.discordapp.com/attachments/586914620451848234/806988546686713876/Screenshot_2021-02-04_at_21.40.22.png)

Although there are differences between the old and the new architectures, the idea of this service is to create connections and services over the server to be able to perform the proper deploys and minimize the complete access to the machine. No, I don't use services such as AWS/Azure/..., since they are expensive and I can't afford at the moment to use that kind of services.

It's the first time I set up a 2FA service and actually it was easier than expected, it turns out that all services that use the classic 6-digit generation use a standard, so it's even simpler. I suggest implementing it if you have any critical points in your applications, it will give an extra security layer to your login and it will save a lot of headaches.

### Build and deployment

Even if I'm not using Azure, AWS or any kind of this machines, Azure DevOps offers the possibility to create Integration and Deployment Pipelines for free, even though it limits how many of them you can make, they are more than enough for this kind of environments.
Since microsoft bought github, you can connect your repositories directly with devops and make deployments easier.

## Twitch

Along with this alpha-preview versions deploys, I wanted you to be able to try, just like in the indev, this version. The difference is that during the indev, the project wasn't defined, so I didn't hesitate to allow the acces to the game indiscriminately, but the current version, the future **alpha 1**, pretends to set up the game basis and I want to be able to monetize it.

### Integration with voidpixel

The integration could be represented by this architecture and its variations.

![](https://cdn.discordapp.com/attachments/586914620451848234/806988862097195069/Screenshot_2021-02-04_at_21.44.44.png)

The idea is that you can log in to the game as long as you have a twitch account with an active subscription to the cannel [voidpixelDev@twitch](https://twitch.tv/voidpixelDev).
The game is accessed at [alpha-client.voidpixel.net](http://alpha-client.voidpixel.net/), the idea is simple, a click, you login with twitch, and you're in.

![](https://cdn.discordapp.com/attachments/586914620451848234/806994449270964254/Screenshot_2021-02-04_at_22.07.36.png)

![](https://cdn.discordapp.com/attachments/586914620451848234/806995219873792040/Screenshot_2021-02-04_at_22.10.12.png)

### Monetization

One of the aspects that people comment the most about, besides saying something about Habbo, is the monetization, about how the gameplay will be.
I meditated about this many times, at the end it's something I must solve before this gets way more serious.
I've been thinking lately about the following forms of monetization and the pros and cons of each one, also my final decision and the reason.

- **(actual) Free To Play**
  + Good things:
    + Free for the user.
  + Bad things:
    + Community is free to enter with multiple accounts.
    + No income
    + I couldn't do this full-time.

- **(actual) Free To Play + paid skins**
  + Good things:
    + Free for the user.
    + Option to use unique skins.
  + Bad things:
    + Community is free to enter with multiple accounts.
    + Reduced source of income.
    + Unfair to some users.
    + I couldn't do this full-time.

- **Pay to Win**
  + No way.

- **(actual) Free To Play + optional monthly subscription**
  + Good things:
    + Free for the user.
    + Option to use unique skins for subscribed users.
    + I could do this full time.
  + Bad things:
    + Community is free to enter with multiple accounts.
    + Reduced source of income.
    + Unfair for some users.

- **Monthly subscription**
  + Good things:
    + Constant source of income.
    + A better community since access is limited.
    + I could do this full time.
  + Bad things:
    + Very expensive for the user.

- **Unique pay per account**
  + Good things:
    + Semi-constant source of income.
    + A better community since access is limited.
    + I could do this full time.
    + Free updates for the user.
  + Bad things:
    + It limits my income to a unique pay.

Obviously, the most attractive for you, reader, is the first, but unless I win the lottery, it's impossible because I don't like gambling, so no.
I'd like to generate enough income enough to compensate the associated costs that the development itself gives me at least. And if that, just by chance, works, go on, ALL IN.
But to be realistic with my work and the idea of live from this someday, the last option is the most ethic and coherent one for the development.
**Unique pay per account**. When I get to the first alpha, I will lift that restriction, in the meantime the only way to get access to the alpha-preview, will be by contributing with a subscription to the twitch channel.

### Opinion about twitch's popularity

Twitch's popularity this last year, is undeniable, I have the small sensation that a lot of people "steal" from me and even if that idea goes through my head, I want to make clear that I know perfectly that this is not the case. It's like when you follow a music group and it gets popular, you get mad because there are new fans and now it's part of the popular culture, when it should be the other way around.
I suggest you listen to this song that precisely talks about that.
[![https://www.youtube.com/watch?v=TGWy14hbIDc (song in spanish)](https://cdn.discordapp.com/attachments/586914620451848234/807000489778085958/Screenshot_2021-02-04_at_22.31.32.png)](https://www.youtube.com/watch?v=TGWy14hbIDc)

I think that the difference between that music groups and this twitch phenomenon is that here, like it happened in youtube, people can get popular and make a living out of it, meanwhile the 99% will get nothing, and I'm included in the latter. I'm in this platform since 2011 and even if I started to stream more regularly since 2013, I paused for a few years until I started streaming again in 2019. Until recently, it was impossible to monetize streams without a lot of followers and it allows people who don't have a lot of followers, like me, to have an income.

Just like it happened to youtube and anything in the popular culture, things have a peak and then start declining, and the same thing will happen with streaming. I like to discover new people and people passionate about this world like me. And from here, I encourage you to start streaming, really.

It's just that it makes me a bit sad to know that this will eventually end and that when life goes back to some new normal, a lot of people who started streaming, will leave it because it won't be an escape anymore, since they won't have earned money with it. In almost a decade in the platform, it's the first time that I generate income and even if I didn't, I would stay. As before, if you are passionate about something, do it without thinking about the most economic part of it.

Anyway, I thank every single one of you who support me on the platform since almost a decade, as well as the ones who subscribe to the channel and contribute so the project keeps going forward.

I want to address one last thing, twitch used to have the categories of **Coding** and **GameDev** and they removed them. `Make twitch great again`, Let's recover our categories!

## Alpha Preview 0.1

As you can see, I released the first Alpha Preview, technically called `alpha-preview 0.1`. This version is small but flaunts a new architecture, that I talked about in the [previous post](./entity-component-system). Now that I'm testing it more deeply, I realized that one can work more comfortably and that every technical difficulty that I used to have, is solved with this proper distribution of functions and conections between the components, that contain the information, the entities that only contain the information of the corresponding components and the systems that are in charge of interpreting and modifying this data. Scalability and maneuverability are so high, that in just a few weeks, I could take giant steps compared to the game evolution.

### Development

The idea of an `alpha-preview` is to maintain a continuous flow of "playable" versions and to reach a version that accomplishes the minimum of the minimum. To reach that point, I will be making uploads of every change I make.

Thank you again for the good reception of this release and thanks for reading this post and the others.

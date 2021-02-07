# ECS

First of all, happy new year 2021.
I hope this new year goes a bit better than the previous one!

## Introduction
This post may become a bit long, so I want to sum up all the topics
I am going to cover, and they are quite few.

- Entity Component System
  - What is **ECS** (Entity-Component-System)?
  - Use case
  - TechTalk about ECS (Spanish tho :( )
  - The architecture in JavaScript/TypeScript
  - Dark-Engine
    - What is Dark-Engine?
    - What does voidpixel have to do with all these?
- Refactoring voidpixel to Dark-Engine
  - New Client-Server communication
  - New 'chunks' system
  - Pathfinding
    - Problems with the library pathfinding.js
    - The new library - pathfinding.ts
- Current state of voidpixel
- Flash
    
    
## Entity Component System

---

### What is **ECS** (Entity-Component-System)?

Quoting [wikipedia](https://en.wikipedia.org/wiki/Entity_component_system):
```txt
Entity–component–system (ECS) is an architectural pattern 
that is mostly used in game development. ECS follows the 
composition over inheritance principle that allows greater 
flexibility in defining entities where every object in a game's 
scene is an entity (e.g. enemies, bullets, vehicles, etc.). 
Every entity consists of one or more components which contains 
data or state. Therefore, the behavior of an entity can be changed 
at runtime by systems that add, remove or mutate components. 
This eliminates the ambiguity problems of deep and wide inheritance 
hierarchies that are difficult to understand, maintain and extend. 
Common ECS approaches are highly compatible and often combined with 
data-oriented design techniques.
```

So to make sure we all understand it, this architecture allows an entity
to have certain data components without the use of inheritance 
(as in Object Oriented Programming). Systems will modify this data
dynamically.

### Use case

I often got block when I needed to add new mobs because I tried
using classical inheritance, but there was a moment when I could not
use this any longer. For example:

```
- Entity
  > Has sprite
  - Player
    > Has health
  - Enemy
    > Has health
```

As we can observe, both the enemy and the player have a health component...
so we could move the health component to 'Entity', right?

```
- Entidad
  > Has sprite
  > Has health
  - Player
  - Enemy
```

What if we wanted to add a NPC whose responsibility is only to talk to us?
Obviously it shares the 'has sprite' property with player and enemy,
 but we don't need the health component.

Maybe... if give it `Number.MAX_SAFE_INTEGER` as health? ...And then is
 when we do a botched job to fix the problems.

 I chose a wrong architecture due to my lack of knowledge, let's remember
 that I never studied Game Development, so I learn from trial and error.

### TechTalk about ECS

I had to watch a talk about **ECS** for work purposes and suddenly,
the typical bulb appeared on top of my head. You can watch it here (Sorry, it is in Spanish):

[![https://www.youtube.com/watch?v=gBhU2N_Yhhk](https://media.discordapp.net/attachments/586914620451848234/794978420907180062/Screenshot_2021-01-02_at_18.20.05.png)](https://www.youtube.com/watch?v=gBhU2N_Yhhk)

### The architecture in JavaScript/TypeScript

After the tech talk, I looked for repositories or projects with a
good implementation of the ECS architecture for JavaScript/TypeScript,
but all implementations were rather incomplete or old.

The idea is to add entities dynamically and attach components to them and allow
systems to modify this data. Systems will update with every game iteration,
in that way they depend solely on the game rendering to work.

I chose to create a minimalist ECS implementation in TypeScript and
NodeJS, to see if my thoughts and suspicions was feasible. [[darkaqua/redux-saga-ecs@github](https://github.com/darkaqua/redux-saga-ecs)]

This version is a bit outdated, but it works as a Proof of Concept since I could
observe the potential of this architecture.

When it comes to state management, I thought it was a good idea to use
the **redux+saga** solution, it allows a flexible control over the data and
keeps it centralized.


Example code for a **store**:
```
- entities = {
  [ENTITY_ID_1]: {
    type: 1,
    [SPRITE]: {
      texture: 'name'
    }
  }
}
- components = {
  [SPRITE]: {
    entities: [ENTITY_ID_1]
  }
}
```
In the example, we can see how the **entities** have a entity attribute which
at the same time contains a type, this type defines the entity type (Player, Mob...).
Afterwards we can observe a component called **[SPRITE]**, this is nothing else
but the data component implementation.

I read a lot about this kind of implementation I thought it suited my problem,
probably there are more optimal ways, but I chose this one to start with.

Even though a entity may have certain data, if the entity is not explicitly declared
for that component, it won't work. This way we can avoid reading certain entities
if they are not relevant for a given system. These components will just
be a *Phantom component*, which it will not affect or be read by the system.

In this case, systems are declared with a list of the components that they are
dependent on in order to work. Systems will only read the entities that have
declared their components properly.

With this implementation, I created a **fork** in the project and add pixi.js to it...

### Dark-Engine

![](https://media.discordapp.net/attachments/586914620451848234/794977969034100746/Screenshot_2021-01-02_at_18.18.21.png)

#### What is Dark-Engine?

An accidental game engine created with TypeScript for the web.
You can take a look here [[darkaqua/dark-engine@github](https://github.com/darkaqua/dark-engine)]

Dark-Engine is a framework to make videogames for the web platform created 
by me based on the previous *PoC*. It is a very light framework with a very simple
implementation. We aim to improve it little by little to enable the people who have never
work with a framework of this characteristics.

Dependencies: 
```
pixi.js
redux
redux-saga
webpack
```

There is not much more to say, the point is to implement a native rendering
using pixi.js (which is just library over WebGL). This way, we have great
boilerplate to make games in native web technologies.

#### What does voidpixel have to do with all these?

Well... let's take a look at the next section.

## Refactoring voidpixel to Dark-Engine

---

I saw how **ECS** could help me in the development of voidpixel, so once more, 
I took a decision that every time I mention some big fish in wallstreet goes bankrupt.

**REFACTORING**

It is a hated and needed concept to make things work, I have refactored voidpixel, 
mostly for good, but let's be honest, I hate rewriting my code.
Nobody likes to refactor, but sometimes there is no other way because it becomes 
impossible to move forward. It is a good moment when you discover a new architecture 
that is completely scalable and thought for the very same problem you are trying to solve.

In the previous architecture of voidpixel there was a small similarity to **ECS** with redux and sagas, since everything regarding data manipulation was already centralize and avoid touching the entities. But that's all it is, an approximation, it was not easy to scale and the inheritance just made it impossible to extend the code without duplications.
So one month ago I started the refactoring... and somethings have changed, a lot.

### New Client-Server communication

Dark-Engine does not define a communication with the server, this is a custom 
solution I did for voidpixel since it is 100% required.
I tried to accustom my implementation to the **ECS** principles and let the server
take control over the entities and its components to be the unique source of truth.
Then the front end client takes care of the render of this information.

The server also needed to be refactored, it has a **ECS** architecture and communicates
with **mongodb** to be able to store properly the states when needed. The server
does not have a normal loop, since it does not have rendering phase,
so I decided to continue using my own *tick* library for the backend, you can
take a look here: [[voidpixel/LoopWorker@github](https://github.com/voidpixel/LoopWorker)].

![](https://media.discordapp.net/attachments/586914620451848234/794982755837411338/Screenshot_2021-01-02_at_18.37.09.png)

This library allows having a custom *loop* with tick recovery in case it
skis the previous iteration, hence we can guarantee a continues flow of ticks 
per second.

### New 'chunks' system

As you saw in [the previous post](./pathfinding-magical-numbers),
the chunks system was a f***ng chaos, impossible to maintain and not 
scalable. So I encouraged myself and created a new system. Setting the chunk
system apart, since it did not allow to have different heights and I wanted
to keep designing the levels, I went back to the very beginning of internet...

**HABBO**

To copy the idea of **habbo rooms**, even tho this time rooms will be 
connected with each other with an infinite pattern (within the memory limitations
of hardware).

With this idea, I started working on the refactoring and designed a sample room
to work with.

![](https://media.discordapp.net/attachments/586914620451848234/794977506205237329/Screenshot_2021-01-02_at_18.16.17.png)

This room, as you can observe, has different heights, something that the previous version
did not allow in any way, and it wouldn't have been easy to implement. Even though
now is only a static image and there are many ways of making this work.

Right now, rooms are entities defined by tridimensional positions that define where a user
can be placed, and everything was great until...

### Pathfinding
#### Problems with the library pathfinding.js

The first pathfinding library implemented in JavaScript that you will find is:

![](https://media.discordapp.net/attachments/586914620451848234/794988042519445544/Screenshot_2021-01-02_at_18.58.11.png)

And I just want to highlight a very insignificant thing... the last update of the library.
5 YEARS AGO. 

This library was programmed with CoffeScript and it uses implementations that
preceded ECMAScript5, hence, it was not maintainable in any way. Taking a look at the
code, I was just surrounded by spaghetti and things that should not be used, together with
utilities that we can find natively nowadays.

I really did not have any problem with this library, as long as works as intended,
but I needed to add some kind of cost to the nodes for the pathfinding. I found some
forks of the original project that did it, but wrongly. They were wrong just because
the pathfinding that I use in voidpixel is `Jump Pointer Search - No Diagonals`, this 
pathfinder implementation allows jumping to tiles in a way that makes the movement a bit
more natural for the player.

**A (Star)**:
![](https://media.discordapp.net/attachments/586914620451848234/794989670513377310/Screenshot_2021-01-02_at_19.04.49.png)

**JPS - No Diagonals**:
![](https://media.discordapp.net/attachments/586914620451848234/794989673058664508/Screenshot_2021-01-02_at_19.04.52.png)

Looking for an implementation that is not the usual one, not the most optimal,
I only found problems with the libraries since it did not calculate the jump cost
properly. 
I end up doing a fork over a fork and it ends up wearing out my patience. The code,
as I mentioned, was outdated and in such a bad shape that I decided to refactor it
completely in TypeScript.

And that's how it was born...

#### The new library - pathfinding.ts

![](https://media.discordapp.net/attachments/586914620451848234/794988061653860393/Screenshot_2021-01-02_at_18.58.14.png)

This library was born from the need to use distance cost and make it maintenable for
a typescript developer.

When I finished with the implementation of JPS, I found that there were some problems
with the calculations and that my own pathfinder has learnt to cheat, so I found myself
on a dead end until [PeopleNArthax@github](https://github.com/peoplenarthax), with lots
of helps, found an old implementation that he did in Python with the same pathfinder and
cost calculation, so he rewrote the code in typescript to add it to the library.

After this, everything went smoooth.

I also want to thank [mcmacker4@github](https://github.com/mcmacker4) for his help
implementing `LinkedLists`, although the last version does not use them.

## Current state of voidpixel

---

![](https://cdn.discordapp.com/attachments/586914620451848234/794986066246500352/2021-01-01_03.54.27.gif)

The game state as you see it, just in the same point it was before to all this refactoring,
probing once more how fast we can develop in this new architecture and extend the engine.

Voidpixel's game engine is nothing else but an advanced implementation of `Dark-Engine`,
I would really appreciate that, if you find any bug in the libraries or frameworks I publish and know how to solve them, you create a *Pull-Request* with a description of the problem and the solution. 

## Flash

---

I just wanted to briefly mention Macromedia Flash aka Adobe Flash.

It is important to remember it to understand what we should not do with a 
popular software that was used heavily until its very end this last year. 

### Habbo

Habbo was ported, very late, to unity, in a desperate move to remove flash, which was
a pillar for this pixelated social network. Everyone knew (all the internet) that 
Flash will be put to sleep by the end of 2020 and they waited until the last week.
Never...ever, wait until the last days to make a migration, because you do not have
control over what could happen.

Also, the idea of migrating to Unity, having ActionScript developers who could have
adapted fast to Type/JavaScript and create a new game engine, like the one they had 
in flash, just makes obvious how much Sulake cares about its Gold-eggs' goose.

---

Any way, thanks a lot for reading this post and to everyone who contributed these weeks
to make some progress.

I hope this year I can release the **alpha 1**, but I believe that working at this speed,
is very feasible.

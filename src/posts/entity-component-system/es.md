Lo primero, feliz año nuevo 2021.
¡Espero que este nuevo año vaya mejor que el anterior!

## Introducción
Este post quizá termina siendo largo, así que voy a exponer 
todos los temas de los que voy a hablar, que no son pocos.

- Entidad Componente Sistema.
  - ¿Qué es **ECS** (Entidad Componente Sistema)?
  - Motivos de uso
  - Charla sobre ECS (en español)
  - Arquitectura en JavaScript/TypeScript
  - Dark-Engine
    - ¿Qué es Dark-Engine?
    - ¿Y voidpixel que pinta en todo esto?
- Refactorizando voidpixel a Dark-Engine
  - Nueva comunicación con el servidor
  - Nuevo sistema de "chunks"
  - Pathfinding
    - Problemas con la antigua librería de pathfinding.js
    - Nueva librería - pathfinding.ts
- Estado actual del juego
- Flash
    
    
## Entidad Componente Sistema.

---

### ¿Qué es **ECS** (Entidad Componente Sistema)?

Según [wikipedia](https://en.wikipedia.org/wiki/Entity_component_system):
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

Para que entendamos todos que significa, esta arquitectura permite
que una entidad, pueda tener componentes pero no dependa de una
herencia para funcionar. Los sistemas se ocupan de modificar estos
valores de forma dinámica.

### Motivos de uso

Me he encontrado estancado a la hora de intentar añadir nuevos Mobs,
ya que intentaba trabajar con herencias pero llegaba un punto que no podia
usarlas. Vamos a poner un ejemplo:

```
- Entidad
  > Tiene un sprite
  - Jugador
    > Tiene vida
  - Enemigo
    > Tiene vida
```

Cómo vemos, tanto el jugador como el enemigo, tienen vida, entonces...
subimos la vida a Entidad, no?

```
- Entidad
  > Tiene un sprite
  > Tiene vida
  - Jugador
  - Enemigo
```

¿Y si quisieramos añadir un NPC que su única función es hablarnos? 
Obviamente comparte la propiedad con el jugador y el enemigo de 
tener un sprite, pero no queremos que tenga vida.

Quizá... si le ponemos vida `Number.MAX_SAFE_INTEGER`...

Ahí es donde empiezan las chapuzas para solucionar un problema de base.
Usaba una arquitectura incorrecta por desconocimiento, recordemos que
no he estudiado nada de Game Dev, voy aprendiendo a las malas.

### Charla sobre ECS (en español)

Resulta que en mi trabajo tuve que verme una charla sobre **ECS** y me 
apareció la típica bombilla encima de la cabeza después de ella, 
aquí dejo la charla:

[![https://www.youtube.com/watch?v=gBhU2N_Yhhk](https://media.discordapp.net/attachments/586914620451848234/794978420907180062/Screenshot_2021-01-02_at_18.20.05.png)](https://www.youtube.com/watch?v=gBhU2N_Yhhk)

### Arquitectura en JavaScript/TypeScript

Tras la charla, busqué en sus repositorios o en algún sitio, 
una buena implementación de la arquitectura de ECS para 
Javascript/Typescript, pero todas las implementaciones se quedaban
cortas o estaban muy anticuadas.

La idea es que puedas añadir de forma dinámica entidades, y a estas poderles
añadir componentes. Y que todos estos datos se controlen desde los sistemas.
Los sistemas se actualizarán con cada iteración del update del juego, de
esta manera dependerán completamente del render del juego para poder funcionar.

Decidí hacer una pequeña implementación del sistema ECS con typescript y node,
para ver si lo que estaba pensando y lo que había visto era funcional.
[[darkaqua/redux-saga-ecs@github](https://github.com/darkaqua/redux-saga-ecs)]

Esta versión está desactualizada, pero como *PoC* (Prueba de Concepto), me
pude hacer una idea del potencial que tenía el usar este sistema.

A la hora de guardar datos, me pareció buena idea seguir usando un sistema con
**redux + saga** ya que permite una flexibilidad de control de datos increible
teniendo un estado de la aplicación centralizado.

Estructura y ejemplo de la **store**:
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
En el ejemplo, podemos ver como las **entities** contienen una entidad que
contiene un tipo, este tipo define que tipo de entidad es (Player, Mob...).
En segundo lugar se encuentra una propiedad llamada **[SPRITE]**, está no es
más que la implementación de los datos del componente.

Leí mucho sobre la implementación de esta forma a la hora de 
guardar los datos y me pareció la más adecuada, seguramente hay formar más
optimas, pero para esta implementación, elegí esta.

Aunque una entidad contenga datos, si no es declarada en la lista de
entidades del componente correspondiente, esta no va a poder pertenecer, 
de esta forma nos ahorramos entidades que tengan
la información pero no queramos que estén en ese momento disponibles para
los sistemas. Componentes fantasmas no implementados o que se quieran 
implementar, pero que no queremos que afecten a nada por el momento.

En este caso, los sistemas se declaran eligiendo que componentes necesitan
para funcionar, de esta forma solo van a funcionar sobre las entidades que
tengan declaradas sus componentes correctamente.

Y con toda esta implementación, decidí hacer un **fork** en el proyecto y añadir
pixi.js a la solución...

### Dark-Engine

![](https://media.discordapp.net/attachments/586914620451848234/794977969034100746/Screenshot_2021-01-02_at_18.18.21.png)

#### ¿Qué es Dark-Engine?

Un motor gráfico, accidental, hecho en Typescript para web.
Lo puedes encontrar en [[darkaqua/dark-engine@github](https://github.com/darkaqua/dark-engine)]

Dark-Engine es un framework para crear videojuegos en web creador por mi a partir
de la *PoC* anterior. Es un framework muy ligero para trabajar y con una
implementación bastante sencilla, e intentamos mejorarla para que sea lo
más simple posible para alguien que no haya tocado nunca un framework
de este estilo.

Usa las librerias: 

```
pixi.js
redux
redux-saga
webpack
```

Y poca cosa más, la gracia es que implementa un render nativo de pixi.js,
que no deja de ser una librería que trabaja encima de WebGL. Por lo tanto
con este framework tenemos una implementación nativa de HTML5 para hacer 
juegos con el boilerplate adecuado.

#### ¿Y voidpixel que pinta en todo esto?

Bueno... mira el siguiente título.

## Refactorizando voidpixel a Dark-Engine

---

Tras ver todo el valor que **ECS** podia añadir a facilitarme el desarrollo
de voidpixel, decidí tomar una decisión, que cada vez que digo, sube el pan.

**REFACTORIZAR**

Es una palabra odiada y necesaria para que las cosas funcionen, he refactorizado
muchas veces voidpixel, siempre para bien, no me gusta volver a hacer mi código.
A nadie le gusta refactorizar nada, pero cuando no hay más remedio que hacerlo
porque estás viendo que es imposible avanzar, es muy buen momento cuando descubres
una arquitectura nueva que es completamente escalable y está pensada exactamente
para lo que tu querías hacer.

Con la arquitectura que estaba usando en voidpixel, había una pequeña aproximación
a **ECS** con el sistema de redux y sagas, ya que estaba centralizado donde
se realizaban las actualizaciones de datos, nunca usando las entidades para ello, siempre
desde fuera. Pero era eso, una aproximación, no era fácil de escalar y con
la herencia de las entidades, era imposible crear una sin duplicar mucho código.

Así que hace un mes, empecé el refeactorizado... y algunas cosas han cambiado, mucho.

### Nueva comunicación con el servidor

La comunicación con el servidor, no existe en el framework de **Dark-Engine**,
es una opción custom que he añadido a la implementación del motor en voidpixel,
ya que es 100% necesaria y no existe.
He intentado que esta implementación siga los principios de **ECS** para que sea
el servidor quien tome el control de las entidades, sus componentes, sus datos
y absolutamente todo, aunque al final, con todas estas entidades y estos
componentes, los sistemas del front "mueven" y realizan todas las acciones
necesarias dentro del render para que a nivel visual todo funcione.

El servidor también ha tenido que ser refactorizado para adaptarse a la nueva
arquitectura, que usa una arquitectura con **ECS** y una comunicación
con **mongodb** para poder almacenar correctamente los estados cuando sea
necesario. Este, no tiene un loop normal, ya que no tiene render, por lo que
decidí seguir usando una librería propia de ticks para back, que podéis encontrar
en [[voidpixel/LoopWorker@github](https://github.com/voidpixel/LoopWorker)].

![](https://media.discordapp.net/attachments/586914620451848234/794982755837411338/Screenshot_2021-01-02_at_18.37.09.png)

Esta librería permite tener un *loop* custom con recuperación de ticks en caso
de saltárselos en la iteración anterior, por lo tanto, siempre tendréis un flujo
de ticks por segundo.

### Nuevo sistema de "chunks"

Como pudisteis leer y ver en el [post anterior](./pathfinding-magical-numbers),
el sistema de chunks era un puto caos, es imposible de mantener y no es escalable para
absolutamente nada, así que decidí armarme de valentia y crear un nuevo sistema.
Dejando a un lado el sistema de chunks, ya que no permite tener alturas y el mapa
se tiene que seguir diseñado, volví al inicio, a los inicios de internet...

**HABBO**

Para copiar la idea de las **salas**, aunque esta vez, las salas van a estar
conectadas unas con otras en un patrón de mapa infinito (bueno, lo que el diseño permita).

Con esta idea en mente, me puse a trabajar en el refactorizado y diseñé una sala
de ejemplo para poder trabajar encima.

![](https://media.discordapp.net/attachments/586914620451848234/794977506205237329/Screenshot_2021-01-02_at_18.16.17.png)

Esta sala, como podéis observar, tiene distintas alturas, cosa que no permitía la versión
de chunks de ningúna forma y tampoco habría sido fácil implementar. Aunque,
ahora solo es una imagen estática y hay muchas cosas que hacer para que esto funcione como
debería.

Ahora mismos, las salas son entidades definidas por posiciones tridimensionales para poder
definir por donde puede ir un jugador. Todo parecía estupendo, hasta que...

### Pathfinding
#### Problemas con la antigua librería de pathfinding.js

La primera librería que encontraréis sobre pathfinding en JavaScript será siempre:

![](https://media.discordapp.net/attachments/586914620451848234/794988042519445544/Screenshot_2021-01-02_at_18.58.11.png)

Y solo quiero que os fijéis en un pequeño detalle sin importancia... la última fecha de
actualización de esta. HACE 5 AÑOS.

Esta librería está programada en CoffeScript y usa implementaciones anteriores a
ECMAScript5, por lo tanto, no es mantenible a ningún nivel. Indagando en el código,
encuentro mucho espagueti y cosas que ya no se deberían usar, e implementaciones que
ahora son nativas en JS.

Realmente no tenía ningún problema con esta librería, ya que mientras cumpla su función, 
pero necesitaba poder añadirle coste a los nodos del pathfinding, 
busqué y encontré algunos forks que hacían exactamente
eso, pero mal. Lo hacían mal porque el PathFinding que uso en voidpixel es 
`Jump Pointer Search - No Diagonals`, esta implementación de PathFinder permite
hacer saltos a casillas para que cuando te muevas con el personaje, parezca un movimiento
lo más natural posible a la vista y no haga cosas extrañas.

**A (Star)**:
![](https://media.discordapp.net/attachments/586914620451848234/794989670513377310/Screenshot_2021-01-02_at_19.04.49.png)

**JPS - No Diagonals**:
![](https://media.discordapp.net/attachments/586914620451848234/794989673058664508/Screenshot_2021-01-02_at_19.04.52.png)

Al buscar una implementación que no es la habitual, ni más rápida, 
solo me encontré problemas con los forks ya que no se calculaban bien los 
costes de salto.
Me animé a hacer un fork sobre el fork de costes de la libreríaa y terminó con mi paciencia.
El código, como he comentado, está tan desactualizado y usa tantas malas prácticas,
que decidí refactorizarlo entero con una nueva implementación en Typescript.

Y así nació...

#### Nueva librería - pathfinding.ts

![](https://media.discordapp.net/attachments/586914620451848234/794988061653860393/Screenshot_2021-01-02_at_18.58.14.png)

Esta librería nace de la necesidad de los costes y de tener código mantenible en 
Typescript.

Al terminar mi implementación del JPS descubrí que había problemas con algunos saltos
y que mi propio PathFinder había aprendido a hacer trampas, así que me encontré en un
callejón sin salida hasta que [PeopleNArthax@github](https://github.com/peoplenarthax),
con mucha ayuda que me estuvo dando con esta implementación, se acordó que tenía una
práctica antigua escrita en Python con este mismo PathFinder y costes, y decidió
portearlo a TypeScript para que pudiera integrarlo en la librería.

Y con ello, todo funcionó como un tiro.

También agradecer a [mcmacker4@github](https://github.com/mcmacker4) por ayudar en la
implementación de `LinkedLists`, aunque para el nuevo PathFinder no se usen.

## Estado actual del juego

---

![](https://cdn.discordapp.com/attachments/586914620451848234/794986066246500352/2021-01-01_03.54.27.gif)

Pues el juego se encuentra tal y como lo véis, vuelve a estar más o menos en el punto en 
el que se encontraba antes de empezar el refactor y eso anticipa lo rápido que se hace
desarrollar con esta nueva arquitectura e implementar nuevas partes del motor.

Aunque el motor de voidpixel ahora no es más que una implementación avanzada de
`Dark-Engine`, si encontráis problemas en cualquiera de las librerias/frameworks publicos
que he descrito, podéis hacer vuestros cambios y argumentarlos en *Pull Requests*,
ya que lo tomaré en cuenta muy positivamente. 

## Flash

---

Creo que era importante añadir un punto para hablar brevemente de Macromedia Flash o
más conocido como Adobe Flash.

Es importante recordarlo para saber lo que no se tiene que hacer con 
un software que fué muy popular hasta sus últimos dias de vida, hace literalmente
dos dias.

### Habbo

Habbo ha migrado, muy tarde, a Unity, en un intento desesperado de deshacerse de
Flash, quien fué parte fundamental de esta red social pixeleada y usurera.
Sabian (creo que todo internet) que Flash iba a ser tumbado a finales de 2020 
y han apurado hasta la última semana. 
Nunca, jamás, esperéis hasta los últimos dias para hacer migraciones porque
no sabéis que puede llegar a pasar.

También, la idea de migrar a Unity, teniendo programadores nativos de ActionScript
que se podrían adaptar rápidamente a Type/JavaScript y crear un motor propio, tipo
el que tenían con Flash, me hace ver la decadencia que tiene Sulake con respecto
a su gallina de los huevos de oro.

---

En todo caso, muchísimas gracias por la lectura del post y a todo el mundo que ha 
estado aportando estas semanas para que esto pudiera avanzar. 

Espero que este año, pueda sacar de una primera **alpha 1**, pero trabajando al ritmo
de las últimas semanas, es muy posible.


En este post voy a hablar de distintos temas muy diversos pero que parten de la misma idea,
como son la arquitectura de despliegue del propio proyecto, el impacto de twitch y
el lanzamiento de la primera **alpha-preview**.

## Dashboard y Servicios
Hace un par de semanas me decidí a lanzar de nuevo una versión compilada y que se
pudiera probar en web, tal y como tenia montada la versión **indev**. La diferencia
es que la versión indev partia de una seguridad innexistente, sin tener en cuenta
absolutamente nada el tema de los accessos o posibles fallos de seguridad basicos.
En esta ocasión he querido hacer incapié en la seguridad del proyecto y trabajar para
que fuese lo más seguro que me alcanza la mano y el conocimiento.

### Arquitectura

![](https://cdn.discordapp.com/attachments/586914620451848234/806988546686713876/Screenshot_2021-02-04_at_21.40.22.png)

Aunque hay variaciones sobre la arquitectura actual, la idea de este servicio, es poder
crear conexiones y servicios sobre el servidor para poder realizar los despliegues
adecuados y minimizar el acceso completo a la máquina. No, no uso servicios como
AWS/Azure/..., ya que los precios son elevados y no puedo permitirme en estos momentos
usar un servicio de este tipo.

Es la primera vez que monto un servicio de 2FA y la verdad es que ha sido mucho más
sencillo de lo que parece, al final todos los servicios que usan la típica generación 
de 6 dígitos, usan un estándar, así que todo se simplifica aún más. Recomiendo que
si tenéis puntos críticos en vuestras aplicaciones, lo implementéis, daréis una capa
de seguridad a vuestro login y os podréis ahorrar dolores de cabeza futuros.

### Compilación y despliegue

Aunque no use las máquinas de Azure, AWS y similares, Azure DevOps ofrece la posibilidad
de crear Pipelines de integración y despliegue de forma gratuita, aunque tiene limitaciones
de cuantas puedes hacer, son más que suficientes para entornos de esta índole.
Cuando microsoft adquirió github, permitió conectar los repositorios directamente con
devops y facilitar los despliegues. Aunque añadieron las **actions**, no me parecen tan
útiles como pueden resultar las Pipelines y sistemas de release en DevOps.

## Twitch

Junto a estos despliegues de versiones alpha-preview, quería que vosotros pudierais
probar, tal y como hice en la indev, esta versión. La diferencia es que durante la
indev, no había una definición del proyecto y por lo tanto, no tenía ningún reparo
en permitir los accesos indiscriminados en el juego pero la versión actual, la futura
**alpha 1**, está pretendiendo marcar la base del juego y quiero poder monetizarla.

### Integración con voidpixel

La integración se podria representar con esta arquitectura, y sus variaciones.

![](https://cdn.discordapp.com/attachments/586914620451848234/806988862097195069/Screenshot_2021-02-04_at_21.44.44.png)

La idea es que puedas loguearte en el juego siempre y cuando tengas una cuenta de twitch
con una suscripción activa en el canal de [voidpixelDev@twitch](https://twitch.tv/voidpixelDev).
El acceso al juego se realiza desde [alpha-client.voidpixel.net](http://alpha-client.voidpixel.net/) 
y la idea es sencilla, un click, te logueas con twitch y luego ya estás dentro.

![](https://cdn.discordapp.com/attachments/586914620451848234/806994449270964254/Screenshot_2021-02-04_at_22.07.36.png)

![](https://cdn.discordapp.com/attachments/586914620451848234/806995219873792040/Screenshot_2021-02-04_at_22.10.12.png)

### Monetización

Uno de los aspectos que más gente me comenta sobre el juego, a parte de soltar algo sobre Habbo, es
sobre la propia monetización, sobre como se podrá jugar.
He reflexionado muchísimas veces sobre este aspecto, ya que al final es algo que tengo que 
resolver antes de llegar a algún punto en el que se ponga mucho más sería la cosa.
En este tiempo he pensado en las siguientes formas de monetización y los pros y cons de cada una,
también mi decisión final y el motivo.

- **Free To Play (de verdad)**
  + Cosas buenas:
    + Gratis para el usuario.
  + Cosas malas:
    + Comunidad libre de entrar con cuentas multiples.
    + Sin fuente de ingresos.
    + No podria dedicarme a esto.


- **Free To Play (de verdad) + skins de pago**
  + Cosas buenas:
    + Gratis para el usuario.
    + Opción de skins únicas.
  + Cosas malas:
    + Comunidad libre de entrar con cuentas multiples.
    + Fuente reducida de ingresos.
    + Injusto para algunos usuarios.
    + No podria dedicarme a esto.


- **Pay to Win**
  + Ni de broma.


- **Free To Play (de verdad) + suscripción mensual opcional**
  + Cosas buenas:
    + Gratis para el usuario.
    + Opción de skins únicas para los suscritos.
    + Podria dedicarme a esto.
  + Cosas malas:
    + Comunidad libre de entrar con cuentas multiples.
    + Fuente reducida de ingresos.
    + Injusto para algunos usuarios.


- **Suscripción mensual**
  + Cosas buenas:
    + Fuente de ingresos constante.
    + Comunidad de más calidad al limitar el acceso.
    + Podria dedicarme a esto.
  + Cosas malas:
    + Mucho coste para el usuario.


- **Pago único por cuenta**
  + Cosas buenas:
    + Fuente de ingresos semi constante.
    + Comunidad de más calidad al limitar el acceso.
    + Podria dedicarme a esto.
    + Actualizaciones gratuitas para el usuario.
  + Cosas malas:
    + Limita mis ingresos a un único pago.

Obviamente la más atractiva para ti, lector, es la primera, pero a no ser que me toque
la loteria, y es imposible porque no me gustan los juegos de azar, va a ser que no.
Me gustaría al menos generar los ingresos suficientes para recuperar los gastos derivados
que tengo del propio desarrollo y si por un casual esto funciona, adelante, ALL IN.
Pero para poder ser realista con mi trabajo y con la idea de poder vivir en algún momento
de esto, la última opción es la más ética y más coherente para este desarrollo.
**Pago único por cuenta**. Cuando consiga llegar a una primera alpha, abriré esa veda, mientras
la única forma de acceso a la alpha-preview, va a ser contribuir con una suscripción en
el canal de twitch.

### Opinión sobre la popularidad de twitch

La popularidad de twitch este último año, es innegable, tengo un poco esa sensación de
que mucha gente "me está robando" y aunque en mi cabeza retumbe esa idea, quiero dejar claro
desde aquí, que s´´ perfectamente que no es así. Es como cuando sigues un grupo de música
y se hace popular, te da rabia que haya nuevos fans y que forme parte de la cultura popular
y realmente tendría que ser al revés. 
Os recomiendo escuchar esta canción, que precisamente habla de eso.
[![https://www.youtube.com/watch?v=TGWy14hbIDc](https://cdn.discordapp.com/attachments/586914620451848234/807000489778085958/Screenshot_2021-02-04_at_22.31.32.png)](https://www.youtube.com/watch?v=TGWy14hbIDc)

La diferencia que creo que hay entre los grupos de música y este fenómeno de twitch es
que aquí, como pasó en youtube, la gente puede llegar a hacerse popular y ganarse la vida,
mientras el 99% no conseguirá nada, y me incluyo en ese segundo grupo. Llevo desde 2011 en la 
plataforma y aunque empecé a hacer directos de forma más regular desde 2013, tuve unos años de 
interrupción hasta que en 2019 recuperé los directos. Hasta hace relativamente poco, era
imposible monetizar los directos sin tener muchos seguidores y lo que permite es que a los
que tenemos poquita gente, podamos generar ingresos.

Tal y como ocurrió con youtube y ocurre con toda la cultura popular, las cosas tienen su pico
y luego caen, y va a ocurrir lo mismo con los directos. Me gusta descubrir a nueva gente y 
gente tan apasionada por este mundo como yo y desde aquí, os animo a hacer directos, de verdad.

Solo que me da cierta pena saber que esto va a ser pasajero y que cuando la vida vuelva a 
cierta normalidad, mucha de esta gente que empezó los directos, lo dejará porque no le verá una
salida, ya que no habrán ganado nada económico con ello. En casi una década en la plataforma,
es la primera vez que genero ingresos y lo haría aunque no se generaran, como antes, así
que si tenéis pasión por algo, hacedlo sin pensar en la parte más económica del asunto.

Igualmente, agradecer a todos los que me dais apoyo en la plataforma desde hace casi una década, como
a los que os suscribís y contribuís a que el proyecto siga adelante.

Y como anécdota final, twitch antes tenía un apartado de **Coding** y **GameDev**, que nos quitaron.
`Hagamos twitch grande otra vez` ¡Recuperemos nuestras secciones!

## Alpha Preview 0.1

Como ya habéis podido comprobar, he lanzado la primera Alpha Preview, llamada a nivel
técnicao `alpha-preview 0.1`. Esta versión tiene poquita cosa pero parte de una arquitectura
renovada, que conté en el [anterior post](./entity-component-system). Al probarla ya más en
profunidad, he conseguido darme cuenta que se puede trabajar de forma muy cómoda y que todos
los problemas técnicos que tenia previamente, se solucionan con esta correcta distribución
de funciones y conexiones entre los propios componentes, que contienen la información,
las entidades que solo contienen la información de los correspondientes componentes y los sistemas
que se ocupan de interpretar y modificar estos datos. La escalabilidad y la maniobrabilidad
son tan elevadas, que en apenas unas pocas semanas, he podido hacer pasos de gigante con respecto
a la evolución del juego.

### Desarrollo

La idea con la versión `alpha-preview` es mantener un continuo flujo de versiones "jugables" y
llegar a una primera versión que contenga los mínimos de los mínimos. Para llegar a esos mínimos,
iré haciendo subidas con todos los desarrollos que vaya haciendo.

Agradezco de nuevo a todo el mundo por la muy buena acogida del lanzamiento y también
por la lectura del mismo post y demás posts.

### blog
¿Bienvenidos?
Llevo algún tiempo queriendo hacer un diario de desarrollo. Algunos quizá recordéis los vídeos que subí sobre el antiguo desarrollo, allí por 2014-2015, aunque dejando claro que ese juego no tiene nada que ver con el actual.
He creado este blog, para poder tener un registro de los avances que voy haciendo de forma semanal.
Muchas veces parece que no hago ningún progreso en los directos de [twitch](https://twitch.tv/voidpixelDev) o en las fotos que publico en [discord](https://discord.gg/Xt9CCeJ) o [twitter](https://twitter.com/voidpixel) debido a que no tienen contexto, este blog soluciona ese problema.
Mi idea es ir explicando, de forma un poco más técnica, las actualizaciones que vaya haciendo del juego, ya que la versión **indev** no va a recibir ninguna actualización y estoy trabajando en la **alpha 1**, aunque seguramente veréis **alpha preview** en las imágenes actuales del juego.

Este blog está creado con **react** y para la api, usando un **express** simple. Podéis encontrar el código y hacer vuestras aportaciones para mejorar el código en los repositorios de github:
- [voidpixel.net](https://github.com/voidpixel/blog.voidpixel.net)
- [apiblog.voidpixel.net](https://github.com/voidpixel/apiblog.voidpixel.net)

### voidpixel
Esta última semana no he trabajado en nada del juego como tal, ya que he estado creando este blog desde cero, así que voy a explicar las últimas cosas que hice hace un par de semanas atrás.

#### Target Position - Pathfinding
Actualmente, cuando haces click en cualquier región de la pantalla dentro del juego, el usuario manda una petición al servidor para informarle que quiere ir a ese destino.

Antes, el cliente calculaba el **pathfinding** para poder hacer el desplazamientos de los jugadores.

Problemas:
- Cuando un cliente no tenia la posición de algún jugador actualizada, el pathfinding se calculaba en relación a donde se encontrase el jugador y no a la posición real.
- No siempre había una coordinación entre los movimientos del jugador y lo que un cliente llegaba a ver, pudiendo haber saltos en el espacio y viendo como se atravesaban lugares que no se pueden pasar.
- El jugador podía llegar a mirar hacía un sitio al que realmente no estaba mirando porque el pathfinding era distinto entre clientes.
- No estar seguro de que el cliente esté haciendo correctamente el pathfinding y pueda estar haciendo trampas, teniendo que verificar cada posición interrumpida o al llegar a destino.

La solución a estos problemas estaba clara, si el servidor tiene que verificar el pathfinding para saber que el usuario no está haciendo trampas, calcular el pathfinding en el servidor.
Funciona bien, pensé que iría más lento, pero va realmente bien. Obviamente quedará optimizar cuando haya más cosas en el juego, pero por el momento, entre que el cliente hace click en un sitio y el servidor responde con el pathfinding, la respuesta es rápida y precisa. Todos los clientes que pertenecen a esos chunks quedan notificados.

Sobre la pertenencia a un chunk, ocurre que no deberias mandar el nuevo pathfinding, ni ningún evento, de un jugador a otros jugadores que no se encuentren en un rango de posiciones cercanas, por lo que, cuando un jugador se desplaza, se le asigna una **"sala"** en la que se encuentra, que vienen a ser los chunks. A nivel visual, esto va a ser completamente invisible.
Queda todavía, asignar las salas correctas cuando el usuario **está** moviéndose, ya que estas salas se asignan una vez que ha completado el pathfinding y no durante.

![](https://media.discordapp.net/attachments/401750633440608266/744724089117343774/unknown.png)
Como se puede apreciar en la imagen, los chunks quedan diferenciados en 2d por 128 pixeles de ancho por 128 pixeles de alto, aunque a nivel del juego, es una cuadricula isométrica. Esto es debido a que no es práctico hacer imágenes isometricas superpuestas, fue uno de los experimentos durante la indev, ya que las imagenes tienen que ser rectángulos.

Gracias y bienvenido! :D

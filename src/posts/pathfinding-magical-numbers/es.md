### Capas de cebolla
El otro dia quise arreglar un bug con respecto al movimiento del personaje, 
me dispuse a arreglarlo hasta que descubrí otro bug, relacionado con el pathfinding 
en el servidor, quisé arreglarlo, ya que no podia arreglar los otros dos problemas 
en capas superiores.

En este último bug, encontré una sorpresa pasada, unos numeros mágicos que están 
ahí desde la **indev** y no refactoricé durante el paso de la **indev** a la "alpha-preview"-

4, 8, 15, 16, 23, 42... **128, 160**

Esos dos últimos numeros me han estado desquiciando desde hace algunos meses,
aunque me había olvidado completamente de su existencia hasta hace una semana.


### ¿Cómo funciona?

#### Sprite
Lo primero que generamos es un sprite que representa al chunk que vamos a dibujar.
En la imagen de ejemplo podemos ver el chunk `x: 0 y: 0`.

La primera imagen del sprite corresponde al pathfinding, donde cada pixel negro representa que no
se puede andar, la parte blanca la que si. El punto gris que vemos, representa el spawn.
El resto de imagenes son las composiciones del chunk, representadas en el spritesheet por su zindex.
![](https://media.discordapp.net/attachments/586914620451848234/780925752157798439/Screenshot_2020-11-24_at_23.36.05.png)

Como podréis imaginar, esta representación de puntos no corresponde más que a un array de 128 pixeles 
de ancho por otro de 128 pixeles de alto, como vimos en el [post anterior](./welcome-to-the-blog).
El problema es que no representa más que eso, un plano 2D de una imagen con representación isométrica,
por lo tanto, no podemos trabajar con toda esta información.
- No tiene una representación realista de la isométrica del juego.
- Contiene muchos más puntos (en el eje y, el doble), de los que realmente queremos procesar, 
sería perder el tiempo procesar el doble de posiciones, ya que el usuario no va a poder viajar a esos
hipotéticos puntos en un plano 2D.

#### pixeles a 2d isométrico
![](https://media.discordapp.net/attachments/586914620451848234/780925754622869514/Screenshot_2020-11-24_at_23.39.00.png)

Esta imagen, representa la solución al problema presentado anteriormente. El problema es que para representar todos
los chunks, se tiene que establecer cuantos chunks, de alto por ancho, se quieren representar.
En este caso, he estado trabajando con una rejilla de 5 de ancho por 3 de alto.

### Problemas

Cuando tomé la decisión de usar esos dos valores para representar por donde podía desplazarse el usuario,
establecí una serie de normas. Tenia la obligación de desplazar los puntos de entrada del pathfinding para
poder hacer correctamente la búsqueda, una vez calculado, tenia que volver a dejarlos de forma correcta.

Bien.

Todo era fantástico, pero esas normas solo se aplicaban en el grid de 5x3, cualquier modificación
del grid, jodía todo el pathfinding, ya que metí en el código esos dos números (128x160) sin documentar
de donde salían.

Me he pasado las últimas dos semanas, en los directos y fuera de ellos, intentando sacar de donde salían,
probando todo lo que he podido, pero me he complicado mucho más de lo que debía.
[cout970@github](https://github.com/cout970) acabó dando con la solución gracias a una representación 
gráfica que hizo.
 
 ![](https://cdn.discordapp.com/attachments/586914620451848234/780931084426805268/Screenshot_2020-11-25_at_00.01.06.png)

En cuanto ví la imagen, me acordé perfectamente de las razones y los motivos, completamente desactualizados
y reemplazables, pero no podía arreglarlo porque no sabía de donde salían.
Básicamente, El primer chunk que se representa es el `x: 0 y: -1`, aunque este chunk pasa a ser representado 
como el número `x: 3 y: 0` para que no haya negativos entre las filas de los chunks.

Para que lo entendamos todos:
- El chunk del centro, el representado como el chunk donde se encuentre el usuario en ese momento.
- El chunk del centro a su vez, se representa con los valores `x: 0 y: 0`.
- El chunk del centro a su vez, se vuelve a representar con esta corrección como el chunk `x: 1 y: 2`, y aquí, 
es donde se pone la cosa fea.

Para rectificar estas posiciones con respecto al punto de partida y punto de final, restaba **128** a la x y **160** a la y.

![](https://media.discordapp.net/attachments/586914620451848234/780932867424387072/Screenshot_2020-11-25_at_00.08.04.png)

Alguno puede pensar que es una chapuza, pero tened en cuenta que esto parte de mis pruebas durante la indev, y en ese momento
tenia todo el sentido del mundo pero me olvidé de portearlo al nuevo sistema y así se quedó.

Espero que os haya resultado interesante y muchas gracias por ayudar, tanto en los directos como con las traducciones. <3

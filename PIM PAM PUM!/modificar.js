//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Modificar extends Phaser.Scene{

  constructor(){
    super({key:'modificar'});
  }

  preload(){

    this.load.image('ModificarF', 'resources/modificar/FondoModificarFinal.png')
    .spritesheet('botonEliminar','resources/modificar/eliminarB.png',{ frameWidth: 720, frameHeight: 53 })   
    .spritesheet('botonCambiar','resources/modificar/cambiarB.png',{ frameWidth: 720, frameHeight: 53 })
    .spritesheet('botonAtras','resources/modificar/atrasB.png',{ frameWidth: 720, frameHeight: 53 })    
    .spritesheet('botonCerrar','resources/modificar/cerrarB.png',{ frameWidth: 720, frameHeight: 53 })
    .image('Escribir','resources/modificar/Introducir.png',{ frameWidth: 720, frameHeight: 53 })
    .image('Verificar', 'resources/modificar/verificar.png')
   

    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')

  }

  create(){

    var fondo = this.add.image(1280/2, 720/2, 'ModificarF').setInteractive();
  
    const eliminar=this.add.sprite(1280/2, 791/2, 'botonEliminar').setInteractive();
    const cambiar=this.add.sprite(1280/2, 540/2, 'botonCambiar').setInteractive();
    const atras=this.add.sprite(1280/2, 1050/2, 'botonAtras').setInteractive();
    const cerrar=this.add.sprite(1280/2, 1298/2, 'botonCerrar').setInteractive();

    var cambio = false;
    var ok = false;
    //no se crea hasta que seleccione el botón de cambiar contraseña
    /////////const escribir=this.add.sprite(1280/2, 540/2, 'Escribir').setInteractive();
    //añadir texto


    //eliminar
    this.anims.create({
      key: 'buttonNormalE',
       frames: this.anims.generateFrameNumbers('botonEliminar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     this.anims.create({
       key: 'buttonHoverE',
       frames: this.anims.generateFrameNumbers('botonEliminar', { start: 1, end: 1 }),
       frameRate: 1,
         repeat: 0
     });
 
     this.anims.create({
       key: 'buttonClickE',
       frames: this.anims.generateFrameNumbers('botonEliminar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     // Configura la interactividad del botón
     eliminar.on('pointerover', () => {
      eliminar.play('buttonHoverE');
     });
 
     eliminar.on('pointerout', () => {
      eliminar.play('buttonNormalE');
     });
 
     eliminar.on('pointerdown', () => {
      eliminar.play('buttonClickE');
      cambio = false;
      this.scene.start('menu-inicio');

       });
 
       eliminar.on('pointerup', () => {
        eliminar.play('buttonHoverE');
       });

    //cambiar
    this.anims.create({
      key: 'buttonNormalC',
       frames: this.anims.generateFrameNumbers('botonCambiar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     this.anims.create({
       key: 'buttonHoverC',
       frames: this.anims.generateFrameNumbers('botonCambiar', { start: 1, end: 1 }),
       frameRate: 1,
         repeat: 0
     });
 
     this.anims.create({
       key: 'buttonClickC',
       frames: this.anims.generateFrameNumbers('botonCambiar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     // Configura la interactividad del botón
     cambiar.on('pointerover', () => {
      cambiar.play('buttonHoverC');
     });
 
     cambiar.on('pointerout', () => {
      cambiar.play('buttonNormalC');
     });
 
     cambiar.on('pointerdown', () => {
      cambiar.play('buttonClickC');
      cambio = true;
      if(cambio = true){
        const escribir=this.add.sprite(1280/2, 540/2, 'Escribir').setInteractive();
        var text = this.add.text(980/2, 520/2,'', { fontSize: '32px', fill: '#000' }).setInteractive();
        const verificar=this.add.sprite(1908/2, 540/2, 'Verificar').setInteractive();

          this.input.keyboard.on('keydown', function (event) {
            // Verificar si se ha presionado una tecla alfanumérica
            if (/^[a-zA-Z0-9]$/.test(event.key)&& cambio) {
                // Actualizar el texto con la tecla presionada
                text.text += '*';
                //text.text += event.key;
                }
                else if (event.key === 'Backspace'&& cambio) {
                  // Eliminar el último carácter si se presiona la tecla "Backspace"
                  text.text = text.text.slice(0, -1);
              }
              else if (event.key === 'Enter'&& cambio) {
                const buttonId = text.getData('password');
            }
              });

      }
       });
 
       cambiar.on('pointerup', () => {
        cambiar.play('buttonHoverC');
       });

    //atras
    this.anims.create({
      key: 'buttonNormalA',
       frames: this.anims.generateFrameNumbers('botonAtras', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     this.anims.create({
       key: 'buttonHoverA',
       frames: this.anims.generateFrameNumbers('botonAtras', { start: 1, end: 1 }),
       frameRate: 1,
         repeat: 0
     });
 
     this.anims.create({
       key: 'buttonClickA',
       frames: this.anims.generateFrameNumbers('botonAtras', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     // Configura la interactividad del botón
     atras.on('pointerover', () => {
      atras.play('buttonHoverA');
     });
 
     atras.on('pointerout', () => {
      atras.play('buttonNormalA');
     });
 
     atras.on('pointerdown', () => {
      atras.play('buttonClickA');
      this.scene.start('opciones');

       });
 
       atras.on('pointerup', () => {
        atras.play('buttonHoverA');
       });

    //cerrar
    this.anims.create({
      key: 'buttonNormalCE',
       frames: this.anims.generateFrameNumbers('botonCerrar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     this.anims.create({
       key: 'buttonHoverCE',
       frames: this.anims.generateFrameNumbers('botonCerrar', { start: 1, end: 1 }),
       frameRate: 1,
         repeat: 0
     });
 
     this.anims.create({
       key: 'buttonClickCE',
       frames: this.anims.generateFrameNumbers('botonCerrar', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     // Configura la interactividad del botón
     cerrar.on('pointerover', () => {
      cerrar.play('buttonHoverCE');
     });
 
     cerrar.on('pointerout', () => {
      cerrar.play('buttonNormalCE');
     });
 
     cerrar.on('pointerdown', () => {
      cerrar.play('buttonClickCE');
      cambio = false;
      this.scene.start('menu-inicio');

       });
 
       cerrar.on('pointerup', () => {
        cerrar.play('buttonHoverCE');
       });

       //Pinchar el Fondo

       
       fondo.on('pointerdown', () => {
        cambio = false;
      });

       


  }
}

function StarOpciones(){
  this.scene.start('opciones');
}

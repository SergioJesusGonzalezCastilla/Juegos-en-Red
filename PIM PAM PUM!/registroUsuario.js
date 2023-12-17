export class Registro extends Phaser.Scene{

    constructor(){
      super({key:'registro'});
    }
  
    preload(){
  
      this.load.image('RegistroF', 'resources/RegistroUsuarios.png')
      
    }
  
    create(){

        var Bool1 = false;
        var Bool2 = false;

      var fondo = this.add.image(1280/2, 720/2, 'RegistroF').setInteractive();
      var text = this.add.text(980/2, 655/2,'Introduce Usuario', { fontSize: '32px', fill: '#000' }).setInteractive();
      var text2 = this.add.text(980/2, 930/2,'Introduce Contraseña', { fontSize: '32px', fill: '#000' }).setInteractive();

      fondo.on('pointerdown', () => {
        Bool1 = false;
        Bool2 = false;
      });

      text.on('pointerdown', () => {
        Bool1 = true;
        Bool2 = false;
      });

      text2.on('pointerdown', () => {
        Bool1 = false;
        Bool2 = true;
      });

      this.input.keyboard.on('keydown', function (event) {
        // Verificar si se ha presionado una tecla alfanumérica
        if (/^[a-zA-Z0-9]$/.test(event.key)&& Bool1) {
            // Actualizar el texto con la tecla presionada
            text.text += event.key;}

        else if(/^[a-zA-Z0-9]$/.test(event.key)&& Bool2){
            text2.text += event.key;
            console.log('puta');

        } 

        else if (event.key === 'Backspace'&& Bool1) {
            // Eliminar el último carácter si se presiona la tecla "Backspace"
            text.text = text.text.slice(0, -1);
        }
        else if (event.key === 'Backspace'&& Bool2) {
            // Eliminar el último carácter si se presiona la tecla "Backspace"
            text2.text = text2.text.slice(0, -1);
        }
    });

    }

  }
  
import { Component } from '@angular/core';

interface Componente{
  icon: string; 
  name: string; 
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {}

  componentes: Componente[] = [
    { icon: 'earth-outline',
      name: 'Conoce más',
      redirecTo: '/informacion'
    },
    { icon: 'flower-outline',
      name: 'Tipos energías no contaminantes',
      redirecTo: '/energias'
    },
    { icon: 'document-outline',
      name: 'Datos',
      redirecTo: '/data'
    },
    { icon: 'paw-outline',
      name: '¿Sabías qué?',
      redirecTo: '/api'
    },
  ];
}

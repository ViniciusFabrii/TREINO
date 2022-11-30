import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Exercicio } from 'src/app/interfaces/exercicio';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(private toast: ToastController) {
    this.exercicios = JSON.parse(localStorage.getItem('exercicios') || '[]');
  }
  exercicios: Exercicio[] = [];
  
  excluirexercicios: Exercicio[] = [];

  novoExercicio: Exercicio = {
    nome: undefined,
    quantidade: undefined,
    repeticoes: undefined,
  };

  ngOnInit() {
  }
  limparExercicio() {
    this.novoExercicio = {
      nome: undefined,
      quantidade: undefined,
      repeticoes: undefined,
    };
  }
  addExercicio() {
    this.exercicios.push(this.novoExercicio);
    localStorage.setItem('exercicios', JSON.stringify(this.exercicios));
    this.limparExercicio();
  }
  excluirExercicio(indice: number) {
    //clonar o array de exercicios para o array de backup
    this.excluirexercicios = this.exercicios.slice(0);
    console.log(this.excluirexercicios);
    this.exercicios.splice(indice, 1);
    localStorage.setItem('exercicios', JSON.stringify(this.exercicios));
    const toast = this.toast.create({
      position: 'top',
      color: 'danger',
      message: 'Exercício excluído com sucesso!',
      duration: 3000,
      buttons: [
        {
          side: 'end',
          text: 'Desfazer',
          handler: () => {
            this.exercicios = this.excluirexercicios.slice(0);
            localStorage.setItem('exercicios', JSON.stringify(this.exercicios));
          },
        },
      ],
    });
    toast.then((t) => t.present());
  }
}


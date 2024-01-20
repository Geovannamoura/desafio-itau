import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Advinhe a palavra</h1>
      <p>Palavra: {{ palavraEscondida.join(' ') }}</p>
      <p>Chutes errados: {{ letrasChutadasErradas.join(', ') }}</p>
      <p>Erros: {{ erros }}</p>
      <p>Chances restantes: {{ chancesRestantes }}</p>
      <input [(ngModel)]="letraChute" placeholder="Chute uma letra" />
      <button (click)="chutar()">Chutar</button>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  palavras = ['angular', 'javascript', 'typescript', 'html', 'css'];
  palavraSecreta: string = '';
  palavraEscondida: string[] = [];
  letrasChutadas: string[] = [];
  letrasChutadasErradas: string[] = [];
  erros = 0;
  chancesRestantes: number = 0;
  letraChute: string = '';

  constructor() {
    this.iniciarJogo();
  }

  iniciarJogo() {
    this.palavraSecreta = this.palavras[Math.floor(Math.random() * this.palavras.length)];
    this.palavraEscondida = Array(this.palavraSecreta.length).fill('_');
    this.letrasChutadas = [];
    this.letrasChutadasErradas = [];
    this.erros = 0;
    this.chancesRestantes = this.palavraSecreta.length * 2;
  }

  chutar() {
    if (this.letraChute && this.letrasChutadas.indexOf(this.letraChute) === -1) {
      this.letrasChutadas.push(this.letraChute);

      let acertou = false;

      for (let i = 0; i < this.palavraSecreta.length; i++) {
        if (this.palavraSecreta[i] === this.letraChute) {
          this.palavraEscondida[i] = this.letraChute;
          acertou = true;
        }
      }

      if (!this.palavraEscondida.includes('_')) {
        alert('Parabéns! Você acertou a palavra!');
        this.iniciarJogo();
      }

      if (!acertou) {
        this.letrasChutadasErradas.push(this.letraChute);
        this.erros++;
        this.chancesRestantes--;

        if (this.chancesRestantes === 0) {
          alert('Você perdeu! A palavra correta era: ' + this.palavraSecreta);
          this.iniciarJogo();
        }
      }

      this.letraChute = '';
    }
  }
}

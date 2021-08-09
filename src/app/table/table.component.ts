import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string;
  message: string;
  roundDraw: boolean;
  lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() {
  }

  ngOnInit() {
  this.newGame();
  }

  // tslint:disable-next-line:typedef
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.roundDraw = false;
  }
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }
  makeMove( idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    if (this.winner !== null) {
      Swal.fire(`Player ${this.winner} won the game!!`,
      ).then(r => {
        this.newGame();
        return;
      });
    }
    this.roundDraw = this.calculateDraw();
    if (this.roundDraw){
      Swal.fire('Draw Game , Play again')
        .then(r => {
        this.newGame();
      });
    }
  }
    calculateDraw(){
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.lines.length; i++) {
        const roundDraw = !this.squares.includes(null) && this.winner == null;
        if (roundDraw) {
          return true;
        }
      }
    }

    calculateWinner() {
    // tslint:disable-next-line:prefer-for-of
     for ( let i = 0; i < this.lines.length; i++){
       const [a, b, c] = this.lines[i];
       if (
         this.squares[a] && this.squares[a] === this.squares[b]
         && this.squares[a] === this.squares[c]
       ) {
         return this.squares[a];
       }
     }
     return null;
    }
  }


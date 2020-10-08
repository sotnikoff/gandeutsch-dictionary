import { Component, OnInit } from '@angular/core';
const json = require('../assets/dictionary.json');
import { Word } from './interfaces/word.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  queue: string;
  initialWords: Word[];
  words: Word[];
  searchActive = false;
  direction: 'gd-ru' | 'ru-gd';

  constructor() {
    this.direction = 'gd-ru';
  }

  ngOnInit(): void {
    this.initialWords =  _.sortBy(require('../assets/dictionary.json'), 'gd', 'asc').map((r: Word) => {
      r.active = false;
      return r;
    });
    this.words = this.initialWords;
  }

  directionToRuGd(): void {
    if (this.direction === 'ru-gd') {
      return;
    }
    this.initialWords =  _.sortBy(this.initialWords, 'ru', 'asc');
    this.words = this.initialWords;
    this.direction = 'ru-gd';
  }

  directionToGdRu(): void {
    if (this.direction === 'gd-ru') {
      return;
    }
    this.initialWords =  _.sortBy(this.initialWords, 'gd', 'asc');
    this.words = this.initialWords;
    this.direction = 'gd-ru';
  }

  onSearch(): void {
    if (this.direction === 'gd-ru') {
      this.words = this.initialWords.filter(w => {
        return w.gd.toLowerCase().startsWith(this.queue.toLowerCase());
      });
    } else {
      this.words = this.initialWords.filter(w => {
        return w.ru.toLowerCase().startsWith(this.queue.toLowerCase());
      });
    }
  }

  onFocusSearch(): void {
    this.searchActive = true;
  }

  onBlurSearch(): void {
    this.searchActive = false;
  }

  onClick(word: Word): void {
    this.words.forEach(w => {
      w.active = false;
    });
    word.active = true;
  }
}

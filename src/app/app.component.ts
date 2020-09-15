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

  ngOnInit(): void {
    this.initialWords =  _.sortBy(require('../assets/dictionary.json'), 'gd', 'asc');
    this.words = this.initialWords;
  }

  onSearchGdRu(): void {
    this.words = this.initialWords.filter(w => {
      return w.gd.toLowerCase().startsWith(this.queue.toLowerCase());
    });
  }
}

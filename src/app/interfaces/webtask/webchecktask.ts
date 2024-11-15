import {ThemePalette} from '@angular/material/core';

export interface Webchecktask {
    id: string;
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Webchecktask[];
  }
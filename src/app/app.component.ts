import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { QuizComponent } from './quiz/quiz.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-test';
  
 readonly quiz = inject(MatDialog);
 readonly info = inject(MatDialog);

 openQuiz() {
   this.quiz.open(QuizComponent, {
     restoreFocus: false,
     width: '80vw',
     height: '80vh',
     maxWidth: '90vw'
   })
  }

  openInfo() {
    this.info.open(InfoComponent, {
      restoreFocus: false,
      width: '80vw',
      height: '80vh',
      maxWidth: '90vw'

    })
   }
}

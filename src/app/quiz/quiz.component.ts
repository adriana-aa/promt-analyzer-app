import {ChangeDetectionStrategy, Component, inject, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {
 
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  
} from '@angular/material/dialog';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  
questions = [
  {
    question: '¿Question 1?',
    options: ['Berlin', 'Madrid', 'Paris', 'Roma'],
    answer: 'Berlin',
  },
  {
    question: '¿Question 2?',
    options: ['Java', 'TypeScript', 'Python', 'PHP'],
    answer: 'TypeScript',
  },
];


currentIndex = 0; //save the index of the current question
  selectedOption: string | null = null; //save the choice of the user
  score = 0; // how many good answered
  quizCompleted = false; //the quiz finish?

get currentQuestion() { //access the question from html
  return this.questions[this.currentIndex];
}

selectOption(option: string) { //we call this when user select an option and save this choice
  this.selectedOption = option;
}

submitAnswer() {
  if (this.selectedOption === this.currentQuestion.answer) { //compare the selectec question with the answer, add point if correct
    this.score++;

  }

  this.selectedOption = null; //selected question 0 again
  this.currentIndex++; // and to the next question

  if (this.currentIndex >= this.questions.length) { //if the  index is bigger than the number of question quiz finished
    this.quizCompleted = true;
  }
}



}

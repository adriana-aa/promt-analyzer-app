import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
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

  currentIndex = 0;
  selectedOption: string | null = null;
  score = 0;
  quizCompleted = false;
  feedback: 'correct' | 'wrong' | null = null; 

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  submitAnswer() {
    if (!this.selectedOption) return;

    // Comprobamos si la respuesta es correcta
    if (this.selectedOption === this.currentQuestion.answer) {
      this.score++;
      this.feedback = 'correct';
    } else {
      this.feedback = 'wrong';
    }

    // Esperar 1 segundo antes de pasar a la siguiente pregunta
    setTimeout(() => {
      this.selectedOption = null;
      this.feedback = null;
      this.currentIndex++;

      if (this.currentIndex >= this.questions.length) {
        this.quizCompleted = true;
      }
    }, 1500);
  }
}

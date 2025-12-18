import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogClose],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  questions = [
    {
      question: 'Why do large AI models consume so much electricity?',
      options: [
        'Because of high screen resolution',
        'Due to intensive training and data center computation',
        'Because they are always connected to the internet',
        'Due to user interface rendering'
      ],
      answer: 'Due to intensive training and data center computation'
    },
    {
      question: 'Which infrastructure is mainly responsible for the high energy consumption of AI?',
      options: [
        'Smartphones',
        'Cloud data centers',
        'Home routers',
        'Personal computers'
      ],
      answer: 'Cloud data centers'
    },
    {
      question: 'What environmental impact can result from increasing AI energy demand?',
      options: [
        'More electronic waste',
        'Higher CO₂ emissions',
        'Slower internet connections',
        'Lower data quality'
      ],
      answer: 'Higher CO₂ emissions'
    },
    {
      question: 'What does the term “Green Prompting” mean?',
      options: [
        'Using a green-colored AI interface',
        'Formulating prompts in an energy-efficient way',
        'Running AI only on renewable energy',
        'Using AI without an internet connection'
      ],
      answer: 'Formulating prompts in an energy-efficient way'
    },
    {
      question: 'How can users reduce the energy consumption when using AI systems?',
      options: [
        'By writing longer and more complex prompts',
        'By repeating the same request multiple times',
        'By using clear and precise prompts',
        'By using multiple AI models simultaneously'
      ],
      answer: 'By using clear and precise prompts'
    },
    {
      question: 'Who shares responsibility for the sustainable use of AI?',
      options: [
        'Only AI developers',
        'Only policymakers',
        'Both developers and users',
        'Only energy providers'
      ],
      answer: 'Both developers and users'
    }
  ];

  currentIndex = 0;
  selectedOption: string | null = null;
  score = 0;
  elp = 0; // Earth Life Points
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

    if (this.selectedOption === this.currentQuestion.answer) {
      this.score++;
      this.elp += 100; // +100 ELP pro richtige Antwort
      this.feedback = 'correct';
    } else {
      this.feedback = 'wrong';
    }

    setTimeout(() => {
      this.selectedOption = null;
      this.feedback = null;
      this.currentIndex++;

      if (this.currentIndex >= this.questions.length) {
        this.quizCompleted = true;
      }
    }, 1000);
  }
}

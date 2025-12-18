import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { InfoComponent } from './info/info.component';
import { ResourcesComponent } from './resources/resources.component';
import { PromptInputComponent } from './prompt-input/prompt-input.component';
import { PromptService } from './prompt-input/prompt-service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PromptInputComponent, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-test';

  readonly quiz = inject(MatDialog);
  readonly info = inject(MatDialog);
  readonly resource = inject(MatDialog);

  prompt = '';
  evaluation: 'okay' | 'medium' | 'bad' = 'okay';


  ratingTexts = {
    okay: [
      "- A few web searches were done.",
      "- Tiny amount of electricity used.",
      "- No noticeable environmental impact."
    ],
    medium: [
      "- Your prompt used several servers, roughly the electricity of a small home for an hour.",
      "- Cloud storage and computing resources temporarily increased, like running a few laptops continuously.",
      "- Some electricity and cooling needed, equivalent to a few light bulbs running all day."
    ],
    bad: [
      "- Processing this long prompt consumed multiple server racks, roughly equal to a small factory’s daily energy use.",
      "- Large-scale computations increased carbon emissions enough to power several homes for a day.",
      "- Servers worked at full capacity, drawing electricity and cooling like clearing a small forest for data center expansion."
    ]
  };

  leftPanelTexts: string[] = [];

  constructor(private promptService: PromptService) {
    this.promptService.promptText.subscribe(text => {
      this.prompt = text;
      this.evaluation = this.evaluatePrompt(text);
      this.leftPanelTexts = this.ratingTexts[this.evaluation];
    });
  }

  evaluatePrompt(text: string): 'okay' | 'medium' | 'bad' {
    const count = text.trim().split(/\s+/).length;

    if (count <= 5) return 'okay';
    if (count <= 15) return 'medium';
    return 'bad';
  }

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

  openResources() {
    this.info.open(ResourcesComponent, {
      restoreFocus: false,
      width: '80vw',
      height: '80vh',
      maxWidth: '90vw'

    })
  }

  toggleAudio(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}
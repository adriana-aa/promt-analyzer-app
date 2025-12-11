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
      "Die Datenbanken mussten nur minimal belastet werden.",
      "Die Energieaufnahme bleibt fast im Grundverbrauch.",
      "Nur ein Bruchteil der Rechenkerne wurde aktiviert."
    ],
    medium: [
      "Mehrere Rechenknoten mussten kurzzeitig hochgefahren werden.",
      "Der Speicherbedarf lag klar über dem Baseline-Niveau.",
      "Die Serverfarm erzeugte temporär erhöhte Abwärme."
    ],
    bad: [
      "Das Rechenzentrum musste zusätzliche Kapazitäten bereitstellen.",
      "Der Energiebedarf erreichte Peak-Level für die Verarbeitung.",
      "Mehrere GPUs liefen unter Volllast, um deinen Prompt zu bewältigen."
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
}



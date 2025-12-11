import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromptService } from './prompt-service';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.css'
})
export class PromptInputComponent {
  userPrompt: string = '';

  constructor(private promptService: PromptService) { }

  sendPrompt() {
    const cleaned = this.userPrompt.trim();

    if (cleaned) {
      this.promptService.promptText.next(cleaned);
      this.userPrompt = '';
    }
  }
}

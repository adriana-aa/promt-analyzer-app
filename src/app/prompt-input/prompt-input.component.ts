import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.css'
})
export class PromptInputComponent {
  userPrompt: string = '';

  sendPrompt() {
    if (this.userPrompt.trim()) {
      console.log('Prompt enviado:', this.userPrompt);
      this.userPrompt = ''; // limpiar input después de enviar
    }
  }

}

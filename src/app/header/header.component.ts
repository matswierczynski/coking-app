import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() navSelector = new EventEmitter<string>();

  onSelectClicked(selector: string) {
    this.navSelector.emit(selector);
  }

}


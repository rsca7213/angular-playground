import { Component, ElementRef, input, OnInit, output, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroWrenchSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { IconButton } from '../icon-button/icon-button';
import { Card } from '../card/card';
import { TDialogPosition } from '../../types/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [NgIcon, IconButton, Card, NgClass],
  templateUrl: './dialog.html',
  providers: [provideIcons({ heroWrenchSolid, heroXMarkSolid })]
})
export class Dialog implements OnInit {
  // Dialog configuration inputs
  public readonly position = input.required<TDialogPosition>();

  // Dialog content reference
  protected readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  // Output signals
  public readonly opened = output<void>();
  public readonly closed = output<void>();

  public open(): void {
    this.dialog().nativeElement.showModal();
    this.opened.emit();
  }

  public close(): void {
    this.dialog().nativeElement.close();
    this.closed.emit();
  }

  private setupClosers(): void {
    // Get all elements with data 'close' within the dialog
    const closers = this.dialog().nativeElement.querySelectorAll('[data-close]');

    // Add click event listeners to each closer element
    closers.forEach((closer: Element) => {
      closer.addEventListener('click', () => {
        this.close();
      });
    });
  }

  public ngOnInit(): void {
    this.setupClosers();
  }
}

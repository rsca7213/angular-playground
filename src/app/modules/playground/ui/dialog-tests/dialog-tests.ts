import { Component } from '@angular/core';
import { Dialog } from '../../../../shared/ui/dialog/dialog';
import { Button } from '../../../../shared/ui/button/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroWindowSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-dialog-tests',
  imports: [Dialog, Button, NgIcon],
  templateUrl: './dialog-tests.html',
  providers: [provideIcons({ heroWindowSolid, heroXMarkSolid })]
})
export class DialogTests {}

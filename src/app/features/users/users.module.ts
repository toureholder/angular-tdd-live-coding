import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, MatCardModule],
})
export class UsersModule {}

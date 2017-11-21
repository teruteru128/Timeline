import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { FindUserComponent } from './find-user/find-user.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TopPageComponent } from './top-page/top-page.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: TopPageComponent,
        children: [
            {
                path: '',
                component: TimelineComponent
            },
            {
                path: 'finduser',
                component: FindUserComponent
            }
        ]
    }
];

export const ConsumerRouting = RouterModule.forChild(routes);

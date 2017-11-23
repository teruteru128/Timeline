import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { TimelineComponent } from './timeline/timeline.component';
import { TopPageComponent } from './top-page/top-page.component';
import { UnionComponent } from './union/union.component';

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
                path: 'union',
                component: UnionComponent
            }
        ]
    }
];

export const ConsumerRouting = RouterModule.forChild(routes);

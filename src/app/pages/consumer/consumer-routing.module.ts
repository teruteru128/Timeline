import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { TopPageComponent } from './top-page/top-page.component';
import { UnionComponent } from './union/union.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
    {
        path: '',
        component: TopPageComponent,
        children: [
            {
                path: '',
                component: TimelineComponent
            },
            {
                path: 'union',
                component: UnionComponent
            },
            {
                path: 'notify',
                component: NotificationsComponent
            },
            {
                path: 'profile/:id',
                component: ProfileComponent
            }
        ]
    }
];

export const ConsumerRouting = RouterModule.forChild(routes);

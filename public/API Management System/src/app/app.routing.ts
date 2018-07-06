import {Routes, RouterModule} from '@angular/router';
import {AnalysisComponent} from './module/view.analysis';
import {LoginComponent} from './login/login.component';

const appRoutes:Routes = [
  {
    path: '',
    component: AnalysisComponent
  },
  {
    path: 'content',
    component: AnalysisComponent
  },
  {
    path: '**',
    component: AnalysisComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

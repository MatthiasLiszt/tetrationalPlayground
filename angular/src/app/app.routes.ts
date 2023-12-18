import { Routes } from '@angular/router';
import { EqualityComponent } from './equality/equality.component';
import { ExtensionComponent } from './extension/extension.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
  { path: 'equality', component: EqualityComponent },
  { path: 'extension', component: ExtensionComponent },
  { path: 'graph', component: GraphComponent },
];

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserDetailEditComponent} from "../../public_api";

const routes: Routes = [
	{path: '', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

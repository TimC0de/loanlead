import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import User from './bank/user/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'front';
    currentUser: User;

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('current_user'));

        // if (!localStorage.getItem('current_user')) {
        //     if (!this.router.url.includes('/login') &&
        //         !this.router.url.includes('/sign-up')
        //     ) {
        //         this.router.navigate(['/login']);
        //     }
        // } else {
        //     this.currentUser = JSON.parse(localStorage.getItem('current_user'));
        //
        //     if (this.router.url.includes('/login') ||
        //         this.router.url.includes('/sign-up') ||
        //         this.router.url === '/'
        //     ) {
        //         this.router.navigate([
        //             `${
        //                 this.currentUser._role._displayName === 'Administrator'
        //                     ? '/admin'
        //                     : ''
        //                 }/home`
        //         ]);
        //     }
        // }
    }
}

import {Component, OnInit} from '@angular/core';
import User from '../bank/user/user.model';
import {UserService} from '../bank/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(
        private userService: UserService,
    ) {
        this.user = JSON.parse(localStorage.getItem('current_user'));
    }

    ngOnInit() {
        document.title = this.user._fullName;
    }

    
}

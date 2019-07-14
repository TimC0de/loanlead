import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import User from '../user/user.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    lists: NodeListOf<HTMLElement>;
    listHeadingsActive: NodeListOf<HTMLElement>;

    constructor() {
    }

    ngOnInit() {
        document.title = 'Dashboard';

        this.lists = document.querySelectorAll('app-users-list');
        this.listHeadingsActive = document
            .querySelectorAll('.list-heading > .list-heading-active');

        this.lists.forEach((list, index) => {
            list.style.left = `${index * 150}%`;
        });

        this.listHeadingsActive.forEach((listHeadingActive, index) => {
            listHeadingActive.style.left = `${index * -100}%`;
        });
    }

    move(direction: string) {
        this.lists.forEach((list, index) => {
            list.style.left = `${
                parseInt(list.style.left, 10) + (
                    direction === 'next' 
                        ? -150 
                        : 150
                )}%`;
        });

        let activeListHeadingIndex = 0;

        this.listHeadingsActive.forEach((listHeadingActive, index) => {
            if (listHeadingActive.parentElement.classList.contains('active')) {
                activeListHeadingIndex = index;
            }

            listHeadingActive.style.left = `${
                    parseInt(listHeadingActive.style.left, 10) + (
                        direction === 'next'
                            ? 100
                            : -100
                )}%`;
        });

        this.listHeadingsActive[Math.abs(activeListHeadingIndex - 1)]
            .parentElement.classList.add('active');

        this.listHeadingsActive[activeListHeadingIndex]
            .parentElement.classList.remove('active');
    }
}

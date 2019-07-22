import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements DoCheck {
    @Input() lastPage: number;
    @Output() pageChanged: EventEmitter<number>;

    currentPage = 1;
    previousPage = 1;

    constructor() {
        this.pageChanged = new EventEmitter();
    }

    ngDoCheck() {
        if (this.currentPage !== this.previousPage) {
            if (this.lastPage > 5) {
                document.querySelector('.active').classList.remove('active');

                if (this.currentPage < 3 || this.currentPage > this.lastPage - 2) {
                    document.getElementById(`page_${this.currentPage}`).classList.add('active');
                } else {
                    const midPage = document.querySelector('.mid-page');

                    if (!midPage.classList.contains('active')) {
                        midPage.classList.add('active');
                    }
                }
            } else {
                document.querySelector('.pagination > .active').classList.remove('active');
                document.getElementById(`page_${this.currentPage}`).classList.add('active');
            }

            this.previousPage = this.currentPage;
        }
    }

    changePage(newPageNumber: number) {
        this.currentPage = newPageNumber;

        this.pageChanged.emit(this.currentPage);
    }

    getDivPage() {
        if (this.currentPage < 3) {
            return 3;
        } else if (this.currentPage > this.lastPage - 3) {
            return this.lastPage - 2;
        } else {
            return this.currentPage;
        }
    }

    defaultPages() {
        return (new Array(this.lastPage)).fill(undefined).map((_, i) => i + 1);
    }
}

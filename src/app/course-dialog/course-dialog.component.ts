import {Component, Inject, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { filter, concatMap, exhaustMap } from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import { CoursesService } from '../services/courses.service';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit  {

    form: FormGroup;
    description:string;
    course:Course;

    @ViewChild('saveButton') saveButton: ElementRef;
    
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            iconUrl: [course.iconUrl, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {
        this.form.valueChanges
        .pipe(
            filter(() => this.form.valid),
            concatMap(changes => this.saveProduct(changes))
        )
        .subscribe();
    }

    saveProduct(changes) {
        return fromPromise(fetch(`${CoursesService.API_URL}/products/01.json`,{
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }

    ngAfterViewInit() {

        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                exhaustMap(() => this.saveProduct(this.form.value))
            )
            .subscribe();

    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}

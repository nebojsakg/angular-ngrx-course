import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { allCoursesLoaded } from 'app/courses/course.selectors';
import { AllCoursesLoaded, AllCoursesRequested, CourseLoaded, CourseRequested, CoursesActionTypes } from 'app/courses/courses.actions';
import { CoursesService } from 'app/courses/services/courses.service';
import { AppState } from 'app/reducers';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CourseEffects {

  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequested>(CoursesActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
    map(course => new CourseLoaded({course}))
  );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<AllCoursesRequested>(CoursesActionTypes.AllCoursesRequested),
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
    mergeMap(() => this.coursesService.findAllCourses()),
    map(courses => new AllCoursesLoaded({courses}))
  );

  constructor(private actions$: Actions, private coursesService: CoursesService,
              private store: Store<AppState>) {
  }
}

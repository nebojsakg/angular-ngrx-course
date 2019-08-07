import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { select, Store } from '@ngrx/store';
import { LessonsPageRequested, PageQuery } from 'app/courses/course.actions';
import { selectLessonsPage } from 'app/courses/course.selectors';
import { AppState } from 'app/reducers';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';
import { catchError, finalize, tap } from 'rxjs/operators';


export class LessonsDataSource implements DataSource<Lesson> {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private store: Store<AppState>) {

  }

  loadLessons(courseId: number, page: PageQuery) {

    this.store.pipe(
      select(selectLessonsPage(courseId, page)),
      tap(lessons => {
        if (lessons.length > 0) {
          this.lessonsSubject.next(lessons);
        } else {
          this.store.dispatch(new LessonsPageRequested({courseId, page}));
        }
      }),
      catchError(err => of([]))
    ).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    console.log('Connecting data source');
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
  }

}


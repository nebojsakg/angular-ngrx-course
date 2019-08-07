import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Course } from 'app/courses/model/course';

export enum CoursesActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Courses Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseSaved = '[Edit Course Dialog] Course Saved'
}

export class CourseRequested implements Action {
  readonly type = CoursesActionTypes.CourseRequested;

  constructor(public payload: { courseId: number }) {
  }
}

export class CourseLoaded implements Action {
  readonly type = CoursesActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {
  }
}

export class AllCoursesRequested implements Action {
  readonly type = CoursesActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CoursesActionTypes.AllCoursesLoaded;

  constructor(public payload: { courses: Course[] }) {
  }
}

export class CourseSaved implements Action {
  readonly type = CoursesActionTypes.CourseSaved;

  constructor(public payload: { course: Update<Course> }) {
  }
}

export type CourseActions =
  CourseRequested |
  CourseLoaded |
  AllCoursesRequested |
  AllCoursesLoaded |
  CourseSaved;

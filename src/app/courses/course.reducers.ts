import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions, CoursesActionTypes } from 'app/courses/courses.actions';
import { Course } from 'app/courses/model/course';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> =
  createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(state = initialCoursesState, action: CourseActions): CoursesState {
  switch (action.type) {

    case CoursesActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);

    case CoursesActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded: true});

    case CoursesActionTypes.CourseSaved:
      return adapter.updateOne(action.payload.course, state);

    default: {
      return state;
    }
  }
}


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

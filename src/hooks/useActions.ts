import {bindActionCreators, ActionCreator} from 'redux';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

export function useActions(
  actions: ActionCreator | ActionCreator[],
  deps = null,
) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}

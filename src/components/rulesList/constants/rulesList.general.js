export const ACTIONS = {
  DELETE: 'DELETE',
  CLONE: 'CLONE',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  ARCHIVE: 'ARCHIVE',
  MARK_FAVOURITE: 'MARK_FAVOURITE',
  REPORT: 'REPORT',
};

export const MOVE_DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
};

export const RULES_ACTIONS = [
  {
    label: 'Delete',
    action: ACTIONS.DELETE
  },
  {
    label: 'Clone',
    action: ACTIONS.CLONE
  },
  {
    label: 'Move Up',
    action: ACTIONS.MOVE_UP
  },
  {
    label: 'Move Down',
    action: ACTIONS.MOVE_DOWN
  }
];

import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { RULES_ACTIONS, ACTIONS, ODD_EVEN_CLASSNAMES } from '../../constants/rulesList.general';

import s from './ruleListItem.module.css';

const getRuleItems = (id) => {
  return RULES_ACTIONS.map(({ label, action }) => (
    <span
      data-action={action}
      data-id={id}
    >
      {label}
    </span>
  ));
};

const RulesListItem = (props) => {
  const { index, style, data } = props;
  const rule = data[index];
  const { id, ruleName } = rule;
  const dataActionProps = {
    'data-id': id,
  }
  return (
    <div data-ruleid={id} className={ODD_EVEN_CLASSNAMES[index % 2]} style={style}>
      <div className={s.titleAndActionsContainer}>
        <div className={s.ruleName}>
          { ruleName }
        </div>
        <div className={s.ruleActions}>
          {getRuleItems(id)}
        </div>
      </div>
    </div>
  );
};

RulesListItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data:  PropTypes.array.isRequired,
};

export default RulesListItem;

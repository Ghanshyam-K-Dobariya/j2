import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { RULES_ACTIONS } from '../../constants/rulesList.general';

import s from './ruleListItem.module.css';
const ODD_EVEN_CLASSNAMES = {
  0: s.ruleItemEven,
  1: s.ruleItemOdd,
};


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

  return (
    <div data-ruleid={id} className={`${s.ruleItem} ${ODD_EVEN_CLASSNAMES[index % 2]}`} style={style}>
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

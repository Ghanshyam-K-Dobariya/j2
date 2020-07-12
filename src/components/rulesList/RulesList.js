import React from 'react';

// Components
import { FixedSizeList as List } from 'react-window';
import RulesListItem from './widgets/ruleListItem';

// Constants
import { ACTIONS, MOVE_DIRECTIONS } from './constants/rulesList.general';

// Services
import fetchRulesListData from './services/rulesList.service';

// Style
import style from './rulesList.module.css';

const INITAL_STATE = {
  isLoading: true,
  hasError: false,
  data: null,
};

class RulesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITAL_STATE;
  }

  componentDidMount() {
    this.fetchWidgetData();
  }

  fetchWidgetData = () => {
    fetchRulesListData()
      .then(this.setWidgetData)
      .catch(this.setError);
  }

  setWidgetData = data => this.setState({ data, isLoading: false, hasError: false });

  setError = () => this.setState({ data: null, isLoading: false, hasError: true });

  getRulesItemKey = (index) => {
    const { data } = this.state;
    return data[index].id;
  }

  deleteRuleById = (id) => {
    const { data } = this.state;
    const newData = data.filter(rule => rule.id !== id);
    this.setState({ data: newData });
  }

  cloneRuleById = (id) => {
    const { data } = this.state;
    const newData = [];
    data.forEach(rule => {
      newData.push(rule);
      if (rule.id === id) {
        const { ruleName, cloneCount = 0 } = rule;
        const newId = `${id}_cloned_${new Date().getTime()}`;
        const newLabel = `${ruleName} Clone ${cloneCount + 1}`;
        const clonedRule = {
          ...rule,
          id: newId,
          ruleName: newLabel,
        }
        newData.push(clonedRule);
        rule.cloneCount = cloneCount + 1;
      }
    });
    this.setState({ data : newData });
  }

  moveRuleItem = (id, direction) => {
    if (!MOVE_DIRECTIONS[direction]) return null;
    const { data } = this.state;
    const totalRules = data.length;

    const isMovingFirstItemUp = (
      direction === MOVE_DIRECTIONS.UP &&
      id === data[0].id
    );
    const isMovingLastItemDown = (
      direction === MOVE_DIRECTIONS.DOWN &&
      id === data[totalRules - 1].id
    );

    if (isMovingFirstItemUp || isMovingLastItemDown) {
      console.log('action not applicable')
      return null;
    }

    const position = data.findIndex(rule => rule.id === id);
    const newData = [...data];
    const rule = newData[position];
    if (direction === MOVE_DIRECTIONS.UP) {
      const temp = data[position - 1];
      newData[position - 1] = rule;
      newData[position] = temp;
    } else {
      const temp = data[position + 1];
      newData[position + 1] = rule;
      newData[position] = temp;
    }
    this.setState({  data: newData });
  }

  handleRuleClick = (event) => {
    event.stopPropagation();
    const { dataset } = event.target;
    const { action, id } = dataset;
    
    switch (action) {
      case ACTIONS.DELETE:
        this.deleteRuleById(id)
        break;
      case ACTIONS.CLONE:
          this.cloneRuleById(id);
          break;
      case ACTIONS.MOVE_UP:
          this.moveRuleItem(id, MOVE_DIRECTIONS.UP);
          break;
      case ACTIONS.MOVE_DOWN:
        this.moveRuleItem(id, MOVE_DIRECTIONS.DOWN);
        break;
      default:
        // todo - do nothing..
        break;
    };
  }

  render() {
    const { isLoading, hasError, data } = this.state;
    if (isLoading) {
      return <h2>Loading...</h2>
    }
    if (hasError) {
      return <h2>Somethign went wrong...</h2>
    }

    return (
      <div
        className={style.rulesList}
        onClick={this.handleRuleClick}
      >
        <h2>Total Rules Items : {data.length}</h2>
        <List
          height={550}
          itemData={data}
          itemCount={data.length}
          itemSize={50}
          itemKey={this.getRulesItemKey}
        >
          {RulesListItem}
        </List>
      </div>
    );
  }
}

export default RulesList;

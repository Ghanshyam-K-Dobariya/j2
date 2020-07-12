import parseRulesList from './rulesList.parser';
import jivoxRules from './constants/jivoxRules.json';


const fetchRulesListData = () => {
  return new Promise((resolve) => {
    const parsedData = parseRulesList(jivoxRules);
    setTimeout(() => {
      resolve(parsedData);
    });
  });
};

export default fetchRulesListData;

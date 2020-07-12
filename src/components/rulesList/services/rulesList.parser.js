const getRuleItem = (jivoxRule) => {
  const { id, ruleName } = jivoxRule;
  return { id, ruleName };
};

const parseRulesList = (apiResponse) => {
  const data = apiResponse.data;
 
  return data.map(getRuleItem);
};

export default parseRulesList;

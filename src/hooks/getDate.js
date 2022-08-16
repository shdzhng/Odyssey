const getDate = (prop) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  if (prop === 'min') return `${yyyy}-${mm}-${dd}`;
  if (prop === 'max') return `${yyyy + 10}-${mm}-${dd}`;
};

export default getDate;

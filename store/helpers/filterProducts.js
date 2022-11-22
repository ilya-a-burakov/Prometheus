
export function filterProducts (filter, products) {
  let filteredList = [...products]

  // Filter status
  if (filter.status == 'all') {
    const filtered = filteredList;
    filteredList = filtered
  }
  if (filter.status !== 'all') {

    const filtered = filteredList.filter(project => {
    	var projectsArr = project.status.toString().split(' ');	
    	return projectsArr.filter(function(category) {
    		return category.indexOf(filter.status) > -1;
		}).length === 1;
    })
    filteredList = filtered
  }
  return filteredList
}

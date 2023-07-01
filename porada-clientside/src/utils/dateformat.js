const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateformat = (arg) =>{
	return new Date(arg).toLocaleDateString("uk-UA", options)
}

export default dateformat
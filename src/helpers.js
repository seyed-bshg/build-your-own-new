const helpers = {
	createMarkup: function(text) {
	  return {
	     __html: text   
	   };
  },
 formatter: new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	}),
 
}
export default helpers;
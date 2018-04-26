import React from 'react';

LoginToken = React.createClass({
  
  componentWillMount() {
    const {token} = this.props;
  	//console.log(token, 1);
    if(token) {
      Meteor.call('authenticate', token, (error, result) => {
        if(error) {
          log(error);
        } else {
          // done
          sessionStorage.DrLoginToken = token;
          RouterUtils.redirect('/');
        }
      });
    }
  },


  componentDidMount() {
  
  },


  render() {
    return (
	    <Loading />
    );
  },

  
})

'use strict';

// var optly = new OptimizelyAPI({
//                 password: "test",
//                 client_id: 12254990965
//             });
//
// const { Component, h, render } = window.preact;
//
// /** Example classful component */
// class App extends Component {
//   componentWillMount(){
//     this.state = {accountData: {product_usages: [{projects: {}}]}};
//   }
//
//   componentDidMount() {
//     var accountInfo = optly.get("plan", function(res){
//       this.setState({accountData: res});
//       // console.log(this.state);
//     }.bind(this));
// 	}
//
// 	render(props, state) {
//     return (
//       h('div', null, "Test")
//       // h('div', {id:'app'},
// 			// 	//h(Header, { message: state.message }),
// 			// 	h(UsageList, { projectData: this.state.accountData.product_usages[0].projects })
// 			// )
// 		);
// 	}
// }
//
// const UsageList = (props) => {
//   console.log(props.projectData);
//   var projectElements = [];
//
//   for (project in props.projectData){
//     projectElements.push(
//       h('div', null, props.projectData[project])
//     );
//   }
//
//   return h('div', null, projectElements);
// };
//
// /** Instead of JSX, use: h(type, props, ...children) */
// // class UsageList extends Component {
// // 	render() {
// //     console.log(props);
// //     const items = [1,2,3,4,5].map( (item) => (
// // 			h('li', {id:item}, 'Item '+item)
// // 		));
// // 		return (
// // 			h('main', null,
// // 				h('ul', null, items)
// // 			)
// // 		);
// // 	}
// // }
//
// /** Components can just be pure functions */
// const Header = (props) => {
// 	return h('header', null,
// 		h('h1', null, 'App'),
// 		props.message && h('h2', null, props.message)
// 	);
// };
//
// render(h(App), document.body);

const { Component, h, render } = window.preact;


/** Example classful component */
class App extends Component {
	componentDidMount() {
		this.setState({ message:'Hello!' });
	}

	render(props, state) {
    console.log("rendering");
    return
      h(
          'div',
          { id: 'foo' },
          h('span', null, 'Hello!')
      )
	}
}


render(h(App), document.body);

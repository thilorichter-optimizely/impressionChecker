'use strict';

var optly = new OptimizelyAPI({
                password: "test",
                client_id: 12254990965
            });

const { Component, h, render } = window.preact;

/** Example classful component */
class App extends Component {
  componentWillMount(){
    this.state = {projects: {}};
  }

  componentDidMount() {
    var accountInfo = optly.get("plan", function(res){
      this.setState({projects: res.product_usages[0].projects});

      var projectList = this.state.projects;

      optly.get("projects?per_page=60", function(projects){
        for (var project in projectList) {

          var replacementProject = _.find(projects, {id: parseInt(project)});

          Object.defineProperty(projectList, replacementProject.name, Object.getOwnPropertyDescriptor(projectList, project));
          delete projectList[project];
        }

        this.setState({projects: projectList});
      }.bind(this));

    }.bind(this));
	}

	render(props, state) {
    return (
      h('div', {id:'app'},
				//h(Header, { message: state.message }),
				h(UsageList, { projectData: this.state.projects })
			)
		);
	}
}

const UsageList = (props) => {
  var projectElements = [];

  for (var project in props.projectData){
    projectElements.push(
      h('div', null, [
        h('div', null, project),
        h('div', null, props.projectData[project]),
        h('br', null, null)
      ])
    );
  }

  return h('div', null, projectElements);
};

/** Instead of JSX, use: h(type, props, ...children) */
// class UsageList extends Component {
// 	render() {
//     console.log(props);
//     const items = [1,2,3,4,5].map( (item) => (
// 			h('li', {id:item}, 'Item '+item)
// 		));
// 		return (
// 			h('main', null,
// 				h('ul', null, items)
// 			)
// 		);
// 	}
// }

/** Components can just be pure functions */
const Header = (props) => {
	return h('header', null,
		h('h1', null, 'App'),
		props.message && h('h2', null, props.message)
	);
};

render(h(App), document.body);

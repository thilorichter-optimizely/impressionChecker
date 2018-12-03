'use strict';

var optly = new OptimizelyAPI({
                password: "test",
                client_id: 12254990965
            });

const { Component, h, render } = window.preact;

/** Example classful component */
class App extends Component {
  componentWillMount(){
    this.state = {projects: []};
  }

  componentDidMount() {
    // Get plan data from Optimizely API
    var accountInfo = optly.get("plan", function(res){

      // Sort project object into a collection to make it easier to work with
      var projectCollection = [];

      for (var project in res.product_usages[0].projects) {
        projectCollection.push(
          {
            id: project,
            name: "",  // Needs to be populated with another API call after
            usage: res.product_usages[0].projects[project]
          }
        );
      };


      // Set initial state to contain all plan data
      this.setState({projects: projectCollection});

      // Map names to the ids by checking API
      optly.get("projects?per_page=60", function(allProjectData){

        projectCollection = projectCollection.map(function(project){
          return {
            id: project.id,
            name: _.find(allProjectData, {id: parseInt(project.id)}).name,
            usage: project.usage
          }
        });

        projectCollection = _.orderBy(projectCollection, ['usage'], ['desc']);

        this.setState({projects: projectCollection});
      }.bind(this));

    }.bind(this));
	}

	render(props, state) {
    return (
      h('div', {id:'app'},
				h(UsageList, { projectData: this.state.projects })
			)
		);
	}
}

const UsageList = (props) => {
  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var projectElements = props.projectData.map(function(project){
    return h('div', null, [
      h('div', null, project.name),
      h('div', null, numberWithCommas(project.usage)),
      h('br', null, null)
    ]);
  });

  return h('div', null, projectElements);
};

render(h(App), document.body);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import ErrorBoundry from '../component/ErrorBoundry';
import './App.css';



const mapStateToProps = (state) => {
		return {
			searchField: state.searchRobots.searchField,
			robots: state.requestRobots.robots,
			isPending: state.requestRobots.isPending,
			error: state.requestRobots.error
		}

}
const mapDispatchToProps = (dispatch) => {
	return {
	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {
		

componentDidMount() {
	this.props.onRequestRobots();
}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

	return isPending ? 
		<h1>Loading</h1>:
			(
					<div className= 'tc'>
						<h1 className='f1'>ROBOFRIENDS</h1>
						<SearchBox searchChange={onSearchChange}/>
						<Scroll>
							<ErrorBoundry>
								<CardList robots={filteredRobots}/>
							</ErrorBoundry>
						</Scroll>
					</div>
				);
		}
		
	}
		

export default connect(mapStateToProps, mapDispatchToProps)(App);
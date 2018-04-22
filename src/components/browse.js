import React, { Component } from 'react'

import Header from './header.js'
import Footer from './footer.js'
import Filter from './filter'
import SearchResultGrid from './searchResultGrid'

class Browse extends Component {
	constructor(props){
		super(props);

		this.state = {
			filterText: "",
			artifacts: [],
			sortValue: null,
			flipSort: false,
			ase: {
				field: null,
				stringOperator: null,
				searchTextParameters: null

			}
		}

		this.getTomograms = this.getTomograms.bind(this);
		this.storeTomograms = this.storeTomograms.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSortButtonChange = this.handleSortButtonChange.bind(this);
		this.handleFlipSortChange = this.handleFlipSortChange.bind(this);
		this.testFunction = this.testFunction.bind(this);
	}

	componentDidMount(){
    this.getTomograms();
		this.testFunction();
  }

	testFunction(){
		this.setState({
			ase: {
				...this.state.ase,
				field: 1,
				name: 3
			}
		})
	}

  getTomograms(){
    this.props.Core.Index.getSupportedArtifacts((this.storeTomograms), (error) => {
      console.error(error)
    })
  }
	storeTomograms(artifacts){
		//only for Dev so my comp doesn't crash. delete for prod
		artifacts = artifacts.slice(0,4);
    this.setState({artifacts: artifacts});
  }

	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	handleCheckboxChange(name, checked) {
		this.setState({
			[name]: checked
		})
	}

	handleSortButtonChange(value) {
		console.log(value);
		if (value === this.state.sortValue) {
			this.setState({sortValue: null})
		} else this.setState({
			sortValue: value,
			flipSort: false
		})
	}

	handleFlipSortChange() {
		this.setState(prevState => ({
      flipSort: !prevState.flipSort
    }))
	}

	render(){
		return(
			<div>
				<Header />
				<div className="row" id="browsedatabase">
					<Filter
						onFilterTextChange={this.handleFilterTextChange}
						onCheckboxChange={this.handleCheckboxChange}
						onSelectChange={this.handleSelectChange}
						sortValue={this.state.sortValue}
						onSortButtonChange={this.handleSortButtonChange}
						onFlipSortChange={this.handleFlipSortChange}
						flipSort={this.state.flipSort}
						flipText={this.state.flipText}
					/>
					<SearchResultGrid
						Core={this.props.Core}
						artifacts={this.state.artifacts}
						filterText={this.state.filterText}
						filterState={this.state}
						sortValue={this.state.sortValue}
						flipSort={this.state.flipSort}
					/>
				</div>
				<Footer />
			</div>
		)
	}
}

export default Browse;

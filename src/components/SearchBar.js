class SearchBar extends HTMLElement {
	connectedCallback() {
		this.label = this.getAttribute('label');
		this.placeholder = this.getAttribute('placeholder');
		this.render();
		
	}

	render() {
		this.innerHTML = `
			<div class="container mt-3">
				<div class="row justify-content-center">
					<div class="col-md-8">
						<div class="card shadow">
						  <div class="card-body">
								  <div class="mb-3">
								    <label for="${this.label}" class="form-label fs-4">${this.label}</label>
								    <input type="text" class="form-control" id="searchInput" placeholder="${this.placeholder}">
								    <div class="form-text">Ex: Arrabiata</div>
								  </div>
								  <button class="btn shadow" id="searchBtn" style="background-color: #F97B22; color: #fff">Search</button>
						  </div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('search-bar', SearchBar);
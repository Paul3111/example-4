class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerName = document.querySelector('#repo-name'); //
    this.mainContainerDescription = document.querySelector('#repo-description'); //
    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, jsonData => {
        this.display(jsonData);
      });
    });
  }

  display(repoText) {
    const repoName = document.createElement('div');
    repoName.textContent = repoText['full_name'];
    repoName.className = 'name';

    const repoDescription = document.createElement('div');
    repoDescription.textContent = repoText['description'];
    repoDescription.className = 'description';

    this.mainContainerName.append(repoName);
    this.mainContainerDescription.append(repoDescription);
  }
}

module.exports = GithubView;
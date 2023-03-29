class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerName = document.querySelector('#repo-name');
    this.mainContainerDescription = document.querySelector('#repo-description');
    this.mainContainerImage = document.querySelector('#repo-image');
    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, jsonData => {
        this.display(jsonData);
      });
    });
  }
  
  clear() {
    const erasingName = document.querySelectorAll('.name');
    erasingName.forEach ((name) => {
        name.remove();
    })

    const erasingDescription = document.querySelectorAll('.description');
    erasingDescription.forEach ((description) => {
        description.remove();
    })

    const erasingImage = document.querySelectorAll('.image');
    erasingImage.forEach ((image) => {
        image.remove();
    })
}

  display(repoText) {
    this.clear();
    const repoName = document.createElement('div');
    repoName.textContent = repoText['full_name'].split('/')[0];
    repoName.className = 'name';

    const repoDescription = document.createElement('div');
    repoDescription.textContent = repoText['description'];
    repoDescription.className = 'description';

    const repoImage = document.createElement('img');
    repoImage.setAttribute('src', repoText.organization.avatar_url);
    repoImage.className = 'image';

    this.mainContainerName.append(repoName);
    this.mainContainerDescription.append(repoDescription);
    this.mainContainerImage.append(repoImage);

    console.log(repoText.full_name);
    console.log(repoText.description);
  }
}

module.exports = GithubView;
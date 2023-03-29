(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // githubClient.js
  var require_githubClient = __commonJS({
    "githubClient.js"(exports, module) {
      var GithubClient2 = class {
        getRepoInfo(repoName, callback) {
          fetch("https://api.github.com/repos/" + repoName).then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
      };
      module.exports = GithubClient2;
    }
  });

  // githubModel.js
  var require_githubModel = __commonJS({
    "githubModel.js"(exports, module) {
      var GithubModel2 = class {
        constructor() {
          this.repoInfo = null;
        }
        setRepoInfo(repoInfo) {
          this.repoInfo = repoInfo;
        }
        getRepoInfo() {
          return this.repoInfo;
        }
      };
      module.exports = GithubModel2;
    }
  });

  // githubView.js
  var require_githubView = __commonJS({
    "githubView.js"(exports, module) {
      var GithubView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          this.mainContainerName = document.querySelector("#repo-name");
          this.mainContainerDescription = document.querySelector("#repo-description");
          this.mainContainerImage = document.querySelector("#repo-image");
          const submitButtonEl = document.querySelector("#submit-button");
          const repoInputEl = document.querySelector("#repo-name-input");
          submitButtonEl.addEventListener("click", () => {
            const repoName = repoInputEl.value;
            this.client.getRepoInfo(repoName, (jsonData) => {
              this.display(jsonData);
            });
          });
        }
        clear() {
          const erasingName = document.querySelectorAll(".name");
          erasingName.forEach((name) => {
            name.remove();
          });
          const erasingDescription = document.querySelectorAll(".description");
          erasingDescription.forEach((description) => {
            description.remove();
          });
          const erasingImage = document.querySelectorAll(".image");
          erasingImage.forEach((image) => {
            image.remove();
          });
        }
        display(repoText) {
          this.clear();
          const repoName = document.createElement("div");
          repoName.textContent = repoText["full_name"].split("/")[0];
          repoName.className = "name";
          const repoDescription = document.createElement("div");
          repoDescription.textContent = repoText["description"];
          repoDescription.className = "description";
          const repoImage = document.createElement("img");
          repoImage.setAttribute("src", repoText.organization.avatar_url);
          repoImage.className = "image";
          this.mainContainerName.append(repoName);
          this.mainContainerDescription.append(repoDescription);
          this.mainContainerImage.append(repoImage);
          console.log(repoText.full_name);
          console.log(repoText.description);
        }
      };
      module.exports = GithubView2;
    }
  });

  // index.js
  var GithubClient = require_githubClient();
  var GithubModel = require_githubModel();
  var GithubView = require_githubView();
  var client = new GithubClient();
  var model = new GithubModel();
  var view = new GithubView(model, client);
})();

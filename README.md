<div align="left">
<img src="https://img.shields.io/github/package-json/dependency-version/RFC2205-Team-Jafar/blue-ocean/react" />
<img src="https://img.shields.io/github/package-json/dependency-version/RFC2205-Team-Jafar/blue-ocean/webpack" />
<img src="https://img.shields.io/github/package-json/dependency-version/RFC2205-Team-Jafar/blue-ocean/axios"/>
<img src="https://img.shields.io/github/package-json/dependency-version/RFC2205-Team-Jafar/blue-ocean/nodemon"/>
</div>

# SDC-Products

> The "Products" API service that supplies product information such as styles, sizes, quantities, and skus for the Front-End of an E-Commerce website

---
## Related Projects

 - [Reviews Service](https://github.com/Team-Mandalore/SDC-Reviews)
 - [Questions and Answers Service](https://github.com/Team-Mandalore/QuestionsAndAnswers)
 - [FrontEnd Service](https://github.com/Team-Mandalore/SDC-Project-Atelier)

---

## Table of Contents

1. [Styling](#pencil2-styling)
1. [Git Workflow](#computer-how-can-i-contribute)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)


---
## :pencil2: Styling

> **Note:** This repo requires that you use the styling outlined in the following guide: [AirBnb Style Guide](https://github.com/airbnb/javascript)
---

## :computer: How can I contribute?

#### Start with the main branch
All feature branches are created off the latest code state of a project. This guide assumes this is maintained and updated in the `main` branch.

```jsx
git checkout main
git fetch origin
git reset --hard origin/main
```
This switches the repo to the `main` branch, pulls the latest commits and resets the repo's local copy of `main` to match the latest version.

#### Create a new-branch
Use a separate branch for each feature or issue you work on. After creating a branch, check it out locally so that any changes you make will be on that branch.

```jsx
git checkout -b new-feature
```

This checks out a branch called new-feature based on `main`, and the `-b` flag tells Git to create the branch if it doesn’t already exist.

#### Update, add, commit, and push changes
On this branch, edit, stage, and commit changes in the usual fashion, building up the feature with as many commits as necessary. Work on the feature and make commits like you would any time you use Git. When ready, push your commits, updating the feature branch on Bitbucket.

```jsx
git status
git add <some-file>
git commit
```

#### Push feature branch to remote
It’s a good idea to push the feature branch up to the central repository. This serves as a convenient backup, when collaborating with other developers, this would give them access to view commits to the new branch.

```jsx
git push -u origin new-feature
```

#### Code Reviews
All code submitted to this repo will require a code review prior to being merged and final approval authority/merging pull requests will be the responsibility of the branch's code owner. In the event of code being merged without proper approval, the repo will be subject to rollback and the code removed.


Additional workflow information can be found here: [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

---

## Usage

> Some Usage instructions

---

## Requirements

 - Node `insert version`
 - etc

 ---

## Development

### Installing Dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
```

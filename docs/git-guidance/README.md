## Contributing Guidelines

- Fork the repository
- Clone the forked repository to your local machine

  ```bash
  git clone <forked-repository-url>
  ```

- Add upstream remote if not added

  ```bash
  # check if upstream remote is available
  git remote -v

  # if not available, add upstream remote
  git remote add upstream <original-repository-url>
  ```

- Create a new branch for every new feature or bug fix or hotfix

  ```bash
  # branch name should be descriptive
  # if feature:  feature/your-feature-name
  # if bugfix:  bugfix/your-bugfix-name
  # if hotfix:  hotfix/your-hotfix-name
  git checkout -b <branch-name> # create and switch to new branch
  ```

- **Do your changes**

- Commit your small changes to your branch

  ```bash
  # check your changes
  git add . #dot means current directory

  # commit your changes
  git commit -m "your changes short description"
  ```

- Push your branch to remote origin

  ```bash
  git push origin <branch-name>
  ```

- Once you are done with your feature, create a pull request to upstream `main` branch

  ```bash
  # create pull request from your branch to upstream main branch
  # if you are using Github/Gitlab/Bitbucket, you can create pull request from Github/Gitlab/Bitbucket website

  ```

## Basic Steps to contribute

- Implement new features, create a new branch with name of that feature, select/add all files relate that feature.
- Create and issue on github by assigning own-self and labels
- `git commit -m ""` and `git push origin branch_name`
- Create a pull request

## Things to DO or NOT to DO

- Don't commit directly to `main` branch. That's totally forbidden and risky. You have to create a new branch for every new feature.
- Don't use your name as branch name. Use feature name instead. For example, if you are working on a feature called `login` then your branch name should be `feature/login`. If you are working on a bug fix then your branch name should be `bugfix/login`. If you are working on a hotfix then your branch name should be `hotfix/login`.
- Don't use `git push` command. Use full command `git push origin <branch-name>` instead to avoid data loss and confusion.
- Don't use `git pull` command. Use full command `git pull origin <branch-name>` instead to avoid data loss and confusion.
- Don't merge branch without review. Ask your team member to review your code and merge it.
- Before pull request, make sure your branch is up to date with `main` branch. If not, then pull `main` branch to your branch and resolve conflicts if any.
- while switching branch, make sure your branch is clean. If not, then `commit` your changes or `stash` them.
- **Note: Always Keep origin `main` branch up to date with upstream `main` branch**

## Table of Contents

- [Basics](#basics)
- [Jargons](#jargons)
- [Installation](#installation)
- [Configuration](#configuration)
- [Remotes](#remotes)
- [Branching](#branching)
- [Contributing](#contributing)
- [Commands](#commands)

## Basics

In a simple words, You can think like it's a browser to browse Codes line by line, project by project. At the same time `Github` is `Google Drive` for your coding projects. As you browse web pages in a browser, you can store modify and share codes in Github by using Git.

In a more technical words, `Git` is Version Control System (VCS). Git is `CLI` (Command Line Interface) tools to manage projects simply and efficiently. `Github` is a [remote](#remotes). `Remote` is like service provider for your project. You can use `Github` as a remote for your project. There are many other remotes like `Gitlab`, `Bitbucket` etc.

## Jargons

- **Repository** / **repo** - Repository is like a folder for your project. It contains all the files and folders of your project.
- **Add** - Add is like `select`. You can `select` files to upload to store on `remotes` (Github, Gitlab, Bitbucket etc.)
- **Commit** - A commit is a snapshot of your project where you made changes. You can think like a commit is a version of your project. You can revert back to any commit.
- **Staging** - Staging is like a waiting area. You can select files to commit in staging area.
- **Clone** - `Clone` is like `download`. You can download a project from `remote` to your local machine.
- **Push** - `Push` is like `upload`. You can upload changed files to `remote`.
- **Fetch** - `Fetch` is like `Refresh`. You can see the changes of your project on `remote` before `download` or `pull` the changes.
- **Pull** - `Pull` is like `download`. You can download your project from `remote`.
- **Merge** - `Merge` is like `combine`. You can combine two branches into one `branch`.
- **Stash** - `Stash` is like `hide`. You can hide your changes to work on other things. You can unstash to get back your changes.
- **Remote** - `Remote` is like `service provider`. You can use `Github`, `Gitlab`, `Bitbucket` etc. as remote for your project.
  [A project can have multiple remotes](#remotes).
- **Fork** - `Fork` is like `copy`. You can copy a project from `remote` to your `remote`.
  [When you fork a project, your version of project is called `origin` and the project you forked from is called `upstream`](#remotes).
- **Hotfix** - `Hotfix` is like `emergency fix`. You can use `hotfix` to fix bugs in production.

## Installation

Download and install the latest version of [Git](https://git-scm.com/downloads) for your platform.

## Configuration

You have you config your `username` and `email` to use Git. You can use `git config` command to configure your `username` and `email`.

```bash
git config --global user.name "<your name>"
git config --global user.email "<your email>"
```

Choose this git strategy for your project:

```bash
git config --global pull.rebase false
git config --global pull.ff only
```

Configure `merge` strategy for your project:

```bash
git config --global merge.ff true
```

## Branching

You don't any commit directly to `main` branch. That's totally forbidden and risky. You have to create a new branch for every new feature. Once you are done with your feature, you can merge your branch to `main` branch. You can delete your branch after merging.

- view all branches

```bash
git branch -a
```

- Create a new branch

```bash
git checkout -b <branch-name>
```

- Switch to a branch

```bash
git checkout <branch-name>
```

- Delete a branch

```bash
git branch -d <branch-name> # delete local branch
```

- Push a branch to remote

```bash
git push origin <branch-name>
```

## Commands

### Basic Git commands are:

- `git init` - Create a new git repo
- `git status` - View the changes to your project code
  example: `git status -s` (short status)
- `git add` - Add files to staging area (in nomal words, `select` files to commit)
  example: `git add .` (`.` means all files of current directory)
- `git commit` - Creates a new commit with selected files from staging area
  example: `git commit -m "your changes short description"`
- `git log` - View recent commits
  example: `git log` (show commits, press `q` to exit)
- `git push` - Push to remote repo (By default, `origin` is the remote repo name)
  example: `git push origin <branch-name>`
- `git pull` - Pull latest from remote repo
  example: `git pull origin <branch-name>` (pull from remote branch to local branch)

### Remote Git commands are:

- `git remote -v` - View remote repo
- `git remote add <remote-name> <remote-url>` - Add a new remote repo
  example: `git remote add upstream <this-org-project-url>`
- `git remote set-url <remote-name> <remote-url>` - Change remote repo url
  example: `git remote set-url upstream <main url>`

### Branching Git commands are:

- `git branch` - View all branches
- `git branch -a` - View all branches (including remote branches)
- `git branch <branch-name>` - Create a new branch (without switching)
- `git checkout -b <branch-name>` - create a new branch and switch to it
- `git checkout <branch-name>` - Switch to a branch
- `git branch -d <branch-name>` - Delete a branch (local) (use `-D` to force delete [ `don't` ])

### Stashing Git commands are:

- `git stash` - Stash your changes
- `git stash list` - View all stashes
- `git stash apply` - Apply your last stash without removing it
- `git stash apply stash@{<stash-number>}` - Apply your selected stash
- `git stash drop` - Drop your last stash
- `git stash drop stash@{<stash-number>}` - Drop your selected stash
- `git stash pop` - Apply your last stash and remove it
- `git stash pop stash@{<stash-number>}` - Apply your selected stash and remove it

### Resetting Git commands are:

- `git reset <file-name>` - unchange a file from staging area
- `git reset --soft HEAD^` - uncommit your last commit [when you mistakenly left some files uncommitted or spelling mistake in commit message]

## Advanced Commands

### Advanced Git commands are (`Don't use these commands if you don't know what you are doing`):

- `git reset --hard` - Reset all changes (including staged and unstaged) [Avoid this command]
- `git reset --hard <commit-hash>` - Reset to a commit [Avoid this command]

### Rebasing Git commands are:

- `git rebase <branch-name>` - Rebase a branch to current branch
- `git rebase --abort` - Abort a rebase

### Merging Git commands are:

- `git merge <branch-name>` - Merge a branch to current branch
- `git merge --abort` - Abort a merge

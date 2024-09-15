### SSH Setup

```bash

    cd ~/.ssh

    ssh-keygen -t rsa -b 4096 -C "your_github_account"

    eval $(ssh-agent -s)

    ssh-add

    # To add ssh to to github copy the token from filename.pub and setup to github account

```

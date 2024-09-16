### SSH Setup

```bash

    cd ~/.ssh

    ssh-keygen -t rsa -b 4096 -C "your_github_account"

    eval $(ssh-agent -s)

    ssh-add

    # To add ssh to to github copy the token from filename.pub and setup to github account

```

### `chmod` - The chmod, or change mode, command allows an administrator to set or modify a file's permissions. Every UNIX/Linux file has an owner user and an owner group

- https://www.geeksforgeeks.org/chmod-command-linux/
- https://www.freecodecamp.org/news/file-permissions-in-linux-chmod-command-explained/
- https://www.warp.dev/terminus/linux-chmod-command?gad_source=1&gclid=CjwKCAjw6JS3BhBAEiwAO9waF1C6IokVawEzolYkuDyTIkX5BweY9mADdFb5xCAvI7G9XFNoI55ePBoCEDYQAvD_BwE

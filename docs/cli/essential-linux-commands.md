# Linux Commands and Tools Documentation

This README provides a comprehensive guide to essential Linux commands, Vim editor shortcuts, file handling, user and group management, permissions, process management, and system administration. Use this guide as a reference for everyday Linux tasks.

---

## Basic Linux Commands

### File and Directory Management

- **ls**: List files and directories.
- **ls -a**: Show hidden files.
- **ls -l**: Detailed file info.
- **pwd**: Print working directory.
- **cd**: Change directory.
- **cd ..**: Move to the parent directory.
- **mkdir**: Create a new directory.
- **mkdir -p dir/subdir**: Create nested directories.
- **rm**: Remove files or directories.
- **rm -r**: Remove a directory and its contents.
- **cp**: Copy files or directories.
- **cp -r**: Copy directories recursively.
- **mv**: Move or rename files or directories.
- **touch**: Create an empty file.
- **cat**: Display file contents.
- **clear**: Clear the terminal screen.
- **man**: Show manual for a command (e.g., `man ls`).
- **echo**: Print text to the terminal.
- **exit**: Exit the terminal session.

---

## Vim Editor Commands

### Modes

- **i**: Insert mode.
- **ESC**: Exit insert mode.
- **:w**: Save file.
- **:q**: Quit.
- **:wq**: Save and quit.
- **:q!**: Quit without saving.

### Navigation

- **h**: Move left.
- **l**: Move right.
- **j**: Move down.
- **k**: Move up.

### Editing

- **dd**: Delete the current line.
- **yy**: Copy the current line.
- **p**: Paste.
- **u**: Undo.
- **Ctrl + r**: Redo.

---

## Filters

- **grep**: Search for patterns in files.
  - Example: `grep 'text' file.txt`
- **sort**: Sort file contents.
  - Example: `sort file.txt`
- **uniq**: Remove duplicate lines.
  - Example: `uniq file.txt`
- **wc**: Count words, lines, and characters.
  - Example: `wc -l file.txt`
- **head**: Display the first lines of a file.
  - Example: `head -n 5 file.txt`
- **tail**: Display the last lines of a file.
  - Example: `tail -f file.txt`
- **cut**: Extract specific columns or fields.
  - Example: `cut -d: -f1 /etc/passwd`
- **awk**: Pattern scanning and processing.
  - Example: `awk '{print $1}' file.txt`

---

## Redirection

### Output Redirection

- **>**: Redirect output to a file (overwrite).
  - Example: `echo "Hello" > file.txt`
- **>>**: Redirect output to a file (append).
  - Example: `echo "World" >> file.txt`

### Input Redirection

- **<**: Use a file as input.
  - Example: `wc -l < file.txt`

### Pipes

- **|**: Send output of one command as input to another.
  - Example: `ls | grep 'text'`

---

## User and Group Management

### User Types

- **Root**: Superuser with all permissions.
- **Regular User**: Limited permissions.

### User Management

- `sudo adduser username`: Add a user.
- `sudo deluser username`: Remove a user.
- `id`: Show current user and group IDs.
- `whoami`: Show the current username.

### Group Management

- `sudo groupadd groupname`: Create a group.
- `sudo usermod -aG groupname username`: Add a user to a group.
- `groups username`: List groups of a user.
- `sudo delgroup groupname`: Remove a group.

---

## Permissions

### File Permission Types

- **r**: Read.
- **w**: Write.
- **x**: Execute.

### Check Permissions

- `ls -l`: Shows permissions (e.g., `-rw-r--r--`).

### Change Permissions

- `chmod 777 file`: Set read, write, and execute for all.
- `chmod u+x file`: Add execute permission for the owner.
- `chmod g-w file`: Remove write permission for the group.

### Ownership

- `chown user file`: Change file owner.
- `chown user:group file`: Change file owner and group.

---

## sudo

- **Run Commands as Superuser**
  - `sudo command`: Execute a command with root privileges.
  - `sudo su`: Switch to the root user.
- **Edit sudoers File**
  - `sudo visudo`: Safely edit the sudoers file for granting/restricting privileges.

---

## Process Management

### View Processes

- `ps`: Show current processes.
- `top`: Display real-time process information.
- `htop`: Interactive process viewer (requires installation).

### Kill Processes

- `kill PID`: Terminate a process by ID.
- `killall name`: Terminate processes by name.
- `pkill name`: Kill processes matching a pattern.

### Background Processes

- `command &`: Run a command in the background.
- `jobs`: List background jobs.
- `fg %1`: Bring a background job to the foreground.
- `bg %1`: Resume a paused job in the background.

---

## Archiving and Compression

### Create Archives

- `tar -cvf archive.tar file1 file2`: Create a tar archive.
- `tar -czvf archive.tar.gz file1 file2`: Create a compressed tarball.

### Extract Archives

- `tar -xvf archive.tar`: Extract a tar archive.
- `tar -xzvf archive.tar.gz`: Extract a compressed tarball.

### Zip/Unzip

- `zip archive.zip file1 file2`: Create a zip file.
- `unzip archive.zip`: Extract a zip file.

---

## Services and System Management

### Service Management

- `sudo systemctl start service`: Start a service.
- `sudo systemctl stop service`: Stop a service.
- `sudo systemctl restart service`: Restart a service.
- `sudo systemctl status service`: Check the status of a service.
- `sudo systemctl enable service`: Enable a service at boot.
- `sudo systemctl disable service`: Disable a service at boot.

### System Information

- `uname -a`: Display system information.
- `df -h`: Show disk usage.
- `free -h`: Show memory usage.
- `uptime`: Display system uptime.

---

Use this guide to improve your workflow and simplify your Linux system tasks!

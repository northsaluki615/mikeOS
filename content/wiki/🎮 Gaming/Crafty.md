---
title: Crafty
date: 
updated: 
description: Crafty is a Minecraft server manager.
tags: 
    - minecraft
    - gaming
---
# Crafty

## Install

### Automated Install Script (Quick)

Please ensure your distro's packages are up-to-date and Git is present before installing Crafty:

```shell
sudo apt update && sudo apt upgrade && sudo apt install git
```

One line installer

```shell
git clone https://gitlab.com/crafty-controller/crafty-installer-4.0.git && \
cd crafty-installer-4.0 && \
sudo ./install_crafty.sh
```

Once installation is complete to run Crafty manually run the following. Note that if you used a directory other then the default to install Crafty you will need to `cd` into that directory.

```shell
sudo su crafty
```

```shell
cd /var/opt/minecraft/crafty
```

```shell
./run_crafty.sh
```

## Updating

```shell
sudo systemctl stop crafty
cd /var/opt/minecraft/crafty
sudo su crafty
./update_crafty.sh
```

## Admin

```shell
sudo cat /var/opt/minecraft/crafty/crafty-4/app/config/default-creds.txt
```

---
title: Immich
date: 
updated: 
description: Immich is a self-hosted photo server.
tags: 
    - self-hosted
    - photos
---
# Immich

<http://192.168.1.132:2283/>

## Immich-Go

<https://github.com/simulot/immich-go>

### Install

### Run

```bash
./immich-go -server=http://192.168.1.132:2283 -key=8Godazai35JDeqOxdfbqOUQBlNJIRQTSvXIMiThnSI upload -create-albums -google-photos -dry-run /home/mike/Downloads/takeout-20240322T175218Z-001.zip
```

**My script**

```shell
for i in {1..48}; do
    ./immich-go -server=http://192.168.1.XXX:2283 -key=8Godazai35JDeqOxdfbqOUQBlNJIRQTSvXIMiThnSI upload -create-albums -google-photos -dry-run /home/USER/Downloads/takeout-20240322T175218Z-$(printf "%02d" $i).zip
done

```

### Clean

```bash
./immich-go -server=http://192.168.1.132:2283/ -key=8Godazai35JDeqOxdfbqOUQBlNJIRQTSvXIMiThnSI duplicate -yes
```

I need to run the script below for 48 files. called takeout-20240322T175218Z-001.zip through takeout-20240322T175218Z-048.zip.

./immich-go -server=<http://192.168.1.132:2283> -key=8Godazai35JDeqOxdfbqOUQBlNJIRQTSvXIMiThnSI upload -create-albums -google-photos -dry-run /home/mike/Downloads/takeout-20240322T175218Z-001.zip

---
title: pwnagotchi
updated: 2024-04-10
created: 2024-03-10
description: A Raspberry Pi AI to passively monitor WiFi networks.
tags:
  - raspberrypi
  - hacking
  - ai
---
# pwnagotchi

# wiki

<https://pwnagotchi.ai>

## Install

**To write your Pwnagotchi image with balenaEtcher:**

- Download the latest **[Pwnagotchi .img file](https://github.com/evilsocket/pwnagotchi/releases).**
  - Verify the SHA-256 checksum of the .img
- Download **[balenaEtcher](https://www.balena.io/etcher/)** and install it.
- Connect an SD card reader with the SD card inside.
- Open **balenaEtcher** and select from your hard drive the Raspberry Pi `.img` or `.zip` file you wish to write to the SD card.
- Select the SD card you wish to write your image to.
- Review your selections, then click `Flash!` to begin writing data to the SD card.

### config.toml

**Location:** `/etc/pwnagotchi/config.toml`

config.toml

```toml
main.name = "w3ndygotchi"
main.lang = "en"
main.whitelist = [
  "The Helmers Homestead",
]

main.plugins.grid.enabled = true
main.plugins.grid.report = true
main.plugins.grid.exclude = [
  "The Helmers Homestead",
  "Helmers Friends and Family"
]
main.plugins.bt-tether.enabled = false
main.plugins.memtemp.enabled = true
main.plugins.logtail.enabled = true
ui.web.enabled = true
ui.web.username = "mike"
ui.web.password = "GoodGirl"

ui.display.enabled = true
ui.display.type = "waveshare_2"
ui.display.color = "black"
```

### First SSH

````bash
ssh pi@w3ndygotchi.local # default password: raspberry
````

## Assembly

### Solder GPIO Pins
<https://stuartglover.com/?p=191>

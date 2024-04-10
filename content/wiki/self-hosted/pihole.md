---
title: Pi-hole Setup and Configuration
date: 2024-02-10
updated: 2024-04-08
tags:
  - self-hosted
  - wiki
  - networking
  - cybersecurity
  - Pi-hole
  - Wireguard
  - Pi.Alert
  - DNS
  - DHCP
  - linux
description: Comprehensive guide on setting up Pi-hole, configuring DHCP with EdgeRouter Lite, integrating Wireguard for secure VPN access, and monitoring with Pi.Alert.
---

# Pi-hole Raspberry Pi

## Software

### pi-hole

#### Enable Conditional Forwarding on [[EdgeRouter Lite]]

1. Log in to CLI or SSH to Ubiquiti router.
2. Type: `configure` and hit enter.
3. Type: `set service dhcp-server hostfile-update enable` and hit enter.
4. Type: `commit` and hit enter.
5. Type: `exit` and hit enter.
6. End SSH or CLI window.

This will now add names and IP of devices from your DHCP scope to the router's hosts file.
### Block lists

- [https://firebog.net/](https://firebog.net/)
- https://avoidthehack.com/best-pihole-blocklists
- https://sefinek.net/blocklist-generator/pihole

### Wireguard

[wg-easy](https://github.com/wg-easy/)

```yaml
docker run -d \
  --name=wg-easy \
  -e LANG=en \
  -e WG_HOST=helmerscloud.com \
  -e PASSWORD=agoodwireguardpass \
  -e WG_DEFAULT_DNS=192.168.1.101 \
  -v ~/.wg-easy:/etc/wireguard \
  -p 51820:51820/udp \
  -p 51821:51821/tcp \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  --sysctl="net.ipv4.conf.all.src_valid_mark=1" \
  --sysctl="net.ipv4.ip_forward=1" \
  --restart unless-stopped \
  ghcr.io/wg-easy/wg-easy
```

### Pi.Alert

https://pimylifeup.com/raspberry-pi-pialert/

#### Config

```bash
/opt/stacks/pialert/data/config/pialert.conf
```

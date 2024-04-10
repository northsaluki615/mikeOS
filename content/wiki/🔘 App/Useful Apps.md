---
title: Useful Apps
date: 2024-04-10
updated: 2024-04-10
description: A list of useful apps.
tags: 
  - apps
---
For two years I've been doing home lab business with just 1GB of RAM on this raspberry pi 4b, which was the only model available back then during the haze of semiconductor crisis. Now when that is over I have gotten myself a proper 8GB Raspberry pi 5. So here comes the tribute post of everything I have got running over this time.

**WireGuard VPN**

* This is main intersection of my VPN network where every device I own connects to, so far it's two VPS'es, two routers, desktop, laptop, phone and tablet.

**DNS - Unbound & Knot**

* unbound - recursive resolver with ad domain blocking for all VPN clients. It also handles .onion domains and looks up internal domain to Knot server.
* Knot secondary server for bunch of internal TLDs I use. Primary DNS server is elsewhere though.

**Squid**

* Caching HTTP proxy with ad blocking and time based access list for various services, ( no reddit/HN during business hours etc. )

**postfix + dovecot**

* main email relay on network where all other linux machines forward emails to (like cron and sudo)
* dovecot imaps setup with virtual mailboxes and sieve filtering.
* all outgoing email are forwarded via handful of VPS'es where real IP business is setup together with DKIM.

**PostgresSQL DB**

* currently only virtual email accounts there.
* used to have zabbix monitoring DB but it quickly grew and required more RAM than was currently possible.

**nginx web server & reverse proxy**

* snappymail - simple and snappy web email
* dokuwiki - documented how to setup all of this
* ariang - torrent client for aria2
* backuppc  - rsync based incremental backup manager
* gitweb  - web page for git local repositories
* git - git http server
* novnc - web client for VNC sessions

**docker**

* docker-registry - hosting docker images to pull for kubernetes. Will scrap this service as its not used and docker likes to meddle with my firewall.

**ps3netsrv++**

* PS3 can mount legiti ISO game backup files via network, saves me having an HDD in PS3.

**Kodi**

* for consuming media files, nothing much more.
* this is also the most resource hungry service on this system, will probably use this raspi 4 now exclusively for Kodi with libreelec.

**NFS server**

* for accessing media on external USB from linux laptop or any other wireguard VPN client.

**samba**

* authorized and anonymous files shares - for accessing media on external USB from windows laptop and tablet via wireguard VPN client.

**other networks**

* Tor - configured to resolve & route .onion domains natively, for all wireguard network clients.
* i2pd - just HTTP proxy to i2p darknet for all wireguard clients.
* yggdrasil - ygg network, mainly for accessing IRC for now.

**Extra hardware**

**USB 5TB HDD**

* hosts legimitlely acquired media and then some.

**RTL2838**

* rtl_433 scans for wireless thermometers and registers temperature into postgresql db.

**weird LED hat for blinking random lights.**

* blinking leds for different occasions - project scrapped, wife unapproved.

To be completely fair, all of this only needs about 500MB of ram with about as much swapped ( compressed with zram ), so there is room for other services.
With new raspi it will be possible to finnaly host the most important service of them all - **minecraft server**

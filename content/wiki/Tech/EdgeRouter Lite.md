---
title:  EdgeRouter Lite
date:  2021-09-26
updated:  2021-09-26
description: EdgeRouter Lite configuration
tags:  tech
---
## Configuring EdgeRouter to use the PiHole
1. Install [[Pi-hole]] on your device following the documentation.
2. Ensure your Raspberry Pi has autologin disabled, a new user added, added to the sudo group, and SSH enabled.
3. Connect PiHole to your network and log in to the Ubiquity web UI.
4. Navigate to the Services tab and click the action button next to DHCP information. Choose configure.
5. In the pop-up window, select Leases and assign a static IP to your PiHole under Static MAC/IP Mapping.
6. Add the assigned IP as DNS 1 under the details tab.
7. Go back to the main dashboard and click the system tab. Add the PiHole IP as the Name Server.
8. Log in to PiHole, go to network settings, and ensure your router is listed with traffic flowing through PiHole (highlighted green with query count).
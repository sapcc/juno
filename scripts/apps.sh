#!/bin/bash
PACKAGES="@svgr/core @svgr/plugin-jsx sass postcss postcss-url"
wb yarn workspace assets-overview add -D $PACKAGES
wb yarn workspace auth add -D $PACKAGES
wb yarn workspace dashboard add -D $PACKAGES
wb yarn workspace doop add -D $PACKAGES
wb yarn workspace exampleapp add -D $PACKAGES
wb yarn workspace greenhouse add -D $PACKAGES
wb yarn workspace heureka add -D $PACKAGES
wb yarn workspace supernova add -D $PACKAGES
wb yarn workspace template add -D $PACKAGES
wb yarn workspace user-activity add -D $PACKAGES
wb yarn workspace volta add -D $PACKAGES
wb yarn workspace whois add -D $PACKAGES

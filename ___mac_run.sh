#!/bin/sh

#  __mac_run.sh
#  
#
#  Created by Gary on 13-10-22.
#
cd $(dirname $0)
rm -f "_site"
jekyll serve -w
#!/bin/sh

#  ___mac_publish.sh
#  
#
#  Created by Gary on 13-10-22.
#
cd $(dirname $0)
rm -rf "_site"
cd ../emptyzone.github.com
rm -rf *
cd $(dirname $0)
jekyll build
cd ./_site
cp -Rf * "../../emptyzone.github.com"
cd ../
rm -rf "_site"

echo "site made"

cd ../emptyzone.github.com
echo "Start synchronizing..."

echo "Commit changes..."

git add .
git commit -a -m "Automately commit"

git push
exit

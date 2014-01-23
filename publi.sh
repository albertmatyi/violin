#!/bin/bash -xe

# commit sources
git add . --all
git commit -a
git push origin master

# demeteorize
rm .demeteorized -r
demeteorizer

# clear openshift folder
rm .openshift/violingp/programs -r
rm .openshift/violingp/server -r
# move folders
mv -fv .demeteorized/programs .openshift/violingp
mv -fv .demeteorized/server .openshift/violingp

# update boot.js with the right version numbers
cp -xfv .deploy/boot.js .openshift/violingp/programs/server

# commit & deploy openshift app
cd .openshift/violingp
git add . --all
git commit -a -m "deploying"
git push
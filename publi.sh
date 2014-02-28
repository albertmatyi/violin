#!/bin/bash -xe

# commit sources
git add . --all
git commit -a
git push origin master

# demeteorize
rm .demeteorized -r
demeteorizer -n 0.10.5

# cd .demeteorized/programs/server
# npm remove fibers
# npm install fibers
# cd ../../../

# clear openshift folder
rm .openshift/violingp/programs -rf
rm .openshift/violingp/server -rf
# move folders
mv -fv .demeteorized/programs .openshift/violingp
mv -fv .demeteorized/server .openshift/violingp

# update boot.js with the right version numbers
# cp -xfv .deploy/boot.js .openshift/violingp/programs/server

# commit & deploy openshift app
cd .openshift/violingp
git add . --all
git commit -a -m "deploying"
git push
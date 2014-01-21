#!/bin/bash -xe
git add . --all
git commit -a
git push origin master

rm .demetorized -R
demeteorizer
cp -xfv .deploy/boot.js .openshift/violingp/programs/server
cd .openshift/violingp
git add . --all
git commit -a
git push
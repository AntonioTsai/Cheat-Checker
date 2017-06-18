#!/bin/bash

source config.sh

# Generate md5 of assignment
find $directory -name $filetype -exec md5 {} + > $md5sums

# Check repeated
node checkCheat.js $md5sums > $repeated_list
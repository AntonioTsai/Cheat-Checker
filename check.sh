#!/bin/bash

source config.sh

# Generate md5 of assignment
find $directory -name $filetype -exec md5 {} + > $md5_list

# Check repeated
node checkCheat.js $md5_list > $repeated_list
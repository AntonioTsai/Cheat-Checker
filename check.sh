#!/bin/bash

source config.sh
# Generate md5 of assignment
find $directory -name $filetype -exec md5 {} + > md5sums.txt

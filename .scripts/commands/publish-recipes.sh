#!/bin/bash
# echo $(pwd)
files_list=$(ls "$(pwd)/deploy/local-dev")
# echo $files_list
for file in $files_list; do
    echo "Publishing recipe: local-dev/$file"
    recipeName="${file%.*}"
    rad bicep publish --file $(pwd)/deploy/local-dev/$file --target br:localhost:51351/recipes/local-dev/$recipeName:latest --plain-http
done
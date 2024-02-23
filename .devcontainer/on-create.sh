#!/bin/bash

# Install the rad cli
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" == "edge" ]; then
    echo "Setting RADIUS_VERSION to edge"
    RADIUS_VERSION=edge
else
    ## If CURRRENT_BRANCH matches a regex of the form "v0.20", set RADIUS_VERSION to the matching string minus the "v"
    if [[ $CURRENT_BRANCH =~ ^v[0-9]+\.[0-9]+$ ]]; then
        echo "Setting RADIUS_VERSION to $CURRENT_BRANCH"
        RADIUS_VERSION=${CURRENT_BRANCH:1}
    else
        echo "Setting RADIUS_VERSION to edge"
        RADIUS_VERSION=edge
    fi
fi

wget -q "https://raw.githubusercontent.com/radius-project/radius/main/deploy/install.sh" -O - | /bin/bash

## Upgrade to the latest version of the dotnet sdk 
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x ./dotnet-install.sh
./dotnet-install.sh --version latest


